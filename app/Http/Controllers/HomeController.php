<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        // Trending: Laravel 11 Blade view with Livewire 3 + Alpine 3 + Tailwind 3.4
        return view('home');
    }

    public function search(Request $request)
    {
        return view('search', ['query' => $request->q]);
    }

    public function about() { return view('pages.about'); }
    public function howItWorks() { return view('pages.how-it-works'); }
    public function help() { return view('pages.help'); }
    public function faq() { return view('pages.faq'); }
    public function contact() { return view('pages.contact'); }
    public function responsibleBetting() { return view('pages.responsible-betting'); }
    public function privacy() { return view('pages.privacy'); }
    public function terms() { return view('pages.terms'); }
    public function cookiePolicy() { return view('pages.cookie-policy'); }
}
