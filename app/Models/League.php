<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class League extends Model
{
    protected $fillable = [
        'sport_id', 'external_id', 'name', 'slug', 'country', 'logo',
        'type', 'season', 'is_active', 'is_featured', 'is_prediction_enabled',
        'priority', 'provider', 'provider_data'
    ];

    protected $casts = ['provider_data' => 'array', 'is_active' => 'boolean', 'is_featured' => 'boolean'];

    public function sport() { return $this->belongsTo(Sport::class); }
    public function fixtures() { return $this->hasMany(Fixture::class); }
    public function teams() { return $this->belongsToMany(Team::class, 'team_league'); }
}
