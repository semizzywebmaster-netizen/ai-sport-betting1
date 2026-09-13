<?php

namespace App\Http\Controllers;

class BasketballController extends Controller
{
    public function index() { return view('basketball.index'); }
    public function leagues() { return view('basketball.leagues'); }
    public function games() { return view('basketball.games'); }
    public function show($id) { return view('basketball.show', ['id' => $id]); }
    public function teams() { return view('basketball.teams'); }
}
