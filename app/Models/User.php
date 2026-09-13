<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username', 'email', 'phone', 'password', 'referral_code', 'referred_by',
        'country', 'currency', 'timezone', 'avatar', 'bio', 'role',
        'is_email_verified', 'is_phone_verified', 'is_active', 'is_suspended',
        'xp', 'level', 'streak'
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_email_verified' => 'boolean',
        'is_phone_verified' => 'boolean',
        'is_active' => 'boolean',
        'is_suspended' => 'boolean',
    ];

    // Relationships - All 80 phases
    public function profile() { return $this->hasOne(UserProfile::class); }
    public function wallet() { return $this->hasOne(Wallet::class); }
    public function creditBalance() { return $this->hasOne(CreditBalance::class); }
    public function sessions() { return $this->hasMany(Session::class); }
    public function predictions() { return $this->hasMany(Prediction::class); }
    public function betSlips() { return $this->hasMany(BetSlip::class); }
    public function subscriptions() { return $this->hasMany(Subscription::class); }
    public function referralsMade() { return $this->hasMany(Referral::class, 'referrer_id'); }
    public function notifications() { return $this->hasMany(Notification::class); }
    public function posts() { return $this->hasMany(CommunityPost::class); }
    public function analystProfile() { return $this->hasOne(AnalystProfile::class); }

    public function isAdmin() { return $this->role === 'ADMIN'; }
    public function isAnalyst() { return in_array($this->role, ['ANALYST', 'ADMIN']); }
}
