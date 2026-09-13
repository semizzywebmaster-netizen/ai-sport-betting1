<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class WalletController extends Controller
{
    public function index() { return response()->json(['success' => true, 'data' => ['cash_balance' => 0, 'credits' => 0]]); }
    public function transactions() { return response()->json(['success' => true, 'data' => []]); }
    public function credits() { return response()->json(['success' => true, 'data' => []]); }
    public function referrals() { return response()->json(['success' => true, 'data' => []]); }
    public function notifications() { return response()->json(['success' => true, 'data' => []]); }
}
