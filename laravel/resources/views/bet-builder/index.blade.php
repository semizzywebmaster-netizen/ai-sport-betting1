@extends('layouts.app')
@section('title', 'Smart Bet Builder - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">Smart Bet Builder 🧩 - Laravel Blade</h1>
    <p class="text-gray-600 mb-6">Conservative, Balanced, Aggressive strategies • Target odds 2,5,10,20,50,100,Custom • Generate, Merge, Convert, Lookup, Optimize • Secure bet codes • Blade, not HTML</p>
    <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2 space-y-4">
            <div class="bg-white border rounded-2xl p-6">
                <h3 class="font-bold flex justify-between"><span>Your Bet Slip (3 selections) - Blade</span><span class="px-3 py-1 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-full text-xs">Balanced • Target 10.0</span></h3>
                <div class="space-y-3 mt-4">
                    <div class="p-3 border rounded-xl flex justify-between"><span>Man City vs Arsenal • Over 2.5 @ 1.85 • Blade</span><button class="text-gray-400 hover:text-red-500">✕</button></div>
                    <div class="p-3 border rounded-xl flex justify-between"><span>Lakers -3.5 Spread @ 1.90 • Blade</span><button class="text-gray-400 hover:text-red-500">✕</button></div>
                    <div class="p-3 border rounded-xl flex justify-between"><span>Barcelona Win @ 2.10 • Blade</span><button class="text-gray-400 hover:text-red-500">✕</button></div>
                    <div class="p-4 bg-green-50 rounded-xl flex justify-between items-center"><div><div class="text-sm text-gray-600">Total Odds</div><div class="text-2xl font-bold">7.38</div></div><div class="text-right"><div class="text-sm">Potential Win (Stake ₦1000)</div><div class="text-xl font-bold text-green-600">₦7,380</div></div></div>
                    <div class="flex gap-2"><button class="flex-1 py-3 bg-green-600 text-white rounded-xl">Generate Bet Code • Blade</button><button class="flex-1 py-3 border rounded-xl">Optimize • Blade</button></div>
                    <p class="text-xs text-gray-500">Duplicate/conflict detection active. No guaranteed profits. 18+ Responsible betting. Laravel Blade template.</p>
                </div>
            </div>
        </div>
        <div class="space-y-4">
            <div class="bg-white border rounded-2xl p-6"><h4 class="font-bold text-sm mb-3">Strategies - Blade</h4><div class="space-y-2 text-sm"><button class="w-full text-left px-3 py-2 border rounded-lg hover:bg-gray-50">🛡️ Conservative (Low risk)</button><button class="w-full text-left px-3 py-2 bg-green-600 text-white rounded-lg">⚖️ Balanced (Medium)</button><button class="w-full text-left px-3 py-2 border rounded-lg hover:bg-gray-50">🔥 Aggressive (High risk)</button></div></div>
            <div class="bg-white border rounded-2xl p-6"><h4 class="font-bold text-sm mb-3">Target Odds - Blade</h4><div class="flex flex-wrap gap-2"><span class="px-3 py-1 border rounded-full text-xs">2</span><span class="px-3 py-1 border rounded-full text-xs">5</span><span class="px-3 py-1 bg-green-600 text-white rounded-full text-xs">10</span><span class="px-3 py-1 border rounded-full text-xs">20</span><span class="px-3 py-1 border rounded-full text-xs">50</span><span class="px-3 py-1 border rounded-full text-xs">100</span></div></div>
        </div>
    </div>
</div>
@endsection
