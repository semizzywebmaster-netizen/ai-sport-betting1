<?php

use Illuminate\Support\Facades\Route;

Route::prefix('predictions')->name('predictions.')->group(function () {
    Route::get('/', function () { return view('predictions.index'); })->name('index');
    Route::get('/football', function () { return view('predictions.football'); })->name('football');
    Route::get('/basketball', function () { return view('predictions.basketball'); })->name('basketball');
    Route::get('/{id}', function ($id) { return view('predictions.show', ['id' => $id]); })->name('show');
});
