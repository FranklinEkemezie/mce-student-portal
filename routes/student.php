<?php

/**
 * STUDENT RELATED ROUTES
 */

use App\Http\Controllers\ProfileController;
use \Illuminate\Support\Facades\Route;

/**
 * Redirect routes prefixed with '/student' to the usual url without the prefix
 */
Route::prefix('/student')->group(function () {

   Route::redirect('/login', '/login');
   Route::redirect('/dashboard', '/dashboard');
});

Route::get('/dashboard', [ProfileController::class, 'index'])
    ->middleware(['auth:student', 'verified'])
    ->name('dashboard');
