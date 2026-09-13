<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BetBuilderController extends Controller
{
    public function index()
    {
        return view('bet-builder.index');
    }

    public function codes()
    {
        return view('bet-builder.codes');
    }

    public function lookup($code)
    {
        $apiUrl = env('API_URL', '/api/v1');
        $betCode = null;
        
        try {
            $response = \Illuminate\Support\Facades\Http::timeout(5)->get($apiUrl . '/bet-builder/lookup/' . $code);
            if ($response->successful()) {
                $betCode = $response->json('data');
            }
        } catch (\Exception $e) {
            \Log::warning('Bet code lookup failed: ' . $e->getMessage());
        }

        return view('bet-builder.lookup', compact('betCode', 'code'));
    }
}
