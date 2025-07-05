<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ResultController extends Controller
{

    public function index()
    {

        /**
         * @var Student $student The authenticated student
         */
        $student = auth('student')->user();

        $registeredCourses = $student->registeredCourses()->pluck('course_id');
        $publishedResultsCourseIds = Result::query()
            ->whereIn('course_id', $registeredCourses)
            ->pluck('course_id')
            ->toArray();

        return inertia('Student/Result/Index', [
            'registeredCoursesInfo' => $student->groupedRegisteredCourses([
                'published' => fn(Collection $courses, $session, $semester) => (
                $courses->filter(
                    fn($course) => in_array($course->id, $publishedResultsCourseIds)
                )->count()
                )
            ])
        ]);
    }

    public function show(Request $request, string $session, string $semester)
    {

        /**
         * @var Student $student The authenticated student
         */
        $student = $request->user('student');

        $registeredCoursesIds = $student->registeredCourses($session, $semester)
            ->pluck('course_id');
        $results = Result::query()
            ->with('course')
            ->where('session', $session)
            ->whereIn('course_id', $registeredCoursesIds)
            ->get()
            ->filter(fn ($result) => $result->course->semester === $semester);


        $studentResults = [
            // [course, result]
        ];
        foreach ($results as $result) {
            $resultFilename = $result->filename;
            $resultFile = Storage::readStream($resultFilename);

            // Read off header
            $headers = fgetcsv($resultFile);

            //
            $shouldSearch = true;
            while ($shouldSearch && $line = fgetcsv($resultFile)) {

                $resultRow = array_combine($headers, $line);
                [
                    'REG. NO.' => $regNo
                ] = $resultRow;

                if ($regNo === $student->reg_no) {
                    $studentResults[] = [$result->course, $resultRow];
                    $shouldSearch = false;
                }
            }

        }

        return inertia('Student/Result/Show', [
            'results'   => $studentResults,
            'registeredCoursesIds' => $registeredCoursesIds,
            'session'   => $session,
            'semester'  => $semester
        ]);
    }
}
