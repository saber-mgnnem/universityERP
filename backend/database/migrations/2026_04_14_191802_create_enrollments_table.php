<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('course_offering_id')->constrained()->cascadeOnDelete();
            $table->date('enrollment_date');
            $table->enum('enrollment_status',['Enrolled','Dropped','Completed','Failed','Withdrawn'])->default('Enrolled');
            $table->decimal('attendance_percentage',5,2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['student_id','course_offering_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('enrollments');
    }
};
