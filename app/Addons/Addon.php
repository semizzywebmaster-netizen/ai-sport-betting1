<?php

namespace App\Addons;

use Illuminate\Support\Facades\File;

class Addon
{
    public string $name;
    public string $slug;
    public string $version;
    public string $description;
    public bool $enabled;
    public array $dependencies;
    public string $provider;
    public string $path;
    public array $manifest;

    public function __construct(string $path)
    {
        $this->path = $path;
        $manifestPath = $path . '/addon.json';
        
        if (!File::exists($manifestPath)) {
            throw new \Exception("Addon manifest not found: {$manifestPath}");
        }

        $this->manifest = json_decode(File::get($manifestPath), true);
        
        $this->name = $this->manifest['name'] ?? basename($path);
        $this->slug = $this->manifest['slug'] ?? strtolower($this->name);
        $this->version = $this->manifest['version'] ?? '1.0.0';
        $this->description = $this->manifest['description'] ?? '';
        $this->enabled = $this->manifest['enabled'] ?? true;
        $this->dependencies = $this->manifest['dependencies'] ?? [];
        $this->provider = $this->manifest['provider'] ?? '';
    }

    public function isEnabled(): bool
    {
        // Check config override - cPanel friendly
        $configEnabled = config("addons.{$this->slug}.enabled");
        if ($configEnabled !== null) {
            return (bool) $configEnabled;
        }
        return $this->enabled;
    }

    public function getProviderClass(): ?string
    {
        if ($this->provider) {
            return $this->provider;
        }
        // Auto-detect: Addons\{Name}\Providers\AddonServiceProvider
        $studly = str($this->slug)->studly();
        $candidate = "Addons\\{$studly}\\Providers\\AddonServiceProvider";
        if (class_exists($candidate)) {
            return $candidate;
        }
        return null;
    }

    public function hasRoutes(): bool
    {
        return File::exists($this->path . '/routes/web.php') || File::exists($this->path . '/routes/api.php');
    }

    public function hasMigrations(): bool
    {
        return File::isDirectory($this->path . '/database/migrations');
    }

    public function hasViews(): bool
    {
        return File::isDirectory($this->path . '/resources/views');
    }
}
