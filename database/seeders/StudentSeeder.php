<?php

namespace Database\Seeders;

use App\Models\User;
use http\Exception\InvalidArgumentException;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StudentSeeder extends Seeder
{

    /**
     * @param string $path The path to the CSV file from the `storage/private/students` directory
     * @return void
     * @throws FileNotFoundException
     * @throws \Exception
     */
    private static function seedStudentsFromCSV(string $path): void
    {
        $path = "students/$path";

        // Ensure file exists
        if (! Storage::exists($path)) {
            throw new FileNotFoundException(
                "CSV file not found at: " . storage_path("app/private/$path")
            );
        }

        // Ensure it is a valid CSV file
        $mime = Storage::mimeType($path);
        if (! str_ends_with($path, '.csv') || ! in_array($mime, ['text/plain', 'text/csv'])) {
            throw new \InvalidArgumentException("File is not a CSV");
        }

        // Ensure it includes required columns
        $requiredHeaders = ['NAME', 'REG. NO.'];

        $file = Storage::disk('local')->readStream($path);
        if (! $file) {
            throw new \Exception("Could not read file");
        }

        $headers = fgetcsv($file);
        $missing = array_diff($requiredHeaders, $headers);

        if (! empty($missing)) {
            throw new \InvalidArgumentException(
                "Missing required columns: " . implode(', ', $missing)
            );
        }

        $getUsername = function (string $name, string $regNo): string {
            $username = Str::lower($name);
            $username = Str::replace([' ', '.'], ['_', ''], $username);
            $last4Digits = Str::substr($regNo, -4, 4);

            return "{$username}_{$last4Digits}";
        };

        $getEmail = fn (string $lastName, string $regNo): string => (
            Str::lower($lastName) . ".$regNo@example.test"
        );

        while ($line = fgetcsv($file)) {

            $studentData = array_combine($headers, $line);

            $name   = $studentData['NAME']; // expecting something like: JOHN D.O.
            $regNo  = $studentData['REG. NO.'];

            [$lastName, $firstName] = explode(' ', $name);

            User::create([
                'username'  => $getUsername($name, $regNo),
                'email'     => $getEmail($lastName, $regNo),
                'password'  => $regNo // use reg. no. as password
            ])->student()->create([
                'first_name'    => $firstName,
                'last_name'     => $lastName,
                'reg_no'        => $regNo
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

        self::seedStudentsFromCSV('MCE_2022_STUDENTS.csv');
    }
}
