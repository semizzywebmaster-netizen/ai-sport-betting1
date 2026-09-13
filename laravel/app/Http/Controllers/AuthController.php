<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    public function loginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string',
        ]);

        $apiUrl = env('API_URL', '/api/v1');
        
        try {
            $response = Http::post($apiUrl . '/auth/login', [
                'identifier' => $request->identifier,
                'password' => $request->password,
            ]);

            if ($response->successful()) {
                $data = $response->json('data');
                session(['token' => $data['token'], 'user' => $data['user']]);
                return redirect()->route('home')->with('success', 'Login successful - Laravel Blade');
            }

            return back()->with('error', $response->json('message', 'Login failed'))->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'API not available: ' . $e->getMessage())->withInput();
        }
    }

    public function registerForm()
    {
        return view('auth.register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:3|max:30',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'password' => 'required|string|min:8',
        ]);

        $apiUrl = env('API_URL', '/api/v1');
        
        try {
            $response = Http::post($apiUrl . '/auth/register', $request->only(['username', 'email', 'phone', 'password', 'referralCode']));

            if ($response->successful()) {
                return redirect()->route('login')->with('success', 'Registration successful - Please verify OTP - Laravel Blade');
            }

            return back()->with('error', $response->json('message', 'Registration failed'))->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'API not available: ' . $e->getMessage())->withInput();
        }
    }

    public function logout()
    {
        session()->forget(['token', 'user']);
        return redirect()->route('home')->with('success', 'Logged out - Laravel Blade');
    }
}
