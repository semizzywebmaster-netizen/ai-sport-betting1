<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Laravel 11 + cPanel - database queue, not Redis - trending for cPanel
Schedule::command('predictions:generate')->daily();
Schedule::command('odds:sync')->everyFiveMinutes();
Schedule::command('queue:work --stop-when-empty')->everyMinute()->withoutOverlapping();
Schedule::command('backup:clean')->daily();
