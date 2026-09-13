@extends('layouts.app')

@section('title', 'Basketball - Laravel 11 + Livewire 3 - Equal Treatment - Punter Prediction')

@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-8">
        <div class="h-12 w-12 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl">🏀</div>
        <div>
            <h1 class="text-3xl font-bold">Basketball</h1>
            <p class="text-gray-600">Equal first-class treatment • Laravel 11 + Livewire 3 • Same AI engine as football</p>
        </div>
        <span class="ml-auto px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">Equal Treatment</span>
    </div>

    <div class="grid md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
            <div class="bg-white rounded-xl border p-6">
                <h2 class="font-bold mb-4">Today's Games - NBA & More</h2>
                <div class="space-y-3">
                    @foreach([
                        ['home' => 'Lakers', 'away' => 'Warriors', 'time' => '02:00', 'league' => 'NBA', 'odds' => '1.85'],
                        ['home' => 'Real Madrid', 'away' => 'Barcelona', 'time' => '19:00', 'league' => 'EuroLeague', 'odds' => '2.10'],
                        ['home' => 'Celtics', 'away' => 'Bucks', 'time' => '01:00', 'league' => 'NBA', 'odds' => '1.92'],
                    ] as $game)
                    <div class="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 card-hover">
                        <div>
                            <div class="font-semibold">{{ $game['home'] }} vs {{ $game['away'] }}</div>
                            <div class="text-sm text-gray-600">{{ $game['league'] }} • {{ $game['time'] }}</div>
                        </div>
                        <div class="text-right">
                            <div class="font-bold text-orange-600">{{ $game['odds'] }}</div>
                            <div class="text-xs text-gray-500">Moneyline</div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="space-y-6">
            <div class="bg-white rounded-xl border p-6">
                <h3 class="font-bold mb-3">Leagues - Same Dynamic System</h3>
                <ul class="space-y-2 text-sm">
                    @foreach(['NBA 🇺🇸', 'EuroLeague 🌍', 'NBL 🇦🇺', 'CBA 🇨🇳', 'BAL 🌍', 'WNBA 🇺🇸'] as $league)
                    <li class="flex justify-between py-2 border-b last:border-0"><span>{{ $league }}</span><span class="text-orange-600">→</span></li>
                    @endforeach
                </ul>
            </div>
            <div class="betting-warning">
                <p class="text-xs font-semibold">🔞 18+ | Basketball gets same AI prediction engine, not second-class</p>
            </div>
        </div>
    </div>
</div>
@endsection
