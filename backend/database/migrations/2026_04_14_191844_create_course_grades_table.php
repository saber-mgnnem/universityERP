<?php

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
       Schema::create('course_grades', function (Blueprint $table) {
    $table->id();

    $table->foreignId('enrollment_id')
        ->unique()
        ->constrained()
        ->cascadeOnDelete();

    $table->decimal('continuous_assessment_marks', 5, 2)->default(0);
    $table->decimal('midterm_exam_marks', 5, 2)->default(0);
    $table->decimal('final_exam_marks', 5, 2)->default(0);

    $table->decimal('total_marks_obtained', 5, 2)->nullable();
    $table->decimal('gpa_points', 3, 2)->nullable();

    $table->string('letter_grade', 2)->nullable();

    $table->enum('grade_status', [
        'Pass',
        'Fail',
        'Pending',
        'Incomplete'
    ])->default('Pending');

    $table->text('remarks')->nullable();

    $table->foreignId('graded_by')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

    $table->dateTime('graded_at')->nullable();

    $table->boolean('is_final')->default(false);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_grades');
    }
};
