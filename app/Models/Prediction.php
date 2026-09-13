<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prediction extends Model
{
    protected $fillable = [
        'fixture_id', 'league_id', 'user_id', 'ai_provider_id',
        'sport', 'market', 'market_key', 'selection', 'selection_key',
        'odds', 'confidence', 'risk', 'reasoning',
        'supporting_factors', 'warning_factors', 'statistics', 'form_data', 'h2h_data',
        'status', 'is_premium', 'is_featured', 'credits_cost'
    ];

    protected $casts = [
        'supporting_factors' => 'array',
        'warning_factors' => 'array',
        'statistics' => 'array',
        'form_data' => 'array',
        'h2h_data' => 'array',
        'is_premium' => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function fixture() { return $this->belongsTo(Fixture::class); }
    public function league() { return $this->belongsTo(League::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function factors() { return $this->hasMany(PredictionFactor::class); }
}
