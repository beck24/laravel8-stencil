<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SPAController;

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
Route::get('/init', [SPAController::class, 'init']);
Route::post('/login', 'Laravel\Fortify\Http\Controllers\AuthenticatedSessionController@store');
Route::post('/logout', 'Laravel\Fortify\Http\Controllers\AuthenticatedSessionController@destroy');
Route::post('/forgot-password', 'Laravel\Fortify\Http\Controllers\PasswordResetLinkController@store');
Route::post('/reset-password', 'Laravel\Fortify\Http\Controllers\NewPasswordController@store');
Route::post('/register', 'Laravel\Fortify\Http\Controllers\RegisteredUserController@store');
Route::post('/email/verification-notification', 'Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController@store');