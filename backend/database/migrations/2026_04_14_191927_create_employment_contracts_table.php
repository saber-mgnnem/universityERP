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
       Schema::create('employment_contracts', function (Blueprint $table) {
    $table->id();

    $table->foreignId('staff_id')
        ->constrained('staff_profiles')
        ->cascadeOnDelete();

    $table->date('contract_start_date');
    $table->date('contract_end_date')->nullable();

    $table->enum('contract_type', [
        'Permanent',
        'Temporary',
        'Fixed-Term',
        'Casual'
    ]);

    $table->string('contract_document_url')->nullable();

    $table->decimal('salary_amount', 12, 2);

    $table->enum('salary_frequency', [
        'Monthly',
        'Quarterly',
        'Annually'
    ])->default('Monthly');

    $table->text('benefits_description')->nullable();

    $table->date('renewal_date')->nullable();

    $table->enum('contract_status', [
        'Active',
        'Expired',
        'Renewed',
        'Terminated'
    ])->default('Active');

    $table->date('termination_date')->nullable();
    $table->text('termination_reason')->nullable();

    $table->foreignId('created_by')
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
        Schema::dropIfExists('employment_contracts');
    }
};
