<?php

namespace App\Addons;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Cache;

/**
 * Addon Manager - Trending Modular Architecture for Laravel 11 + cPanel
 * Future features as addons - plug and play without touching core
 * cPanel Compatible: No Redis, file cache, database
 */
class AddonManager
{
    protected string $addonsPath;
    protected array $addons = [];

    public function __construct()
    {
        $this->addonsPath = base_path('addons');
    }

    /**
     * Discover all addons - scans addons/ folder
     */
    public function discover(): array
    {
        if (!File::isDirectory($this->addonsPath)) {
            return [];
        }

        $addons = [];
        $directories = File::directories($this->addonsPath);

        foreach ($directories as $directory) {
            try {
                $addon = new Addon($directory);
                $addons[$addon->slug] = $addon;
            } catch (\Exception $e) {
                // Skip invalid addons, log for cPanel debugging
                \Log::warning("Invalid addon at {$directory}: " . $e->getMessage());
            }
        }

        // Sort by dependencies - core first
        uasort($addons, function ($a, $b) {
            if ($a->slug === 'core') return -1;
            if ($b->slug === 'core') return 1;
            return strcmp($a->slug, $b->slug);
        });

        $this->addons = $addons;
        return $addons;
    }

    /**
     * Get all addons
     */
    public function all(): array
    {
        if (empty($this->addons)) {
            return $this->discover();
        }
        return $this->addons;
    }

    /**
     * Get enabled addons only
     */
    public function enabled(): array
    {
        return array_filter($this->all(), fn($addon) => $addon->isEnabled());
    }

    /**
     * Get addon by slug
     */
    public function get(string $slug): ?Addon
    {
        $addons = $this->all();
        return $addons[$slug] ?? null;
    }

    /**
     * Check if addon is enabled
     */
    public function isEnabled(string $slug): bool
    {
        $addon = $this->get($slug);
        return $addon ? $addon->isEnabled() : false;
    }

    /**
     * Register all enabled addon service providers
     */
    public function registerProviders(): void
    {
        foreach ($this->enabled() as $addon) {
            $provider = $addon->getProviderClass();
            if ($provider && class_exists($provider)) {
                app()->register($provider);
            }
        }
    }

    /**
     * Get addon routes - for RouteServiceProvider
     */
    public function getRoutes(string $type = 'web'): array
    {
        $routes = [];
        foreach ($this->enabled() as $addon) {
            $routeFile = $addon->path . "/routes/{$type}.php";
            if (File::exists($routeFile)) {
                $routes[$addon->slug] = $routeFile;
            }
        }
        return $routes;
    }

    /**
     * Get addon migrations paths
     */
    public function getMigrationPaths(): array
    {
        $paths = [];
        foreach ($this->enabled() as $addon) {
            if ($addon->hasMigrations()) {
                $paths[] = $addon->path . '/database/migrations';
            }
        }
        return $paths;
    }

    /**
     * Enable addon
     */
    public function enable(string $slug): bool
    {
        $addon = $this->get($slug);
        if (!$addon) return false;
        
        $manifestPath = $addon->path . '/addon.json';
        $manifest = json_decode(File::get($manifestPath), true);
        $manifest['enabled'] = true;
        File::put($manifestPath, json_encode($manifest, JSON_PRETTY_PRINT));
        
        $this->addons = []; // Clear cache
        return true;
    }

    /**
     * Disable addon
     */
    public function disable(string $slug): bool
    {
        if ($slug === 'core') {
            throw new \Exception("Cannot disable Core addon");
        }
        
        $addon = $this->get($slug);
        if (!$addon) return false;
        
        $manifestPath = $addon->path . '/addon.json';
        $manifest = json_decode(File::get($manifestPath), true);
        $manifest['enabled'] = false;
        File::put($manifestPath, json_encode($manifest, JSON_PRETTY_PRINT));
        
        $this->addons = [];
        return true;
    }
}
