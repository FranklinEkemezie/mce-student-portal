<?php

use App\Models\Department;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Department::class); // dept. in charge of course
            $table->string('title')->unique();
            $table->string('code')->unique();
            $table->integer('unit');
            $table->string('prerequisites')
                ->nullable(); // comma separated e.g. MCE 301,ENG 102
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
