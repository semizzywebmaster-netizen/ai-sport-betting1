# cPanel Deployment - Laravel 11 + Livewire 3 - Trending Stack 2026

## Why Laravel 11 + Livewire 3 for cPanel?

### Trending Stack Comparison

| Feature | Next.js + Node (Old) | Laravel 11 + Livewire 3 (New Trending) |
|---------|----------------------|----------------------------------------|
| Hosting | Needs Node.js server, PM2, Docker | **PHP 8.2+ native on cPanel** |
| Deployment | npm run build + Node process | **FTP upload + composer install + npm run build = static assets** |
| Dynamic UI | React SPA (heavy) | **Livewire 3 (Blade + PHP reactivity) - Trending 2024-2026** |
| JS Framework | React 100kb+ | **Alpine.js 3 - 15kb - trending for cPanel** |
| CSS | Styled JSX | **Tailwind 3.4 - trending utility-first** |
| Cache | Redis required | **File + Database - cPanel native** |
| DB | PostgreSQL | **MySQL - cPanel default** |
| Templates | .html files | **Blade .blade.php - Laravel standard** |

## Step-by-Step cPanel Deployment

### 1. Create Database in cPanel
- cPanel → MySQL Databases → Create DB: punter_prediction
- Create user, add to DB with all privileges
- Note: host=localhost, not 127.0.0.1 for cPanel

### 2. Upload Files
Option A: Git (cPanel Terminal)
```bash
cd public_html
git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git .
```

Option B: FTP/File Manager
- Upload zip, extract to public_html
- Old files cleared via rm -rf + force push

### 3. Install (cPanel Terminal)
```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build  # Vite 5 → public/build - static, no Node server
cp .env.example .env
nano .env  # Edit DB, AI keys, Paystack
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 4. Point Domain
- cPanel → Domains → Document root: public_html/public (Laravel public folder)
- Or move public/* to public_html and adjust index.php paths

### 5. Cron for Queue (cPanel → Cron Jobs)
```
* * * * * cd /home/username/public_html && php artisan schedule:run >> /dev/null 2>&1
```

Uses database queue, not Redis - cPanel compatible.

### 6. .htaccess
Already included in public/.htaccess - Apache compatible.

## Verification
Visit /health - should show Laravel 11 + Livewire 3 + cPanel ready.

## Trending Languages for cPanel 2026
- **Laravel 11:** Latest PHP framework, slim structure
- **Livewire 3:** Trending - dynamic without React/Vue
- **Alpine.js 3:** 15kb JS for cPanel
- **Tailwind 3.4:** Utility-first CSS
- **Vite 5:** Fast build to static assets
- **MySQL 8:** cPanel native
- **PHP 8.2+:** cPanel supports
- **Blade:** Not .html files - Laravel standard

All trending and cPanel compatible - no Docker, no Redis, no Node server in production.
