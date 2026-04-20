<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('department_name');
            $table->string('department_code')->unique();
            $table->text('description')->nullable();
            $table->foreignId('head_of_department_id')->nullable()->constrained('users')->nullOnDelete();
            $table->integer('faculty_count')->default(0);
            $table->integer('student_count')->default(0);
            $table->decimal('budget_allocation',15,2)->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('office_building')->nullable();
            $table->string('office_room_number')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('departments');
    }
};