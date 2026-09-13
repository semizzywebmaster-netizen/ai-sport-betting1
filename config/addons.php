<?php

/**
 * Addons Configuration - Modular Architecture - Future Features as Addons
 * Trending: Laravel 11 + cPanel compatible - file driver, no Redis
 * Add new features as addons/ without touching core
 */

return [
    /*
    |--------------------------------------------------------------------------
    | Addons Path
    |--------------------------------------------------------------------------
    */
    'path' => base_path('addons'),

    /*
    |--------------------------------------------------------------------------
    | Enabled Addons - Override addon.json enabled
    |--------------------------------------------------------------------------
    | Set false to disable addon without deleting folder - cPanel friendly
    */
    'core' => ['enabled' => true, 'is_core' => true],
    'football' => ['enabled' => true],
    'basketball' => ['enabled' => true],
    'ai-predictions' => ['enabled' => true],
    'betbuilder' => ['enabled' => true],
    'wallet' => ['enabled' => true],
    'payments' => ['enabled' => true],
    'community' => ['enabled' => true],
    'referrals' => ['enabled' => true],
    'subscriptions' => ['enabled' => true],
    'whatsapp' => ['enabled' => true],
    'notifications' => ['enabled' => true],
    'gamification' => ['enabled' => true],
    'analytics' => ['enabled' => true],

    /*
    |--------------------------------------------------------------------------
    | Future Addons - Examples of how to add new features
    |--------------------------------------------------------------------------
    | Just create addons/YourAddon/addon.json and it auto-discovers
    */
    'future_examples' => [
        'tennis' => ['enabled' => false, 'description' => 'Tennis sport as addon - drop addons/Tennis'],
        'cricket' => ['enabled' => false, 'description' => 'Cricket sport as addon'],
        'ai-gemini' => ['enabled' => false, 'description' => 'Google Gemini AI provider as addon'],
        'ai-anthropic' => ['enabled' => false, 'description' => 'Anthropic Claude as addon'],
        'payments-crypto' => ['enabled' => false, 'description' => 'Crypto payments as addon'],
        'payments-paypal' => ['enabled' => false, 'description' => 'PayPal as addon'],
        'wallet-crypto' => ['enabled' => false, 'description' => 'Crypto wallet as addon'],
        'live-streaming' => ['enabled' => false, 'description' => 'Live streaming as addon'],
        'esports' => ['enabled' => false, 'description' => 'Esports as addon'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Addon Auto-Discovery
    |--------------------------------------------------------------------------
    */
    'auto_discover' => true, // Scan addons/ folder automatically
    'cache' => false, // Set true in production with file cache - cPanel compatible

    /*
    |--------------------------------------------------------------------------
    | Addon Development
    |--------------------------------------------------------------------------
    */
    'development' => [
        'make_addon_command' => 'php artisan addon:make {name}',
        'structure' => [
            'addon.json',
            'src/Providers/AddonServiceProvider.php',
            'routes/web.php',
            'routes/api.php',
            'config/{slug}.php',
            'database/migrations/',
            'resources/views/',
            'src/Models/',
            'src/Controllers/',
        ]
    ]
];
