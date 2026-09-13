@extends('layouts.app')
@section('title', 'Addons Manager - Modular Architecture - Laravel 11')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">🔌 Addons Manager - Future Features as Addons</h1>
    <p class="text-gray-600 mb-8">Laravel 11 + Addon Architecture - Modular - cPanel compatible - Add new features without touching core</p>
    
    <div class="grid md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">{{ count($addons) }}</div><div class="text-sm text-gray-600">Total Addons</div></div>
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold text-green-600">{{ count($enabled) }}</div><div class="text-sm text-gray-600">Enabled</div></div>
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">{{ count($addons) - count($enabled) }}</div><div class="text-sm text-gray-600">Disabled</div></div>
        <div class="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6"><div class="text-2xl font-bold">Modular</div><div class="text-sm">Future as Addons</div></div>
    </div>

    <div class="bg-white rounded-xl border overflow-hidden">
        <div class="p-6 border-b">
            <h2 class="font-bold">Installed Addons - Drop new addon in addons/ folder</h2>
            <p class="text-sm text-gray-600 mt-1">Each addon: addon.json + Providers + routes + config + migrations + views - No core touch needed</p>
        </div>
        <div class="divide-y">
            @foreach($addons as $addon)
            <div class="p-6 flex items-start justify-between">
                <div class="flex gap-4">
                    <div class="h-12 w-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center text-xl">{{ $addon->manifest['icon'] ?? '🔌' }}</div>
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="font-bold">{{ $addon->name }}</h3>
                            <span class="px-2 py-1 text-xs rounded-full {{ $addon->isEnabled() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600' }}">{{ $addon->isEnabled() ? 'Enabled' : 'Disabled' }}</span>
                            <span class="px-2 py-1 text-xs bg-gray-100 rounded">{{ $addon->version }}</span>
                            <span class="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">{{ $addon->manifest['category'] ?? 'core' }}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">{{ $addon->description }}</p>
                        <div class="flex gap-2 mt-2 text-xs">
                            <span>Slug: {{ $addon->slug }}</span>
                            <span>•</span>
                            <span>Deps: {{ implode(', ', $addon->dependencies) ?: 'none' }}</span>
                            @if(isset($addon->manifest['future_addons']))
                            <span>•</span>
                            <span class="text-purple-600">Future: {{ count($addon->manifest['future_addons']) }} extensions</span>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="flex gap-2">
                    @if($addon->slug !== 'core')
                    <form method="POST" action="#" class="inline">
                        <button class="px-3 py-1 text-xs border rounded-lg {{ $addon->isEnabled() ? 'hover:bg-red-50 text-red-600' : 'hover:bg-green-50 text-green-600' }}">{{ $addon->isEnabled() ? 'Disable' : 'Enable' }}</button>
                    </form>
                    @else
                    <span class="px-3 py-1 text-xs bg-gray-100 rounded-lg">Core - Required</span>
                    @endif
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <div class="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 class="font-bold">🚀 How to Add Future Features as Addons - No Core Touch</h3>
        <div class="mt-4 grid md:grid-cols-2 gap-4 text-sm">
            <div>
                <h4 class="font-semibold">1. Create Addon via Artisan (Trending)</h4>
                <code class="block mt-2 p-3 bg-gray-900 text-green-400 rounded-xl text-xs">php artisan addon:make Tennis --category=sports<br>php artisan addon:make AIGemini --category=ai<br>php artisan addon:make PaymentsCrypto --category=payments</code>
            </div>
            <div>
                <h4 class="font-semibold">2. Or Manual - Drop in addons/ folder</h4>
                <code class="block mt-2 p-3 bg-gray-900 text-green-400 rounded-xl text-xs">addons/YourAddon/<br>├── addon.json (manifest)<br>├── src/Providers/AddonServiceProvider.php<br>├── routes/web.php + api.php<br>├── config/youraddon.php<br>├── database/migrations/<br>└── resources/views/</code>
            </div>
        </div>
        <p class="text-xs text-gray-600 mt-4">✅ Addon auto-discovers via AddonManager - enable/disable via config/addons.php or addon.json - cPanel file cache compatible - no Redis</p>
    </div>
</div>
@endsection
