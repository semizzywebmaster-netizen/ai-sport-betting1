<?php

namespace App\Console\Commands\Addons;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class AddonMakeCommand extends Command
{
    protected $signature = 'addon:make {name} {--category=feature} {--description=}';
    protected $description = 'Create new addon - future features as addons';

    public function handle()
    {
        $name = $this->argument('name');
        $slug = strtolower(str_replace(' ', '-', $name));
        $studly = str($name)->studly();
        $category = $this->option('category');
        $description = $this->option('description') ?? "{$name} addon - modular - future feature as addon";

        $addonPath = base_path("addons/{$studly}");

        if (File::isDirectory($addonPath)) {
            $this->error("Addon {$studly} already exists at {$addonPath}");
            return 1;
        }

        $this->info("Creating addon: {$studly} ({$slug}) - modular architecture");

        // Create structure
        File::makeDirectory($addonPath, 0755, true);
        File::makeDirectory($addonPath . '/src/Providers', 0755, true);
        File::makeDirectory($addonPath . '/routes', 0755, true);
        File::makeDirectory($addonPath . '/config', 0755, true);
        File::makeDirectory($addonPath . '/database/migrations', 0755, true);
        File::makeDirectory($addonPath . '/resources/views', 0755, true);
        File::makeDirectory($addonPath . '/src/Models', 0755, true);
        File::makeDirectory($addonPath . '/src/Controllers', 0755, true);

        // addon.json
        $manifest = [
            'name' => $name,
            'slug' => $slug,
            'version' => '1.0.0',
            'description' => $description,
            'enabled' => true,
            'provider' => "Addons\\{$studly}\\Providers\\AddonServiceProvider",
            'dependencies' => ['core'],
            'category' => $category,
            'author' => 'Punter Prediction',
            'created_at' => now()->toISOString(),
            'future_extensions' => ["Add more {$name} features as separate addons without touching core"]
        ];

        File::put($addonPath . '/addon.json', json_encode($manifest, JSON_PRETTY_PRINT));

        // ServiceProvider
        $providerContent = <<<PHP
<?php

namespace Addons\\{$studly}\\Providers;

use App\\Addons\\BaseAddonServiceProvider;

class AddonServiceProvider extends BaseAddonServiceProvider
{
    protected function getAddonPath(): string
    {
        return base_path('addons/{$studly}');
    }

    protected function registerAddonServices(): void
    {
        // Register {$name} services - future features as addons
    }

    protected function bootAddon(): void
    {
        // Boot {$name} addon
    }
}
PHP;

        File::put($addonPath . '/src/Providers/AddonServiceProvider.php', $providerContent);

        // Routes
        File::put($addonPath . '/routes/web.php', "<?php\n\n// {$name} Addon Routes - Modular\n// Future features as addons without touching core\n");

        // Config
        File::put($addonPath . "/config/{$slug}.php", "<?php\n\nreturn [\n    'enabled' => true,\n    'addon' => '{$slug}',\n    'version' => '1.0.0',\n    'modular' => true,\n];\n");

        $this->info("✅ Addon created: {$addonPath}");
        $this->info("📁 Structure: addon.json, Providers, routes, config, migrations, views, Models, Controllers");
        $this->info("🔌 Enable/disable via config/addons.php or addon.json enabled flag");
        $this->info("🚀 Future features as addons without touching core - cPanel compatible");
        $this->info("📝 Edit addon.json to add dependencies, features, description");

        return 0;
    }
}
