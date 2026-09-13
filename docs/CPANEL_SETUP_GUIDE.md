# Punter Prediction - cPanel Setup Guide - Laravel 11 + Addon Architecture - Step by Step

**For Beginners & Experts - No Docker, No Redis, No Node Server - Pure PHP + MySQL - cPanel Native**

**GitHub:** https://github.com/semizzywebmaster-netizen/ai-sport-betting1
**Stack:** Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL + Addon Architecture

---

## 📋 Requirements - Check cPanel First

### cPanel Must Have:
- **PHP 8.2 or 8.3** - cPanel → Select PHP Version → 8.2 or 8.3 (Laravel 11 requires 8.2+)
- **MySQL 5.7+ or 8.0** - cPanel → MySQL Databases (native)
- **Composer** - cPanel → Terminal → `composer --version` (if not, install via cPanel)
- **Node.js 18+** - cPanel → Terminal → `node --version` + `npm --version` (for Vite build only, not for production server)
- **Extensions:** BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, cURL, GD

### Check PHP Version:
```bash
# cPanel Terminal
php -v
# Should be 8.2+ - if not, cPanel → Select PHP Version → 8.2 or 8.3
```

---

## 🚀 Method 1: Git Clone (Recommended - Easiest)

### Step 1: Create Database in cPanel

1. cPanel → **MySQL Databases**
2. **Create New Database:** `youruser_punter` (e.g., `semizzy_punter`)
3. **Create New User:** `youruser_punteruser` + strong password
4. **Add User to Database:** Select user + database → All Privileges → Make Changes
5. **Note:** DB Name, User, Password, Host = `localhost` (cPanel default)

### Step 2: Clone from GitHub via cPanel Terminal

```bash
# cPanel → Terminal (or SSH)

# Go to public_html or your domain folder
cd ~/public_html
# Or if addon domain: cd ~/yourdomain.com

# If public_html not empty, backup or clear (we already cleared old files via force push)
# rm -rf *  # Careful - backup first if needed

# Clone fresh Laravel 11 + Addon Architecture (old files already cleared on GitHub)
git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git .

# Or if you want in subfolder:
# git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git punter
# cd punter

# Verify - should see addons/ folder with 14 addons, not backend/frontend old
ls -la
# Should see: addons/, app/, resources/views/*.blade.php (56 Blade), composer.json Laravel 11
```

### Step 3: Install Dependencies

```bash
# In public_html (where you cloned)

# Install PHP dependencies - Laravel 11 + Livewire 3 + Addon system
composer install --no-dev --optimize-autoloader

# If composer memory error on cPanel:
# php -d memory_limit=-1 /usr/local/bin/composer install --no-dev --optimize-autoloader
# Or: composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Install JS dependencies - Vite 5 + Tailwind 3.4 + Alpine 3 (for build only)
npm install

# Build frontend assets - Vite builds to public/build - static, no Node server needed in production
npm run build

# Verify build
ls -lh public/build/
# Should see: manifest.json + assets folder with css/js - static files
```

### Step 4: Configure .env

```bash
# Copy example
cp .env.example .env

# Edit .env - cPanel Terminal → nano .env or File Manager → Edit
nano .env
```

**Edit these in .env:**

```env
APP_NAME="Punter Prediction"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com  # Your domain - https
APP_TIMEZONE=Africa/Lagos

# Database - MySQL cPanel native - NOT PostgreSQL
DB_CONNECTION=mysql
DB_HOST=localhost  # cPanel uses localhost, not 127.0.0.1
DB_PORT=3306
DB_DATABASE=youruser_punter  # From Step 1
DB_USERNAME=youruser_punteruser  # From Step 1
DB_PASSWORD=your_strong_password  # From Step 1

# Cache & Queue - File + Database - No Redis - cPanel compatible
BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=file
SESSION_LIFETIME=120

# No Redis - cPanel doesn't have Redis - file/database is native

# Sports API - Your API keys
SPORTS_API_KEY=your_api_sports_key
FOOTBALL_API_KEY=
BASKETBALL_API_KEY=
ODDS_API_KEY=

# AI Providers - Trending with fallback - Addons
AI_PRIMARY_PROVIDER=openai
AI_PRIMARY_API_KEY=sk-...
AI_SECONDARY_PROVIDER=anthropic
AI_SECONDARY_API_KEY=
AI_BACKUP_PROVIDER=groq
AI_BACKUP_API_KEY=

# Payments - Paystack (NGN) - cPanel compatible PHP SDK - server verification only
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_WEBHOOK_SECRET=

# Flutterwave
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_...

# WhatsApp
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# Email - cPanel SMTP or Gmail
MAIL_MAILER=smtp
MAIL_HOST=mail.yourdomain.com  # Or smtp.gmail.com
MAIL_PORT=465  # Or 587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=ssl  # Or tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="${APP_NAME}"

# Addon System - Enable/disable addons - cPanel file driver
# All 14 addons enabled by default - see config/addons.php
```

