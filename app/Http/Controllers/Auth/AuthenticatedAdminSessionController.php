<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class AuthenticatedAdminSessionController extends Controller
{

    public function create()
    {
        return inertia('Admin/Auth/Login', [
            'admin'
        ]);
    }
}
