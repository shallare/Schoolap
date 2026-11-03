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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('matricule')->unique();
            $table->string('prenom');
            $table->string('nom');
            $table->string('email')->unique();
            $table->foreignId('filiere_id')->nullable()->constrained('filieres')->onDelete('set null');
            $table->enum('statut', ['NOUVEAU', 'EN_ATTENTE', 'VALIDE', 'INSCRIT'])->default('NOUVEAU');
            $table->decimal('montant_paye', 12, 2)->default(0);
            $table->decimal('montant_restant', 12, 2)->default(0);
            $table->integer('progression')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
