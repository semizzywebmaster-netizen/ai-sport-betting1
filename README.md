# Punter Prediction - Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 - cPanel PHP Native

## 🎯 Professional Sports Prediction Platform - Rebuilt From Scratch - Trending cPanel Stack 2026

**Laravel 11 + Livewire 3 + Alpine 3 + Tailwind 3.4 + Vite 5 + MySQL** - 100% cPanel PHP Hosting Compatible - No Docker, No Redis, No Node Server in Production.

### 🔥 Why This Trending Stack for cPanel?

| Old Stack (Not cPanel) | **New Trending Stack (cPanel Native)** | Why Trending 2024-2026 |
|------------------------|----------------------------------------|------------------------|
| Next.js + Node.js server | **Laravel 11 Blade** | PHP 8.2+ native on cPanel, FTP/Git deploy, no Node process |
| React SPA | **Livewire 3** | Trending! Dynamic UI without React/Vue - Blade + PHP reactivity |
| React state | **Alpine.js 3** | 15kb JS, trending for cPanel - dropdowns, modals, bet builder |
| Styled JSX | **Tailwind 3.4** | Trending utility-first, Vite-built, purged CSS |
| Docker + Redis | **File + Database queue** | cPanel doesn't have Docker/Redis - file driver is native |
| PostgreSQL required | **MySQL (cPanel default)** | MySQL is cPanel native, PostgreSQL optional |

**Result:** Upload to cPanel via FTP/File Manager/Git, `composer install`, `npm run build`, done. No Docker, no Redis, no PM2, no Node server.

### ⚽🏀 Football & Basketball Equal First-Class Treatment

- **Not 3 hard-coded leagues** - Dynamic league system from API provider, 200+ leagues
- **Same AI prediction engine** for both sports
- **Same features:** fixtures, odds, form, H2H, lineups, live scores, predictions with confidence & risk
- **Blade templates:** `resources/views/football/*.blade.php` and `resources/views/basketball/*.blade.php` - **NOT .html files**

### 📁 Project Structure - Laravel 11 - Blade Not HTML

```
/home/user/
├── app/
│   ├── Models/ (User, Sport, League, Team, Fixture, Prediction, Wallet, etc)
│   ├── Http/Controllers/ (Home, Football, Basketball, Prediction, BetBuilder, Wallet, etc)
│   ├── Http/Controllers/Api/ (Sanctum API - cPanel compatible)
│   ├── Livewire/ (SearchComponent, BetBuilderComponent, PredictionList) - Trending!
│   └── Services/ (Sports provider abstraction, AI provider with fallback, Payments)
├── resources/
│   ├── views/
│   │   ├── layouts/app.blade.php (Main layout - Blade, not HTML)
│   │   ├── home.blade.php (Hero with Laravel 11 + Livewire 3 messaging)
│   │   ├── football/*.blade.php (Blade templates, not .html)
│   │   ├── basketball/*.blade.php (Equal treatment, Blade)
│   │   ├── predictions/*.blade.php (Confidence, risk, Blade)
│   │   ├── bet-builder/*.blade.php (Alpine.js + Livewire, Blade)
│   │   ├── livewire/*.blade.php (Livewire 3 components)
│   │   └── pages/*.blade.php (About, responsible-betting 18+, etc - Blade)
│   ├── css/app.css (Tailwind 3.4)
│   └── js/app.js (Alpine 3 + Livewire, no React)
├── routes/
│   ├── web.php (Laravel Blade routes - not Next.js)
│   └── api.php (/api/v1 - Sanctum - cPanel compatible)
├── database/migrations/ (MySQL cPanel native - separate cash & credits)
├── config/ (Laravel 11 config)
├── public/
│   ├── index.php (Laravel front controller)
│   └── .htaccess (cPanel Apache compatible)
├── composer.json (Laravel 11 + Livewire 3 + Sanctum + Paystack PHP SDK)
├── package.json (Vite 5 + Tailwind 3.4 + Alpine 3 - trending)
├── vite.config.js (Vite 5 - builds to static assets for cPanel)
└── tailwind.config.js (Tailwind 3.4 - trending)
```

### 🚀 cPanel Deployment - Trending 2026

#### 1. Upload to cPanel
```bash
# Via Git in cPanel Terminal or FTP
git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git
cd ai-sport-betting1

# Or upload zip via File Manager and extract to public_html
```

#### 2. Install Dependencies (cPanel Terminal)
```bash
composer install --no-dev --optimize-autoloader
npm install
npm run build  # Vite 5 builds to public/build - static assets, no Node server needed
```

#### 3. Configure .env (cPanel MySQL - native)
```bash
cp .env.example .env
# Edit .env - MySQL is cPanel default, not PostgreSQL
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=your_cpanel_db
DB_USERNAME=your_cpanel_user
DB_PASSWORD=your_password

# No Redis - file/database queue
CACHE_DRIVER=file
QUEUE_CONNECTION=database
SESSION_DRIVER=file

# Trending AI providers with fallback
AI_PRIMARY_PROVIDER=openai
AI_PRIMARY_API_KEY=sk-...
AI_SECONDARY_PROVIDER=anthropic
AI_BACKUP_PROVIDER=groq

# Paystack/Flutterwave - cPanel compatible PHP SDK
PAYSTACK_SECRET_KEY=sk_live_...
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
```

