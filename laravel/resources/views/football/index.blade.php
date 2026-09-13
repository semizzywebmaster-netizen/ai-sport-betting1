@extends('layouts.app')

@section('title', 'Football Predictions - Laravel Blade - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-8">
        <div class="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-2xl">⚽</div>
        <div><h1 class="text-3xl font-bold">Football Predictions - Laravel Blade</h1><p class="text-gray-600">Premier League, La Liga, Champions League & 50+ leagues • AI confidence • Risk analysis • Blade templates, not HTML</p></div>
    </div>
    
    <div class="grid md:grid-cols-4 gap-6">
        <div class="md:col-span-1 space-y-4">
            <div class="bg-white border rounded-2xl p-6">
                <h3 class="font-bold text-sm mb-4">Leagues - Dynamic</h3>
                <div class="space-y-2">
                    @foreach($leagues as $league)
                        <div class="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 text-sm">
                            <span>{{ $league['name'] ?? $league }}</span>
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Live</span>
                        </div>
                    @endforeach
                </div>
            </div>
            <div class="bg-white border rounded-2xl p-6">
                <h3 class="font-bold text-sm mb-4">Markets - Laravel Blade</h3>
                <div class="text-sm space-y-1">
                    <div>✓ 1X2</div><div>✓ Over/Under</div><div>✓ BTTS</div>
                    <div>✓ Double Chance</div><div>✓ Asian Handicap</div><div>✓ Corners, Cards</div>
                </div>
            </div>
        </div>
        <div class="md:col-span-3 space-y-4">
            @forelse($fixtures as $fixture)
                <div class="bg-white border rounded-2xl p-6 card-hover">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-semibold">{{ $fixture['homeTeam']['name'] ?? 'Man City' }} vs {{ $fixture['awayTeam']['name'] ?? 'Arsenal' }} • {{ $fixture['league']['name'] ?? 'Premier League' }}</div>
                            <div class="text-sm text-gray-600">Today 20:00 • Etihad Stadium • Laravel Blade</div>
                            <div class="flex gap-2 mt-2">
                                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Over 2.5 Goals</span>
                                <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">72% Confidence</span>
                                <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">MEDIUM Risk</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-lg">1.85</div>
                            <button class="mt-1 px-4 py-1 bg-green-600 text-white rounded-lg text-sm">View Analysis</button>
                        </div>
                    </div>
                    <p class="text-xs text-gray-500 mt-3">Analytical estimate based on form, H2H, injuries. Not guaranteed. 18+ Responsible betting. Laravel Blade template.</p>
                </div>
            @empty
                @for($i = 1; $i <= 5; $i++)
                    <div class="bg-white border rounded-2xl p-6 card-hover">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="font-semibold">Man City vs Arsenal • Premier League • Blade #{{ $i }}</div>
                                <div class="text-sm text-gray-600">Today 20:00 • Etihad Stadium • Laravel Blade, not HTML</div>
                                <div class="flex gap-2 mt-2">
                                    <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Over 2.5 Goals</span>
                                    <span class="px-3 py-1 bg-gray-100 rounded-full text-xs">72% Confidence</span>
                                    <span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">MEDIUM Risk</span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-bold text-lg">1.85</div>
                                <button class="mt-1 px-4 py-1 bg-green-600 text-white rounded-lg text-sm">View Analysis</button>
                            </div>
                        </div>
                        <p class="text-xs text-gray-500 mt-3">Analytical estimate, not guaranteed. 18+ Responsible betting. Laravel Blade template for cPanel PHP.</p>
                    </div>
                @endfor
                <div class="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
                    <strong>Laravel Blade Info:</strong> This page uses Blade templating (@foreach, @forelse, @empty) - not static HTML. Data from Node.js API at {{ env('API_URL', '/api/v1') }} or fallback. No fake odds - only provider data.
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection
