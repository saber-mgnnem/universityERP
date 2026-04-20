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
        Schema::create('payroll_records', function (Blueprint $table) {
    $table->id();

    $table->foreignId('staff_id')
        ->constrained('staff_profiles')
        ->cascadeOnDelete();

    $table->integer('payroll_month');
    $table->integer('payroll_year');

    $table->decimal('basic_salary', 12, 2);

    $table->decimal('allowances_total', 12, 2)->default(0);
    $table->decimal('deductions_total', 12, 2)->default(0);

    $table->decimal('gross_salary', 12, 2)->nullable();

    $table->decimal('income_tax', 12, 2)->default(0);
    $table->decimal('provident_fund', 12, 2)->default(0);

    $table->decimal('professional_tax', 12, 2)->default(0);
    $table->decimal('health_insurance_deduction', 12, 2)->default(0);
    $table->decimal('other_deductions', 12, 2)->default(0);

    $table->decimal('net_salary', 12, 2)->nullable();

    $table->enum('payment_status', [
        'Pending',
        'Processed',
        'Paid',
        'Failed'
    ])->default('Pending');

    $table->date('payment_date')->nullable();

    $table->string('payment_method')->default('Bank Transfer');

    $table->string('transaction_reference')->nullable();

    $table->foreignId('processed_by')
        ->nullable()
        ->constrained('users')
        ->nullOnDelete();

    $table->dateTime('processed_at')->nullable();

    $table->text('remarks')->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_records');
    }
};
