<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\RecordNotFoundException;

class DepartmentSeeder extends CustomSeeder
{

    /**
     * @throws FileNotFoundException
     */
    private static function seedDepartmentsDataFromCSV(): void
    {
        $departmentsDir = 'seeders/departments';
        foreach (self::loadSeedDataFromCSVDir(
            $departmentsDir,
            ['NAME', 'CODE'],
            "@^$departmentsDir/DEPT_([a-zA-Z]+)\.csv$@",
            'DEPT_SESET',
        ) as $departmentData) {

            [
                'matches'   => $matches,
                'row'       => $department
            ] = $departmentData;


            [, $schoolCode] = $matches;
            $school = School::query()
                ->where('code', $schoolCode)
                ->first();
            if (! $school) {
                throw new RecordNotFoundException(
                    "No school with code $schoolCode found"
                );
            }

            $school->departments()->create([
                'name'  => $department['NAME'],
                'code'  => $department['CODE']
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

        self::seedDepartmentsDataFromCSV();
    }
}
