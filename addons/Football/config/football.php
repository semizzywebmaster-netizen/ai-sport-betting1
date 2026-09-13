<?php

return [
    'enabled' => true,
    'icon' => '⚽',
    'color' => 'green',
    'leagues' => [
        // Dynamic - not hard-coded 3 - future leagues added as config, not code
        'premier-league' => ['name' => 'Premier League', 'country' => 'England', 'enabled' => true],
        'la-liga' => ['name' => 'La Liga', 'country' => 'Spain', 'enabled' => true],
        'bundesliga' => ['name' => 'Bundesliga', 'country' => 'Germany', 'enabled' => true],
        'serie-a' => ['name' => 'Serie A', 'country' => 'Italy', 'enabled' => true],
        'ligue-1' => ['name' => 'Ligue 1', 'country' => 'France', 'enabled' => true],
        'champions-league' => ['name' => 'Champions League', 'country' => 'World', 'enabled' => true],
        'npfl' => ['name' => 'NPFL', 'country' => 'Nigeria', 'enabled' => true],
        // Future: Add new leagues here without touching core - addon config
    ],
    'features' => ['live_scores', 'odds', 'predictions', 'form', 'h2h'],
    'addon_type' => 'sports',
    'future_extensions' => [
        'Add new league via config only',
        'Custom markets as separate addon: addons/FootballMarkets',
        'Football AI models as addon: addons/FootballAI'
    ]
];
