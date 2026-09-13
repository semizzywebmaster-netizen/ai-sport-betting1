@extends('layouts.app')
@section('title', 'About - Laravel 11 + Livewire 3 - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-4xl font-bold mb-6">About Punter Prediction - Laravel 11 Rebuild</h1>
    <p class="text-gray-600 mb-8">Rebuilt from scratch using trending cPanel-compatible stack: Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL. No Docker, no Redis, no Node server needed in production. Blade templates, not .html files.</p>
    <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white border rounded-xl p-6"><h3 class="font-bold">🔷 Laravel 11</h3><p class="text-sm text-gray-600 mt-2">Latest trending Laravel - slim structure, PHP 8.2+, cPanel FTP/Git deploy.</p></div>
        <div class="bg-white border rounded-xl p-6"><h3 class="font-bold">⚡ Livewire 3</h3><p class="text-sm text-gray-600 mt-2">Trending 2024-2026: Dynamic UI without React/Vue. Perfect for cPanel PHP hosting.</p></div>
        <div class="bg-white border rounded-xl p-6"><h3 class="font-bold">🎨 Tailwind 3.4</h3><p class="text-sm text-gray-600 mt-2">Trending utility-first CSS, Vite-built, purged.</p></div>
        <div class="bg-white border rounded-xl p-6"><h3 class="font-bold">🏔️ Alpine 3</h3><p class="text-sm text-gray-600 mt-2">15kb JS for cPanel - dropdowns, modals, bet builder without SPA.</p></div>
    </div>
</div>
@endsection
