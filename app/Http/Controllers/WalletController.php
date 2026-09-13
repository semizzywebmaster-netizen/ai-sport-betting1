<?php

namespace App\Http\Controllers;

class WalletController extends Controller
{
    public function index() { return view('wallet.index'); }
    public function transactions() { return view('wallet.transactions'); }
    public function credits() { return view('wallet.credits'); }
    public function deposit() { return view('wallet.deposit'); }
}
