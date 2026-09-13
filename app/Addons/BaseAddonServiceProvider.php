<?php

namespace App\Addons;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;

/**
 * Base Addon Service Provider - All addons extend this
 * Trending: Modular Laravel 11 + cPanel compatible
 */
abstract class BaseAddonServiceProvider extends ServiceProvider
{
    protected string $addonSlug;
    protected string $addonPath;

    public function __construct($app)
    {
        parent::__construct($app);
        $this->addonPath = $this->getAddonPath();
        $this->addonSlug = basename($this->addonPath);
    }

    abstract protected function getAddonPath(): string;

    public function register(): void
    {
        // Register addon config - cPanel file driver
        $configPath = $this->addonPath . '/config/' . $this->addonSlug . '.php';
        if (File::exists($configPath)) {
            $this->mergeConfigFrom($configPath, $this->addonSlug);
        }

        // Register addon services - to be overridden
        $this->registerAddonServices();
    }

    public function boot(): void
    {
        // Load migrations - cPanel MySQL
        $migrationPath = $this->addonPath . '/database/migrations';
        if (File::isDirectory($migrationPath)) {
            $this->loadMigrationsFrom($migrationPath);
        }

        // Load views - Blade not HTML
        $viewPath = $this->addonPath . '/resources/views';
        if (File::isDirectory($viewPath)) {
            $this->loadViewsFrom($viewPath, $this->addonSlug);
        }

        // Load translations
        $langPath = $this->addonPath . '/resources/lang';
        if (File::isDirectory($langPath)) {
            $this->loadTranslationsFrom($langPath, $this->addonSlug);
        }

        // Publish assets - for cPanel Vite build
        $this->publishAddonAssets();

        // Boot addon - to be overridden
        $this->bootAddon();
    }

    protected function registerAddonServices(): void
    {
        // Override in child
    }

    protected function bootAddon(): void
    {
        // Override in child
    }

    protected function publishAddonAssets(): void
    {
        // Config
        $configPath = $this->addonPath . '/config/' . $this->addonSlug . '.php';
        if (File::exists($configPath)) {
            $this->publishes([
                $configPath => config_path($this->addonSlug . '.php')
            ], $this->addonSlug . '-config');
        }

        // Views
        $viewPath = $this->addonPath . '/resources/views';
        if (File::isDirectory($viewPath)) {
            $this->publishes([
                $viewPath => resource_path('views/vendor/' . $this->addonSlug)
            ], $this->addonSlug . '-views');
        }
    }

    protected function getAddonPath(): string
    {
        // Default: guess from provider namespace - Addons\Football\Providers\AddonServiceProvider -> addons/Football
        $reflection = new \ReflectionClass($this);
        $file = $reflection->getFileName();
        // Go up 3 levels: src/Providers/AddonServiceProvider.php -> addon root
        return dirname($file, 3);
    }
}
