<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function dashboard() { return view('admin.dashboard'); }
    public function users() { return view('admin.users'); }
    public function sports() { return view('admin.sports'); }
    public function predictions() { return view('admin.predictions'); }
    public function finance() { return view('admin.finance'); }
    public function settings() { return view('admin.settings'); }
}
