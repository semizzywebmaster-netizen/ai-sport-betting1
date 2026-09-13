<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function initialize() { return response()->json(['success' => true, 'data' => ['authorization_url' => 'https://paystack.com/pay/demo']]); }
    public function verify($ref) { return response()->json(['success' => true, 'data' => ['reference' => $ref, 'verified' => true]]); }
    public function paystackWebhook() { return response()->json(['success' => true]); }
    public function flutterwaveWebhook() { return response()->json(['success' => true]); }
    public function whatsappWebhook() { return response()->json(['success' => true]); }
    public function whatsappVerify() { return response('Webhook verified', 200); }
}
