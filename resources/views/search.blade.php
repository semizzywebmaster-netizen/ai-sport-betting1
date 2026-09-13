@extends('layouts.app')
@section('title', 'Search - Livewire 3 - Punter Prediction')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold">🔍 Search - Livewire 3 - Query: {{ $query ?? '' }}</h1>
    @livewire('search-component', ['sport' => 'all'])
</div>
@endsection
