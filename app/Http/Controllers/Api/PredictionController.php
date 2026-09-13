<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class PredictionController extends Controller
{
    public function index() { return response()->json(['success' => true, 'data' => [], 'message' => 'Laravel 11 Blade not HTML - Predictions with confidence, risk, no guaranteed wins']); }
    public function show($id) { return response()->json(['success' => true, 'data' => ['id' => $id]]); }
    public function store() { return response()->json(['success' => true, 'data' => []], 201); }
    public function accuracy() { return response()->json(['success' => true, 'data' => ['accuracy' => 72.5]]); }
}
