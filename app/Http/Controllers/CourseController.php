<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Models\Course;
use App\Models\Department;
use Illuminate\Http\Exceptions\HttpResponseException;

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
        foreach ($courses as $courseFormData) {

            $department = Department::query()
                ->where('code', $courseFormData['department'])
                ->first();

            /** @var Course $course */
            $course = $department->courses()->create([
                'title' => $courseFormData['title'],
                'code'  => $courseFormData['code'],
                'unit'  => $courseFormData['unit'],
            ]);

            $prerequisites = $courseFormData['prerequisites'];
            $prerequisiteCourses = array_map(fn(string $courseCode) => (
                Course::query()->where('code', trim($courseCode))->first()
            ), explode(',', $prerequisites));

            $course->prerequisites()->attach($prerequisiteCourses);
        }

        return redirect()->route('admin.courses');
    }
}
