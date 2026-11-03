<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'matricule',
        'prenom',
        'nom',
        'email',
        'filiere_id',
        'statut',
        'montant_paye',
        'montant_restant',
        'progression',
    ];

    protected $appends = ['name'];

    public function getNameAttribute()
    {
        return $this->prenom . ' ' . $this->nom;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function documents()
    {
        return $this->hasMany(StudentDocument::class);
    }
}
