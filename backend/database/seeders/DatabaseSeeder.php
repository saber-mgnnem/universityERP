<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([

            // 🔐 CORE SYSTEM
            RoleSeeder::class,
            DepartmentSeeder::class,

            // 👤 USERS (must exist before profiles)
            UserSeeder::class,

            // 🎓 STUDENTS
            StudentProfileSeeder::class,

            // 👨‍🏫 STAFF
            StaffProfileSeeder::class,

        ]);
    }
}