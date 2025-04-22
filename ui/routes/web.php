<?php

use Illuminate\Support\Facades\Route;

// your check-key route
Route::get('/check-key', fn() => env('APP_KEY'));

// React SPA fallback
Route::fallback(fn() => view('welcome'));
