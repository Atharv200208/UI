<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\IncidentReport;
use App\Http\Controllers\IncidentReportController;


Route::apiResource('incident-reports', IncidentReportController::class);