**Save:** Ctrl+O, Enter, Ctrl+X (nano)

### Step 5: Laravel Setup - Key, Migrate, Storage, Cache

```bash
# Generate app key
php artisan key:generate

# Run migrations - MySQL tables - separate cash & credits ledger + addons migrations
php artisan migrate --force

# Verify migrations
# Should create: users, sports, leagues, teams, fixtures, odds, ai_providers, predictions, bet_slips, wallets, credit_balances, wallet_transactions, payments, etc

# Link storage - for avatars, uploads
php artisan storage:link

# Cache config, routes, views for production - cPanel speed
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Clear old cache if any
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Step 6: Set Document Root to public/

**Important:** Laravel public folder must be document root - cPanel Apache.

**Option A: cPanel → Domains (Recommended)**

1. cPanel → **Domains**
2. Find your domain → **Manage** → **Document Root**
3. Change from `public_html` to `public_html/public`
4. Save

**Option B: Move public/* to public_html (If you can't change document root)**

```bash
# If your hosting doesn't allow changing document root (some shared hosting)

# Backup current public_html/index.php if exists
# Then move Laravel public files to public_html root

# Method: Copy public files to public_html and adjust paths
# This is advanced - only if Option A not available

# In public_html (where Laravel is):
# Move all files from public/ to parent, but keep structure

# Actually, better: Keep Laravel in public_html, but create .htaccess in public_html root that points to public/
```

**Create .htaccess in public_html root if document root is still public_html (not public/):**

```bash
# If document root is public_html (not public_html/public), create this .htaccess in public_html/

# File: ~/public_html/.htaccess (root, not public/.htaccess)
```

Content for root .htaccess (if needed):

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

**But best is Option A - set document root to public_html/public via cPanel Domains.**

### Step 7: Set Permissions - cPanel

```bash
# cPanel Terminal - set permissions for Laravel storage and bootstrap/cache

chmod -R 775 storage
chmod -R 775 bootstrap/cache
chmod -R 775 public/build

# If 775 not work, try 755 - some cPanel need 755
# chmod -R 755 storage bootstrap/cache

# Ensure .env not accessible via web - should be blocked by public/.htaccess but check
# cPanel File Manager → public_html/.env should NOT be accessible via https://yourdomain.com/.env (should 403)
```

### Step 8: Cron Job for Queue - Database Queue (No Redis) - cPanel

**Why Cron?** Laravel queue needs to run - we use database driver, not Redis - cPanel compatible - cron runs `php artisan schedule:run` every minute.

1. cPanel → **Cron Jobs**
2. **Add New Cron Job:**
   - Common Settings: **Once Per Minute (* * * * *)**
   - Command:
     ```
     cd /home/youruser/public_html && php artisan schedule:run >> /dev/null 2>&1
     ```
     Replace `/home/youruser/public_html` with your actual path - cPanel shows it in Cron Jobs page - e.g., `/home/semizzywebmaster/public_html`

3. Add another cron for queue work (optional but recommended):
   ```
   * * * * * cd /home/youruser/public_html && php artisan queue:work --stop-when-empty >> /dev/null 2>&1
   ```

**Verify Cron Path:**
- cPanel → File Manager → Shows path: `/home/username/public_html`
- Use that exact path in cron command

### Step 9: Verify Installation

**Visit your domain:**

1. **Health Check:** `https://yourdomain.com/health`
   Should show:
   ```json
   {
     "success": true,
     "message": "Punter Prediction Laravel 11 + Addon Architecture - cPanel Ready",
     "version": "2.0.0-addon",
     "stack": "Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + Addon System",
     "cpanelCompatible": true,
     "addonSystem": true,
     "totalAddons": 14,
     "enabledAddons": 14,
     "addons": ["core", "football", "basketball", ...]
   }
   ```

2. **Home Page:** `https://yourdomain.com/`
   Should show: Hero with Laravel 11 + Livewire 3 + cPanel messaging, Football & Basketball equal, 200+ leagues, Blade templates

3. **Football:** `https://yourdomain.com/football` - Should work - Blade template

4. **Basketball:** `https://yourdomain.com/basketball` - Equal treatment

5. **Predictions:** `https://yourdomain.com/predictions` - AI predictions with confidence, risk

6. **Bet Builder:** `https://yourdomain.com/bet-builder` - Alpine.js 3 + Livewire 3

