<?php

namespace Addons\AIPredictions\Providers;

use App\Addons\BaseAddonServiceProvider;

class AddonServiceProvider extends BaseAddonServiceProvider
{
    protected function getAddonPath(): string { return base_path('addons/AIPredictions'); }
    
    protected function registerAddonServices(): void
    {
        // AI providers as addons - future: add new provider without touching core
        $this->app->bind(\App\Services\AI\AIProviderInterface::class, \App\Services\AI\OpenAIProvider::class);
    }
}
