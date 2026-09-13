<div class="bg-white rounded-xl border p-6">
    <h3 class="font-bold mb-4">Livewire 3 Bet Builder - Trending for cPanel</h3>
    <p class="text-sm text-gray-600 mb-4">Duplicate detection • Strategy • Target odds • Alpine.js + Livewire</p>
    <div class="space-y-2">
        @foreach($selections as $index => $sel)
            <div class="flex justify-between p-3 border rounded-xl"><span>{{ $sel['match'] }} - {{ $sel['market'] }} @ {{ $sel['odds'] }}</span><button wire:click="removeSelection({{ $index }})" class="text-red-600">✕</button></div>
        @endforeach
    </div>
    <div class="mt-4 text-sm">Total Odds: <span class="font-bold">{{ number_format($totalOdds, 2) }}</span> | Potential: ₦{{ number_format($this->potentialWin, 2) }}</div>
</div>
