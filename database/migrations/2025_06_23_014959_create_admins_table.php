<?php

use App\Models\User;
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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->enum('level', [1, 2, 3]); // dummy levels for now
            $table->timestamps();
        });

        // Add default admin
        if (app()->environment('local')) {
            User::create([
                'username'  => 'admin',
                'email'     => 'admin@example.test',
                'password'  => 'admin',
                'email_verified_at' => now()
            ])->admin()->create([
                'level'     => 3
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
