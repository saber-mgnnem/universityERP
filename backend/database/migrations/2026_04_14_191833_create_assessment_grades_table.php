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
      Schema::create('assessment_grades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('assessment_submission_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->decimal('marks_obtained', 5, 2);
            $table->decimal('percentage_obtained', 5, 2)->nullable();

            $table->text('feedback')->nullable();

            $table->foreignId('graded_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->dateTime('graded_at');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_grades');
    }
};
