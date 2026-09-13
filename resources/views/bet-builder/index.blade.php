@extends('layouts.app')
@section('title', 'Bet Builder - Alpine 3 + Livewire 3 - Smart Strategies - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8" x-data="betBuilder">
    <h1 class="text-3xl font-bold mb-2">🧩 Smart Bet Builder</h1>
    <p class="text-gray-600 mb-8">Alpine.js 3 trending for cPanel • Strategies: Conservative/Balanced/Aggressive • Target odds • Duplicate detection • Bet codes</p>
    
    <div class="grid lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
            <div class="bg-white rounded-xl border p-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="font-bold">Your Selections (<span x-text="selections.length"></span>)</h2>
                    <div class="flex gap-2">
                        <select x-model="strategy" class="text-sm border rounded-lg px-2 py-1"><option value="conservative">Conservative</option><option value="balanced">Balanced</option><option value="aggressive">Aggressive</option></select>
                        <input x-model="targetOdds" type="number" placeholder="Target 10.0" class="w-24 text-sm border rounded-lg px-2 py-1">
                    </div>
                </div>
                <template x-if="selections.length === 0">
                    <div class="text-center py-12 text-gray-500">No selections yet. Add from football/basketball fixtures.</div>
                </template>
                <div class="space-y-3">
                    <template x-for="(sel, index) in selections" :key="index">
                        <div class="flex justify-between items-center p-3 border rounded-xl">
                            <div><div class="font-semibold" x-text="sel.match"></div><div class="text-sm text-gray-600" x-text="sel.market + ' @ ' + sel.odds"></div></div>
                            <button @click="removeSelection(index)" class="text-red-600 hover:bg-red-50 p-2 rounded-lg">✕</button>
                        </div>
                    </template>
                </div>
                <button @click="selections.push({match: 'Demo: Man City vs Arsenal', market: 'Over 2.5', odds: '1.85', fixtureId: Date.now(), market: 'goals'})" class="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:text-green-600">+ Add Demo Selection (Alpine.js)</button>
            </div>
        </div>
        <div>
            <div class="bg-white rounded-xl border p-6 sticky top-20">
                <h3 class="font-bold mb-4">Bet Summary</h3>
                <div class="space-y-3 text-sm">
                    <div class="flex justify-between"><span>Total Odds:</span><span class="font-bold" x-text="totalOdds.toFixed(2)"></span></div>
                    <div class="flex justify-between"><span>Stake:</span><input x-model="stake" type="number" class="w-20 border rounded px-2 py-1 text-right"></div>
                    <div class="flex justify-between font-bold text-lg border-t pt-3"><span>Potential Win:</span><span class="text-green-600" x-text="'₦' + potentialWin.toLocaleString()"></span></div>
                </div>
                <button @click="alert('Bet Code: ' + generateBetCode() + ' - Laravel Blade + Alpine 3 - cPanel Ready')" class="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold">Generate Bet Code</button>
                <p class="text-xs text-gray-500 mt-3 text-center">🔞 18+ | Analytical • Not guaranteed • Laravel Blade</p>
            </div>
        </div>
    </div>
</div>
@endsection
