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

/*
|--------------------------------------------------------------------------
| Web Routes - Laravel 11 + Addon Architecture - Future features as addons
|--------------------------------------------------------------------------
| Core routes + Addon routes auto-loaded
| Trending: Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5
| cPanel Compatible: No Docker/Redis
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Core routes - always available
Route::get('/health', function () {
    $manager = app(\App\Addons\AddonManager::class);
    return response()->json([
        'success' => true,
        'message' => 'Punter Prediction Laravel 11 + Addon Architecture - cPanel Ready',
        'version' => '2.0.0-addon',
        'php' => PHP_VERSION,
        'laravel' => app()->version(),
        'deployment' => 'laravel-cpanel-addons',
        'stack' => 'Laravel 11 + Livewire 3 + Tailwind 3.4 + Alpine 3 + Vite 5 + Addon System',
        'trending' => ['Laravel 11', 'Livewire 3', 'Tailwind 3.4', 'Alpine 3', 'Addon Architecture'],
        'cpanelCompatible' => true,
        'addonSystem' => true,
        'totalAddons' => count($manager->all()),
        'enabledAddons' => count($manager->enabled()),
        'addons' => array_keys($manager->enabled()),
        'modular' => 'Future features as addons without touching core',
        'timestamp' => now()->toISOString(),
    ]);
});

// Load addon routes - modular - future features as addons without touching core
$addonManager = new \App\Addons\AddonManager();
foreach ($addonManager->enabled() as $addon) {
    $webRoute = $addon->path . '/routes/web.php';
    if (file_exists($webRoute) && $addon->slug !== 'core') {
        // Include addon web routes - they define their own prefix
        // For safety, we load via require in group
        Route::group([], function () use ($webRoute) {
            require $webRoute;
        });
    }
}

// Fallback core routes if addons not loaded (for compatibility)
Route::prefix('football')->name('football.')->group(function () {
    Route::get('/', [FootballController::class, 'index'])->name('index');
    Route::get('/leagues', [FootballController::class, 'leagues'])->name('leagues');
    Route::get('/fixtures', [FootballController::class, 'fixtures'])->name('fixtures');
});

Route::prefix('basketball')->name('basketball.')->group(function () {
    Route::get('/', [BasketballController::class, 'index'])->name('index');
    Route::get('/leagues', [BasketballController::class, 'leagues'])->name('leagues');
});

Route::prefix('predictions')->name('predictions.')->group(function () {
    Route::get('/', [PredictionController::class, 'index'])->name('index');
});

Route::prefix('bet-builder')->name('bet-builder.')->group(function () {
    Route::get('/', [BetBuilderController::class, 'index'])->name('index');
});

Route::prefix('wallet')->name('wallet.')->middleware('auth')->group(function () {
    Route::get('/', [WalletController::class, 'index'])->name('index');
});

Route::prefix('community')->name('community.')->group(function () {
    Route::get('/', [CommunityController::class, 'index'])->name('index');
});

Route::get('/search', [HomeController::class, 'search'])->name('search');

// Auth
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

// Pages
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/responsible-betting', [HomeController::class, 'responsibleBetting'])->name('responsible-betting');
Route::get('/privacy', [HomeController::class, 'privacy'])->name('privacy');
Route::get('/terms', [HomeController::class, 'terms'])->name('terms');

// Admin - Addon system management
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/addons', function () {
        $manager = app(\App\Addons\AddonManager::class);
        return view('admin.addons', ['addons' => $manager->all(), 'enabled' => $manager->enabled()]);
    })->name('addons');
});

Route::get('/up', function () { return response()->json(['status' => 'ok']); });
