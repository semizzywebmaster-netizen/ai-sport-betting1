<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class FootballController extends Controller
{
    public function index(Request $request)
    {
        $apiUrl = env('API_URL', '/api/v1');
        $fixtures = [];
        $leagues = [];

        try {
            // Try to fetch from Node.js API backend
            $fixturesResponse = Http::timeout(5)->get($apiUrl . '/sports/fixtures', [
                'sport' => 'football',
                'status' => 'NS',
                'limit' => 20
            ]);
            if ($fixturesResponse->successful()) {
                $fixtures = $fixturesResponse->json('data', []);
            }

            $leaguesResponse = Http::timeout(5)->get($apiUrl . '/sports/leagues', [
                'sport' => 'football',
                'isFeatured' => true
            ]);
            if ($leaguesResponse->successful()) {
                $leagues = $leaguesResponse->json('data', []);
            }
        } catch (\Exception $e) {
            \Log::warning('Football API not available: ' . $e->getMessage());
        }

        // Fallback leagues if API not available - not fake fixtures, just league list
        if (empty($leagues)) {
            $leagues = [
                ['name' => 'Premier League', 'country' => 'England', 'isFeatured' => true],
                ['name' => 'La Liga', 'country' => 'Spain', 'isFeatured' => true],
                ['name' => 'Serie A', 'country' => 'Italy', 'isFeatured' => true],
                ['name' => 'Bundesliga', 'country' => 'Germany', 'isFeatured' => true],
                ['name' => 'Ligue 1', 'country' => 'France', 'isFeatured' => true],
                ['name' => 'Champions League', 'country' => 'Europe', 'isFeatured' => true],
            ];
        }

        return view('football.index', compact('fixtures', 'leagues'));
    }

    public function show($id)
    {
        $fixture = null;
        $apiUrl = env('API_URL', '/api/v1');
        
        try {
            $response = Http::timeout(5)->get($apiUrl . '/sports/fixtures/' . $id);
            if ($response->successful()) {
                $fixture = $response->json('data');
            }
        } catch (\Exception $e) {
            \Log::warning('Fixture API failed: ' . $e->getMessage());
        }

        return view('football.show', compact('fixture'));
    }
}
