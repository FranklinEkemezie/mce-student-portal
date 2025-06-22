<?php

use Inertia\Inertia;

Route::prefix('/admin')->middleware([])->group(function () {

    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard', [
            'admin' => [
                'username'  => 'admin_me',
                'email'     => 'admin@me.com'
            ]
        ]);
    })->name('admin.dashboard');

});
