<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// public routes
Route::post('/login', 'Laravel\Fortify\Http\Controllers\AuthenticatedSessionController@store');
Route::post('/logout', 'Laravel\Fortify\Http\Controllers\AuthenticatedSessionController@destroy');