<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PredictionController extends Controller
{
    public function index(Request $request)
    {
        $apiUrl = env('API_URL', '/api/v1');
        $predictions = [];
        
        try {
            $response = Http::timeout(5)->get($apiUrl . '/predictions', [
                'sport' => $request->get('sport'),
                'limit' => 20,
                'page' => $request->get('page', 1)
            ]);
            if ($response->successful()) {
                $predictions = $response->json('data', []);
            }
        } catch (\Exception $e) {
            \Log::warning('Predictions API failed: ' . $e->getMessage());
        }

        return view('predictions.index', compact('predictions'));
    }

    public function show($id)
    {
        $apiUrl = env('API_URL', '/api/v1');
        $prediction = null;
        
        try {
            $response = Http::timeout(5)->get($apiUrl . '/predictions/' . $id);
            if ($response->successful()) {
                $prediction = $response->json('data');
            }
        } catch (\Exception $e) {
            \Log::warning('Prediction API failed: ' . $e->getMessage());
        }

        return view('predictions.show', compact('prediction'));
    }
}
