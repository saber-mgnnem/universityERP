<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
       Schema::create('user_roles', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('role_id')->constrained()->restrictOnDelete();

    $table->timestamp('assigned_at')->nullable();
    $table->foreignId('assigned_by')->nullable();
    $table->boolean('is_primary')->default(false);

    $table->timestamps();
});
    }

    public function down(): void {
        Schema::dropIfExists('user_roles');
    }
};
