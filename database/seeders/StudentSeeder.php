<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Str;

class StudentSeeder extends CustomSeeder
{


    /**
     * @throws FileNotFoundException
     */
    private static function seedStudentsFromCSV(): void
    {

        $getUsername = function (string $name, string $regNo): string {
            $username = Str::lower($name);
            $username = Str::replace([' ', '.'], ['_', ''], $username);
            $last4Digits = Str::substr($regNo, -4, 4);

            return "{$username}_{$last4Digits}";
        };

        $getEmail = fn (string $lastName, string $regNo): string => (
            Str::lower($lastName) . ".$regNo@example.test"
        );

        $students = self::loadSeedDataFromCSV(
            'seeders/students/MCE_2022_STUDENTS.csv',
            ['NAME', 'REG. NO.']
        );
        foreach ($students as $student) {

            [
                'NAME'      => $name,
                'REG. NO.'  => $regNo
            ] = $student;
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

        self::seedStudentsFromCSV();
    }
}
