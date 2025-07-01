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

    private static function parseResultsFromSampleCSV(): void
    {

        $file = Storage::disk('local')
            ->readStream('seeders/samples/2022_2023_100LVL_HARMATTAN_SEMESTER.csv');

        // Read off header
        $headers = fgetcsv($file);

        // This assumes that the grades for the courses in the
        // file begin at the 4th column to the very end
        $courses = array_slice($headers, 3);

        foreach($courses as $course) {

            // We already know the file is for:
            // Academic Session: 2022-2023
            // Level: 100
            // Construct the file name, thus:
            // [ACADEMIC SESSION]_[COURSE CODE]_RESULT.csv

            // Create a file in the 'seeders' directory
            $courseResultFilename = implode('_', explode(' ', trim($course)));
            $courseResultFilePath = Storage::path(
                "seeders/results/2022-2023/100/2022_2023_{$courseResultFilename}_RESULT.csv"
            );

            // Open the file to read
            $courseResultFile = fopen($courseResultFilePath, 'w');

            // Feed the header
            fputcsv($courseResultFile, ['S/N', 'REG. NO.', 'GRADE']);

            // Read the course data off the CSV and add it to the course result file
            $counter = 0;
            while ($line = fgetcsv($file)) {

                $row = array_combine($headers, $line);

                $regNo = $row['REG. NO.'];
                $grade = $row[$course];
                $sNo = ++$counter;

                fputcsv($courseResultFile, [$sNo, $regNo, $grade]);
            }

            // Reset file pointer and read off headers
            rewind($file);
            fgetcsv($file);

        }
    }

    /**
     * Run the database seeds.
     * @throws Exception
     */
    public function run(): void
    {
        //

        self::parseResultsFromSampleCSV();

        self::seedResultsFromCSV();
    }
}
