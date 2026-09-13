<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FootballController;
use App\Http\Controllers\BasketballController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\BetBuilderController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\AdminController;
use App\Livewire\SearchComponent;
use App\Livewire\BetBuilderComponent;
use App\Livewire\PredictionList;

/*
|--------------------------------------------------------------------------
| Web Routes - Laravel 11 + Livewire 3 - cPanel Native
|--------------------------------------------------------------------------
| Trending Stack: Laravel 11, Livewire 3, Alpine 3, Tailwind 3.4, Vite 5
| cPanel Compatible: PHP 8.2+, MySQL, no Redis/Docker required
| Football & Basketball Equal First-Class Treatment
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Sports - Equal first-class treatment - Trending: Dynamic leagues, not hard-coded small list
Route::prefix('football')->name('football.')->group(function () {
    Route::get('/', [FootballController::class, 'index'])->name('index');
    Route::get('/leagues', [FootballController::class, 'leagues'])->name('leagues');
    Route::get('/fixtures', [FootballController::class, 'fixtures'])->name('fixtures');
    Route::get('/fixtures/{id}', [FootballController::class, 'show'])->name('show');
    Route::get('/teams', [FootballController::class, 'teams'])->name('teams');
    Route::get('/teams/{id}', [FootballController::class, 'team'])->name('team');
});

Route::prefix('basketball')->name('basketball.')->group(function () {
    Route::get('/', [BasketballController::class, 'index'])->name('index');
    Route::get('/leagues', [BasketballController::class, 'leagues'])->name('leagues');
    Route::get('/games', [BasketballController::class, 'games'])->name('games');
    Route::get('/games/{id}', [BasketballController::class, 'show'])->name('show');
    Route::get('/teams', [BasketballController::class, 'teams'])->name('teams');
});

// Predictions - AI with confidence, risk, reasoning - Trending: Livewire 3 for dynamic filtering
Route::prefix('predictions')->name('predictions.')->group(function () {
    Route::get('/', [PredictionController::class, 'index'])->name('index');
    Route::get('/football', [PredictionController::class, 'football'])->name('football');
    Route::get('/basketball', [PredictionController::class, 'basketball'])->name('basketball');
    Route::get('/{id}', [PredictionController::class, 'show'])->name('show');
    Route::get('/accuracy/stats', [PredictionController::class, 'accuracy'])->name('accuracy');
});

// Bet Builder - Smart builder with strategies - Trending: Alpine.js for interactivity
Route::prefix('bet-builder')->name('bet-builder.')->group(function () {
    Route::get('/', [BetBuilderController::class, 'index'])->name('index');
    Route::get('/codes', [BetBuilderController::class, 'codes'])->name('codes');
    Route::get('/codes/{code}', [BetBuilderController::class, 'lookup'])->name('lookup');
    Route::get('/history', [BetBuilderController::class, 'history'])->name('history')->middleware('auth');
});

// Wallet - Separate cash and credits - cPanel compatible
Route::prefix('wallet')->name('wallet.')->middleware('auth')->group(function () {
    Route::get('/', [WalletController::class, 'index'])->name('index');
    Route::get('/transactions', [WalletController::class, 'transactions'])->name('transactions');
    Route::get('/credits', [WalletController::class, 'credits'])->name('credits');
    Route::post('/deposit', [WalletController::class, 'deposit'])->name('deposit');
});

// Community - Posts, likes, follows, analyst leaderboard - Trending: Livewire
Route::prefix('community')->name('community.')->group(function () {
    Route::get('/', [CommunityController::class, 'index'])->name('index');
    Route::get('/analysts', [CommunityController::class, 'analysts'])->name('analysts');
    Route::get('/leaderboard', [CommunityController::class, 'leaderboard'])->name('leaderboard');
    Route::get('/posts/{id}', [CommunityController::class, 'show'])->name('show');
});

// Search - Global search - Trending: Livewire 3 real-time search
Route::get('/search', [HomeController::class, 'search'])->name('search');
Route::get('/livewire/search', SearchComponent::class)->name('livewire.search');

// Auth - Laravel Blade + Sanctum
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/forgot-password', [AuthController::class, 'forgotForm'])->name('password.request');
    Route::post('/forgot-password', [AuthController::class, 'forgot']);
    Route::get('/reset-password/{token}', [AuthController::class, 'resetForm'])->name('password.reset');
    Route::post('/reset-password', [AuthController::class, 'reset']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Public info - Blade templates
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/how-it-works', [HomeController::class, 'howItWorks'])->name('how-it-works');
Route::get('/help', [HomeController::class, 'help'])->name('help');
Route::get('/faq', [HomeController::class, 'faq'])->name('faq');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/responsible-betting', [HomeController::class, 'responsibleBetting'])->name('responsible-betting');
Route::get('/privacy', [HomeController::class, 'privacy'])->name('privacy');
Route::get('/terms', [HomeController::class, 'terms'])->name('terms');
Route::get('/cookie-policy', [HomeController::class, 'cookiePolicy'])->name('cookie-policy');

// Admin - Single admin system - cPanel compatible
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::get('/sports', [AdminController::class, 'sports'])->name('sports');
    Route::get('/predictions', [AdminController::class, 'predictions'])->name('predictions');
    Route::get('/finance', [AdminController::class, 'finance'])->name('finance');
    Route::get('/settings', [AdminController::class, 'settings'])->name('settings');
});

// Health - cPanel verification
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Punter Prediction Laravel 11 - cPanel PHP Native - Single File Ready',
        'version' => '1.0.0',
        'php' => PHP_VERSION,
        'laravel' => app()->version(),
        'deployment' => 'laravel-cpanel',
        'stack' => 'Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5',
        'trending' => ['Laravel 11', 'Livewire 3', 'Tailwind 3.4', 'Alpine 3', 'Vite 5'],
        'cpanelCompatible' => true,
        'noDocker' => true,
        'noRedis' => true,
        'football' => true,
        'basketball' => true,
        'blade' => 'not-html',
        'timestamp' => now()->toISOString(),
    ]);
});

Route::get('/up', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()]);
});
