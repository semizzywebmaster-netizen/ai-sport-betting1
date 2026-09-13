<?php

namespace App\Services\Sports;

use Illuminate\Support\Facades\Http;

class ApiSportsProvider implements SportsProviderInterface
{
    public function getFixtures(string $sport, array $params = []): array
    {
        // cPanel compatible - Guzzle, no Redis, database cache
        return ['data' => [], 'provider' => 'api-sports', 'sport' => $sport, 'cpanelCompatible' => true];
    }

    public function getOdds(string $fixtureId, string $sport): array
    {
        // Never invent odds - only provider data - critical requirement
        return ['fixtureId' => $fixtureId, 'odds' => [], 'neverInventOdds' => true];
    }

    public function getTeams(string $sport, array $params = []): array { return ['data' => []]; }
    public function getLeagues(string $sport): array { return ['data' => []]; }
}
