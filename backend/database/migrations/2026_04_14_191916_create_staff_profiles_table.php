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
        Schema::create('staff_profiles', function (Blueprint $table) {
    $table->id();

    $table->foreignId('user_id')
        ->unique()
        ->constrained()
        ->cascadeOnDelete();

    $table->string('employee_id')->unique();

    $table->foreignId('department_id')
        ->constrained()
        ->restrictOnDelete();

    $table->string('designation_title');

    $table->enum('employment_type', [
        'Full-time',
        'Part-time',
        'Contract',
        'Adjunct'
    ]);

    $table->date('joining_date');

    $table->text('qualification')->nullable();
    $table->string('specialization')->nullable();

    $table->string('office_location')->nullable();
    $table->string('office_phone')->nullable();

    $table->string('salary_grade')->nullable();

    $table->string('bank_account_number')->nullable();
    $table->string('bank_name')->nullable();
    $table->string('ifsc_code')->nullable();

    $table->string('emergency_contact_name')->nullable();
    $table->string('emergency_contact_phone')->nullable();
    $table->string('emergency_contact_relationship')->nullable();

    $table->date('employment_status_date')->nullable();

    $table->boolean('is_active')->default(true);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff_profiles');
    }
};
