<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Punter Prediction - Laravel 11 + Livewire 3 - AI Sports Intelligence')</title>
    <meta name="description" content="@yield('description', 'Professional AI-powered football and basketball predictions. Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 - cPanel PHP Native - 18+ Responsible betting.')">
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    
    <style>
        [x-cloak] { display: none !important; }
    </style>
</head>
<body class="min-h-screen flex flex-col bg-gray-50 font-sans antialiased" x-data="{ mobileMenu: false }">
    <!-- Header - Laravel 11 + Livewire 3 + Tailwind -->
    <header class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div class="container mx-auto px-4 flex h-16 items-center justify-between">
            <div class="flex items-center gap-8">
                <a href="{{ route('home') }}" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-xl bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-lg">P</div>
                    <span class="font-bold text-xl hidden sm:inline">PUNTER<span class="text-green-600"> PREDICTION</span></span>
                    <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full hidden md:inline">Laravel 11 + Livewire 3</span>
                </a>
                <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
                    <a href="{{ route('football.index') }}" class="flex items-center gap-1 hover:text-green-600 transition"><span class="h-2 w-2 rounded-full bg-green-600"></span> Football</a>
                    <a href="{{ route('basketball.index') }}" class="flex items-center gap-1 hover:text-green-600 transition"><span class="h-2 w-2 rounded-full bg-orange-600"></span> Basketball</a>
                    <a href="{{ route('predictions.index') }}" class="hover:text-green-600 transition">Predictions</a>
                    <a href="{{ route('bet-builder.index') }}" class="hover:text-green-600 transition">Bet Builder</a>
                    <a href="{{ route('community.index') }}" class="hover:text-green-600 transition">Community</a>
                </nav>
            </div>
            <div class="flex items-center gap-2">
                <span class="hidden sm:flex px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-orange-500 text-white text-xs font-semibold">AI Powered • cPanel Ready</span>
                @auth
                    <a href="{{ route('wallet.index') }}" class="text-sm hover:text-green-600">₦{{ auth()->user()->wallet->cash_balance ?? 0 }}</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="px-4 py-2 text-sm border rounded-xl hover:bg-gray-100">Logout</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="px-4 py-2 text-sm hover:bg-gray-100 rounded-xl">Login</a>
                    <a href="{{ route('register') }}" class="px-6 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-lg">Join Now</a>
                @endauth
                <button @click="mobileMenu = !mobileMenu" class="md:hidden p-2">☰</button>
            </div>
        </div>
        <!-- Mobile Menu - Alpine.js -->
        <div x-show="mobileMenu" x-cloak class="md:hidden border-t bg-white p-4 space-y-3">
            <a href="{{ route('football.index') }}" class="block py-2">⚽ Football</a>
            <a href="{{ route('basketball.index') }}" class="block py-2">🏀 Basketball</a>
            <a href="{{ route('predictions.index') }}" class="block py-2">🎯 Predictions</a>
            <a href="{{ route('bet-builder.index') }}" class="block py-2">🧩 Bet Builder</a>
            <a href="{{ route('community.index') }}" class="block py-2">💬 Community</a>
        </div>
    </header>

    <main class="flex-1 pb-20 md:pb-0">
        @if(session('success'))
            <div class="container mx-auto px-4 mt-4"><div class="p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl">{{ session('success') }}</div></div>
        @endif
        @yield('content')
        {{ $slot ?? '' }}
    </main>

    <footer class="border-t bg-white mt-12">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div class="col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="h-9 w-9 rounded-xl bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold">P</div>
                        <span class="font-bold text-lg">PUNTER PREDICTION</span>
                        <span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Laravel 11</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">AI-powered sports intelligence for football and basketball. Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 - cPanel PHP Native. Analytical estimates, not guarantees. 18+ only.</p>
                    <div class="flex gap-2 text-xs flex-wrap">
                        <span class="px-2 py-1 rounded bg-green-100 text-green-800">⚽ Football</span>
                        <span class="px-2 py-1 rounded bg-orange-100 text-orange-800">🏀 Basketball</span>
                        <span class="px-2 py-1 rounded bg-blue-100 text-blue-800">🤖 AI Powered</span>
                        <span class="px-2 py-1 rounded bg-purple-100 text-purple-800">🔷 Laravel 11</span>
                        <span class="px-2 py-1 rounded bg-pink-100 text-pink-800">⚡ Livewire 3</span>
                    </div>
                </div>
                <div><h4 class="font-semibold mb-3">Sports</h4><ul class="space-y-2 text-sm text-gray-600"><li><a href="{{ route('football.index') }}">Football</a></li><li><a href="{{ route('basketball.index') }}">Basketball</a></li><li><a href="{{ route('predictions.index') }}">Predictions</a></li></ul></div>
                <div><h4 class="font-semibold mb-3">Tools</h4><ul class="space-y-2 text-sm text-gray-600"><li><a href="{{ route('bet-builder.index') }}">Bet Builder</a></li><li><a href="{{ route('bet-builder.codes') }}">Bet Codes</a></li><li><a href="{{ route('wallet.index') }}">Wallet</a></li></ul></div>
                <div><h4 class="font-semibold mb-3">Support</h4><ul class="space-y-2 text-sm text-gray-600"><li><a href="{{ route('about') }}">About</a></li><li><a href="{{ route('responsible-betting') }}">Responsible Betting</a></li><li><a href="{{ route('privacy') }}">Privacy</a></li><li><a href="{{ route('terms') }}">Terms</a></li></ul></div>
            </div>
            <div class="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                <p>© 2026 Punter Prediction. 18+ | Analytical estimates only, not guaranteed. Laravel 11 + Livewire 3 + Tailwind - cPanel Ready.</p>
                <div class="flex items-center gap-4"><span>🇳🇬 NGN • Africa/Lagos</span><span>🔷 Laravel {{ app()->version() }}</span><span>⚡ Livewire 3 + Alpine 3</span></div>
            </div>
        </div>
    </footer>

    <!-- Bottom Nav Mobile - Alpine -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t px-2 py-2">
        <div class="flex justify-around">
            <a href="{{ route('home') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🏠</span><span>Home</span></a>
            <a href="{{ route('football.index') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">⚽</span><span>Football</span></a>
            <a href="{{ route('basketball.index') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🏀</span><span>Basket</span></a>
            <a href="{{ route('predictions.index') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🎯</span><span>Predict</span></a>
            <a href="{{ route('bet-builder.index') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🧩</span><span>Builder</span></a>
        </div>
    </div>

    @livewireScripts
    @stack('scripts')
</body>
</html>
