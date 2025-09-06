#!/bin/bash
set -e

echo "🚀 Deploying Pragati with Integrated Tools..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        print_warning "kubectl is not installed - Kubernetes deployment will be skipped"
    fi
    
    if ! command -v node &> /dev/null; then
        print_warning "Node.js is not installed - Frontend development will require Node.js"
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed"
        exit 1
    fi
    
    print_success "Prerequisites check completed"
}

# Setup environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        print_warning "Created .env file from .env.example - please update with your actual values"
    fi
    
    # Generate secret keys if not set
    if ! grep -q "SECRET_KEY=" .env || grep -q "your-secret-key-here" .env; then
        SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_urlsafe(32))")
        sed -i.bak "s/SECRET_KEY=.*/SECRET_KEY=${SECRET_KEY}/" .env
        print_success "Generated new SECRET_KEY"
    fi
    
    print_success "Environment setup completed"
}

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    
    # Build backend
    print_status "Building backend image..."
    docker build -t pragati/backend:latest ./backend
    
    # Build frontend
    print_status "Building frontend image..."
    docker build -t pragati/frontend:latest ./frontend
    
    # Build ML engine
    print_status "Building ML engine image..."
    docker build -t pragati/ml-engine:latest ./ml-engine
    
    print_success "All Docker images built successfully"
}

# Setup databases
setup_databases() {
    print_status "Setting up databases..."
    
    # Start database containers
    docker-compose up -d postgres mongodb redis elasticsearch
    
    # Wait for databases to be ready
    print_status "Waiting for databases to be ready..."
    sleep 30
    
    # Check database health
    if docker-compose exec -T postgres pg_isready -U pragati_user -d pragati; then
        print_success "PostgreSQL is ready"
    else
        print_error "PostgreSQL is not ready"
        exit 1
    fi
    
    if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
        print_success "MongoDB is ready"
    else
        print_error "MongoDB is not ready"
        exit 1
    fi
    
    print_success "Databases setup completed"
}

# Deploy to development
deploy_development() {
    print_status "Deploying to development environment..."
    
    # Start all services
    docker-compose up -d
    
    # Wait for services
    print_status "Waiting for services to start..."
    sleep 45
    
    # Health checks
    if curl -s http://localhost:8000/docs > /dev/null; then
        print_success "Backend API is ready at http://localhost:8000"
    else
        print_warning "Backend API health check failed"
    fi
    
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend is ready at http://localhost:3000"
    else
        print_warning "Frontend health check failed"
    fi
    
    if curl -s http://localhost:8001/health > /dev/null; then
        print_success "ML Engine is ready at http://localhost:8001"
    else
        print_warning "ML Engine health check failed"
    fi
}

# Deploy to Kubernetes (production)
deploy_kubernetes() {
    if ! command -v kubectl &> /dev/null; then
        print_warning "kubectl not found - skipping Kubernetes deployment"
        return
    fi
    
    print_status "Deploying to Kubernetes..."
    
    # Create namespace
    kubectl create namespace pragati --dry-run=client -o yaml | kubectl apply -f -
    
    # Apply Kubernetes manifests
    kubectl apply -f infrastructure/k8s/ -n pragati
    
    # Apply Rocket deployment
    kubectl apply -f infrastructure/rocket/ -n pragati
    
    print_success "Kubernetes deployment completed"
}

# Setup monitoring
setup_monitoring() {
    print_status "Setting up monitoring..."
    
    # Copy Maxim configuration
    mkdir -p monitoring
    cp performance/maxim-config.yml monitoring/
    
    # Setup Prometheus and Grafana (if available)
    if [ -f infrastructure/monitoring/prometheus.yml ]; then
        docker-compose -f docker-compose.monitoring.yml up -d
        print_success "Monitoring stack deployed"
    else
        print_warning "Monitoring configuration not found - skipping"
    fi
}

# Setup CI/CD
setup_cicd() {
    print_status "Setting up CI/CD..."
    
    # Create GitHub Actions directory if it doesn't exist
    mkdir -p .github/workflows
    
    # Copy workflow files
    if [ ! -f .github/workflows/ci.yml ]; then
        cat > .github/workflows/ci.yml << 'EOF'
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Run tests
      run: |
        docker-compose -f docker-compose.test.yml up --abort-on-container-exit
    
  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    - name: Build and push images
      run: |
        ./scripts/build-images.sh latest ${{ secrets.DOCKER_REGISTRY }}
EOF
        print_success "Created CI/CD pipeline"
    fi
}

# Main deployment function
main() {
    echo "🎯 Pragati Deployment Script"
    echo "=============================="
    
    check_prerequisites
    setup_environment
    build_images
    setup_databases
    deploy_development
    setup_monitoring
    setup_cicd
    
    # Optional Kubernetes deployment
    read -p "Deploy to Kubernetes? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        deploy_kubernetes
    fi
    
    echo ""
    echo "🎉 Pragati Deployment Completed!"
    echo "================================="
    echo ""
    echo "📍 Access Points:"
    echo "   Frontend:     http://localhost:3000"
    echo "   Backend API:  http://localhost:8000/docs"
    echo "   ML Engine:    http://localhost:8001/docs"
    echo ""
    echo "🔧 Integrated Tools:"
    echo "   ✅ ElevenLabs (Voice notifications)"
    echo "   ✅ CodeRabbit (AI code review)"
    echo "   ✅ Scalekit (Enterprise auth)"
    echo "   ✅ Rocket (Deployment automation)"
    echo "   ✅ Maxim (Performance monitoring)"
    echo "   ✅ Lovable (AI development)"
    echo "   ✅ Windsurf (IDE integration)"
    echo ""
    echo "🔐 Demo Login:"
    echo "   Email:    demo@pragati.com"
    echo "   Password: demo123"
    echo ""
    echo "📚 Next Steps:"
    echo "   1. Update .env file with your API keys"
    echo "   2. Configure Slack integration"
    echo "   3. Set up enterprise SSO (Scalekit)"
    echo "   4. Configure monitoring alerts"
    echo "   5. Run performance benchmarks"
    echo ""
    echo "💡 Commands:"
    echo "   Stop:     docker-compose down"
    echo "   Restart:  docker-compose restart"
    echo "   Logs:     docker-compose logs -f [service-name]"
    echo "   Scale:    docker-compose up --scale backend=3"
}

# Run main function
main "$@"
