<?php

/**
 * STUDENT RELATED ROUTES
 */

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\Student\RegisteredCourseController;
use App\Http\Controllers\StudentController;
use \Illuminate\Support\Facades\Route;

/**
 * Redirect routes prefixed with '/student' to the usual url without the prefix
 */
Route::prefix('/student')->name('student.')->group(function () {

    Route::get('/login', fn() => redirect(route('login')))->name('login');
    Route::get('/dashboard', fn() => redirect(route('dashboard')))->name('dashboard');
});

Route::middleware('auth:student')->group(function () {

    Route::get('/dashboard', [ProfileController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/results', [ResultController::class, 'index'])->name('results.index');
    Route::get('/results/{session}/{semester}', [ResultController::class, 'show'])->name('results.show');


    // Course registration
    Route::prefix('/courses')->controller(RegisteredCourseController::class)->name('registered-courses.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/register', 'create')->name('create');
        Route::post('/register', 'store')->name('store');
    });
});

Route::middleware('auth:admin')->group(function () {

   Route::get('/students', [StudentController::class, 'index'])->name('students');
});
