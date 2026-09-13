@extends('layouts.app')
@section('title', 'About - Laravel Blade')
@section('content')
<div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-4xl font-bold mb-6">About - Laravel Blade Template</h1>
    <p class="text-gray-600">This is a Laravel Blade template (resources/views/about.blade.php) - NOT static HTML. Uses Blade directives @extends, @section. cPanel PHP compatible, not HTML static export.</p>
    <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
        <strong>Blade, not HTML:</strong> File: about.blade.php - Laravel Blade for cPanel PHP hosting. Dynamic templating, not static HTML.
    </div>
</div>
@endsection
