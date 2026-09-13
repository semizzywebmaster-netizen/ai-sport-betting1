<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FootballController;
use App\Http\Controllers\BasketballController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\BetBuilderController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes - Punter Prediction Laravel Frontend
|--------------------------------------------------------------------------
| cPanel PHP Hosting Compatible - No Node.js required for frontend
| Backend API can be Node.js (separate) or Laravel API
| Single File cPanel: Laravel frontend + Node.js API on same domain via /api/v1
*/

Route::get('/', [HomeController::class, 'index'])->name('home');

// Sports - Equal first-class treatment
Route::get('/football', [FootballController::class, 'index'])->name('football');
Route::get('/football/{id}', [FootballController::class, 'show'])->name('football.show');
Route::get('/basketball', [BasketballController::class, 'index'])->name('basketball');
Route::get('/basketball/{id}', [BasketballController::class, 'show'])->name('basketball.show');

Route::get('/leagues', [HomeController::class, 'leagues'])->name('leagues');
Route::get('/predictions', [PredictionController::class, 'index'])->name('predictions');
Route::get('/predictions/{id}', [PredictionController::class, 'show'])->name('predictions.show');

Route::get('/bet-builder', [BetBuilderController::class, 'index'])->name('bet-builder');
Route::get('/bet-codes', [BetBuilderController::class, 'codes'])->name('bet-codes');
Route::get('/bet-codes/{code}', [BetBuilderController::class, 'lookup'])->name('bet-codes.lookup');

Route::get('/wallet', [HomeController::class, 'wallet'])->name('wallet')->middleware('auth');
Route::get('/community', [HomeController::class, 'community'])->name('community');
Route::get('/ai-assistant', [HomeController::class, 'aiAssistant'])->name('ai-assistant');
Route::get('/search', [HomeController::class, 'search'])->name('search');

// Auth - Laravel Blade, not HTML static
Route::get('/login', [AuthController::class, 'loginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'registerForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Public info - Blade templates, not static HTML
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/how-it-works', [HomeController::class, 'howItWorks'])->name('how-it-works');
Route::get('/help', [HomeController::class, 'help'])->name('help');
Route::get('/faq', [HomeController::class, 'faq'])->name('faq');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/responsible-betting', [HomeController::class, 'responsibleBetting'])->name('responsible-betting');
Route::get('/privacy', [HomeController::class, 'privacy'])->name('privacy');
Route::get('/terms', [HomeController::class, 'terms'])->name('terms');
Route::get('/cookie-policy', [HomeController::class, 'cookiePolicy'])->name('cookie-policy');

// Health for cPanel
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'Punter Prediction Laravel Frontend - cPanel PHP Compatible',
        'version' => '1.0.0',
        'deployment' => 'laravel-cpanel',
        'php' => PHP_VERSION,
        'laravel' => app()->version(),
        'frontend' => 'blade-not-html',
        'cpanelCompatible' => true,
    ]);
});
