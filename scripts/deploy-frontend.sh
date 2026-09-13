#!/bin/bash
# Frontend Deployment Script
set -e

echo "🚀 Deploying Punter Prediction Frontend..."

cd frontend

echo "📦 Installing..."
npm install

echo "🏗️ Building..."
npm run build

echo "✅ Build complete. Deploy .next or out/ to hosting."
echo "Vercel: vercel --prod"
echo "Netlify: netlify deploy --prod"
