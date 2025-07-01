<?php

namespace Database\Seeders;

use App\Models\Course;
use Exception;
use Illuminate\Database\RecordNotFoundException;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;

class ResultSeeder extends Seeder
{


    /**
     * @throws Exception
     */
    private static function seedResultsFromCSV(): void
    {
        $resultsDir = 'seeders/results';
        $academicSessionDirs = Storage::directories($resultsDir);
        foreach ($academicSessionDirs as $academicSessionDir) {

            // Ensure the directory name follows convention
            if (
                ! preg_match(
                    "@^$resultsDir/\d{4}-\d{4}$@",
                    $academicSessionDir
                )
            ) {

                throw new InvalidArgumentException(
                    "Invalid result academic session directory: The directory [" .
                    storage_path($academicSessionDir) .
                    "] does not follow the 'YYYY-YYYY' (e.g. 2022-2023) naming convention"
                );
            }

            $levelDirs = Storage::directories($academicSessionDir);
            foreach ($levelDirs as $levelDir) {

                // Ensure the directory name follows convention
                if (
                    ! preg_match(
                        "@^$academicSessionDir/\d00$@", $levelDir
                    )
                ) {

                    throw new InvalidArgumentException(
                        "Invalid result level directory: The directory [" .
                        storage_path($levelDir) .
                        "] does not follow the 'X00' (e.g. 300) naming convention"
                    );
                }

                //
                $resultFiles = Storage::files($levelDir);
                foreach ($resultFiles as $resultFile) {

                    // Ensure the filename follows convention
                    if (
                        ! preg_match(
                            "@^$levelDir/(\d{4}_\d{4})_([A-Z]{3})_(\d{3})_RESULT\.csv$@",
                            $resultFile,
                            $matches
                        )
                    ) {

                        throw new InvalidArgumentException(
                            "Invalid result filename: The filename [" .
                            storage_path($resultFile) .
                            "] does not follow the '[SESSION]_[COURSE]_[CODE]_RESULT.csv' (e.g. 2022_2023_MTH_101_RESULT.csv) naming convention"
                        );
                    }

                    // Copy file to the actual results storage folder
                    $storageResultFile = Str::replace('seeders/results', 'results', $resultFile);
                    if (! Storage::copy($resultFile, $storageResultFile)) {
                        throw new Exception(
                            "Could not copy result file [$resultFile] from to $storageResultFile"
                        );
                    }

                    [, $session, $courseCodeName, $courseCodeDigit] = $matches;
                    $courseCode = "$courseCodeName $courseCodeDigit";

                    $course = Course::query()
                        ->where('code', $courseCode)
                        ->first();

                    if (! $course) {
                        throw new RecordNotFoundException(
                            "The course [$courseCode] not found for $resultFile"
                        );
                    }

                    $course->result()->create([
                        'session'   => $session,
                        'filename'  => $storageResultFile
                    ]);
                }


            }

        }

    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //


        self::seedResultsFromCSV();
    }
}
