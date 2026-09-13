<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BasketballController extends Controller
{
    public function index()
    {
        $apiUrl = env('API_URL', '/api/v1');
        $fixtures = [];
        $leagues = [];

        try {
            $fixturesResponse = Http::timeout(5)->get($apiUrl . '/sports/fixtures', [
                'sport' => 'basketball',
                'limit' => 20
            ]);
            if ($fixturesResponse->successful()) {
                $fixtures = $fixturesResponse->json('data', []);
            }

            $leaguesResponse = Http::timeout(5)->get($apiUrl . '/sports/leagues', [
                'sport' => 'basketball'
            ]);
            if ($leaguesResponse->successful()) {
                $leagues = $leaguesResponse->json('data', []);
            }
        } catch (\Exception $e) {
            \Log::warning('Basketball API not available: ' . $e->getMessage());
        }

        if (empty($leagues)) {
            $leagues = [
                ['name' => 'NBA', 'country' => 'USA', 'isFeatured' => true],
                ['name' => 'EuroLeague', 'country' => 'Europe', 'isFeatured' => true],
                ['name' => 'WNBA', 'country' => 'USA'],
                ['name' => 'NCAA Men', 'country' => 'USA', 'isFeatured' => true],
            ];
        }

        return view('basketball.index', compact('fixtures', 'leagues'));
    }

    public function show($id)
    {
        return view('basketball.show', ['id' => $id]);
    }
}
