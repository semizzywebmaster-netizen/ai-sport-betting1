<?php

return [
    'enabled' => true,
    'providers' => [
        // Trending AI providers - future: add new provider as addon without core change
        'openai' => ['enabled' => true, 'model' => 'gpt-4', 'priority' => 1, 'addon' => 'ai-predictions'],
        'anthropic' => ['enabled' => true, 'model' => 'claude-3', 'priority' => 2, 'addon' => 'ai-anthropic'], // Future addon
        'groq' => ['enabled' => true, 'model' => 'llama3', 'priority' => 3, 'addon' => 'ai-groq'], // Future addon
        // Future: Add Gemini, Cohere, etc as addons/AIGemini, addons/AICohere
    ],
    'features' => [
        'confidence' => true,
        'risk' => true,
        'reasoning' => true,
        'supporting_factors' => true,
        'warning_factors' => true,
        'no_guaranteed_wins' => true, // Critical - analytical estimates only
    ],
    'future_addons' => [
        'AI provider as addon: drop addons/AIGemini with addon.json and provider',
        'Custom model as addon: addons/FootballAI, addons/BasketballAI',
        'Accuracy tracking as addon: addons/AIAccuracy'
    ]
];
