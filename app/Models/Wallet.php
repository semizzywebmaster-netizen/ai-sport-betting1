<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $fillable = ['user_id', 'cash_balance', 'bonus_balance', 'total_deposited', 'total_withdrawn', 'currency', 'is_locked'];
    
    public function user() { return $this->belongsTo(User::class); }
    public function transactions() { return $this->hasMany(WalletTransaction::class); }
}
