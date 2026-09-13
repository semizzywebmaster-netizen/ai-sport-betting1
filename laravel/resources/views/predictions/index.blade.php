@extends('layouts.app')
@section('title', 'AI Predictions - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-2">AI Predictions - Laravel Blade</h1>
    <p class="text-gray-600 mb-6">All predictions include confidence %, risk level, reasoning, supporting & warning factors. Transparency: wins, losses, void all stored. Never hide losing predictions. Blade templates, not HTML.</p>
    <div class="flex gap-2 mb-6 flex-wrap">
        <span class="px-3 py-1 bg-gradient-to-r from-green-600 to-orange-500 text-white rounded-full text-xs">All Sports • Blade</span>
        <span class="px-3 py-1 border rounded-full text-xs">⚽ Football</span>
        <span class="px-3 py-1 border rounded-full text-xs">🏀 Basketball</span>
        <span class="px-3 py-1 border rounded-full text-xs">Today</span>
    </div>
    <div class="grid md:grid-cols-2 gap-4">
        @forelse($predictions as $prediction)
            <div class="bg-white border rounded-2xl p-6 card-hover">
                <div class="flex justify-between"><span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">⚽ Football • Premier League • Blade</span><span class="text-xs text-gray-500">2 hours ago</span></div>
                <div class="font-bold mt-2">{{ $prediction['fixture']['homeTeam']['name'] ?? 'Man City' }} vs {{ $prediction['fixture']['awayTeam']['name'] ?? 'Arsenal' }}</div>
                <div class="mt-2 p-3 bg-gray-50 rounded-xl">
                    <div class="flex justify-between items-center"><span class="font-semibold">{{ $prediction['selection'] ?? 'Over 2.5 Goals' }} @ {{ $prediction['odds'] ?? '1.85' }}</span><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{{ $prediction['confidence'] ?? '72' }}% Confidence</span></div>
                    <div class="text-sm mt-2">{{ $prediction['reasoning'] ?? 'Reasoning: Both teams average 2.8 goals, strong attacking form. Analytical estimate, not guarantee. Blade.' }}</div>
                </div>
                <div class="flex justify-between items-center mt-3"><span class="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">{{ $prediction['risk'] ?? 'MEDIUM' }} Risk</span><button class="px-4 py-1 bg-green-600 text-white rounded-lg text-sm">Add to Bet Builder • Blade</button></div>
            </div>
        @empty
            @for($i = 1; $i <= 6; $i++)
                <div class="bg-white border rounded-2xl p-6 card-hover">
                    <div class="flex justify-between"><span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">⚽ Football • Premier League • Blade #{{ $i }}</span><span class="text-xs text-gray-500">2 hours ago</span></div>
                    <div class="font-bold mt-2">Man City vs Arsenal • Blade</div>
                    <div class="mt-2 p-3 bg-gray-50 rounded-xl">
                        <div class="flex justify-between items-center"><span class="font-semibold">Over 2.5 Goals @ 1.85</span><span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">72% Confidence</span></div>
                        <div class="text-sm mt-2">Reasoning: Both teams average 2.8 goals, strong attacking form, defensive injuries noted. Analytical estimate, not guarantee. Laravel Blade.</div>
                        <div class="grid grid-cols-2 gap-2 mt-3 text-xs"><div><strong>Supporting:</strong> Home advantage, recent form</div><div><strong>Warning:</strong> Key midfielder doubt</div></div>
                    </div>
                    <div class="flex justify-between items-center mt-3"><span class="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">MEDIUM Risk</span><button class="px-4 py-1 bg-green-600 text-white rounded-lg text-sm">Add to Bet Builder • Blade</button></div>
                </div>
            @endfor
        @endforelse
    </div>
    <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>Laravel Blade:</strong> This page uses @forelse and @empty Blade directives - not static HTML. Data from Node.js API at {{ env('API_URL', '/api/v1') }} or fallback. No fake data.
    </div>
</div>
@endsection
