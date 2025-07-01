<?php

/**
 * ADMIN ROUTES
 */

use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Auth\AuthenticatedAdminSessionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ResultController;

Route::prefix('/admin')->name('admin.')->group(function () {

    Route::middleware(['guest.all', 'guest:admin'])->group(function () {

        Route::get('/login', [AuthenticatedAdminSessionController::class, 'create'])->name('login');
        Route::post('/login', [AuthenticatedAdminSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {

        Route::get('/dashboard', [ProfileController::class, 'show'])->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/courses', [CourseController::class, 'index'])->name('courses');

        // Results
        Route::prefix('/results')->controller(ResultController::class)->name('results.')->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('/create', 'create')->name('create');
        });

    });
});
