@extends('layouts.app')
@section('title', 'Admin Dashboard - Single Role - Laravel 11 - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">🔧 Admin Dashboard - Single Admin System - Laravel 11</h1>
    <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">1,234</div><div class="text-sm text-gray-600">Users</div></div>
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">567</div><div class="text-sm text-gray-600">Predictions</div></div>
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">₦890k</div><div class="text-sm text-gray-600">Revenue</div></div>
        <div class="bg-white border rounded-xl p-6"><div class="text-2xl font-bold">Laravel 11</div><div class="text-sm text-gray-600">Trending cPanel</div></div>
    </div>
    <div class="mt-8 bg-white border rounded-xl p-6"><h2 class="font-bold">cPanel Compatible Stack</h2><p class="text-sm text-gray-600 mt-2">Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + MySQL - No Docker, no Redis, no Node server. Blade templates, not .html. Football & Basketball equal.</p></div>
</div>
@endsection
