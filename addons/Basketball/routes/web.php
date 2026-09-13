<?php

use Illuminate\Support\Facades\Route;

Route::prefix('basketball')->name('basketball.')->group(function () {
    Route::get('/', function () { return view('basketball.index'); })->name('index');
    Route::get('/leagues', function () { return view('basketball.leagues'); })->name('leagues');
    Route::get('/games', function () { return view('basketball.games'); })->name('games');
    Route::get('/games/{id}', function ($id) { return view('basketball.show', ['id' => $id]); })->name('show');
});
