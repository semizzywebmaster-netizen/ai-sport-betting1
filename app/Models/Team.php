<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = ['external_id', 'name', 'slug', 'short_name', 'code', 'country', 'logo', 'founded', 'venue', 'is_national', 'provider_data'];
    
    public function leagues() { return $this->belongsToMany(League::class, 'team_league'); }
    public function homeFixtures() { return $this->hasMany(Fixture::class, 'home_team_id'); }
    public function awayFixtures() { return $this->hasMany(Fixture::class, 'away_team_id'); }
    public function players() { return $this->hasMany(Player::class); }
}
