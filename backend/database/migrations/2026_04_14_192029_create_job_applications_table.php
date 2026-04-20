<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();

            $table->foreignId('job_posting_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('applicant_first_name');
            $table->string('applicant_last_name');

            $table->string('applicant_email');
            $table->string('applicant_phone');

            $table->text('applicant_address')->nullable();

            $table->string('resume_url');
            $table->string('cover_letter_url')->nullable();

            $table->integer('years_of_experience')->nullable();

            $table->string('highest_qualification')->nullable();

            $table->date('application_date');

            $table->enum('application_status', [
                'Submitted',
                'Under Review',
                'Shortlisted',
                'Interview',
                'Offered',
                'Rejected',
                'Accepted',
                'Declined'
            ])->default('Submitted');

            $table->dateTime('interview_date')->nullable();

            $table->string('interview_location')->nullable();

            $table->text('interview_notes')->nullable();

            $table->foreignId('selected_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->date('selection_date')->nullable();

            $table->text('rejection_reason')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
