# Addon Architecture - Future Features as Addons - Laravel 11 + cPanel

## 🎯 Concept - Modular - No Core Touch

**Problem:** Traditional Laravel apps require touching core to add features - not scalable.

**Solution:** Addon Architecture - Each feature as independent addon in `addons/` folder - plug and play.

### Trending for cPanel 2026

- **Laravel Modules** pattern but lightweight custom (no heavy dependency)
- **cPanel compatible:** File scanning, file cache, no Redis
- **Future-proof:** Add tennis, cricket, crypto payments, Gemini AI, live streaming as addons without touching core

## 📁 Addon Structure

```
addons/
├── Core/ - Required - Laravel 11 + Livewire 3 + Base
│   ├── addon.json - manifest
│   ├── src/Providers/AddonServiceProvider.php
│   ├── config/core.php
│   └── routes/ (core routes)
├── Football/ - Sport addon
│   ├── addon.json - {name, slug, version, enabled, dependencies, category, icon}
│   ├── src/Providers/AddonServiceProvider.php - extends BaseAddonServiceProvider
│   ├── routes/web.php - /football/*
│   ├── config/football.php - leagues as config (future leagues without code)
│   ├── database/migrations/ - addon-specific migrations
│   └── resources/views/ - addon views (optional, or use main views)
├── Basketball/ - Equal treatment as addon
├── AIPredictions/ - AI addon
├── BetBuilder/ - Feature addon
├── Wallet/ - Separate ledgers as addon
├── Payments/ - Paystack/Flutterwave as addon
├── Community/ - Community as addon
├── Referrals/ - Referrals as addon
├── Subscriptions/ - Subscriptions as addon
├── WhatsApp/ - WhatsApp as addon
├── Notifications/ - Notifications as addon
├── Gamification/ - XP, levels as addon
├── Analytics/ - Analytics as addon
└── Future/ - Just drop new addon folder!
    ├── Tennis/ - php artisan addon:make Tennis --category=sports
    ├── Cricket/ - php artisan addon:make Cricket
    ├── AIGemini/ - php artisan addon:make AIGemini --category=ai
    ├── PaymentsCrypto/ - php artisan addon:make PaymentsCrypto --category=payments
    └── LiveStreaming/ - php artisan addon:make LiveStreaming
```

### addon.json Manifest - Every Addon

```json
{
    "name": "Tennis",
    "slug": "tennis",
    "version": "1.0.0",
    "description": "Tennis sport addon - dynamic leagues as config",
    "enabled": true,
    "provider": "Addons\\Tennis\\Providers\\AddonServiceProvider",
    "dependencies": ["core"],
    "category": "sports",
    "icon": "🎾",
    "color": "green",
    "features": ["leagues", "fixtures", "odds"],
    "future_addons": ["Add more leagues via config"]
}
```

## 🔌 How It Works - AddonManager

### Discovery - Scans addons/ folder

```php
// App\Addons\AddonManager
public function discover(): array
{
    $directories = File::directories(base_path('addons'));
    foreach ($directories as $directory) {
        $addon = new Addon($directory); // Reads addon.json
        $addons[$addon->slug] = $addon;
    }
    return $addons; // Sorted: core first
}
```

### Registration - Auto-register providers

```php
// App\Providers\AppServiceProvider
public function register()
{
    $this->app->singleton(AddonManager::class, fn() => new AddonManager());
    
    $manager = new AddonManager();
    foreach ($manager->enabled() as $addon) {
        $provider = $addon->getProviderClass();
        if ($provider && class_exists($provider)) {
            $this->app->register($provider); // Auto-register addon provider
        }
    }
}
```

### BaseAddonServiceProvider - All addons extend

```php
abstract class BaseAddonServiceProvider extends ServiceProvider
{
    public function register() { /* config, services */ }
    public function boot() {
        $this->loadMigrationsFrom($addonPath . '/database/migrations');
        $this->loadViewsFrom($addonPath . '/resources/views', $slug);
    }
}
```

## 🚀 Adding Future Features as Addons - No Core Touch

### Method 1: Artisan Command (Trending)

