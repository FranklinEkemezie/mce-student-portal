<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\RecordNotFoundException;

class CourseSeeder extends CustomSeeder
{

    /**
     * @throws FileNotFoundException
     */
    private static function seedCoursesDataFromCSV(): void
    {

        $coursesDir = 'seeders/courses';
        foreach (self::loadSeedDataFromCSVDir(
            $coursesDir,
            ['TITLE', 'CODE', 'UNIT', 'DEPT'],
            "@^$coursesDir/COURSES_([0-9])00LVL_(RAIN|HARMATTAN)\.csv$@",
            'COURSE_300LVL_RAIN',
        ) as $courseData) {

            [
//                'matches'   => $matches,
                'row'       => $course
            ] = $courseData;

            $department = Department::query()
                ->where('code', $course['DEPT'])
                ->first();
            if (! $department) {
                throw new RecordNotFoundException(
                    "No department with code '{$course['DEPT']}' found"
                );
            }

            $department->courses()->create([
                'title' => $course['TITLE'],
                'code'  => $course['CODE'],
                'unit'  => (int) $course['UNIT']
            ]);
        }

    }

    /**
     * Run the database seeds.
     * @throws FileNotFoundException
     */
    public function run(): void
    {
        //

        self::seedCoursesDataFromCSV();
    }
}
