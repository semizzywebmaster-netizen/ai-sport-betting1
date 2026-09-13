@extends('layouts.app')
@section('title', 'Bet Code Lookup - Laravel 11')
@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold">Lookup: {{ $code ?? 'PP-DEMO' }}</h1>
    <p class="text-gray-600">Laravel 11 Blade template - not .html file</p>
</div>
@endsection
