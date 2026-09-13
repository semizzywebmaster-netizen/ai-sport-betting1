<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class HomeController extends Controller
{
    protected $apiUrl;

    public function __construct()
    {
        $this->apiUrl = env('API_URL', 'https://api.punterprediction.com/api/v1');
    }

    public function index()
    {
        // Fetch predictions from Node.js API backend if available
        $featuredPredictions = [];
        try {
            $response = Http::timeout(5)->get($this->apiUrl . '/predictions', ['featured' => true, 'limit' => 6]);
            if ($response->successful()) {
                $featuredPredictions = $response->json('data', []);
            }
        } catch (\Exception $e) {
            // Graceful fallback - no fake data, just empty
            \Log::warning('API not available for homepage: ' . $e->getMessage());
        }

        return view('home', [
            'featuredPredictions' => $featuredPredictions,
            'isProduction' => app()->environment('production'),
            'deployment' => 'laravel-cpanel-blade',
        ]);
    }

    public function leagues()
    {
        $footballLeagues = [
            'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1',
            'Champions League', 'Europa League', 'Conference League',
            'FA Cup', 'EFL Championship', 'NPFL', 'MLS', 'Saudi Pro League'
        ];
        $basketballLeagues = [
            'NBA', 'WNBA', 'EuroLeague', 'EuroCup', 'NCAA Men', 'NCAA Women', 'ACB'
        ];

        return view('leagues', compact('footballLeagues', 'basketballLeagues'));
    }

    public function wallet()
    {
        return view('wallet');
    }

    public function community()
    {
        return view('community');
    }

    public function aiAssistant()
    {
        return view('ai-assistant');
    }

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $results = [];
        
        if ($query && strlen($query) >= 2) {
            try {
                $response = Http::timeout(5)->get($this->apiUrl . '/search', ['q' => $query]);
                if ($response->successful()) {
                    $results = $response->json('data', []);
                }
            } catch (\Exception $e) {
                \Log::warning('Search API failed: ' . $e->getMessage());
            }
        }

        return view('search', compact('query', 'results'));
    }

    public function about() { return view('about'); }
    public function howItWorks() { return view('how-it-works'); }
    public function help() { return view('help'); }
    public function faq() { return view('faq'); }
    public function contact() { return view('contact'); }
    public function responsibleBetting() { return view('responsible-betting'); }
    public function privacy() { return view('privacy'); }
    public function terms() { return view('terms'); }
    public function cookiePolicy() { return view('cookie-policy'); }
}
