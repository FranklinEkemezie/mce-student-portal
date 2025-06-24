<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    private static function migrateStudentResults(): void
    {
        $file = Storage::disk('private')->readStream('MCE_2022_DATA_CSV.csv');
    }

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //

//        self::migrateStudentResults();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //

    }
};
