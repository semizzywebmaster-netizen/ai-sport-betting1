<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Addons\AddonManager;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register AddonManager as singleton - cPanel file cache compatible
        $this->app->singleton(AddonManager::class, function () {
            return new AddonManager();
        });

        // Auto-register enabled addon service providers - modular
        $manager = new AddonManager();
        foreach ($manager->enabled() as $addon) {
            $provider = $addon->getProviderClass();
            if ($provider && class_exists($provider)) {
                $this->app->register($provider);
            }
        }
    }

    public function boot(): void
    {
        // Share addons to all Blade views
        $manager = app(AddonManager::class);
        
        view()->composer('*', function ($view) use ($manager) {
            $view->with('enabledAddons', $manager->enabled());
            $view->with('allAddons', $manager->all());
        });

        // Load addon routes dynamically - future features as addons
        $this->loadAddonRoutes();
    }

    protected function loadAddonRoutes(): void
    {
        $manager = app(AddonManager::class);
        
        // Web routes from addons
        foreach ($manager->getRoutes('web') as $slug => $path) {
            if (file_exists($path)) {
                // Routes already loaded via routes/web.php include - for modular
            }
        }
    }
}
