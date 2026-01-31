#!/bin/bash
set -e

IMAGE_NAME="portfolio:latest"

echo "Building Docker image: $IMAGE_NAME..."
docker build -t $IMAGE_NAME .

echo "Scanning for vulnerabilities..."
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
    aquasec/trivy image --severity HIGH,CRITICAL $IMAGE_NAME || true

echo "Deploying with Docker Compose..."
docker compose up -d

echo "Deployment successful! App is running at http://localhost:3000"
