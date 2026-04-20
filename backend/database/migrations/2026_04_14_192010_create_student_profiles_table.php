<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->unique()
                ->constrained()
                ->cascadeOnDelete();

            $table->string('student_id')->unique();

            $table->foreignId('department_id')
                ->constrained()
                ->restrictOnDelete();

            $table->date('enrollment_date');

            $table->integer('current_semester')->nullable();

            $table->decimal('current_gpa', 3, 2)->default(0);
            $table->decimal('cumulative_gpa', 3, 2)->default(0);

            $table->enum('academic_standing', [
                'Good',
                'Warning',
                'Probation',
                'Suspended'
            ])->default('Good');

            $table->integer('total_credits_earned')->default(0);

            $table->string('father_name')->nullable();
            $table->string('father_phone')->nullable();

            $table->string('mother_name')->nullable();
            $table->string('mother_phone')->nullable();

            $table->string('guardian_name')->nullable();
            $table->string('guardian_contact')->nullable();

            $table->string('registration_number')->nullable();

            $table->boolean('is_international_student')->default(false);

            $table->string('passport_number')->nullable();
            $table->date('visa_expiry_date')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};