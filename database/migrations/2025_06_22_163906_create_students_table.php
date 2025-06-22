<?php

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

return new class extends Migration
{

    private static function migrateStudents(string $path, string $disk='local', ): void
    {
        $file = Storage::disk($disk)->readStream($path);
        $getUsername = function (string $name, string $regNo): string {
            $username = Str::lower($name);
            $username = Str::replace([' ', '.'], ['_', ''], $username);
            $last4Digits = Str::substr($regNo, -4, 4);
            return "{$username}_{$last4Digits}";
        };

        $getEmail = fn (string $firstname, string $regNo): string => (
            Str::lower($firstname) . ".$regNo@example.test"
        );

        fgetcsv($file);
        while ($line = fgetcsv($file)) {
            [, $name, $regNo] = $line;

            [$firstname, $lastname] = explode(' ', $name);
            User::create([
                'username'  => $getUsername($name, $regNo),
                'email'     => $getEmail($firstname, $regNo),
                'password'  => $regNo,
            ])->student()->create([
                'firstname' => Str::convertCase($firstname, MB_CASE_TITLE),
                'lastname'  => $lastname,
                'reg_no'    => $regNo
            ]);
        }
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('firstname');
            $table->string('lastname');
            $table->string('reg_no');
            $table->timestamps();
        });

        // Migrate students records from CSV
        self::migrateStudents('MCE_2022_DATA_CSV.csv', 'local');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
