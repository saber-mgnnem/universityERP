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
      Schema::create('staff_attendance_records', function (Blueprint $table) {
    $table->id();

    // STAFF MEMBER
    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    // DATE
    $table->date('attendance_date');

    // STATUS
    $table->enum('attendance_status', [
        'Present',
        'Absent',
        'Late',
        'Leave'
    ])->default('Present');

    // TIME TRACKING
    $table->time('check_in_time')->nullable();
    $table->time('check_out_time')->nullable();

    // LATE SYSTEM
    $table->integer('minutes_late')->default(0);
    $table->boolean('is_late')->default(false);

    // AUTO ABSENCE SYSTEM
    $table->boolean('auto_marked_absent')->default(false);

    // NOTES
    $table->text('remarks')->nullable();

    // WHO RECORDED IT (HR)
    $table->foreignId('recorded_by')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_attendance_records');
    }
};
