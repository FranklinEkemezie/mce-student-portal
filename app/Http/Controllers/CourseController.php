<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Course;
use App\Models\Department;

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

    public function store(StoreCourseRequest $request)
    {

        $courses = $request->input('courses');
        foreach ($courses as $course) {

            $department = Department::query()
                ->where('code', $course['department'])
                ->first();

            $department->courses()->create([
                'title' => $course['title'],
                'code'  => $course['code'],
                'unit'  => $course['unit'],
                'prerequisites' => $course['prerequisites']
            ]);

        }

        return redirect()->route('admin.courses');
    }
}
