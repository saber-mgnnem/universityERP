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
        Schema::create('course_materials', function (Blueprint $table) {
    $table->id();

    $table->foreignId('course_offering_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('material_title');

    $table->enum('material_type', [
        'Lecture Notes',
        'Video',
        'Article',
        'Book',
        'Code',
        'Other'
    ]);

    $table->text('material_description')->nullable();

    $table->string('file_url')->nullable();
    $table->string('external_link_url', 500)->nullable();

    $table->foreignId('uploaded_by')
        ->constrained('users')
        ->restrictOnDelete();

    $table->date('upload_date');

    $table->boolean('is_required_reading')->default(false);

    $table->integer('week_number')->nullable();
    $table->integer('display_order')->nullable();

    $table->boolean('is_active')->default(true);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_materials');
    }
};
