<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('department_budgets', function (Blueprint $table) {
            $table->id();

            $table->foreignId('department_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('academic_session_id')
                ->constrained('academic_sessions')
                ->cascadeOnDelete();

            $table->decimal('total_budget', 15, 2);

            $table->decimal('salaries_budget', 15, 2)->default(0);
            $table->decimal('equipment_budget', 15, 2)->default(0);
            $table->decimal('research_budget', 15, 2)->default(0);
            $table->decimal('maintenance_budget', 15, 2)->default(0);
            $table->decimal('other_expenses_budget', 15, 2)->default(0);

            $table->decimal('allocated_amount', 15, 2)->nullable();
            $table->decimal('spent_amount', 15, 2)->default(0);
            $table->decimal('remaining_amount', 15, 2)->nullable();

            $table->string('budget_status')->default('Pending');

            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->date('approval_date')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department_budgets');
    }
};
