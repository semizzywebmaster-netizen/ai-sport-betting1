<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SportsController;
use App\Http\Controllers\Api\PredictionController;
use App\Http\Controllers\Api\BetBuilderController;
use App\Http\Controllers\Api\WalletController;
use App\Http\Controllers\Api\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes - /api/v1 - Laravel 11 - cPanel Compatible
|--------------------------------------------------------------------------
| Trending: Laravel Sanctum, API Resources, MySQL, no Redis
*/

Route::prefix('v1')->group(function () {
    // Public
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'status' => 'healthy',
                'version' => '1.0.0',
                'deployment' => 'laravel-cpanel',
                'stack' => 'Laravel 11 + MySQL + Sanctum',
                'cpanelCompatible' => true,
                'trending' => ['Laravel 11', 'Livewire 3', 'Tailwind 3.4'],
            ]
        ]);
    });

    // Auth - Public
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    });

    // Sports - Public - Equal football & basketball
    Route::prefix('sports')->group(function () {
        Route::get('/', [SportsController::class, 'sports']);
        Route::get('/leagues', [SportsController::class, 'leagues']);
        Route::get('/leagues/supported', [SportsController::class, 'supportedLeagues']);
        Route::get('/teams', [SportsController::class, 'teams']);
        Route::get('/fixtures', [SportsController::class, 'fixtures']);
        Route::get('/fixtures/{id}', [SportsController::class, 'fixture']);
        Route::get('/players', [SportsController::class, 'players']);
    });

    // Predictions - Public
    Route::prefix('predictions')->group(function () {
        Route::get('/', [PredictionController::class, 'index']);
        Route::get('/{id}', [PredictionController::class, 'show']);
        Route::get('/accuracy/stats', [PredictionController::class, 'accuracy']);
    });

    // Search - Public
    Route::get('/search', [SportsController::class, 'search']);

    // Odds - Public
    Route::prefix('odds')->group(function () {
        Route::get('/fixture/{fixtureId}', [SportsController::class, 'odds']);
        Route::get('/movement/{oddsId}', [SportsController::class, 'oddsMovement']);
    });

    // Bet Codes - Public lookup
    Route::get('/bet-builder/lookup/{code}', [BetBuilderController::class, 'lookup']);

    // Protected - Auth Sanctum
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::get('/me', [AuthController::class, 'me']);
            Route::get('/sessions', [AuthController::class, 'sessions']);
        });

        Route::prefix('predictions')->group(function () {
            Route::post('/', [PredictionController::class, 'store']);
        });

        Route::prefix('bet-builder')->group(function () {
            Route::post('/', [BetBuilderController::class, 'store']);
            Route::get('/', [BetBuilderController::class, 'index']);
            Route::get('/{id}', [BetBuilderController::class, 'show']);
            Route::post('/{id}/code', [BetBuilderController::class, 'generateCode']);
            Route::post('/optimize', [BetBuilderController::class, 'optimize']);
            Route::post('/merge', [BetBuilderController::class, 'merge']);
        });

        Route::prefix('wallet')->group(function () {
            Route::get('/', [WalletController::class, 'index']);
            Route::get('/transactions', [WalletController::class, 'transactions']);
            Route::get('/credits', [WalletController::class, 'credits']);
        });

        Route::prefix('payments')->group(function () {
            Route::post('/initialize', [PaymentController::class, 'initialize']);
            Route::get('/verify/{reference}', [PaymentController::class, 'verify']);
        });

        Route::get('/referrals', [WalletController::class, 'referrals']);
        Route::get('/notifications', [WalletController::class, 'notifications']);
    });

    // Webhooks - Public but signature verified
    Route::post('/payments/webhook/paystack', [PaymentController::class, 'paystackWebhook']);
    Route::post('/payments/webhook/flutterwave', [PaymentController::class, 'flutterwaveWebhook']);
    Route::post('/whatsapp/webhook', [PaymentController::class, 'whatsappWebhook']);
    Route::get('/whatsapp/webhook', [PaymentController::class, 'whatsappVerify']);
});
