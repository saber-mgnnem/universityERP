<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('course_offerings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('semester_id')->constrained()->cascadeOnDelete();
            $table->string('section_number')->nullable();
            $table->foreignId('instructor_id')->constrained('users')->restrictOnDelete();
            $table->integer('capacity')->default(50);
            $table->integer('enrolled_students')->default(0);
            $table->string('classroom_location')->nullable();
            $table->string('course_schedule_day')->nullable();
            $table->time('class_start_time')->nullable();
            $table->time('class_end_time')->nullable();
            $table->text('office_hours')->nullable();
            $table->string('course_syllabus_url')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('course_offerings');
    }
};
