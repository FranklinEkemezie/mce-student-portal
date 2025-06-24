<?php

use \Illuminate\Support\Facades\Route;

/**
 * Redirect prefixed /student route to the usual url
 */
Route::prefix('/student')->group(function () {

   Route::redirect('/login', '/login');
});
