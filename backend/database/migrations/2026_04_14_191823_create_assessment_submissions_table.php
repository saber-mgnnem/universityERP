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
        Schema::create('assessment_submissions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();

            $table->string('submission_file_url')->nullable();
            $table->text('submission_text')->nullable();

            $table->dateTime('submitted_at');

            $table->boolean('is_late')->default(false);
            $table->decimal('late_penalty_percentage', 5, 2)->default(0);

            $table->enum('submission_status', [
                'Submitted',
                'Not Submitted',
                'Pending Review'
            ])->default('Submitted');

            $table->timestamps();

            $table->unique(['assessment_id', 'student_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_submissions');
    }
};
