@extends('layouts.app')
@section('title', 'Wallet - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Wallet • Separate Cash & Credits • Laravel Blade</h1>
    <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white border border-green-200 rounded-2xl p-6"><h3 class="font-bold flex justify-between"><span>Cash Wallet (NGN) - Blade</span><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">NGN</span></h3><div class="text-3xl font-bold mt-4">₦12,500</div><p class="text-sm text-gray-600">Deposits via Paystack & Flutterwave • Server-verified • Idempotency protected • Blade</p><div class="flex gap-2 mt-4"><button class="flex-1 py-2 bg-green-600 text-white rounded-xl">Deposit • Blade</button><button class="flex-1 py-2 border rounded-xl">Withdraw</button></div></div>
        <div class="bg-white border border-blue-200 rounded-2xl p-6"><h3 class="font-bold flex justify-between"><span>AI Credits - Blade</span><span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Credits</span></h3><div class="text-3xl font-bold mt-4">42 credits</div><p class="text-sm text-gray-600">For predictions, AI analysis, bet builder • Never mixed with cash • Blade</p><div class="flex gap-2 mt-4"><button class="flex-1 py-2 bg-blue-600 text-white rounded-xl">Buy Credits • Blade</button><button class="flex-1 py-2 border rounded-xl">History</button></div></div>
    </div>
    <div class="bg-white border rounded-2xl p-6 mt-6"><h3 class="font-bold mb-4">Recent Transactions • Immutable Ledger • Blade</h3><div class="space-y-2">@for($i = 1; $i <= 4; $i++)<div class="flex justify-between p-3 border rounded-xl text-sm"><span>Deposit via Paystack • TX-ABC123 • Success • Blade #{{ $i }}</span><span class="font-bold text-green-600">+₦5,000</span></div>@endfor</div></div>
</div>
@endsection
