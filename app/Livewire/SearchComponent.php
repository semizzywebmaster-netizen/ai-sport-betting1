<?php

namespace App\Livewire;

use Livewire\Component;

class SearchComponent extends Component
{
    public $query = '';
    public $sport = 'all';
    public $results = [];
    public $loading = false;

    public function updatedQuery()
    {
        $this->loading = true;
        if (strlen($this->query) < 2) {
            $this->results = [];
            $this->loading = false;
            return;
        }
        // Trending: Livewire 3 real-time search - no React needed
        $this->results = [
            'teams' => [
                ['name' => 'Manchester City', 'sport' => 'football'],
                ['name' => 'Lakers', 'sport' => 'basketball'],
            ],
            'leagues' => [
                ['name' => 'Premier League', 'sport' => 'football'],
            ],
            'fixtures' => [
                ['home' => 'Man City', 'away' => 'Arsenal', 'sport' => 'football'],
            ]
        ];
        $this->loading = false;
    }

    public function render()
    {
        return view('livewire.search-component');
    }
}
