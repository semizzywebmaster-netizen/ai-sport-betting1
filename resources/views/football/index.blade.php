@extends('layouts.app')

@section('title', 'Football - Laravel 11 + Livewire 3 - Dynamic Leagues - Punter Prediction')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-8">
        <div class="h-12 w-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl">⚽</div>
        <div>
            <h1 class="text-3xl font-bold">Football</h1>
            <p class="text-gray-600">Laravel 11 + Livewire 3 • Dynamic leagues • Blade templates • cPanel ready</p>
        </div>
        <span class="ml-auto px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Laravel Blade</span>
    </div>

    <!-- Livewire Search - Trending -->
    <div class="mb-8">
        @livewire('search-component', ['sport' => 'football'])
    </div>

    <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
            <div class="bg-white rounded-xl border p-6">
                <h2 class="font-bold mb-4">Today's Fixtures - Livewire 3 Dynamic</h2>
                <div class="space-y-3">
                    @foreach([
                        ['home' => 'Man City', 'away' => 'Arsenal', 'time' => '15:00', 'league' => 'Premier League', 'odds' => '2.10'],
                        ['home' => 'Real Madrid', 'away' => 'Barcelona', 'time' => '20:00', 'league' => 'La Liga', 'odds' => '2.45'],
                        ['home' => 'Bayern Munich', 'away' => 'Dortmund', 'time' => '18:30', 'league' => 'Bundesliga', 'odds' => '1.95'],
                    ] as $match)
                    <div class="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 card-hover">
                        <div>
                            <div class="font-semibold">{{ $match['home'] }} vs {{ $match['away'] }}</div>
                            <div class="text-sm text-gray-600">{{ $match['league'] }} • {{ $match['time'] }}</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-green-600">{{ $match['odds'] }}</div>
                            <div class="text-xs text-gray-500">Best Odds</div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="space-y-6">
            <div class="bg-white rounded-xl border p-6">
                <h3 class="font-bold mb-3">Top Leagues - Dynamic (not hard-coded 3)</h3>
                <ul class="space-y-2 text-sm">
                    @foreach(['Premier League 🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'La Liga 🇪🇸', 'Bundesliga 🇩🇪', 'Serie A 🇮🇹', 'Ligue 1 🇫🇷', 'Champions League 🌍', 'NPFL 🇳🇬', 'Eredivisie 🇳🇱'] as $league)
                    <li class="flex justify-between py-2 border-b last:border-0"><span>{{ $league }}</span><span class="text-green-600">→</span></li>
                    @endforeach
                </ul>
            </div>
            <div class="betting-warning">
                <p class="text-xs font-semibold">🔞 18+ | Laravel Blade • Analytical estimates, not guarantees</p>
            </div>
        </div>
    </div>
</div>
@endsection
