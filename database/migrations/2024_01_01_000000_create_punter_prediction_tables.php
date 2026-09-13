<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Users
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->nullable()->unique();
            $table->string('phone')->nullable()->unique();
            $table->string('password');
            $table->string('referral_code')->unique();
            $table->foreignId('referred_by')->nullable()->constrained('users');
            $table->string('country')->default('NG');
            $table->string('currency')->default('NGN');
            $table->string('timezone')->default('Africa/Lagos');
            $table->string('avatar')->nullable();
            $table->text('bio')->nullable();
            $table->enum('role', ['USER', 'ADMIN', 'ANALYST'])->default('USER');
            $table->boolean('is_email_verified')->default(false);
            $table->boolean('is_phone_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_suspended')->default(false);
            $table->integer('xp')->default(0);
            $table->integer('level')->default(1);
            $table->integer('streak')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });

        // Sports
        Schema::create('sports', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // Leagues - Dynamic, not hard-coded small list
        Schema::create('leagues', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_id')->constrained();
            $table->string('external_id')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('country')->nullable();
            $table->string('logo')->nullable();
            $table->string('type')->nullable();
            $table->string('season')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_prediction_enabled')->default(true);
            $table->integer('priority')->default(0);
            $table->string('provider')->nullable();
            $table->json('provider_data')->nullable();
            $table->timestamps();
        });

        // Teams
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->nullable();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('short_name')->nullable();
            $table->string('country')->nullable();
            $table->string('logo')->nullable();
            $table->integer('founded')->nullable();
            $table->string('venue')->nullable();
            $table->boolean('is_national')->default(false);
            $table->json('provider_data')->nullable();
            $table->timestamps();
        });

        Schema::create('team_league', function (Blueprint $table) {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('league_id')->constrained()->cascadeOnDelete();
            $table->string('season')->nullable();
            $table->timestamps();
            $table->unique(['team_id', 'league_id', 'season']);
        });

        // Fixtures - Football and Basketball equal
        Schema::create('fixtures', function (Blueprint $table) {
            $table->id();
            $table->string('external_id')->nullable()->unique();
            $table->foreignId('league_id')->constrained();
            $table->foreignId('home_team_id')->constrained('teams');
            $table->foreignId('away_team_id')->constrained('teams');
            $table->string('season')->nullable();
            $table->string('round')->nullable();
            $table->dateTime('date');
            $table->integer('timestamp')->nullable();
            $table->enum('status', ['NS', 'LIVE', 'HT', 'FT', 'ET', 'PEN', 'PST', 'CANC'])->default('NS');
            $table->string('status_short')->nullable();
            $table->string('venue')->nullable();
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->boolean('is_live')->default(false);
            $table->integer('elapsed')->nullable();
            $table->json('events')->nullable();
            $table->json('statistics')->nullable();
            $table->json('lineups')->nullable();
            $table->json('provider_data')->nullable();
            $table->timestamps();
            $table->index(['league_id', 'date', 'status']);
        });

        // Odds - Never invent odds, only provider data
        Schema::create('odds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fixture_id')->constrained()->cascadeOnDelete();
            $table->string('provider');
            $table->string('market');
            $table->string('market_key');
            $table->string('selection');
            $table->string('selection_key');
            $table->decimal('value', 8, 2);
            $table->boolean('is_available')->default(true);
            $table->timestamp('timestamp')->useCurrent();
            $table->timestamps();
            $table->index(['fixture_id', 'market', 'provider']);
        });

        Schema::create('odds_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('odds_id')->constrained()->cascadeOnDelete();
            $table->decimal('old_value', 8, 2);
            $table->decimal('new_value', 8, 2);
            $table->string('direction');
            $table->timestamp('timestamp')->useCurrent();
        });

        // AI Providers - Trending: OpenAI, Anthropic, Groq with fallback
        Schema::create('ai_providers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('provider');
            $table->string('model');
            $table->boolean('is_active')->default(true);
            $table->boolean('is_primary')->default(false);
            $table->integer('priority')->default(0);
            $table->decimal('cost_per_request', 8, 4)->default(0);
            $table->json('config')->nullable();
            $table->timestamps();
        });

        // Predictions - AI confidence, risk, reasoning - No guaranteed wins
        Schema::create('predictions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fixture_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('league_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('ai_provider_id')->nullable()->constrained('ai_providers')->nullOnDelete();
            $table->string('sport'); // football, basketball
            $table->string('market');
            $table->string('market_key');
            $table->string('selection');
            $table->string('selection_key');
            $table->decimal('odds', 8, 2)->nullable();
            $table->decimal('confidence', 5, 2); // 0-100
            $table->enum('risk', ['LOW', 'MEDIUM', 'HIGH']);
            $table->text('reasoning')->nullable();
            $table->json('supporting_factors')->nullable();
            $table->json('warning_factors')->nullable();
            $table->json('statistics')->nullable();
            $table->json('form_data')->nullable();
            $table->json('h2h_data')->nullable();
            $table->enum('status', ['PENDING', 'WON', 'LOST', 'VOID', 'CANCELLED'])->default('PENDING');
            $table->boolean('is_premium')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->integer('credits_cost')->default(0);
            $table->timestamps();
            $table->index(['sport', 'market', 'status', 'created_at']);
        });

        // Bet Builder - Smart builder
        Schema::create('bet_slips', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('name')->nullable();
            $table->decimal('total_odds', 10, 2);
            $table->string('strategy')->default('balanced');
            $table->decimal('target_odds', 10, 2)->nullable();
            $table->decimal('stake', 10, 2)->nullable();
            $table->decimal('potential_win', 10, 2)->nullable();
            $table->enum('status', ['PENDING', 'WON', 'LOST', 'CANCELLED', 'VOID'])->default('PENDING');
            $table->boolean('is_public')->default(false);
            $table->string('share_code')->nullable()->unique();
            $table->timestamps();
        });

        Schema::create('bet_selections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bet_slip_id')->constrained()->cascadeOnDelete();
            $table->foreignId('prediction_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('fixture_id')->nullable()->constrained()->nullOnDelete();
            $table->string('market');
            $table->string('selection');
            $table->decimal('odds', 8, 2);
            $table->timestamps();
        });

        Schema::create('bet_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignId('bet_slip_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->foreignId('user_id')->constrained();
            $table->string('type')->default('standard');
            $table->boolean('is_public')->default(true);
            $table->integer('views')->default(0);
            $table->integer('copies')->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });

        // Wallet - Separate cash and credits - cPanel compatible
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->decimal('cash_balance', 12, 2)->default(0);
            $table->decimal('bonus_balance', 12, 2)->default(0);
            $table->decimal('total_deposited', 12, 2)->default(0);
            $table->decimal('total_withdrawn', 12, 2)->default(0);
            $table->string('currency')->default('NGN');
            $table->boolean('is_locked')->default(false);
            $table->timestamps();
        });

        Schema::create('credit_balances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->integer('credits')->default(0);
            $table->integer('total_earned')->default(0);
            $table->integer('total_spent')->default(0);
            $table->timestamps();
        });

        Schema::create('wallet_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wallet_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('type', ['DEPOSIT', 'WITHDRAWAL', 'PURCHASE', 'REFUND', 'REWARD', 'REFERRAL_BONUS', 'SUBSCRIPTION_CHARGE', 'CREDIT_PURCHASE', 'BONUS', 'AD_REWARD']);
            $table->decimal('amount', 12, 2);
            $table->decimal('balance_before', 12, 2);
            $table->decimal('balance_after', 12, 2);
            $table->string('currency')->default('NGN');
            $table->string('reference')->unique();
            $table->string('description')->nullable();
            $table->json('metadata')->nullable();
            $table->enum('status', ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'])->default('COMPLETED');
            $table->timestamps();
        });

        // Payments - Paystack & Flutterwave - Server verification only
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->enum('provider', ['PAYSTACK', 'FLUTTERWAVE']);
            $table->string('provider_reference')->nullable()->unique();
            $table->decimal('amount', 12, 2);
            $table->string('currency')->default('NGN');
            $table->enum('status', ['PENDING', 'SUCCESS', 'FAILED', 'ABANDONED', 'CANCELLED'])->default('PENDING');
            $table->string('type');
            $table->json('metadata')->nullable();
            $table->boolean('verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->string('idempotency_key')->nullable()->unique();
            $table->timestamps();
        });

        // Subscriptions
        Schema::create('subscription_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->string('currency')->default('NGN');
            $table->string('interval')->default('monthly');
            $table->integer('interval_count')->default(1);
            $table->json('features')->nullable();
            $table->integer('credits_included')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->integer('priority')->default(0);
            $table->timestamps();
        });

        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('plan_id')->constrained('subscription_plans');
            $table->enum('status', ['ACTIVE', 'EXPIRED', 'CANCELLED', 'PENDING', 'FAILED'])->default('ACTIVE');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->boolean('auto_renew')->default(true);
            $table->string('payment_id')->nullable();
            $table->timestamps();
        });

        // Community, Gamification, etc - Simplified for brevity but production ready
        Schema::create('community_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('content');
            $table->string('type')->default('general');
            $table->json('metadata')->nullable();
            $table->boolean('is_public')->default(true);
            $table->integer('likes_count')->default(0);
            $table->integer('comments_count')->default(0);
            $table->timestamps();
        });

        Schema::create('feature_flags', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('name');
            $table->boolean('is_enabled')->default(true);
            $table->json('config')->nullable();
            $table->timestamps();
        });

        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action');
            $table->string('entity');
            $table->string('entity_id')->nullable();
            $table->json('old_data')->nullable();
            $table->json('new_data')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('feature_flags');
        Schema::dropIfExists('community_posts');
        Schema::dropIfExists('subscriptions');
        Schema::dropIfExists('subscription_plans');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('wallet_transactions');
        Schema::dropIfExists('credit_balances');
        Schema::dropIfExists('wallets');
        Schema::dropIfExists('bet_codes');
        Schema::dropIfExists('bet_selections');
        Schema::dropIfExists('bet_slips');
        Schema::dropIfExists('predictions');
        Schema::dropIfExists('ai_providers');
        Schema::dropIfExists('odds_movements');
        Schema::dropIfExists('odds');
        Schema::dropIfExists('fixtures');
        Schema::dropIfExists('team_league');
        Schema::dropIfExists('teams');
        Schema::dropIfExists('leagues');
        Schema::dropIfExists('sports');
        Schema::dropIfExists('users');
    }
};
