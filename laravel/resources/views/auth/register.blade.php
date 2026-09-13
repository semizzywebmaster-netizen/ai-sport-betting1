@extends('layouts.app')
@section('title', 'Register - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-16 flex justify-center">
    <div class="w-full max-w-md bg-white border rounded-2xl p-8 shadow-sm">
        <h1 class="text-2xl font-bold mb-2">Join Punter Prediction - Blade</h1>
        <p class="text-sm text-gray-600 mb-6">AI-powered sports intelligence • 18+ only • Laravel Blade, not HTML</p>
        
        <form method="POST" action="{{ route('register') }}" class="space-y-4">
            @csrf
            <input type="text" name="username" placeholder="Username" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" value="{{ old('username') }}" required>
            <input type="email" name="email" placeholder="Email (optional)" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" value="{{ old('email') }}">
            <input type="text" name="phone" placeholder="Phone e.g. 08012345678" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" value="{{ old('phone') }}">
            <input type="password" name="password" placeholder="Password (8+ chars, upper, lower, number)" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" required>
            <input type="text" name="referralCode" placeholder="Referral code (optional)" class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none" value="{{ old('referralCode') }}">
            <button type="submit" class="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-medium">Create Account • Get 5 Free Credits • Blade</button>
        </form>
        <p class="text-xs text-gray-500 text-center mt-4">By registering you agree to Terms and confirm you are 18+. Predictions are analytical estimates, not guarantees. Laravel Blade for cPanel.</p>
    </div>
</div>
@endsection
