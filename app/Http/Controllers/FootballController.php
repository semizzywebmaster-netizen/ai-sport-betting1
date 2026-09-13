<?php

namespace App\Http\Controllers;

class FootballController extends Controller
{
    public function index() { return view('football.index'); }
    public function leagues() { return view('football.leagues'); }
    public function fixtures() { return view('football.fixtures'); }
    public function show($id) { return view('football.show', ['id' => $id]); }
    public function teams() { return view('football.teams'); }
    public function team($id) { return view('football.team', ['id' => $id]); }
}
