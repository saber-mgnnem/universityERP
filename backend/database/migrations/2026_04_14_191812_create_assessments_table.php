<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_offering_id')->constrained()->cascadeOnDelete();
            $table->string('assessment_title');
            $table->enum('assessment_type',['Assignment','Quiz','Midterm','Final','Project','Presentation']);
            $table->text('description')->nullable();
            $table->integer('total_marks');
            $table->date('assessment_date');
            $table->dateTime('submission_deadline');
            $table->boolean('is_group_assessment')->default(false);
            $table->text('instructions')->nullable();
            $table->string('attachment_url')->nullable();
            $table->foreignId('created_by')->constrained('users')->restrictOnDelete();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('assessments');
    }
};