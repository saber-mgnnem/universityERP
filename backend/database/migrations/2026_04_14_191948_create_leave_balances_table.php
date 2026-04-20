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
        Schema::create('leave_balances', function (Blueprint $table) {
    $table->id();

    $table->foreignId('staff_id')
        ->constrained('staff_profiles')
        ->cascadeOnDelete();

    $table->integer('leave_year');

    $table->enum('leave_type', [
        'Annual',
        'Sick',
        'Casual'
    ]);

    $table->integer('total_days_allocated');
    $table->integer('used_days')->default(0);
    $table->integer('remaining_days');

    $table->integer('carried_forward_days')->default(0);

    $table->timestamps();

    $table->unique(['staff_id', 'leave_year', 'leave_type']);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_balances');
    }
};
