<?php

namespace App\Http\Controllers;

class CommunityController extends Controller
{
    public function index() { return view('community.index'); }
    public function analysts() { return view('community.analysts'); }
    public function leaderboard() { return view('community.leaderboard'); }
    public function show($id) { return view('community.show', ['id' => $id]); }
}
