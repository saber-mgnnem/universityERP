<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();

            $table->string('job_title');
            $table->text('job_description');

            $table->enum('job_category', [
                'Faculty',
                'Administrative',
                'Support',
                'Research',
                'Other'
            ]);

            $table->foreignId('department_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->text('qualification_requirements')->nullable();

            $table->integer('experience_required')->nullable();

            $table->decimal('salary_range_min', 12, 2)->nullable();
            $table->decimal('salary_range_max', 12, 2)->nullable();

            $table->enum('employment_type', [
                'Full-time',
                'Part-time',
                'Contract'
            ]);

            $table->date('posting_date');
            $table->date('closing_date');

            $table->enum('position_status', [
                'Open',
                'On Hold',
                'Closed',
                'Filled'
            ])->default('Open');

            $table->foreignId('posted_by')
                ->constrained('users')
                ->restrictOnDelete();

            $table->integer('number_of_positions')->default(1);

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};
