<?php

namespace Database\Seeders;

use App\Models\Filiere;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SchoolapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user
        User::updateOrCreate([
            'email' => 'admin@school.com',
        ], [
            'name' => 'Administrateur',
            'password' => Hash::make('admin'),
            'role' => 'admin',
        ]);

        // Filieres
        $filieres = [
            [
                'nom' => 'Licence Design UI/UX',
                'niveau' => 'Licence (BAC+3)',
                'description' => "Création d'interfaces web et mobile, prototypage Figma.",
                'frais_annuels' => 300000,
            ],
            [
                'nom' => 'Master Ingénierie Logicielle',
                'niveau' => 'Master (BAC+5)',
                'description' => 'Architecture cloud, DevOps, Développement Fullstack.',
                'frais_annuels' => 450000,
            ],
            [
                'nom' => "MBA Finance d'Entreprise",
                'niveau' => 'MBA',
                'description' => 'Analyse financière, audit et gestion de risques.',
                'frais_annuels' => 550000,
            ],
            [
                'nom' => 'Master Management Stratégique',
                'niveau' => 'Master (BAC+5)',
                'description' => 'Leadership, gestion de projet et stratégie business.',
                'frais_annuels' => 480000,
            ],
            [
                'nom' => 'Bachelor Design Graphique',
                'niveau' => 'Bachelor (BAC+3)',
                'description' => 'Communication visuelle, branding et suite Adobe.',
                'frais_annuels' => 320000,
            ],
            [
                'nom' => 'Licence Développement Web',
                'niveau' => 'Licence (BAC+3)',
                'description' => 'Fondamentaux du web, Frontend et Backend.',
                'frais_annuels' => 350000,
            ],
        ];

        foreach ($filieres as $filiere) {
            Filiere::updateOrCreate(
                ['nom' => $filiere['nom']],
                $filiere + ['active' => true],
            );
        }
    }
}
