<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //

    public function index()
    {

        return inertia('Admin/Course/Index', [
            'courses' => Course::with('department')
                ->get()
        ]);
    }

    public function create()
    {

        return inertia('Admin/Course/Create', [
            'departments'   => Department::all(),
            'courses'       => Course::all()
        ]);
    }
}
