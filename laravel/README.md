# Punter Prediction - Laravel Blade Frontend for cPanel

Laravel Blade templates, NOT static HTML, for cPanel PHP hosting.

## Why Laravel Blade, Not HTML?

### Problem with HTML Static
- Next.js static export generates HTML files (out/*.html) - static, not dynamic
- No PHP logic, no Blade templating, no auth, no sessions
- Requires Node.js for build, but cPanel PHP hosting is more common than Node.js

### Solution: Laravel Blade
- Dynamic Blade templates: @extends, @section, @if, @foreach, @auth, @csrf
- cPanel PHP native: Works on ordinary cPanel PHP hosting (PHP 8.1+, MySQL, Composer)
- No Node.js required for frontend (if using Laravel as full backend)
- Or single-file: Laravel frontend + Node.js API backend on same domain via /api/v1
- Single deployment, no CORS if same domain

## Structure
```
laravel/
├── app/Http/Controllers/ - Home, Football, Basketball, Prediction, BetBuilder, Auth
├── resources/views/
│   ├── layouts/app.blade.php - Main layout with header, footer, bottom-nav (Blade)
│   ├── home.blade.php - Hero, football & basketball equal, pricing, responsible betting (Blade)
│   ├── football/index.blade.php - Football predictions with @forelse, @empty (Blade)
│   ├── basketball/index.blade.php - Basketball with @for (Blade)
│   └── about.blade.php, etc - All Blade, not HTML
├── routes/web.php - Laravel routes, not static HTML files
├── composer.json - Laravel 10, PHP 8.1+
└── .env.example - API_URL to Node.js backend or same domain
```

## cPanel Deployment - Laravel Blade (PHP)

### Option 1: Laravel Frontend + Node.js API Backend (Recommended for cPanel with Node.js)
- Frontend: Laravel Blade at punterprediction.com (cPanel PHP)
- Backend: Node.js API at api.punterprediction.com or same domain /api/v1 (cPanel Node.js)
- Laravel .env: API_URL=https://api.punterprediction.com/api/v1
- Laravel fetches from Node.js API via Http::get() with graceful fallback

### Option 2: Full Laravel Backend (Pure PHP, No Node.js)
- Implement API in Laravel (MySQL instead of PostgreSQL)
- Use Laravel as both frontend and backend
- Works on ordinary cPanel PHP without Node.js
- Requires rewriting Node.js logic to PHP (alternative)

### Option 3: Single File Node.js (Original Single File)
- Backend serves frontend static (frontend/out/ -> backend/public/)
- One Node.js app serves both - see docs/CPANEL-SINGLE-FILE.md
- No Laravel needed, but requires cPanel Node.js support

## Deployment Steps - Laravel Blade cPanel PHP

1. Upload laravel/ folder to cPanel File Manager (e.g., ~/laravel or public_html if using public/ as docroot)

2. cPanel -> Terminal:
```bash
cd ~/laravel
composer install
cp .env.example .env
php artisan key:generate
# Set DB and API_URL in .env
# For SQLite or MySQL
php artisan migrate
php artisan serve # Or point domain to public/ folder
```

3. cPanel -> Domains -> Set document root to laravel/public

4. Env (.env):
```
APP_URL=https://punterprediction.com
API_URL=https://api.punterprediction.com/api/v1
# Or for single-file Node.js: API_URL=/api/v1
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=punter_prediction
```

5. If using Node.js API backend, deploy Node.js backend separately per docs/CPANEL-DEPLOYMENT.md

## Features - Laravel Blade
- ✅ Blade templating, not static HTML
- ✅ @extends layouts/app.blade.php
- ✅ @section content, @yield, @stack
- ✅ @foreach, @forelse, @empty, @if, @auth, @csrf
- ✅ Dynamic data from API with Http::get() and graceful fallback
- ✅ No fake data - empty if API not available, not fake odds
- ✅ Football & basketball equal first-class treatment
- ✅ Responsible betting 18+, no guaranteed wins
- ✅ cPanel PHP compatible, no Node.js required for frontend
- ✅ Single file possible: Laravel frontend + Node.js API on same domain

## Production Verification
- /health -> Laravel frontend health with php version, laravel version, blade-not-html
- / -> Homepage with Laravel Blade, not HTML
- /football -> Football with @forelse Blade
- /basketball -> Basketball with @for Blade
- All routes use Blade templates, not static HTML files

## Conclusion
Laravel Blade files for cPanel PHP hosting, not HTML static files. Dynamic, not static. cPanel PHP native. Can work with Node.js API backend or full Laravel backend.

For Node.js single-file deployment (backend serves frontend static), see docs/CPANEL-SINGLE-FILE.md - still available as alternative.
