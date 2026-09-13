@extends('layouts.app')
@section('title', 'AI Predictions - Laravel 11 + Livewire 3 - Confidence & Risk - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8" x-data="{ filterSport: 'all', filterRisk: 'all' }">
    <h1 class="text-3xl font-bold mb-2">🎯 AI Predictions</h1>
    <p class="text-gray-600 mb-8">Laravel 11 + Livewire 3 • Confidence scores • Risk levels • Supporting factors • No guaranteed wins • Blade templates</p>
    
    <div class="flex gap-4 mb-6 flex-wrap">
        <select x-model="filterSport" class="px-4 py-2 border rounded-xl"><option value="all">All Sports</option><option value="football">⚽ Football</option><option value="basketball">🏀 Basketball</option></select>
        <select x-model="filterRisk" class="px-4 py-2 border rounded-xl"><option value="all">All Risk</option><option value="LOW">Low Risk</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option></select>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach([
            ['sport' => 'football', 'match' => 'Man City vs Arsenal', 'market' => 'Over 2.5', 'conf' => 78, 'risk' => 'LOW', 'odds' => '1.85', 'reason' => 'Both teams scoring form strong, H2H shows goals'],
            ['sport' => 'basketball', 'match' => 'Lakers vs Warriors', 'market' => 'Lakers ML', 'conf' => 72, 'risk' => 'MEDIUM', 'odds' => '1.92', 'reason' => 'Home court advantage, Curry questionable'],
            ['sport' => 'football', 'match' => 'Barcelona vs Real', 'market' => 'BTTS Yes', 'conf' => 85, 'risk' => 'LOW', 'odds' => '1.75', 'reason' => 'Both attacks elite, defensive gaps'],
        ] as $pred)
        <div class="bg-white rounded-xl border p-6 card-hover" x-show="filterSport === 'all' || filterSport === '{{ $pred['sport'] }}'">
            <div class="flex justify-between items-start mb-3">
                <span class="px-2 py-1 text-xs rounded-full {{ $pred['sport'] === 'football' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800' }}">{{ $pred['sport'] }}</span>
                <span class="px-2 py-1 text-xs rounded-full border {{ $pred['risk'] === 'LOW' ? 'bg-green-50 border-green-200 text-green-700' : ($pred['risk'] === 'MEDIUM' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-red-50 border-red-200 text-red-700') }}">{{ $pred['risk'] }} RISK</span>
            </div>
            <h3 class="font-bold">{{ $pred['match'] }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ $pred['market'] }} @ {{ $pred['odds'] }}</p>
            <div class="mt-3 flex items-center gap-2">
                <div class="flex-1 bg-gray-200 rounded-full h-2"><div class="bg-green-600 h-2 rounded-full" style="width: {{ $pred['conf'] }}%"></div></div>
                <span class="text-sm font-bold">{{ $pred['conf'] }}%</span>
            </div>
            <p class="text-xs text-gray-600 mt-3 bg-gray-50 p-3 rounded-xl">💡 {{ $pred['reason'] }}</p>
            <p class="text-xs text-amber-700 mt-2">⚠️ Analytical estimate, not guarantee. 18+</p>
        </div>
        @endforeach
    </div>
</div>
@endsection
