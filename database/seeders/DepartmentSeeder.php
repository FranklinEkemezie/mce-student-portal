<?php

namespace Database\Seeders;

use App\Models\School;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\RecordNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class DepartmentSeeder extends CustomSeeder
{

    /**
     * @throws FileNotFoundException
     */
    private static function seedDepartmentsDataFromCSV(): void
    {
        $deptsDir = 'seeders/departments';
        foreach (Storage::files($deptsDir) as $deptSeedCSVFile) {

            $deptSeedCSVFilePattern = "@^$deptsDir/DEPT_([a-zA-Z]+)\.csv$@";
            if (preg_match($deptSeedCSVFilePattern, $deptSeedCSVFile, $matches) === false) {
                throw new InvalidArgumentException(
                    "Unacceptable file name format: $deptSeedCSVFile.
                     File name must named as 'DEPT_[school_code]' ($deptSeedCSVFilePattern) e.g. 'DEPT_SESET'"
                );
            }


            [, $schoolCode] = $matches;
            $departments = self::loadSeedDataFromCSV($deptSeedCSVFile, ['NAME', 'CODE']);
            foreach ($departments as $department) {
                $school = School::query()->where('code', $schoolCode)->first();
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
