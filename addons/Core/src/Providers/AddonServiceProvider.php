<?php

namespace Addons\Core\Providers;

use App\Addons\BaseAddonServiceProvider;

class AddonServiceProvider extends BaseAddonServiceProvider
{
    protected function getAddonPath(): string
    {
        return base_path('addons/Core');
    }

    protected function registerAddonServices(): void
    {
        // Core services - always loaded
        $this->app->singleton(\App\Addons\AddonManager::class, function () {
            return new \App\Addons\AddonManager();
        });
    }

    protected function bootAddon(): void
    {
        // Core boot - share addons to all views - Blade
        view()->composer('*', function ($view) {
            $manager = app(\App\Addons\AddonManager::class);
            $view->with('enabledAddons', $manager->enabled());
        });
    }
}
