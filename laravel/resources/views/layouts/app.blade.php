<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Punter Prediction - AI Sports Intelligence')</title>
    <meta name="description" content="@yield('description', 'Professional AI-powered football and basketball predictions. Analytical estimates for Premier League, NBA, La Liga, Champions League & more. 18+ Responsible betting.')">
    <meta name="keywords" content="football predictions, basketball predictions, AI betting, Premier League, NBA, bet builder, punter prediction, laravel, cpanel">
    
    <!-- Open Graph -->
    <meta property="og:title" content="@yield('og_title', 'Punter Prediction - AI Sports Intelligence')">
    <meta property="og:description" content="@yield('og_description', 'AI-powered football & basketball predictions with equal first-class treatment')">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="en_NG">
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#16a34a">
    
    <!-- Tailwind CSS via CDN for cPanel simplicity (or use Vite) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#16a34a',
                        sport: { football: '#16a34a', basketball: '#ea580c' }
                    }
                }
            }
        }
    </script>
    <style>
        :root { --primary: #16a34a; }
        .gradient-brand { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); }
        .gradient-sport { background: linear-gradient(135deg, #16a34a 0%, #ea580c 100%); }
        .card-hover { transition: all 0.3s; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    </style>
    
    @stack('styles')
</head>
<body class="min-h-screen flex flex-col bg-gray-50 font-sans antialiased">
    <!-- Header - Laravel Blade, not static HTML -->
    <header class="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div class="container mx-auto px-4 flex h-16 items-center justify-between">
            <div class="flex items-center gap-8">
                <a href="{{ route('home') }}" class="flex items-center gap-2">
                    <div class="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg">P</div>
                    <span class="font-bold text-xl hidden sm:inline">PUNTER<span class="text-green-600"> PREDICTION</span></span>
                </a>
                <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
                    <a href="{{ route('football') }}" class="flex items-center gap-1 hover:text-green-600 transition"><span class="h-2 w-2 rounded-full bg-green-600"></span> Football</a>
                    <a href="{{ route('basketball') }}" class="flex items-center gap-1 hover:text-green-600 transition"><span class="h-2 w-2 rounded-full bg-orange-600"></span> Basketball</a>
                    <a href="{{ route('predictions') }}" class="hover:text-green-600 transition">Predictions</a>
                    <a href="{{ route('bet-builder') }}" class="hover:text-green-600 transition">Bet Builder</a>
                    <a href="{{ route('community') }}" class="hover:text-green-600 transition">Community</a>
                </nav>
            </div>
            <div class="flex items-center gap-2">
                <span class="hidden sm:flex px-3 py-1 rounded-full bg-gradient-to-r from-green-600 to-orange-500 text-white text-xs font-semibold">AI Powered • Laravel Blade</span>
                @auth
                    <a href="{{ route('wallet') }}" class="text-sm hover:text-green-600">Wallet</a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="px-4 py-2 text-sm border rounded-xl hover:bg-gray-100">Logout ({{ auth()->user()->username ?? 'User' }})</button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="px-4 py-2 text-sm hover:bg-gray-100 rounded-xl">Login</a>
                    <a href="{{ route('register') }}" class="px-6 py-2 text-sm bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg">Join Now</a>
                @endauth
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
        @if(session('success'))
            <div class="container mx-auto px-4 mt-4">
                <div class="p-4 bg-green-100 border border-green-200 text-green-800 rounded-xl">{{ session('success') }}</div>
            </div>
        @endif
        
        @if(session('error'))
            <div class="container mx-auto px-4 mt-4">
                <div class="p-4 bg-red-100 border border-red-200 text-red-800 rounded-xl">{{ session('error') }}</div>
            </div>
        @endif

        @yield('content')
    </main>

    <!-- Footer - Blade -->
    <footer class="border-t bg-white mt-12">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
                <div class="col-span-2">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="h-9 w-9 rounded-xl bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold">P</div>
                        <span class="font-bold text-lg">PUNTER PREDICTION</span>
                        <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Laravel Blade</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-4">AI-powered sports intelligence for football and basketball. Analytical estimates, not guarantees. 18+ only. Bet responsibly. Laravel Blade templates for cPanel PHP hosting, not static HTML.</p>
                    <div class="flex gap-2 text-xs">
                        <span class="px-2 py-1 rounded bg-green-100 text-green-800">⚽ Football</span>
                        <span class="px-2 py-1 rounded bg-orange-100 text-orange-800">🏀 Basketball</span>
                        <span class="px-2 py-1 rounded bg-blue-100 text-blue-800">🤖 AI Powered</span>
                        <span class="px-2 py-1 rounded bg-purple-100 text-purple-800">🔷 Laravel Blade</span>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Sports</h4>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="{{ route('football') }}">Football Predictions</a></li>
                        <li><a href="{{ route('basketball') }}">Basketball Predictions</a></li>
                        <li><a href="{{ route('leagues') }}">Leagues</a></li>
                        <li><a href="{{ route('predictions') }}">Predictions</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Tools</h4>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="{{ route('bet-builder') }}">Bet Builder</a></li>
                        <li><a href="{{ route('bet-codes') }}">Bet Codes</a></li>
                        <li><a href="{{ route('ai-assistant') }}">AI Assistant</a></li>
                        <li><a href="/health">Health Check</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-3">Support</h4>
                    <ul class="space-y-2 text-sm text-gray-600">
                        <li><a href="{{ route('about') }}">About</a></li>
                        <li><a href="{{ route('how-it-works') }}">How It Works</a></li>
                        <li><a href="{{ route('responsible-betting') }}">Responsible Betting</a></li>
                        <li><a href="{{ route('contact') }}">Contact</a></li>
                        <li><a href="{{ route('privacy') }}">Privacy</a></li>
                        <li><a href="{{ route('terms') }}">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                <p>© 2026 Punter Prediction. All rights reserved. 18+ | Analytical estimates only, not guaranteed outcomes. Laravel Blade templates for cPanel.</p>
                <div class="flex items-center gap-4">
                    <span>🇳🇬 NGN • Africa/Lagos</span>
                    <span>🔒 Secure & Responsible</span>
                    <span>🔷 Laravel {{ app()->version() }}</span>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bottom Nav Mobile -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t px-2 py-2">
        <div class="flex justify-around">
            <a href="{{ route('home') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🏠</span><span class="mt-1">Home</span></a>
            <a href="{{ route('football') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">⚽</span><span class="mt-1">Football</span></a>
            <a href="{{ route('basketball') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🏀</span><span class="mt-1">Basket</span></a>
            <a href="{{ route('predictions') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🎯</span><span class="mt-1">Predict</span></a>
            <a href="{{ route('bet-builder') }}" class="flex flex-col items-center p-2 rounded-xl text-xs text-gray-600"><span class="text-lg">🧩</span><span class="mt-1">Builder</span></a>
        </div>
    </div>

    @stack('scripts')
</body>
</html>
