<?php

namespace App\Console\Commands\Addons;

use Illuminate\Console\Command;
use App\Addons\AddonManager;

class AddonEnableCommand extends Command
{
    protected $signature = 'addon:enable {slug}';
    protected $description = 'Enable addon';

    public function handle(AddonManager $manager)
    {
        $slug = $this->argument('slug');
        
        try {
            if ($manager->enable($slug)) {
                $this->info("✅ Addon {$slug} enabled");
                $this->info("Run php artisan config:clear and php artisan route:clear");
                return 0;
            } else {
                $this->error("Addon {$slug} not found");
                return 1;
            }
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return 1;
        }
    }
}
