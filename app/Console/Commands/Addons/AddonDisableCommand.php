<?php

namespace App\Console\Commands\Addons;

use Illuminate\Console\Command;
use App\Addons\AddonManager;

class AddonDisableCommand extends Command
{
    protected $signature = 'addon:disable {slug}';
    protected $description = 'Disable addon';

    public function handle(AddonManager $manager)
    {
        $slug = $this->argument('slug');
        
        try {
            if ($manager->disable($slug)) {
                $this->info("✅ Addon {$slug} disabled");
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
