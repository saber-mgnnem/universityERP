<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code')->unique();
            $table->string('course_title');
            $table->text('course_description')->nullable();
            $table->foreignId('department_id')->constrained()->restrictOnDelete();
            $table->integer('credit_hours')->default(3);
            $table->integer('total_marks')->default(100);
            $table->integer('passing_marks')->default(40);
            $table->enum('course_level',['100','200','300','400']);
            $table->string('prerequisites_text')->nullable();
            $table->integer('max_enrollment')->default(50);
            $table->boolean('is_compulsory')->default(true);
            $table->boolean('is_elective')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('courses');
    }
};
