<?php

return [
    'enabled' => true,
    'icon' => '🏀',
    'color' => 'orange',
    'equal_treatment' => true,
    'leagues' => [
        'nba' => ['name' => 'NBA', 'country' => 'USA', 'enabled' => true],
        'euroleague' => ['name' => 'EuroLeague', 'country' => 'World', 'enabled' => true],
        'nbl' => ['name' => 'NBL', 'country' => 'Australia', 'enabled' => true],
        // Future: Add leagues via config - no core change
    ],
    'note' => 'Equal first-class as Football - same AI, same features - addon architecture allows future basketball-specific addons'
];
