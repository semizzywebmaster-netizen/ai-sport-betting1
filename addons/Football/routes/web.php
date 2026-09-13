<?php

use Illuminate\Support\Facades\Route;

// Football Addon Routes - Modular - Future leagues as addon config
Route::prefix('football')->name('football.')->group(function () {
    Route::get('/', function () { return view('football.index'); })->name('index');
    Route::get('/leagues', function () { return view('football.leagues'); })->name('leagues');
    Route::get('/fixtures', function () { return view('football.fixtures'); })->name('fixtures');
    Route::get('/fixtures/{id}', function ($id) { return view('football.show', ['id' => $id]); })->name('show');
    Route::get('/teams', function () { return view('football.teams'); })->name('teams');
});

echo "Football addon routes loaded - modular";
