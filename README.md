# Punter Prediction - Laravel 11 + Livewire 3 + Addon Architecture - Future Features as Addons - cPanel PHP Native

## 🎯 Modular Architecture - Future Features as Addons Without Touching Core

**Trending 2026:** Addon Architecture - Each feature as independent addon in `addons/` folder - plug and play - no core modification needed for future features.

### 🔌 Addon System - 13 Addons Now, 100+ Future Possible

```
/home/user/addons/
├── Core/ - Required - Laravel 11 + Livewire 3 + Base (always enabled)
├── Football/ - Sport addon - Dynamic leagues as config - future leagues without code
├── Basketball/ - Sport addon - Equal first-class as Football - same AI engine
├── AIPredictions/ - AI addon - OpenAI + Anthropic + Groq fallback - future providers as addons
├── BetBuilder/ - Feature addon - Alpine 3 + Livewire 3 - strategies, target odds
├── Wallet/ - Wallet addon - Separate cash & credits ledger - future currencies as addons
├── Payments/ - Payments addon - Paystack/Flutterwave PHP SDK - future gateways as addons
├── Community/ - Community addon - posts, leaderboard - future community features as addons
├── Referrals/ - Referrals addon
├── Subscriptions/ - Subscriptions addon
├── WhatsApp/ - WhatsApp addon
├── Notifications/ - Notifications addon - future channels as addons
├── Gamification/ - XP, levels, streaks as addon
├── Analytics/ - Analytics as addon
└── Future Addons - Just drop in addons/ folder - No core touch!
    ├── Tennis/ - php artisan addon:make Tennis --category=sports
    ├── Cricket/ - php artisan addon:make Cricket
    ├── Esports/ - php artisan addon:make Esports
    ├── AIGemini/ - php artisan addon:make AIGemini --category=ai
    ├── AIAnthropic/ - php artisan addon:make AIAnthropic --category=ai
    ├── PaymentsCrypto/ - php artisan addon:make PaymentsCrypto --category=payments
    ├── PaymentsPayPal/ - php artisan addon:make PaymentsPayPal
    ├── WalletCrypto/ - php artisan addon:make WalletCrypto
    ├── LiveStreaming/ - php artisan addon:make LiveStreaming --category=feature
    └── YourCustomAddon/ - php artisan addon:make YourAddon
```

### 🚀 How to Add Future Features as Addons - No Core Touch (Trending)

#### Method 1: Artisan Command (Recommended - Trending)

```bash
# New sport as addon - no core change
php artisan addon:make Tennis --category=sports
php artisan addon:make Cricket --category=sports
php artisan addon:make Esports --category=sports

# New AI provider as addon - no core change
php artisan addon:make AIGemini --category=ai --description="Google Gemini AI provider as addon"
php artisan addon:make AIAnthropic --category=ai
php artisan addon:make AICustomModel --category=ai

# New payment gateway as addon
php artisan addon:make PaymentsCrypto --category=payments
php artisan addon:make PaymentsPayPal --category=payments
php artisan addon:make PaymentsBankTransfer --category=payments

# New feature as addon
php artisan addon:make LiveStreaming --category=feature
php artisan addon:make VirtualSports --category=feature
php artisan addon:make Casino --category=feature

# Creates:
# addons/Tennis/addon.json (manifest)
# addons/Tennis/src/Providers/AddonServiceProvider.php (extends BaseAddonServiceProvider)
# addons/Tennis/routes/web.php + api.php
# addons/Tennis/config/tennis.php
# addons/Tennis/database/migrations/
# addons/Tennis/resources/views/
# addons/Tennis/src/Models/, Controllers, Services
```

#### Method 2: Manual Drop - Auto-Discovery

```bash
mkdir -p addons/YourAddon/src/Providers addons/YourAddon/routes
# Create addon.json + Provider + routes + config
# AddonManager auto-discovers on next request - no core edit needed
```

#### Enable/Disable Addons - cPanel Friendly

```bash
# Via artisan - file based, no Redis
php artisan addon:list
php artisan addon:enable tennis
php artisan addon:disable tennis

# Via config/addons.php
'tennis' => ['enabled' => true]

# Via addon.json
{"enabled": true}
```

### 📁 Addon Structure - Every Addon

```
addons/YourAddon/
├── addon.json - Manifest: name, slug, version, enabled, dependencies, category, icon
├── src/
│   ├── Providers/
│   │   └── AddonServiceProvider.php - extends BaseAddonServiceProvider
│   ├── Models/ - Addon-specific models
│   ├── Controllers/ - Addon controllers
│   ├── Services/ - Addon services
│   └── Livewire/ - Livewire 3 components (optional)
├── routes/
│   ├── web.php - Addon web routes
│   └── api.php - Addon API routes
├── config/
│   └── youraddon.php - Addon config - leagues as config, not hard-coded
├── database/
│   └── migrations/ - Addon migrations - MySQL cPanel native
├── resources/
│   ├── views/ - Addon Blade views - not HTML
│   └── lang/ - Translations (optional)
└── README.md - Addon docs (optional)
```

