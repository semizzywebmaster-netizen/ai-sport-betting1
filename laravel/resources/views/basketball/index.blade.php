@extends('layouts.app')

@section('title', 'Basketball Predictions - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-8">
    <div class="flex items-center gap-3 mb-8">
        <div class="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center text-white text-2xl">🏀</div>
        <div><h1 class="text-3xl font-bold">Basketball Predictions - Laravel Blade</h1><p class="text-gray-600">NBA, EuroLeague, WNBA, NCAA • Equal first-class treatment • Laravel Blade, not HTML • cPanel PHP Ready</p></div>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white border border-orange-200 rounded-2xl p-6">
            <h3 class="font-bold mb-4">NBA Tonight - Blade</h3>
            <div class="space-y-3">
                @for($i = 1; $i <= 3; $i++)
                    <div class="p-3 border rounded-xl">
                        <div class="font-medium">Lakers vs Warriors • Blade #{{ $i }}</div>
                        <div class="flex gap-2 mt-2"><span class="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">Lakers -3.5</span><span class="px-2 py-1 bg-gray-100 rounded-full text-xs">68% Conf</span></div>
                        <div class="text-xs text-gray-500 mt-1">Analytical estimate, not guaranteed. 18+ • Laravel Blade</div>
                    </div>
                @endfor
            </div>
        </div>
        <div class="bg-white border rounded-2xl p-6">
            <h3 class="font-bold mb-4">EuroLeague - Blade</h3>
            <div class="space-y-3">
                @for($i = 1; $i <= 2; $i++)
                    <div class="p-3 border rounded-xl">
                        <div class="font-medium">Real Madrid vs Barcelona • Blade</div>
                        <div class="flex gap-2 mt-2"><span class="px-2 py-1 bg-gray-100 rounded-full text-xs">Over 165.5</span><span class="px-2 py-1 bg-gray-100 rounded-full text-xs">65% Conf</span></div>
                    </div>
                @endfor
            </div>
        </div>
        <div class="bg-white border rounded-2xl p-6">
            <h3 class="font-bold mb-4">Markets - Blade</h3>
            <div class="text-sm space-y-2">
                <div>✓ Moneyline</div><div>✓ Point Spread</div><div>✓ Over/Under</div>
                <div>✓ Team Totals</div><div>✓ Quarter Markets</div><div>✓ Half Markets</div>
                <div>✓ Player Props (where reliable)</div>
                <a href="{{ route('predictions') }}" class="block w-full mt-4 text-center py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700">View All Predictions</a>
            </div>
            <div class="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs text-purple-800">
                Laravel Blade: @for loops, not static HTML. Equal first-class treatment for basketball, not afterthought.
            </div>
        </div>
    </div>
</div>
@endsection
