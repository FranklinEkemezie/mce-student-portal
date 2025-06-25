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

Route::middleware('auth:student')->group(function () {

    Route::get('/dashboard', [ProfileController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});
