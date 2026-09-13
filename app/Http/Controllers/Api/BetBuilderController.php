<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BetBuilderController extends Controller
{
    public function index() { return response()->json(['success' => true, 'data' => []]); }
    public function show($id) { return response()->json(['success' => true, 'data' => ['id' => $id]]); }
    public function store() { return response()->json(['success' => true, 'data' => ['code' => 'PP-DEMO123']], 201); }
    public function lookup($code) { return response()->json(['success' => true, 'data' => ['code' => $code]]); }
    public function generateCode($id) { return response()->json(['success' => true, 'data' => ['code' => 'PP-'.strtoupper(substr(md5($id), 0, 8))]]); }
    public function optimize() { return response()->json(['success' => true, 'data' => []]); }
    public function merge() { return response()->json(['success' => true, 'data' => []]); }
}
