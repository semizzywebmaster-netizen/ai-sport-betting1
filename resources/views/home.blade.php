@extends('layouts.app')

@section('title', 'Punter Prediction - Laravel 11 + Livewire 3 + AI Sports Intelligence - Football & Basketball')

@section('content')
<!-- Hero - Laravel 11 + Livewire 3 -->
<section class="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
    <div class="absolute inset-0 bg-grid-white/10"></div>
    <div class="container mx-auto px-4 py-20 relative">
        <div class="max-w-4xl mx-auto text-center space-y-8">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm">
                <span class="h-2 w-2 rounded-full bg-green-300 animate-pulse"></span>
                Laravel 11 • Livewire 3 • Tailwind 3.4 • Alpine 3 • Vite 5 • cPanel PHP Native
            </div>
            <h1 class="text-5xl md:text-7xl font-bold tracking-tight">
                AI-Powered Sports
                <span class="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent block">Intelligence</span>
            </h1>
            <p class="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
                Football & Basketball predictions with equal first-class treatment. Laravel 11 + Livewire 3 dynamic UI, no React needed. cPanel PHP hosting ready. Analytical estimates, not guarantees. 18+ Responsible.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="{{ route('predictions.index') }}" class="px-8 py-4 bg-white text-green-700 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition">🎯 View AI Predictions</a>
                <a href="{{ route('bet-builder.index') }}" class="px-8 py-4 bg-green-800/50 border border-white/20 text-white rounded-xl font-semibold backdrop-blur hover:bg-green-800/70 transition">🧩 Smart Bet Builder</a>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 text-center">
                <div class="bg-white/10 backdrop-blur rounded-xl p-4"><div class="text-2xl font-bold">200+</div><div class="text-sm text-green-200">Leagues</div></div>
                <div class="bg-white/10 backdrop-blur rounded-xl p-4"><div class="text-2xl font-bold">Laravel 11</div><div class="text-sm text-green-200">Latest Trending</div></div>
                <div class="bg-white/10 backdrop-blur rounded-xl p-4"><div class="text-2xl font-bold">Livewire 3</div><div class="text-sm text-green-200">Dynamic UI</div></div>
                <div class="bg-white/10 backdrop-blur rounded-xl p-4"><div class="text-2xl font-bold">cPanel</div><div class="text-sm text-green-200">PHP Native</div></div>
            </div>
        </div>
    </div>
</section>

<!-- Sports Equal Treatment -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Football & Basketball Equal First-Class</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">No second-class treatment. Both sports get full fixtures, odds, AI predictions, form, H2H, lineups - all via Laravel Blade + Livewire 3, not React.</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div class="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 card-hover">
                <div class="flex items-center gap-4 mb-6"><div class="h-12 w-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl">⚽</div><div><h3 class="text-xl font-bold">Football</h3><p class="text-sm text-gray-600">Complete coverage</p></div><span class="ml-auto px-3 py-1 bg-green-600 text-white text-xs rounded-full">Trending</span></div>
                <ul class="space-y-3 text-sm">
                    <li class="flex gap-2">✅ Dynamic leagues (not 3 hard-coded)</li>
                    <li class="flex gap-2">✅ Live scores, events, stats</li>
                    <li class="flex gap-2">✅ AI predictions with confidence & risk</li>
                    <li class="flex gap-2">✅ Laravel Blade templates (not .html)</li>
                </ul>
                <a href="{{ route('football.index') }}" class="mt-6 block text-center py-3 bg-green-600 text-white rounded-xl font-semibold">Explore Football →</a>
            </div>
            <div class="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-8 card-hover">
                <div class="flex items-center gap-4 mb-6"><div class="h-12 w-12 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl">🏀</div><div><h3 class="text-xl font-bold">Basketball</h3><p class="text-sm text-gray-600">Full parity</p></div><span class="ml-auto px-3 py-1 bg-orange-600 text-white text-xs rounded-full">Equal</span></div>
                <ul class="space-y-3 text-sm">
                    <li class="flex gap-2">✅ NBA, EuroLeague, etc.</li>
                    <li class="flex gap-2">✅ Same prediction engine</li>
                    <li class="flex gap-2">✅ Quarters scoring, lineups</li>
                    <li class="flex gap-2">✅ Livewire 3 dynamic filtering</li>
                </ul>
                <a href="{{ route('basketball.index') }}" class="mt-6 block text-center py-3 bg-orange-600 text-white rounded-xl font-semibold">Explore Basketball →</a>
            </div>
        </div>
    </div>
</section>

<!-- Trending Stack for cPanel -->
<section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
        <div class="text-center mb-12">
            <span class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">Trending 2026 for cPanel</span>
            <h2 class="text-3xl font-bold mt-4">Why Laravel 11 + Livewire 3 + Alpine 3 + Tailwind?</h2>
            <p class="text-gray-600 max-w-2xl mx-auto mt-4">No Node.js server needed in production. PHP 8.2+ + MySQL + Apache/nginx = cPanel native. Vite builds to static assets.</p>
        </div>
        <div class="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div class="bg-white rounded-xl border p-6">
                <div class="h-10 w-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-4">🔷</div>
                <h3 class="font-bold">Laravel 11</h3>
                <p class="text-sm text-gray-600 mt-2">Latest Laravel, slim app structure, PHP 8.2+, no Docker. cPanel uploads via FTP/Git.</p>
            </div>
            <div class="bg-white rounded-xl border p-6">
                <div class="h-10 w-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-4">⚡</div>
                <h3 class="font-bold">Livewire 3</h3>
                <p class="text-sm text-gray-600 mt-2">Trending! Dynamic UI without React/Vue. Blade + PHP reactivity, perfect for cPanel.</p>
            </div>
            <div class="bg-white rounded-xl border p-6">
                <div class="h-10 w-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">🎨</div>
                <h3 class="font-bold">Tailwind 3.4</h3>
                <p class="text-sm text-gray-600 mt-2">Utility-first, Vite-built, purged CSS. Trending design system 2024-2026.</p>
            </div>
            <div class="bg-white rounded-xl border p-6">
                <div class="h-10 w-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">🏔️</div>
                <h3 class="font-bold">Alpine 3</h3>
                <p class="text-sm text-gray-600 mt-2">Lightweight JS (15kb). Trending for cPanel - dropdowns, modals, without SPA.</p>
            </div>
        </div>
    </div>
</section>

<!-- Responsible Betting -->
<section class="py-8 bg-amber-50 border-y border-amber-200">
    <div class="container mx-auto px-4 text-center">
        <p class="text-sm text-amber-900"><span class="font-bold">🔞 18+ Responsible Betting:</span> All predictions are analytical estimates based on AI analysis of statistics, form, and H2H data. Not guarantees. Never bet more than you can afford to lose. Laravel Blade templates, not .html files. cPanel PHP hosting compatible.</p>
    </div>
</section>
@endsection
