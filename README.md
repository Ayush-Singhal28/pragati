# Pragati - Performance Tracking & Career Development Platform

Pragati automatically tracks your contributions across tasks, certifications, and achievements. It also learns from your activity in public channels – how you reply, communicate, and support your team – to understand your collaboration style. The system highlights your completed work, showcases areas where you excel, and pinpoints areas where you can improve. With this transparent and data-driven view, Pragati ensures fair appraisals, promotion and guides your career growth with actionable insights.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │────│  Python Backend  │────│   AI/ML Engine  │
│   (Dashboard)    │    │   (API Gateway)  │    │  (Analytics)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   PostgreSQL    │    │     MongoDB      │    │ Elasticsearch   │
│ (Structured)    │    │   (Documents)    │    │   (Search)      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │      Redis       │
                    │    (Caching)     │
                    └──────────────────┘
```

## Technologies

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Python (FastAPI), PostgreSQL, MongoDB
- **Infrastructure**: AWS (EKS, RDS, S3), Kubernetes, Docker
- **Integration**: Slack API, Redis
- **Search**: Elasticsearch
- **AI/ML**: TensorFlow, scikit-learn, NLP libraries
- **Monitoring**: Prometheus, Grafana

## Features

### Core Features
- 📊 **Automatic Contribution Tracking** - Tasks, certifications, achievements
- 💬 **Slack Activity Analysis** - Communication patterns and collaboration style
- 🎯 **Performance Insights** - Strengths, improvement areas, and recommendations
- 📈 **Career Growth Planning** - Data-driven promotion and development paths
- ⚖️ **Fair Appraisal System** - Transparent, objective performance evaluation

### AI/ML Capabilities
- Natural Language Processing for communication analysis
- Collaboration pattern recognition
- Performance prediction models
- Personalized career recommendations
- Sentiment analysis of team interactions

## Project Structure

```
pragati/
├── frontend/              # React application
├── backend/              # Python FastAPI services
├── ml-engine/            # AI/ML components
├── infrastructure/       # Kubernetes & AWS configs
├── docker/              # Docker configurations
├── scripts/             # Deployment & utility scripts
└── docs/                # Documentation
```

## Quick Start

1. **Prerequisites**
   ```bash
   # Install Docker and Docker Compose
   # Install Node.js (v18+) and npm
   # Install Python (3.9+) and pip
   # Install kubectl and AWS CLI
   ```

2. **Development Setup**
   ```bash
   # Clone and setup
   git clone <repository>
   cd pragati
   
   # Start development environment
   docker-compose up -d
   
   # Install dependencies
   cd frontend && npm install
   cd ../backend && pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Update environment variables
   ```

## Documentation

- [API Documentation](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)
- [ML Model Documentation](./docs/ml-models.md)
- [Slack Integration](./docs/slack-integration.md)

## License

MIT License
