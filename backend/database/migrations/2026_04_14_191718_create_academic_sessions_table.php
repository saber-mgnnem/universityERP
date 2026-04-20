<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('academic_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('session_name');
            $table->integer('session_year')->unique();
            $table->date('session_start_date');
            $table->date('session_end_date');
            $table->integer('semester_count')->default(2);
            $table->boolean('is_current_session')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('academic_sessions');
    }
};
