# SchoolAp - Description complete du projet

## Presentation

SchoolAp est une application web de gestion d'inscription scolaire et de suivi de scolarite. Elle permet aux candidats/etudiants de creer un compte, choisir une filiere, soumettre leur dossier, suivre l'avancement de leur admission et payer les frais de scolarite. Elle fournit aussi un espace d'administration pour superviser les inscriptions, valider les dossiers, consulter les etudiants, suivre les filieres et piloter les finances.

## Stack technique

- Frontend: React 19, TypeScript, Vite, React Router, Tailwind CSS, Lucide React, Motion.
- Backend: Laravel 12, API REST JSON, Laravel Sanctum pour les tokens d'authentification.
- Base de donnees: MySQL, base `schoolap`.
- URLs locales principales:
  - Frontend: `http://localhost:3000`
  - API Laravel: `http://localhost:8000/api/v1`
  - phpMyAdmin: `http://localhost:8080/phpmyadmin`

## Acteurs et roles

### Visiteur public

Le visiteur public peut consulter la page d'accueil, decouvrir les filieres disponibles, voir les frais annuels et acceder aux pages de connexion ou de creation de compte.

### Etudiant

L'etudiant peut:

- Creer un compte avec prenom, nom, email, mot de passe et filiere optionnelle.
- Se connecter a son espace personnel.
- Consulter son tableau de bord et son statut d'inscription.
- Completer son dossier en selectionnant une filiere et en ajoutant les pieces demandees.
- Envoyer les fichiers de son dossier: diplome, releve de notes, photo et piece d'identite.
- Soumettre son dossier a l'administration avec les pieces jointes.
- Suivre les etapes: `NEW`, `PENDING`, `VALIDATED`, `PAID`.
- Payer tout ou partie de sa scolarite une fois le dossier valide.
- Consulter son historique de paiements.
- Se deconnecter.

### Administrateur

L'administrateur peut:

- Se connecter avec le compte de demonstration `admin@school.com` / `admin`.
- Consulter le dashboard global: nombre d'etudiants, dossiers en attente, inscriptions finalisees, chiffre d'affaires, total attendu et filieres actives.
- Voir l'activite recente des etudiants.
- Consulter la liste des etudiants avec matricule, email, filiere et statut.
- Modifier les informations d'un etudiant: prenom, nom, email, filiere, statut et mot de passe.
- Supprimer un etudiant et ses fichiers associes.
- Traiter les dossiers d'inscription en attente.
- Ouvrir le dossier d'un etudiant depuis la sous-section Inscriptions.
- Voir tous les fichiers envoyes par l'etudiant.
- Cliquer sur un fichier pour afficher son contenu dans une fenetre de consultation.
- Valider un dossier et le faire passer de `PENDING` a `VALIDATED`.
- Consulter les transactions financieres.
- Consulter les filieres disponibles et leurs frais.
- Ajouter une nouvelle filiere depuis la sous-section Filieres.
- Se deconnecter.

## Cycle d'inscription

1. `NEW`: le compte etudiant existe, mais le dossier n'est pas encore soumis.
2. `PENDING`: l'etudiant a choisi une filiere et soumis son dossier.
3. `VALIDATED`: l'administrateur a valide le dossier.
4. `PAID`: l'etudiant a regle la totalite des frais annuels de sa filiere.

## Principales routes API

- `GET /api/v1/filieres`: liste publique des filieres actives.
- `POST /api/v1/auth/register`: creation d'un compte etudiant.
- `POST /api/v1/auth/login`: connexion etudiant.
- `POST /api/v1/admin/auth/login`: connexion administrateur.
- `GET /api/v1/student/me`: profil de l'utilisateur connecte.
- `GET /api/v1/student/profile`: profil etudiant avec filiere et transactions.
- `POST /api/v1/student/dossier`: soumission du dossier et choix de filiere.
- `POST /api/v1/student/paiement`: paiement de scolarite.
- `GET /api/v1/admin/dashboard`: statistiques administrateur.
- `GET /api/v1/admin/students`: liste paginee des etudiants.
- `PUT /api/v1/admin/students/{id}`: modification d'un etudiant.
- `DELETE /api/v1/admin/students/{id}`: suppression d'un etudiant.
- `PUT /api/v1/admin/students/{id}/statut`: mise a jour du statut d'un etudiant.
- `GET /api/v1/admin/students/{id}/documents`: liste des fichiers d'un dossier etudiant.
- `GET /api/v1/admin/documents/{documentId}/view`: affichage securise d'un fichier du dossier.
- `GET /api/v1/admin/transactions`: transactions paginees.
- `GET /api/v1/admin/filieres`: liste des filieres cote admin.
- `POST /api/v1/admin/filieres`: creation d'une nouvelle filiere.

## Donnees principales

- `users`: comptes de connexion, role `student` ou `admin`.
- `students`: profil scolaire, matricule, filiere, statut, montants payes/restants et progression.
- `filieres`: formations disponibles, niveau, description, frais annuels et activation.
- `transactions`: paiements effectues par les etudiants.
- `student_documents`: fichiers envoyes par les etudiants pour leur dossier d'inscription.
- `personal_access_tokens`: tokens Sanctum utilises pour l'authentification API.

## Corrections et etat actuel

- Authentification admin corrigee: le modele `User` utilise maintenant Sanctum avec `HasApiTokens`.
- Migration des tokens Sanctum ajoutee et appliquee.
- Connexion `admin@school.com` / `admin` verifiee avec succes.
- Seeders rendus coherents et idempotents pour creer/mettre a jour l'admin et les filieres.
- Le seeder principal lance maintenant les donnees SchoolAp au lieu d'un utilisateur Laravel de test.
- Les reponses etudiant chargent maintenant la filiere et les transactions.
- Le rafraichissement de session frontend met bien a jour le dossier et le paiement apres action.
- Les routes frontend `/student/dossier` et `/student/paiement` sont maintenant disponibles.
- Le total attendu en finance est calcule depuis les frais reels des filieres choisies, plus depuis une moyenne fictive.
- Les fichiers de dossier sont maintenant envoyes au backend et consultables par l'admin.
- L'admin peut ajouter une filiere.
- L'admin peut modifier ou supprimer un etudiant.

## Verification

- `php artisan migrate`: OK.
- Connexion API admin: OK, token recu.
- Dashboard admin protege: OK.
- Creation/soumission d'un dossier etudiant de test: OK, passage `NEW` vers `PENDING`.
- Upload et consultation admin d'un document de dossier: OK.
- Creation de filiere admin: OK.
- Modification et suppression d'etudiant admin: OK.
- Nettoyage du compte etudiant temporaire de test: OK.
- `npm run build`: OK.
- `npm run lint`: OK.

## Lancement local

Backend Laravel:

```bash
cd backend
php artisan serve
```

Frontend React:

```bash
cd Schoolap
npm run dev
```

Identifiants administrateur:

```text
Email: admin@school.com
Mot de passe: admin
```
