<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    /** @use HasFactory<\Database\Factories\FiliereFactory> */
    use HasFactory;

    protected $fillable = [
        'nom',
        'niveau',
        'description',
        'frais_annuels',
        'active',
    ];

    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
