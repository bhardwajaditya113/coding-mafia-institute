#!/bin/bash

# Deployment Script for Coding Mafia Institute
# Usage: ./scripts/deploy.sh [platform]

set -e

PLATFORM=${1:-vercel}

echo "🚀 Starting deployment to $PLATFORM..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found. Using default values."
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building for production..."
npm run build

# Deploy based on platform
case $PLATFORM in
    vercel)
        echo "📤 Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            echo "❌ Vercel CLI not found. Install with: npm i -g vercel"
            exit 1
        fi
        ;;
    netlify)
        echo "📤 Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod
        else
            echo "❌ Netlify CLI not found. Install with: npm i -g netlify-cli"
            exit 1
        fi
        ;;
    docker)
        echo "🐳 Building Docker image..."
        docker build -t coding-mafia:latest .
        echo "✅ Docker image built. Run with: docker run -p 3000:3000 coding-mafia:latest"
        ;;
    *)
        echo "✅ Build complete! Deploy manually to $PLATFORM"
        echo "📁 Build output is in .next directory"
        ;;
esac

echo "✅ Deployment complete!"
