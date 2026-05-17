<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {

            // drop old column
            $table->dropColumn('course_level');

            // add new column
            $table->enum('coefficient', ['1', '1.5', '2', '3', '4'])
                  ->after('credit_hours');
        });
    }

    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {

            // rollback
            $table->dropColumn('coefficient');

            $table->enum('course_level', ['100', '200', '300', '400'])
                  ->after('credit_hours');
        });
    }
};