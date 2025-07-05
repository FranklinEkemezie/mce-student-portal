<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterCourseRequest;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisteredCourseController extends Controller
{
    //

    public function index()
    {

        /** @var Student $studentId */
        $student = auth('student')->user();

        $registeredCoursesInfo = $student->registeredCourses()->get()
            ->groupBy(fn($course) => ["{$course->pivot->session} $course->semester"])
            ->map(function ($courses, string $sessionSemesterGroup) {
                [$session, $semester] = explode(' ', $sessionSemesterGroup);
                return [
                    'session'   => $session,
                    'semester'  => $semester,
                    // students may borrow/add courses which is not usually offered
                    // in their current level (e.g. carry over).
                    // We assume course registration is independent of level (for now)
                    // and students can register any course even if it's not in their level.
                    // Here, for simplicity, we send the level of the first course in the
                    // group of courses.
                    'level'     => $courses[0]->level
                ];
            })
            ->values();

        return inertia('Student/Course/Index', [
            'registeredCoursesInfo' => $registeredCoursesInfo
        ]);
    }

    public function create(Request $request)
    {

        $session    = $request->query('session');
        $level      = $request->query('level');
        $semester   = $request->query('semester');

        if (! ($session && $level && $semester)) {
            return inertia('Student/Course/RegisterForm');
        }

        $studentId = $request->user('student')->id;
        /** @var Builder $coursesForLevelAndSemester */
        $coursesForLevelAndSemester = Course::forLevelAndSemester($level, $semester);
        $courses = $coursesForLevelAndSemester
            ->leftJoin('course_registrations as cr', function (JoinClause $join) use ($studentId, $session) {
                $join
                    ->on('courses.id', '=', 'cr.course_id')
                    ->where('cr.student_id', '=', $studentId)
                    ->where('cr.session', $session);
            })
            ->select('courses.*')
            ->selectRaw('CASE WHEN cr.id IS NULL THEN false ELSE true END as is_registered')
            ->get();
        return inertia('Student/Course/Register', [
            'courses'   => $courses,
            'semester'  => $semester,
            'session'   => $session
        ]);

    }

    public function store(RegisterCourseRequest $request)
    {

        /** @var Student $student */
        $student = auth('student')->user();

        $courses = collect($request->input('courses'))->map(fn($courseCode) => (
           Course::query()->where('code', $courseCode)->first()
        ));

        $student->registeredCourses()->attach(
            $courses, ['session' => $request->input('session')]
        );

        return redirect()->route('registered-courses.index')
            ->with('success', "Successfully registered {$courses->count()} courses");
    }

}