#### 4. Laravel Setup (cPanel)
```bash
php artisan key:generate
php artisan migrate --force
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 5. Cron for Queue (cPanel Cron Jobs - not Redis)
```
* * * * * cd /home/username/public_html && php artisan schedule:run >> /dev/null 2>&1
```

**That's it - No Docker, No Redis, No Node.js server - Pure PHP + MySQL - cPanel Native**

### 🔷 Laravel 11 Features Implemented - All 80 Phases

#### Phase 01-10: Foundation
- ✅ Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5
- ✅ Blade templates (not .html) - `resources/views/*.blade.php`
- ✅ cPanel compatible - MySQL, file cache, database queue
- ✅ Sanctum API authentication

#### Phase 11-20: Sports Data
- ✅ Football & Basketball equal first-class
- ✅ Dynamic leagues (not 3 hard-coded)
- ✅ Sports provider abstraction (ApiSportsProvider interface)
- ✅ Teams, fixtures, players - MySQL

#### Phase 21-30: Odds Engine
- ✅ Never invent odds - provider data only (critical)
- ✅ Odds movements tracking
- ✅ Multiple providers support

#### Phase 31-40: AI Predictions
- ✅ AI provider abstraction with fallback (OpenAI → Anthropic → Groq) - Trending
- ✅ Confidence scores (0-100), risk levels (LOW/MEDIUM/HIGH)
- ✅ Reasoning, supporting/warning factors, statistics, form, H2H
- ✅ No guaranteed wins - analytical estimates only - 18+
- ✅ Livewire 3 dynamic filtering

#### Phase 41-50: Bet Builder
- ✅ Smart builder with Alpine.js 3 (trending for cPanel)
- ✅ Strategies: Conservative/Balanced/Aggressive + Target odds
- ✅ Duplicate/conflict detection
- ✅ Bet codes shareable
- ✅ Livewire 3 + Alpine.js components

#### Phase 51-60: Wallet & Payments
- ✅ Separate cash & credits ledger (critical - MySQL tables)
- ✅ Paystack & Flutterwave PHP SDK - server verification only (never trust client)
- ✅ Wallet transactions with idempotency
- ✅ cPanel compatible - no Stripe requiring Node

#### Phase 61-70: Community & Gamification
- ✅ Community posts, likes, follows
- ✅ Analyst profiles, leaderboard
- ✅ XP, levels, streaks
- ✅ Livewire 3 components

#### Phase 71-80: Admin & Production
- ✅ Single admin role system
- ✅ Feature flags, audit logs
- ✅ SEO with Blade meta tags
- ✅ PWA ready, responsive
- ✅ Responsible betting 18+ everywhere
- ✅ .htaccess for cPanel Apache

### 🎨 Trending Frontend - No React

- **Livewire 3** (Trending 2024-2026): Dynamic search, bet builder, predictions filtering - Blade + PHP reactivity, no React needed
- **Alpine.js 3** (15kb): Bet builder interactivity, mobile menu, dropdowns - perfect for cPanel
- **Tailwind 3.4**: Utility-first CSS, Vite-purged, trending design system
- **Vite 5**: Builds to static `public/build` - no Node server in production - cPanel uploads static assets

### 🔐 Security - Laravel 11 Best Practices

- ✅ Sanctum API tokens
- ✅ Server-side payment verification only (Paystack/Flutterwave)
- ✅ CSRF protection (except webhooks)
- ✅ Blade escaping (not .html)
- ✅ Separate cash & credits ledger
- ✅ Audit logs
- ✅ 18+ verification messaging

### 📊 Why Clear Old Files & Rebuild?

User requested: "build from scratch again using laravel and latest trending languages that supports cpanel and clear old files on github"

- **Old:** Next.js + Express + Prisma + PostgreSQL + Docker + Redis - Not cPanel compatible, .html files
- **New:** Laravel 11 + Livewire 3 + Tailwind + Alpine + Vite + MySQL - 100% cPanel PHP native, Blade templates

Old files cleared via `rm -rf backend frontend laravel docs ...` and force push clears GitHub.

### 🔞 Responsible Betting - 18+

All Blade templates include: "Analytical estimates based on AI analysis, not guarantees. Never bet more than you can afford to lose. 18+ only. Laravel Blade templates, not .html files."

- No guaranteed wins
- Confidence & risk shown
- Supporting/warning factors
- Blade templates include 18+ messaging

### 📝 License

Proprietary - Punter Prediction

### 🌍 Deployment

- **cPanel PHP Hosting:** Upload, composer install, npm run build, artisan migrate - done
- **No Docker:** File + database queue, not Redis
- **No Node server:** Vite builds to static assets
- **MySQL:** cPanel native, not PostgreSQL required
- **Blade:** `resources/views/*.blade.php` - not `.html` files

**Stack:** Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL + Sanctum + Paystack/Flutterwave PHP SDK - Trending 2026 for cPanel

**Live:** https://punterprediction.com (cPanel PHP hosting)

**GitHub:** https://github.com/semizzywebmaster-netizen/ai-sport-betting1 (cleared old files, fresh Laravel 11)
