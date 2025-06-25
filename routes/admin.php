<?php

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedAdminSessionController;

Route::prefix('/admin')->group(function () {

    Route::get('/login', [AuthenticatedAdminSessionController::class, 'create'])
        ->middleware('guest:admin')
        ->name('admin.login');

    Route::get('/dashboard', [ProfileController::class, 'show'])
        ->middleware('auth:admin')
        ->name('admin.dashboard');
});
