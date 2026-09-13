@extends('layouts.app')
@section('title', 'Register - Laravel 11 - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-16 max-w-md">
    <div class="bg-white rounded-2xl border shadow-xl p-8">
        <div class="text-center mb-8"><div class="h-12 w-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">P</div><h1 class="text-2xl font-bold">Join Punter Prediction</h1><p class="text-gray-600 text-sm">Laravel 11 • Livewire 3 • Blade templates • 18+ only</p></div>
        <form method="POST" action="{{ route('register') }}" class="space-y-4">
            @csrf
            <div><label class="text-sm font-medium">Username</label><input type="text" name="username" required class="mt-1 w-full px-4 py-3 border rounded-xl" placeholder="punter123"></div>
            <div><label class="text-sm font-medium">Email</label><input type="email" name="email" required class="mt-1 w-full px-4 py-3 border rounded-xl" placeholder="you@example.com"></div>
            <div><label class="text-sm font-medium">Phone (Nigeria)</label><input type="tel" name="phone" class="mt-1 w-full px-4 py-3 border rounded-xl" placeholder="+234..."></div>
            <div><label class="text-sm font-medium">Password</label><input type="password" name="password" required class="mt-1 w-full px-4 py-3 border rounded-xl" placeholder="••••••••"></div>
            <div class="flex items-center gap-2"><input type="checkbox" required><label class="text-xs">I am 18+ and agree to responsible betting. Laravel Blade, not HTML.</label></div>
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold">Create Account →</button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-6">Have account? <a href="{{ route('login') }}" class="text-green-600 font-semibold">Login</a></p>
    </div>
</div>
@endsection
