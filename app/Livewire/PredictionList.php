<?php

namespace App\Livewire;

use Livewire\Component;
use Livewire\WithPagination;

class PredictionList extends Component
{
    use WithPagination;

    public $sport = 'all';
    public $risk = 'all';
    public $market = 'all';

    public function render()
    {
        // Trending: Livewire 3 pagination, no React - cPanel compatible
        return view('livewire.prediction-list');
    }
}
