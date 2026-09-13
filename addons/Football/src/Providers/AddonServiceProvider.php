<?php

namespace Addons\Football\Providers;

use App\Addons\BaseAddonServiceProvider;

class AddonServiceProvider extends BaseAddonServiceProvider
{
    protected function getAddonPath(): string
    {
        return base_path('addons/Football');
    }

    protected function registerAddonServices(): void
    {
        // Football services - can be extended by future addons
        $this->app->bind(\App\Services\Sports\FootballProviderInterface::class, \App\Services\Sports\ApiSportsProvider::class);
    }

    protected function bootAddon(): void
    {
        // Football-specific boot - add Blade components
    }
}
