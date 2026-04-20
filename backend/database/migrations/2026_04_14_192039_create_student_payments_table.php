<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_payments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('student_id')
                ->constrained('student_profiles')
                ->cascadeOnDelete();

            $table->foreignId('semester_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('payment_type');

            $table->decimal('amount_due', 12, 2);
            $table->decimal('amount_paid', 12, 2)->default(0);

            $table->date('payment_due_date');
            $table->date('payment_date')->nullable();

            $table->string('payment_method')->default('Bank Transfer');

            $table->string('transaction_reference')->nullable();

            $table->string('payment_status')->default('Pending');

            $table->decimal('late_fee_applied', 12, 2)->default(0);

            $table->string('receipt_number')->nullable();

            $table->text('remarks')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_payments');
    }
};
