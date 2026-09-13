@extends('layouts.app')
@section('title', 'Login - Laravel 11 + Sanctum - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-16 max-w-md">
    <div class="bg-white rounded-2xl border shadow-xl p-8">
        <div class="text-center mb-8">
            <div class="h-12 w-12 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">P</div>
            <h1 class="text-2xl font-bold">Welcome Back</h1>
            <p class="text-gray-600 text-sm">Laravel 11 + Sanctum • cPanel compatible • Blade not HTML</p>
        </div>
        <form method="POST" action="{{ route('login') }}" class="space-y-4">
            @csrf
            <div><label class="text-sm font-medium">Email or Username</label><input type="text" name="login" required class="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500" placeholder="you@example.com"></div>
            <div><label class="text-sm font-medium">Password</label><input type="password" name="password" required class="mt-1 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500" placeholder="••••••••"></div>
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold">Login →</button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-6">No account? <a href="{{ route('register') }}" class="text-green-600 font-semibold">Join Now</a></p>
        <p class="text-xs text-center text-gray-500 mt-4">🔞 18+ only • Laravel 11 • Livewire 3 • Tailwind 3.4 • cPanel PHP Native</p>
    </div>
</div>
@endsection
