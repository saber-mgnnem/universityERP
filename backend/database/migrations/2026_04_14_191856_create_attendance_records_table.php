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
        Schema::create('attendance_records', function (Blueprint $table) {
    $table->id();

    $table->foreignId('course_offering_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('student_id')
        ->constrained('users')
        ->cascadeOnDelete();

    $table->date('attendance_date');

    $table->enum('attendance_status', [
        'Present',
        'Absent',
        'Late',
        'Excused'
    ])->default('Absent');

    $table->string('remarks')->nullable();

    $table->foreignId('recorded_by')
        ->constrained('users')
        ->restrictOnDelete();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_records');
    }
};
