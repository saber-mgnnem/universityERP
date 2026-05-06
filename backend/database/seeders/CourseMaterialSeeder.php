<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CourseOffering;
use App\Models\User;
use App\Models\CourseMaterial;

class CourseMaterialSeeder extends Seeder
{
    public function run(): void
    {
        $offerings = CourseOffering::all();

        if ($offerings->isEmpty()) {
            throw new \Exception("No course offerings found. Seed course_offerings first.");
        }

        $userId = User::first()->id ?? 1;

        foreach ($offerings as $offering) {

            CourseMaterial::create([
                'course_offering_id' => $offering->id,
                'material_title' => 'Intro Material - ' . $offering->id,
                'material_type' => 'Lecture Notes',
                'file_url' => '/storage/materials/sample.pdf',
                'uploaded_by' => $userId,
                'upload_date' => now(),
                'week_number' => 1,
                'display_order' => 1,
            ]);

            CourseMaterial::create([
                'course_offering_id' => $offering->id,
                'material_title' => 'Video Lecture - ' . $offering->id,
                'material_type' => 'Video',
                'external_link_url' => 'https://youtube.com/example',
                'uploaded_by' => $userId,
                'upload_date' => now(),
                'week_number' => 2,
                'display_order' => 1,
            ]);
        }
    }
}