<?php

return [
    'enabled' => true,
    'providers' => [
        'paystack' => ['enabled' => true, 'addon' => 'payments', 'server_verification_only' => true],
        'flutterwave' => ['enabled' => true, 'addon' => 'payments', 'server_verification_only' => true],
        // Future: Add new payment as addon: addons/PaymentsStripe, addons/PaymentsCrypto, addons/PaymentsBankTransfer
    ],
    'server_verification_only' => true, // Never trust client
    'cpanel_compatible' => true,
    'future_addons' => [
        'New payment gateway as addon: drop addons/PaymentsPayPal with addon.json',
        'Crypto payments as addon: addons/PaymentsCrypto',
        'Bank transfer as addon: addons/PaymentsBank'
    ]
];