### addon.json - Manifest Example

```json
{
    "name": "Tennis",
    "slug": "tennis",
    "version": "1.0.0",
    "description": "Tennis sport addon - dynamic leagues as config - future leagues without code",
    "enabled": true,
    "provider": "Addons\\Tennis\\Providers\\AddonServiceProvider",
    "dependencies": ["core"],
    "category": "sports",
    "icon": "🎾",
    "color": "green",
    "features": ["leagues", "fixtures", "odds", "predictions"],
    "future_addons": [
        "Add more leagues via config without code change",
        "Custom tennis markets as separate addon"
    ]
}
```

### 🔧 Core Addon System - How It Works

#### AddonManager - Scans addons/ folder

```php
// App\Addons\AddonManager - cPanel compatible: File::directories, file cache, no Redis
public function discover(): array
{
    $directories = File::directories(base_path('addons')); // Scans addons/
    foreach ($directories as $dir) {
        $addon = new Addon($dir); // Reads addon.json
        $addons[$addon->slug] = $addon;
    }
    return $addons; // Sorted: core first
}

public function enabled(): array
{
    return array_filter($this->all(), fn($a) => $a->isEnabled()); // Check config/addons.php + addon.json
}
```

#### BaseAddonServiceProvider - All addons extend

```php
abstract class BaseAddonServiceProvider extends ServiceProvider
{
    public function register() {
        $this->mergeConfigFrom($addonPath . '/config/slug.php', $slug);
        $this->registerAddonServices(); // Override
    }
    public function boot() {
        $this->loadMigrationsFrom($addonPath . '/database/migrations'); // MySQL cPanel
        $this->loadViewsFrom($addonPath . '/resources/views', $slug); // Blade not HTML
        $this->bootAddon(); // Override
    }
}
```

#### AppServiceProvider - Auto-register addon providers

```php
public function register()
{
    $this->app->singleton(AddonManager::class, fn() => new AddonManager());
    
    $manager = new AddonManager();
    foreach ($manager->enabled() as $addon) {
        $provider = $addon->getProviderClass(); // Addons\Football\Providers\AddonServiceProvider
        if ($provider && class_exists($provider)) {
            $this->app->register($provider); // Auto-register
        }
    }
}
```

### 🎾 Examples - Future Features as Addons

#### Example 1: New Sport - Tennis as Addon (No Core Touch)

```bash
php artisan addon:make Tennis --category=sports

# Edit addons/Tennis/config/tennis.php
'leagues' => [
    'atp' => ['name' => 'ATP', 'enabled' => true],
    'wta' => ['name' => 'WTA', 'enabled' => true],
    // Add more leagues via config - no code change
]

# Routes auto-loaded: /tennis, /tennis/leagues, /tennis/fixtures
# Football and Basketball addons untouched - equal treatment maintained
```

#### Example 2: New AI Provider - Gemini as Addon

```bash
php artisan addon:make AIGemini --category=ai

# Addons/AIGemini/src/Services/GeminiProvider.php
class GeminiProvider implements AIProviderInterface {
    public function predict(array $data): array { /* Gemini API */ }
}

# Addons/AIGemini/src/Providers/AddonServiceProvider.php
$this->app->bind(AIProviderInterface::class, GeminiProvider::class); // Or fallback chain

# Existing OpenAI, Anthropic, Groq remain - new provider as addon
```

#### Example 3: New Payment Gateway - Crypto as Addon

```bash
php artisan addon:make PaymentsCrypto --category=payments

# Addons/PaymentsCrypto/src/Services/CryptoService.php
# Routes: /payments/crypto/initialize, /payments/crypto/verify
# Wallet addon already has separate ledgers - crypto uses same
# No core touch - just new addon
```

#### Example 4: New Feature - Live Streaming as Addon

```bash
php artisan addon:make LiveStreaming --category=feature

# Addons/LiveStreaming/resources/views/live.blade.php - Blade
# Routes: /live/{fixtureId}
# No core touch - just new addon
```

### 📊 Benefits - Why Addon Architecture Trending 2026

| Traditional Laravel (Monolithic) | Addon Architecture (Modular) |
|----------------------------------|------------------------------|
| Touch core to add feature - merge conflicts | Drop addon in addons/ - no core touch - isolated |
| Hard to disable feature | Enable/disable via config/addons.php or addon.json |
| Monolithic - hard to scale | Modular - 13 addons now, 100+ future possible |
| All features in core | Core minimal - features as addons |
| cPanel: same | cPanel: file scanning, file cache, no Redis - compatible |

### 🔷 Current Addons - 13 Modular - cPanel Ready

