<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedAdminSessionController;

Route::prefix('/admin')->name('admin.')->group(function () {

    Route::middleware('guest:admin')->group(function () {

        Route::get('/login', [AuthenticatedAdminSessionController::class, 'create'])->name('login');
        Route::post('/login', [AuthenticatedAdminSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {

        Route::get('/dashboard', [ProfileController::class, 'show'])->name('dashboard');
    });
});
