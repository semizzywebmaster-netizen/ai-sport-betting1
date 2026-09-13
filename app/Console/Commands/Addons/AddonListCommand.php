<?php

namespace App\Console\Commands\Addons;

use Illuminate\Console\Command;
use App\Addons\AddonManager;

class AddonListCommand extends Command
{
    protected $signature = 'addon:list';
    protected $description = 'List all addons - modular architecture';

    public function handle(AddonManager $manager)
    {
        $addons = $manager->all();
        
        $this->info("=== Punter Prediction Addons - Modular Architecture ===");
        $this->info("Laravel 11 + Livewire 3 + cPanel Compatible - Future features as addons");
        $this->newLine();

        $headers = ['Slug', 'Name', 'Version', 'Enabled', 'Category', 'Description'];
        $rows = [];

        foreach ($addons as $addon) {
            $rows[] = [
                $addon->slug,
                $addon->name,
                $addon->version,
                $addon->isEnabled() ? '✅ Yes' : '❌ No',
                $addon->manifest['category'] ?? 'core',
                substr($addon->description, 0, 50) . '...'
            ];
        }

        $this->table($headers, $rows);
        
        $this->newLine();
        $this->info("Total: " . count($addons) . " addons | Enabled: " . count($manager->enabled()));
        $this->info("Add new addon: php artisan addon:make {Name} - drop in addons/ folder");
        $this->info("Future features as addons without touching core - cPanel compatible");
        
        return 0;
    }
}
