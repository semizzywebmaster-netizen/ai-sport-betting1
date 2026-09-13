<?php

namespace App\Http\Controllers;

class BetBuilderController extends Controller
{
    public function index() { return view('bet-builder.index'); }
    public function codes() { return view('bet-builder.codes'); }
    public function lookup($code) { return view('bet-builder.lookup', ['code' => $code]); }
    public function history() { return view('bet-builder.history'); }
}
