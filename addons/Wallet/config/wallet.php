<?php

return [
    'enabled' => true,
    'separate_ledgers' => true, // Critical - cash vs credits separate
    'ledgers' => [
        'cash' => ['table' => 'wallets', 'type' => 'real_money', 'currency' => 'NGN'],
        'credits' => ['table' => 'credit_balances', 'type' => 'virtual', 'not_cash' => true],
    ],
    'future_addons' => [
        'New currency as addon: addons/WalletUSD, addons/WalletCrypto',
        'Wallet analytics as addon: addons/WalletAnalytics',
        'Bonus system as addon: addons/WalletBonus'
    ]
];