7. **Admin Addons Manager:** `https://yourdomain.com/admin/addons` (need admin user)
   Should show 14 addons with enable/disable

**If 500 error:**
- Check `storage/logs/laravel.log` via File Manager or Terminal: `tail -n 100 storage/logs/laravel.log`
- Common: .env DB wrong, permissions, PHP version not 8.2+, missing `php artisan key:generate`

---

## 🚀 Method 2: FTP / File Manager Upload (No Git)

### If cPanel Terminal not available or Git not allowed:

1. **Local:** On your computer, clone repo and build:
   ```bash
   git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git
   cd ai-sport-betting1
   composer install --no-dev --optimize-autoloader
   npm install && npm run build
   ```

2. **Create zip:** Zip all files EXCEPT `node_modules`, `.git`, `storage/logs/*`

3. **cPanel File Manager:** Upload zip to `public_html` → Extract

4. **cPanel MySQL Databases:** Create DB + user (same as Method 1 Step 1)

5. **cPanel File Manager:** Edit `.env.example` to `.env` and configure DB, etc (same as Method 1 Step 4)

6. **cPanel Terminal (if available) or via PHP script:** Run `php artisan key:generate`, `php artisan migrate --force`, `php artisan storage:link`, `php artisan config:cache`, etc

   If no Terminal, create temporary PHP file `public/install.php`:
   ```php
   <?php
   echo shell_exec('cd /home/youruser/public_html && php artisan key:generate 2>&1');
   echo shell_exec('cd /home/youruser/public_html && php artisan migrate --force 2>&1');
   echo shell_exec('cd /home/youruser/public_html && php artisan storage:link 2>&1');
   echo shell_exec('cd /home/youruser/public_html && php artisan config:cache 2>&1');
   echo "Done";
   ```
   Visit `https://yourdomain.com/install.php` then DELETE it immediately for security.

