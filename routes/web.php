<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/auth.php';
require __DIR__ . '/student.php';
require __DIR__ . '/admin.php';

Route::get('/', function (Request $request) {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});






















//
//Route::middleware('auth')->group(function () {
//    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
////    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});
//
//
//// Students
//Route::prefix('/students')->controller(StudentController::class)->group(function () {
//
//    Route::get('/', 'index')->name('students');
//});
//
//// Courses
//Route::prefix('/courses')->controller(CourseController::class)->group(function () {
//
//   Route::get('/', 'index')->name('courses');
//});
//
//Route::prefix('results')->middleware('auth')->controller(ResultController::class)->group(function () {
//
//    Route::get('/', 'index')->name('results');
//
//});
//
//require __DIR__.'/auth.php';
//require __DIR__ . '/admin.php';
