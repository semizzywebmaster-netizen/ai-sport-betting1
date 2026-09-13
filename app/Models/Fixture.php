<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    protected $fillable = [
        'external_id', 'league_id', 'home_team_id', 'away_team_id',
        'season', 'round', 'date', 'timestamp', 'status', 'status_short',
        'venue', 'referee', 'home_score', 'away_score', 'is_live', 'elapsed',
        'events', 'statistics', 'lineups', 'provider_data'
    ];

    protected $casts = [
        'date' => 'datetime',
        'events' => 'array',
        'statistics' => 'array',
        'lineups' => 'array',
        'provider_data' => 'array',
        'is_live' => 'boolean',
    ];

    public function league() { return $this->belongsTo(League::class); }
    public function homeTeam() { return $this->belongsTo(Team::class, 'home_team_id'); }
    public function awayTeam() { return $this->belongsTo(Team::class, 'away_team_id'); }
    public function odds() { return $this->hasMany(Odds::class); }
    public function predictions() { return $this->hasMany(Prediction::class); }
}
