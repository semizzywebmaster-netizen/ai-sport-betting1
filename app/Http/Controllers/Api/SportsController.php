<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class SportsController extends Controller
{
    public function sports() { return response()->json(['success' => true, 'data' => [['name' => 'Football', 'slug' => 'football'], ['name' => 'Basketball', 'slug' => 'basketball']]]); }
    public function leagues() { return response()->json(['success' => true, 'data' => []]); }
    public function supportedLeagues() { return response()->json(['success' => true, 'data' => []]); }
    public function teams() { return response()->json(['success' => true, 'data' => []]); }
    public function fixtures() { return response()->json(['success' => true, 'data' => []]); }
    public function fixture($id) { return response()->json(['success' => true, 'data' => ['id' => $id]]); }
    public function players() { return response()->json(['success' => true, 'data' => []]); }
    public function search() { return response()->json(['success' => true, 'data' => ['results' => []]]); }
    public function odds($fixtureId) { return response()->json(['success' => true, 'data' => []]); }
    public function oddsMovement($oddsId) { return response()->json(['success' => true, 'data' => []]); }
}
