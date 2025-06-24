<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth\Student;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class StudentLoginController extends Controller
{
    public function create()
    {
        return Inertia::render('Auth/Login', [

        ]);
    }

    public function store()
    {

    }

    public function destroy()
    {

    }
}