| Addon | Slug | Category | Description | Future Extensions |
|-------|------|----------|-------------|-------------------|
| Core | core | core | Laravel 11 + Livewire 3 + Base - Required | - |
| Football | football | sports | Dynamic leagues as config, fixtures, teams, odds, Livewire search | More leagues via config, custom markets as addon, FootballAI as addon |
| Basketball | basketball | sports | Equal first-class as Football - NBA, EuroLeague | More leagues via config, BasketballAI as addon |
| AI Predictions | ai-predictions | ai | OpenAI + Anthropic + Groq fallback, confidence, risk, reasoning | New providers as addons: AIGemini, AIAnthropic, custom models |
| Bet Builder | betbuilder | feature | Alpine 3 + Livewire 3, strategies, target odds, duplicate detection | More strategies as addon, BetBuilderPro as addon |
| Wallet | wallet | finance | Separate cash & credits ledger - MySQL | New currencies as addons: WalletUSD, WalletCrypto, WalletBonus |
| Payments | payments | payments | Paystack/Flutterwave PHP SDK - server verification only | New gateways as addons: PaymentsCrypto, PaymentsPayPal, PaymentsBank |
| Community | community | social | Posts, likes, follows, leaderboard | CommunityPro as addon, more social features |
| Referrals | referrals | marketing | Referral system | ReferralPro as addon |
| Subscriptions | subscriptions | finance | Subscription plans | More plans as addon |
| WhatsApp | whatsapp | communication | WhatsApp bot | WhatsAppPro as addon |
| Notifications | notifications | communication | Email, SMS, WhatsApp, in-app | New channels as addons: NotificationsPush, NotificationsTelegram |
| Gamification | gamification | engagement | XP, levels, streaks | GamificationPro as addon |
| Analytics | analytics | admin | Analytics | AnalyticsPro as addon |

### 🔧 Config - Central Addon Control - cPanel File Driver

```php
// config/addons.php - cPanel compatible - file cache, no Redis
return [
    'core' => ['enabled' => true, 'is_core' => true],
    'football' => ['enabled' => true],
    'basketball' => ['enabled' => true],
    'ai-predictions' => ['enabled' => true],
    'betbuilder' => ['enabled' => true],
    'wallet' => ['enabled' => true],
    'payments' => ['enabled' => true],
    // Future addons - just add here, drop folder in addons/
    'tennis' => ['enabled' => false, 'description' => 'Tennis sport as addon - drop addons/Tennis'],
    'cricket' => ['enabled' => false],
    'ai-gemini' => ['enabled' => false, 'description' => 'Gemini AI provider as addon'],
    'payments-crypto' => ['enabled' => false],
    'live-streaming' => ['enabled' => false],
];
```

### 🚀 cPanel Deployment - Addon Architecture - Same as Before

```bash
git clone https://github.com/semizzywebmaster-netizen/ai-sport-betting1.git
composer install --no-dev --optimize-autoloader
npm install && npm run build # Vite 5 → public/build static
cp .env.example .env # MySQL, file cache, database queue - no Redis
php artisan key:generate
php artisan migrate --force # Core + enabled addons migrations auto-loaded
php artisan addon:list # List all addons
php artisan config:cache && php artisan route:cache && php artisan view:cache
# Document root: public_html/public
# Cron: * * * * * php artisan schedule:run
```

### 📝 Artisan Commands - Addon Management

```bash
php artisan addon:list # List all addons - total, enabled, disabled
php artisan addon:make {Name} --category={category} --description="{desc}" # Create new addon
php artisan addon:enable {slug} # Enable addon
php artisan addon:disable {slug} # Disable addon (not core)
```

### 🎯 Production Health - Addon Architecture

- **Total Addons:** 13 now (Core, Football, Basketball, AIPredictions, BetBuilder, Wallet, Payments, Community, Referrals, Subscriptions, WhatsApp, Notifications, Gamification, Analytics)
- **Enabled:** 13 (all enabled by default)
- **Future:** 100+ possible - Tennis, Cricket, Esports, AIGemini, PaymentsCrypto, LiveStreaming, etc as addons without touching core
- **Modular:** Each addon isolated - no core touch for future features
- **cPanel Compatible:** File scanning, file cache, no Redis, no Docker, PHP 8.2+ native
- **Blade Not HTML:** 56 Blade templates + addon views - not .html files
- **Trending:** Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + Addon Architecture - trending 2026 for cPanel

### 🔞 Responsible Betting - 18+

All Blade templates + addons include: "Analytical estimates based on AI analysis, not guarantees. Never bet more than you can afford to lose. 18+ only. Laravel Blade templates, not .html files. Addon architecture - future features as addons."

### 📚 Documentation

- `docs/ADDON_ARCHITECTURE.md` - Full addon architecture guide - how to add future features as addons
- `docs/CPANEL_DEPLOYMENT.md` - cPanel deployment with addon system
- `config/addons.php` - Central addon config
- `app/Addons/AddonManager.php` - Addon discovery, enable/disable
- `app/Addons/BaseAddonServiceProvider.php` - Base for all addons

### 🌍 Live & GitHub

- **Live:** https://punterprediction.com (cPanel PHP hosting - Laravel 11 + Addon Architecture)
- **GitHub:** https://github.com/semizzywebmaster-netizen/ai-sport-betting1 (addon architecture - modular)

**Stack:** Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL + Sanctum + Paystack/Flutterwave PHP SDK + Addon Architecture - Trending 2026 for cPanel - Future Features as Addons Without Touching Core
