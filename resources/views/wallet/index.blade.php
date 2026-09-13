@extends('layouts.app')
@section('title', 'Wallet - Separate Cash & Credits - Laravel 11 - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">💰 Wallet - Separate Ledgers</h1>
    <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl p-6"><h3 class="text-green-100">Cash Balance</h3><div class="text-3xl font-bold mt-2">₦0.00</div><p class="text-sm text-green-100 mt-2">Real money - Paystack/Flutterwave verified server-side only</p></div>
        <div class="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl p-6"><h3 class="text-purple-100">Credits</h3><div class="text-3xl font-bold mt-2">0</div><p class="text-sm text-purple-100 mt-2">Separate ledger - not cash - Laravel 11 + MySQL</p></div>
        <div class="bg-white border rounded-xl p-6"><h3 class="font-bold">Quick Actions</h3><div class="mt-4 space-y-2"><a href="#" class="block py-2 px-4 bg-green-600 text-white rounded-xl text-center">Deposit via Paystack</a><a href="#" class="block py-2 px-4 border rounded-xl text-center">Buy Credits</a></div></div>
    </div>
    <p class="text-xs text-gray-500 mt-6 text-center">🔞 18+ | Separate cash & credits • Server verification only • Laravel Blade • cPanel PHP Native</p>
</div>
@endsection
