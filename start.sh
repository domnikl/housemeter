#!/bin/bash

# Housemeter Docker Compose Startup Script

echo "🚀 Starting Housemeter with Docker Compose..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Set default password if not provided
if [ -z "$APP_PASSWORD" ]; then
    export APP_PASSWORD="admin"
    echo "🔑 Using default app password: $APP_PASSWORD"
    echo "   You can set a custom password by setting the APP_PASSWORD environment variable"
fi

# Build and start the services
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ Housemeter is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3002"
echo "🗄️  Database: localhost:54329"
echo ""
echo "🔑 Login password: $APP_PASSWORD"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Remove everything: docker-compose down -v"
echo ""
echo "🎉 Enjoy using Housemeter!"
