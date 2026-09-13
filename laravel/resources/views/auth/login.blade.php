@extends('layouts.app')
@section('title', 'Login - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-16 flex justify-center">
    <div class="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm">
        <h1 class="text-2xl font-bold mb-2">Welcome Back - Laravel Blade</h1>
        <p class="text-sm text-gray-600 mb-6">Login with email, phone or username - Blade template, not HTML</p>
        
        <form method="POST" action="{{ route('login') }}" class="space-y-4">
            @csrf
            <div>
                <input type="text" name="identifier" placeholder="Email, phone or username" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" value="{{ old('identifier') }}" required>
                @error('identifier') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
            <div>
                <input type="password" name="password" placeholder="Password" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" required>
                @error('password') <p class="text-red-500 text-xs mt-1">{{ $message }}</p> @enderror
            </div>
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-medium">Login - Laravel Blade</button>
        </form>
        
        <div class="text-center text-sm mt-6">
            <a href="{{ route('register') }}" class="text-green-600 hover:underline">Don't have account? Register - Blade</a>
            <span class="text-gray-400 mx-2">•</span>
            <a href="#" class="text-gray-600">Forgot password?</a>
        </div>
        <div class="text-xs text-center text-gray-500 mt-4">
            🇳🇬 Nigerian numbers supported: +234 or 0 format • Secure JWT via API • Laravel Blade, not HTML
        </div>
    </div>
</div>
@endsection
