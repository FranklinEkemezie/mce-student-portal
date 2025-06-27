<?php

namespace Database\Seeders;

use App\Models\School;
use Exception;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use InvalidArgumentException;

class SchoolSeeder extends CustomSeeder
{

    /**
     * @throws FileNotFoundException
     */
    private static function seedSchoolDataFromCSV(): void
    {

        $schools = self::loadSeedDataFromCSV(
            'seeders/FUTO_SCHOOLS.csv', ['NAME', 'CODE']
        );
        foreach ($schools as $school) {

            School::create([
                'name'  => $school['NAME'],
                'code'  => $school['CODE']
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

        self::seedSchoolDataFromCSV();
    }
}
