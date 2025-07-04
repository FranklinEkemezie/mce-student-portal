<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //

    public function index()
    {

        return inertia('Student/Course/Index', [
            // TODO:
            // Send hard-coded data for now
            'registeredCoursesInfo' => [
                ['session' => '2024/2025', 'semester' => 'harmattan', 'level' => 100],
                ['session' => '2024/2025', 'semester' => 'harmattan', 'level' => 200]
            ]
        ]);
    }

}
