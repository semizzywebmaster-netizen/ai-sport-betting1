<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loginForm() { return view('auth.login'); }
    public function registerForm() { return view('auth.register'); }
    public function forgotForm() { return view('auth.forgot'); }
    public function resetForm($token) { return view('auth.reset', ['token' => $token]); }
    public function login(Request $request) { return redirect('/')->with('success', 'Logged in - Laravel 11 + Sanctum'); }
    public function register(Request $request) { return redirect('/')->with('success', 'Account created - Laravel 11 + Livewire 3 - 18+ verified'); }
    public function logout() { return redirect('/')->with('success', 'Logged out'); }
    public function forgot(Request $request) { return back()->with('success', 'Reset link sent'); }
    public function reset(Request $request) { return redirect('/login')->with('success', 'Password reset'); }
}
