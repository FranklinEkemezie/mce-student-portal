<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Seed schools
        $this->call(SchoolSeeder::class);

        // Seed students
        $this->call(StudentSeeder::class);

        // Add default admin
        User::create([
            'username'  => 'admin_001',
            'email'     => 'admin@example.test',
            'password'  => 'admin',
            'email_verified_at' => now()
        ])->admin()->create([
            'level'     => 3
        ]);
    }
}
