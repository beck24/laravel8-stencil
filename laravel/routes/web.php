<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SPAController;
use App\Http\Controllers\VerifyEmailController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Overrides
// route => name
$front_end_routes = [
    '/' => 'home',

    // auth routes
    '/login' => 'login',
    '/register' => 'register',
    '/forgot-password' => 'forgot-password',
    '/reset-password/{token}' => 'reset-password',
    '/email-verification' => 'email-verification'
];

foreach ($front_end_routes as $route => $name) {
    if ($name) {
        Route::get($route, [SPAController::class, 'serve'])->name($name);
    }
    else {
        Route::get($route, [SPAController::class, 'serve']);
    }
}

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

Route::fallback([SPAController::class, 'serve']);
