<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
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

    public function register(Request $request)
    {

        $session    = $request->query('session');
        $level      = $request->query('level');
        $semester   = $request->query('semester');

        if (! ($session && $level && $semester)) {
            return inertia('Student/Course/RegisterForm');
        }

        $courses = Course::all()->filter(function (Course $course) use ($level, $semester) {
            return (
                ((int) $course->level === (int) $level) &&
                ($course->semester === $semester)
            );
        })->values();

        return inertia('Student/Course/Register', ['courses' => $courses]);

    }

}
