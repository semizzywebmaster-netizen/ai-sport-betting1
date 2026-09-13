#!/bin/bash
# Punter Prediction - cPanel Quick Setup Script - Laravel 11 + Addon Architecture
echo "=== Punter Prediction - cPanel Setup - Laravel 11 + Addon Architecture ==="
echo "Stack: Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL + Addon System"
echo "No Docker, No Redis, No Node Server in Production - cPanel PHP Native"
echo ""
echo "1. Checking PHP version (needs 8.2+)..."
php -v | head -n 1
echo "2. Checking composer..."
composer --version
echo "3. Checking Node.js (for Vite build only)..."
node --version || echo "Node not found - build locally then upload public/build"
npm --version || echo "npm not found"
echo "4. Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader
echo "5. Installing JS and building..."
if command -v npm &> /dev/null; then
  npm install
  npm run build
  ls -lh public/build/ | head -n 10
else
  echo "npm not found - build locally and upload public/build"
fi
echo "6. Checking .env..."
if [ ! -f .env ]; then cp .env.example .env; echo "Edit .env with DB credentials"; else echo ".env exists"; fi
echo "7. Laravel setup..."
php artisan key:generate --force
echo "Run: php artisan migrate --force, storage:link, config:cache, route:cache, view:cache"
echo "8. Addon system..."
ls -1 addons/ | wc -l
ls -1 addons/
php artisan addon:list 2>&1 | head -n 30 || echo "Run after migrate"
echo "9. Permissions..."
chmod -R 775 storage bootstrap/cache 2>/dev/null || chmod -R 755 storage bootstrap/cache
echo "=== Setup Complete ==="
echo "Edit .env DB, migrate, storage:link, config:cache, route:cache, view:cache"
echo "cPanel Domains -> Document Root -> public_html/public"
echo "Cron: * * * * * cd /home/username/public_html && php artisan schedule:run"
echo "Visit /health, /, /admin/addons"
echo "Future as addons: php artisan addon:make Tennis --category=sports"
