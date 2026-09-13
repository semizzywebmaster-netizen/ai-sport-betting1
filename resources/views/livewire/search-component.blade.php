<div class="bg-white rounded-xl border p-4" x-data>
    <div class="flex gap-2">
        <input wire:model.live.debounce.300ms="query" type="text" placeholder="Search teams, leagues, fixtures - Livewire 3 real-time" class="flex-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500">
        <select wire:model.live="sport" class="px-4 py-3 border rounded-xl"><option value="all">All</option><option value="football">Football</option><option value="basketball">Basketball</option></select>
    </div>
    @if($loading)
        <div class="mt-4 text-center text-gray-500">Searching with Livewire 3...</div>
    @endif
    @if(!empty($results))
        <div class="mt-4 space-y-2">
            @foreach($results['teams'] ?? [] as $team)
                <div class="p-3 border rounded-xl hover:bg-gray-50">{{ $team['name'] }} - {{ $team['sport'] }}</div>
            @endforeach
        </div>
    @endif
    <p class="text-xs text-gray-500 mt-2">⚡ Livewire 3 - No React needed - cPanel PHP native - Blade templates</p>
</div>
