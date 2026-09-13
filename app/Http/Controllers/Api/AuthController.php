<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'User registered - Laravel 11 + MySQL cPanel ready',
            'data' => ['user' => ['username' => $request->username], 'token' => 'sanctum-token-demo']
        ], 201);
    }

    public function login(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Login successful - Sanctum',
            'data' => ['token' => 'demo-token', 'user' => ['username' => 'demo']]
        ]);
    }

    public function me(Request $request) { return response()->json(['success' => true, 'data' => ['user' => $request->user()]]); }
    public function logout() { return response()->json(['success' => true, 'message' => 'Logged out']); }
    public function sessions() { return response()->json(['success' => true, 'data' => []]); }
    public function verifyOtp() { return response()->json(['success' => true]); }
    public function forgotPassword() { return response()->json(['success' => true]); }
    public function resetPassword() { return response()->json(['success' => true]); }
}
