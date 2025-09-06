#!/bin/bash
set -e

echo "🏗️ Building and Pushing Pragati Docker Images..."

# Set image tag (default to latest)
TAG=${1:-latest}
REGISTRY=${2:-pragati}

echo "📦 Building backend image..."
docker build -t ${REGISTRY}/backend:${TAG} ./backend

echo "📦 Building frontend image..."
docker build -t ${REGISTRY}/frontend:${TAG} ./frontend

echo "📦 Building ML engine image..."
docker build -t ${REGISTRY}/ml-engine:${TAG} ./ml-engine

echo "✅ All images built successfully!"

# Push to registry if registry is provided
if [ "$REGISTRY" != "pragati" ]; then
    echo "📤 Pushing images to registry..."
    docker push ${REGISTRY}/backend:${TAG}
    docker push ${REGISTRY}/frontend:${TAG}
    docker push ${REGISTRY}/ml-engine:${TAG}
    echo "✅ All images pushed successfully!"
fi

echo "🎉 Build process completed!"
