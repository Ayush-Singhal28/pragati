#!/bin/bash
set -e

echo "🚀 Starting Pragati Development Environment Setup..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build and start containers
echo "📦 Building containers..."
docker-compose build

echo "🔧 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."

# Check PostgreSQL
if docker-compose exec -T postgres pg_isready -U pragati_user -d pragati >/dev/null 2>&1; then
    echo "✅ PostgreSQL is ready"
else
    echo "❌ PostgreSQL is not ready"
fi

# Check MongoDB
if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1; then
    echo "✅ MongoDB is ready"
else
    echo "❌ MongoDB is not ready"
fi

# Check Redis
if docker-compose exec -T redis redis-cli ping >/dev/null 2>&1; then
    echo "✅ Redis is ready"
else
    echo "❌ Redis is not ready"
fi

# Check Elasticsearch
if curl -s http://localhost:9200/_cluster/health >/dev/null 2>&1; then
    echo "✅ Elasticsearch is ready"
else
    echo "❌ Elasticsearch is not ready"
fi

# Check Backend API
if curl -s http://localhost:8000/docs >/dev/null 2>&1; then
    echo "✅ Backend API is ready"
else
    echo "❌ Backend API is not ready"
fi

# Check Frontend
if curl -s http://localhost:3000 >/dev/null 2>&1; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not ready"
fi

# Check ML Engine
if curl -s http://localhost:8001/health >/dev/null 2>&1; then
    echo "✅ ML Engine is ready"
else
    echo "❌ ML Engine is not ready"
fi

echo ""
echo "🎉 Pragati Development Environment is ready!"
echo ""
echo "📍 Access Points:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend API: http://localhost:8000/docs"
echo "   ML Engine:   http://localhost:8001/docs"
echo ""
echo "🔐 Demo Login:"
echo "   Email:    demo@pragati.com"
echo "   Password: demo123"
echo ""
echo "💡 Commands:"
echo "   Stop:     docker-compose down"
echo "   Restart:  docker-compose restart"
echo "   Logs:     docker-compose logs -f [service-name]"
