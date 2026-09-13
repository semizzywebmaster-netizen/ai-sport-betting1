<?php

namespace App\Services\Sports;

interface SportsProviderInterface
{
    public function getFixtures(string $sport, array $params = []): array;
    public function getOdds(string $fixtureId, string $sport): array;
    public function getTeams(string $sport, array $params = []): array;
    public function getLeagues(string $sport): array;
}
