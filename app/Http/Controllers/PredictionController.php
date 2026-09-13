<?php

namespace App\Http\Controllers;

class PredictionController extends Controller
{
    public function index() { return view('predictions.index'); }
    public function football() { return view('predictions.football'); }
    public function basketball() { return view('predictions.basketball'); }
    public function show($id) { return view('predictions.show', ['id' => $id]); }
    public function accuracy() { return view('predictions.accuracy'); }
}
