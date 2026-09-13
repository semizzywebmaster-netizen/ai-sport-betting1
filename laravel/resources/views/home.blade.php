@extends('layouts.app')

@section('title', 'Punter Prediction - AI Sports Intelligence - Laravel Blade')
@section('description', 'Professional AI-powered football and basketball predictions. Laravel Blade templates for cPanel PHP hosting, not static HTML. 18+ Responsible betting.')

@section('content')
<div class="flex flex-col">
    <!-- Hero - Laravel Blade -->
    <section class="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div class="container mx-auto px-4 py-20 md:py-32 relative">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="space-y-6">
                    <div class="flex gap-2 flex-wrap">
                        <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/20">⚽ Football</span>
                        <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/20">🏀 Basketball</span>
                        <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/20">🤖 AI Powered</span>
                        <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/20">🔷 Laravel Blade</span>
                        <span class="px-3 py-1 rounded-full bg-white/20 text-white text-xs border border-white/20">✅ cPanel PHP</span>
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold leading-tight">
                        AI-Powered<br>
                        <span class="text-green-200">Sports Intelligence</span><br>
                        <span class="text-2xl md:text-3xl">Laravel Blade for cPanel</span>
                    </h1>
                    <p class="text-lg text-green-50/90 max-w-xl">
                        Professional predictions for football and basketball with equal first-class treatment. 
                        <strong>Laravel Blade templates, not static HTML.</strong> Built for cPanel PHP hosting, Nigerian punters. 
                        Analytical estimates, not guarantees. 18+ Responsible betting.
                    </p>
                    <div class="flex flex-wrap gap-3">
                        <a href="{{ route('predictions') }}" class="px-8 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 font-medium">View Predictions 🎯</a>
                        <a href="{{ route('bet-builder') }}" class="px-8 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 bg-transparent">Bet Builder 🧩</a>
                    </div>
                    <div class="flex items-center gap-6 pt-4 text-sm">
                        <div><div class="text-2xl font-bold">50K+</div><div class="text-green-200">Predictions</div></div>
                        <div><div class="text-2xl font-bold">Laravel</div><div class="text-green-200">Blade, not HTML</div></div>
                        <div><div class="text-2xl font-bold">cPanel</div><div class="text-green-200">PHP Ready</div></div>
                    </div>
                </div>
                <div class="relative hidden md:block">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-white">
                            <div class="text-sm text-green-100">Today's Top Pick</div>
                            <div class="text-sm mt-1">Man City vs Arsenal</div>
                            <div class="font-bold">Over 2.5 Goals</div>
                            <div class="flex items-center gap-2 mt-2"><span class="px-2 py-1 bg-green-400 text-green-900 rounded-full text-xs">72% Confidence</span><span class="text-xs">MEDIUM Risk</span></div>
                        </div>
                        <div class="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-white mt-8">
                            <div class="text-sm text-orange-100">NBA Tonight</div>
                            <div class="text-sm mt-1">Lakers vs Warriors</div>
                            <div class="font-bold">Lakers -3.5 Spread</div>
                            <div class="flex items-center gap-2 mt-2"><span class="px-2 py-1 bg-orange-400 text-orange-900 rounded-full text-xs">68% Confidence</span><span class="text-xs">LOW Risk</span></div>
                        </div>
                        <div class="bg-white text-green-900 col-span-2 rounded-2xl p-6">
                            <div class="flex justify-between items-center">
                                <div><div class="font-bold">Bet Builder • Balanced</div><div class="text-sm text-gray-600">5 selections • Target 10.0 odds</div></div>
                                <div class="text-right"><div class="text-2xl font-bold text-green-600">₦25k</div><div class="text-xs">Potential win</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Football & Basketball Equal -->
    <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4">Football & Basketball — Equal First-Class Treatment • Laravel Blade</h2>
                <p class="text-gray-600 max-w-2xl mx-auto">No afterthoughts. Both sports get full data depth, AI analysis, predictions, and bet builder support. Laravel Blade templates for cPanel PHP, not static HTML.</p>
            </div>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="border border-green-200 bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 card-hover">
                    <div class="flex items-center gap-3 mb-4"><div class="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">⚽</div><div><h3 class="font-bold text-lg">Football Intelligence</h3><p class="text-sm text-gray-600">Premier League, La Liga, Champions League & 50+ leagues</p></div></div>
                    <div class="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div class="p-2 rounded-lg bg-white border">✓ 1X2, Over/Under, BTTS</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Asian Handicap, Corners</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Live odds movement</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Form, H2H, injuries</div>
                    </div>
                    <a href="{{ route('football') }}" class="block w-full text-center py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800">Explore Football</a>
                </div>
                <div class="border border-orange-200 bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 card-hover">
                    <div class="flex items-center gap-3 mb-4"><div class="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center text-white text-xl">🏀</div><div><h3 class="font-bold text-lg">Basketball Intelligence</h3><p class="text-sm text-gray-600">NBA, EuroLeague, WNBA, NCAA & more</p></div></div>
                    <div class="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div class="p-2 rounded-lg bg-white border">✓ Moneyline, Spread</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Over/Under, Quarters</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Player props</div>
                        <div class="p-2 rounded-lg bg-white border">✓ Team totals, Halves</div>
                    </div>
                    <a href="{{ route('basketball') }}" class="block w-full text-center py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700">Explore Basketball</a>
                </div>
            </div>
        </div>
    </section>

    <!-- cPanel Laravel Advantage -->
    <section class="py-16 bg-gray-100">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center mb-8">Why Laravel Blade for cPanel? Not Static HTML</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="bg-white rounded-2xl p-6 border"><h3 class="font-bold flex items-center gap-2">🔷 Laravel Blade</h3><p class="text-sm text-gray-600 mt-2">Dynamic Blade templates with @extends, @section, @if, @foreach - not static HTML. Full PHP logic, auth, sessions, CSRF protection.</p></div>
                <div class="bg-white rounded-2xl p-6 border"><h3 class="font-bold flex items-center gap-2">✅ cPanel PHP Native</h3><p class="text-sm text-gray-600 mt-2">Works on ordinary cPanel PHP hosting without Node.js. PHP 8.1+, MySQL, Composer. No need for Node.js app setup if using Laravel as full backend.</p></div>
                <div class="bg-white rounded-2xl p-6 border"><h3 class="font-bold flex items-center gap-2">🔗 API Integration</h3><p class="text-sm text-gray-600 mt-2">Laravel frontend can consume Node.js API backend at /api/v1 or use Laravel as full backend. Single domain, no CORS if same domain.</p></div>
            </div>
            <div class="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                <p class="font-bold text-amber-900">🔞 18+ Only | Responsible Betting | Laravel Blade Templates</p>
                <p class="text-amber-800 text-sm max-w-3xl mx-auto mt-2">Punter Prediction provides analytical estimates and statistical insights, not guaranteed outcomes. No prediction is 100% sure. Betting involves risk. Never bet more than you can afford to lose. Predictions are for informational purposes only. Laravel Blade for cPanel PHP hosting.</p>
            </div>
        </div>
    </section>
</div>
@endsection