7. **Set document root to public/** - cPanel Domains (same as Method 1 Step 6)

8. **Cron Jobs** - same as Method 1 Step 8

9. **Verify** - same as Method 1 Step 9

---

## 🔌 Addon System - How to Manage Addons on cPanel

### List Addons (cPanel Terminal)

```bash
cd ~/public_html
php artisan addon:list
```

Shows:
```
Total: 14 addons | Enabled: 14
Slug | Name | Version | Enabled | Category
core | Core | 1.0.0 | ✅ Yes | core
football | Football | 1.0.0 | ✅ Yes | sports
basketball | Basketball | 1.0.0 | ✅ Yes | sports
...
```

### Enable/Disable Addon on cPanel

```bash
# Disable addon (not core)
php artisan addon:disable basketball
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Enable addon
php artisan addon:enable basketball
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Via config/addons.php - File Manager edit
# 'basketball' => ['enabled' => false]

# Via addon.json - File Manager edit addons/Basketball/addon.json
# {"enabled": false}
```

### Add Future Feature as Addon on cPanel

```bash
# Example: Add Tennis sport as addon - no core touch

# Via artisan - creates full structure
php artisan addon:make Tennis --category=sports

# Edit addons/Tennis/config/tennis.php - add leagues as config
# No core change - Football and Basketball untouched

# Enable
php artisan addon:enable tennis
php artisan config:cache
php artisan route:cache

# Visit https://yourdomain.com/tennis - new sport as addon!

# Future: Cricket, Esports, AIGemini, PaymentsCrypto, LiveStreaming - same way
# php artisan addon:make AIGemini --category=ai
# php artisan addon:make PaymentsCrypto --category=payments
```

### Admin UI for Addons

Visit `https://yourdomain.com/admin/addons` (need admin role) - shows all 14 addons with enable/disable buttons - UI for addon management.

---

## 🔧 Troubleshooting - Common cPanel Issues

### 500 Internal Server Error

**Check logs:**
```bash
tail -n 100 storage/logs/laravel.log
# Or File Manager → storage/logs/laravel.log
```

**Common fixes:**
1. **PHP Version:** cPanel → Select PHP Version → 8.2 or 8.3 (Laravel 11 requires 8.2+)
2. **Permissions:** `chmod -R 775 storage bootstrap/cache` or `755`
3. **.env:** DB credentials wrong, APP_KEY missing - run `php artisan key:generate`
4. **Document root:** Must be `public_html/public` not `public_html` - cPanel → Domains → Document Root
5. **.htaccess:** Ensure `public/.htaccess` exists - we included 1.1K Apache compatible
6. **Composer:** Run `composer install --no-dev --optimize-autoloader` again
7. **Cache:** `php artisan optimize:clear` then `php artisan config:cache && php artisan route:cache && php artisan view:cache`

### npm run build fails on cPanel

- cPanel Node.js may be old - cPanel → Terminal → `node -v` should be 18+
- If no Node.js, build locally then upload `public/build` folder via FTP
- Or: Local build then zip upload (Method 2)

### Database connection error

- Check .env: DB_HOST=localhost (not 127.0.0.1 for cPanel), DB_DATABASE, DB_USERNAME, DB_PASSWORD
- cPanel MySQL Databases → Check user added to database with All Privileges
- Try: `php artisan migrate --force` - should show error if DB wrong

### Storage link error

```bash
php artisan storage:link
# If fails, manual: File Manager → public/storage should be symlink to storage/app/public
# Or: ln -s /home/youruser/public_html/storage/app/public /home/youruser/public_html/public/storage
```

### Cron not working - queue not processing

- Check cron path: cPanel → Cron Jobs shows example path - use exact `/home/username/public_html`
- Command: `cd /home/username/public_html && php artisan schedule:run >> /dev/null 2>&1`
- Test manually: `cd ~/public_html && php artisan schedule:run` - should run without error
- Check queue: `php artisan queue:work --stop-when-empty` manually

### Addon not showing

```bash
php artisan addon:list
# If new addon not listed, check addons/YourAddon/addon.json exists and valid JSON
# Check permissions: chmod -R 775 addons/
# Clear cache: php artisan config:clear && php artisan route:clear
```

### Blade not loading - 404

- Ensure routes: `php artisan route:list` - should show football, basketball, etc
- Clear cache: `php artisan route:cache` + `php artisan view:cache`
- Check `resources/views/*.blade.php` exists - 57 Blade templates - not HTML

---

## 🔐 Security Checklist - cPanel

- [ ] .env NOT accessible via web: Visit https://yourdomain.com/.env should 403 (blocked by public/.htaccess)
- [ ] APP_DEBUG=false in .env production
- [ ] APP_ENV=production
- [ ] Strong DB password, strong APP_KEY (generated)
- [ ] Delete install.php if you created temporary install script
- [ ] Permissions 775 or 755 for storage and bootstrap/cache - not 777
- [ ] Cron uses correct path /home/username/public_html
- [ ] Paystack/Flutterwave webhook secrets set in .env
- [ ] 18+ responsible betting messaging in Blade templates

---

## 🎯 Final Verification Checklist

- [ ] PHP 8.2+ selected in cPanel → Select PHP Version
- [ ] MySQL database created + user added with All Privileges
- [ ] Git cloned or FTP uploaded - addons/ folder with 14 addons, not backend/frontend old
- [ ] composer install --no-dev --optimize-autoloader done
- [ ] npm install && npm run build done - public/build exists with manifest.json
- [ ] .env configured - DB_HOST=localhost, DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_URL=https
- [ ] php artisan key:generate done
- [ ] php artisan migrate --force done - tables created - separate cash & credits ledger
- [ ] php artisan storage:link done
- [ ] php artisan config:cache + route:cache + view:cache done
- [ ] Document root set to public_html/public via cPanel → Domains
- [ ] Permissions 775 for storage and bootstrap/cache
- [ ] Cron job added: cd /home/username/public_html && php artisan schedule:run every minute
- [ ] Visit /health - shows Laravel 11 + Addon Architecture + 14 addons + cPanelCompatible true
- [ ] Visit / - shows home with Laravel 11 + Livewire 3 + Addon messaging
- [ ] Visit /football, /basketball, /predictions, /bet-builder - all Blade templates work
- [ ] Visit /admin/addons - shows 14 addons manager UI
- [ ] Test addon: php artisan addon:make TestAddon --category=feature + enable + visit /testaddon

---

## 📚 More Docs

- `docs/ADDON_ARCHITECTURE.md` - How addon system works - future features as addons
- `docs/CPANEL_DEPLOYMENT.md` - Trending stack explanation - why Laravel 11 + Livewire 3 for cPanel
- `config/addons.php` - Central addon config - enable/disable
- `README.md` - Full project overview - addon architecture

---

## 🆘 Need Help?

1. Check `storage/logs/laravel.log` - most errors there
2. Run `php artisan addon:list` - verify addons
3. Run `php artisan route:list` - verify routes
4. Check cPanel → Errors → Error Log
5. Ensure PHP 8.2+, MySQL, permissions, document root public/

**Stack:** Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL + Addon Architecture - cPanel PHP Native - No Docker, No Redis, No Node Server in Production - Future Features as Addons Without Touching Core

**GitHub:** https://github.com/semizzywebmaster-netizen/ai-sport-betting1 - Fresh Laravel 11 + Addon Architecture - Old files cleared

**Live:** https://yourdomain.com - cPanel PHP hosting
