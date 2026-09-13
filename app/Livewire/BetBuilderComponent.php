<?php

namespace App\Livewire;

use Livewire\Component;

class BetBuilderComponent extends Component
{
    public $selections = [];
    public $totalOdds = 1.0;
    public $stake = 1000;
    public $strategy = 'balanced';
    public $targetOdds = 10.0;

    public function addSelection($fixtureId, $market, $selection, $odds, $match)
    {
        // Duplicate/conflict detection - trending feature
        foreach ($this->selections as $sel) {
            if ($sel['fixtureId'] === $fixtureId && $sel['market'] === $market) {
                $this->dispatch('error', 'Duplicate selection for same fixture and market!');
                return;
            }
        }
        $this->selections[] = compact('fixtureId', 'market', 'selection', 'odds', 'match');
        $this->calculateOdds();
    }

    public function removeSelection($index)
    {
        unset($this->selections[$index]);
        $this->selections = array_values($this->selections);
        $this->calculateOdds();
    }

    public function calculateOdds()
    {
        $this->totalOdds = array_reduce($this->selections, fn($acc, $sel) => $acc * floatval($sel['odds']), 1);
    }

    public function getPotentialWinProperty()
    {
        return $this->stake * $this->totalOdds;
    }

    public function render()
    {
        return view('livewire.bet-builder-component');
    }
}