```bash
php artisan addon:make Tennis --category=sports
php artisan addon:make AIGemini --category=ai --description="Google Gemini AI provider as addon"
php artisan addon:make PaymentsCrypto --category=payments
php artisan addon:make LiveStreaming --category=feature

# Creates:
# addons/Tennis/addon.json
# addons/Tennis/src/Providers/AddonServiceProvider.php
# addons/Tennis/routes/web.php
# addons/Tennis/config/tennis.php
# addons/Tennis/database/migrations/
# addons/Tennis/resources/views/
```

### Method 2: Manual Drop

```bash
mkdir -p addons/YourAddon/src/Providers addons/YourAddon/routes
# Create addon.json, Provider, routes, config
# Auto-discovers on next request - no core edit
```

### Enable/Disable - cPanel Friendly

```bash
# Via artisan
php artisan addon:enable tennis
php artisan addon:disable tennis
php artisan addon:list

# Via config/addons.php
'tennis' => ['enabled' => false]

# Via addon.json
{"enabled": false}
```

## 🎾 Examples - Future Features as Addons

### New Sport: Tennis as Addon

```bash
php artisan addon:make Tennis --category=sports
# Edit addons/Tennis/config/tennis.php - add leagues as config
# No core change - Football and Basketball remain untouched
```

### New AI Provider: Gemini as Addon

```bash
php artisan addon:make AIGemini --category=ai
# Addons/AIGemini/src/Services/GeminiProvider.php implements AIProviderInterface
# Register in AIGemini provider
# Existing OpenAI, Anthropic, Groq remain - new provider as addon
```

### New Payment: Crypto as Addon

```bash
php artisan addon:make PaymentsCrypto --category=payments
# Addons/PaymentsCrypto/src/Services/CryptoService.php
# Routes: /payments/crypto/initialize
# Wallet addon already has separate ledgers - crypto uses same
```

### New Feature: Live Streaming as Addon

```bash
php artisan addon:make LiveStreaming --category=feature
# Addons/LiveStreaming/resources/views/live.blade.php
# Routes: /live/{fixtureId}
# No core touch - just new addon
```

## 🔧 Config - Central Addon Control

```php
// config/addons.php
return [
    'core' => ['enabled' => true, 'is_core' => true],
    'football' => ['enabled' => true],
    'basketball' => ['enabled' => true],
    'ai-predictions' => ['enabled' => true],
    'tennis' => ['enabled' => false], // Future - just add here
    'cricket' => ['enabled' => false],
    'ai-gemini' => ['enabled' => false],
    'payments-crypto' => ['enabled' => false],
];
```

## 📊 Benefits - Why Addon Architecture Trending

| Traditional Laravel | Addon Architecture |
|---------------------|--------------------|
| Touch core to add feature | Drop addon in addons/ - no core touch |
| Merge conflicts | Isolated addons |
| Hard to disable | Enable/disable via config |
| Monolithic | Modular - 13+ addons now, 100+ future possible |
| cPanel: same | cPanel: file scanning, file cache, no Redis - compatible |

## 🎯 Current Addons - 13 Modular

- Core (required)
- Football (sport)
- Basketball (sport - equal)
- AIPredictions (AI with fallback)
- BetBuilder (Alpine + Livewire)
- Wallet (separate ledgers)
- Payments (Paystack/Flutterwave - server verification)
- Community (posts, leaderboard)
- Referrals (referrals)
- Subscriptions (subscriptions)
- WhatsApp (WhatsApp)
- Notifications (notifications)
- Gamification (XP, levels)
- Analytics (analytics)

**Future:** Tennis, Cricket, Esports, AIGemini, AIAnthropic, PaymentsCrypto, PaymentsPayPal, WalletCrypto, LiveStreaming, etc - all as addons without touching core.

## 🔞 cPanel Compatible

- No Redis - file cache for addon discovery
- No Docker - PHP native
- File scanning - `File::directories(base_path('addons'))`
- Config override - `config/addons.php` or `addon.json`
- Blade views - `resources/views/` or `addons/{addon}/resources/views/`

## 📝 Documentation for Addon Developers

Each addon can have its own README.md in addon folder.

Future: `addons/Tennis/README.md` - how to add leagues via config.

---

**Status:** Modular - Future features as addons without touching core - Laravel 11 + Livewire 3 + cPanel Ready
