<?php

namespace Addons\Community\Providers;

use App\Addons\BaseAddonServiceProvider;

class AddonServiceProvider extends BaseAddonServiceProvider
{
    protected function getAddonPath(): string { return base_path('addons/Community'); }
}
