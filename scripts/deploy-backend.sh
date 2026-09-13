#!/bin/bash
# cPanel Backend Deployment Script
set -e

echo "🚀 Deploying Punter Prediction Backend..."

cd ~/backend

echo "📦 Installing dependencies..."
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️ Running migrations..."
npx prisma migrate deploy

echo "🏗️ Building..."
npm run build

echo "✅ Build complete. Restart Node.js app in cPanel UI."
echo "🔗 Health check: curl https://api.yourdomain.com/health"
