-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 03 mai 2026 à 18:03
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `schoolap`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `filieres`
--

CREATE TABLE `filieres` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nom` varchar(255) NOT NULL,
  `niveau` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `frais_annuels` decimal(12,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `filieres`
--

INSERT INTO `filieres` (`id`, `nom`, `niveau`, `description`, `frais_annuels`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Licence Design UI/UX', 'Licence (BAC+3)', 'Création d\'interfaces web et mobile, prototypage Figma.', 300000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45'),
(2, 'Master Ingénierie Logicielle', 'Master (BAC+5)', 'Architecture cloud, DevOps, Développement Fullstack.', 450000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45'),
(3, 'MBA Finance d\'Entreprise', 'MBA', 'Analyse financière, audit et gestion de risques.', 550000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45'),
(4, 'Master Management Stratégique', 'Master (BAC+5)', 'Leadership, gestion de projet et stratégie business.', 480000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45'),
(5, 'Bachelor Design Graphique', 'Bachelor (BAC+3)', 'Communication visuelle, branding et suite Adobe.', 320000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45'),
(6, 'Licence Développement Web', 'Licence (BAC+3)', 'Fondamentaux du web, Frontend et Backend.', 350000.00, 1, '2026-05-03 13:24:45', '2026-05-03 13:24:45');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_03_142050_create_filieres_table', 1),
(5, '2026_05_03_142051_create_students_table', 1),
(6, '2026_05_03_142052_create_transactions_table', 1),
(7, '2026_05_03_142207_add_role_to_users_table', 2),
(8, '2026_05_03_143246_update_student_status_enum', 3),
(9, '2026_05_03_160000_create_personal_access_tokens_table', 4),
(10, '2026_05_03_163000_create_student_documents_table', 5);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'e283f56e92824b3d8bc22cf2f8f9bb57f929453aac22efcbc4fccc504dd1e378', '[\"*\"]', NULL, NULL, '2026-05-03 14:17:24', '2026-05-03 14:17:24'),
(2, 'App\\Models\\User', 1, 'auth_token', 'afc25d787306833bdcea9d09b0bdaa7a49bdfefafcb99a9c9b2156a27c4b99f8', '[\"*\"]', '2026-05-03 14:18:14', NULL, '2026-05-03 14:18:12', '2026-05-03 14:18:14'),
(4, 'App\\Models\\User', 1, 'auth_token', 'de44b087fbf21751c49718e6878ee17e0105aed9af486666162943d1a6f4bd6d', '[\"*\"]', '2026-05-03 14:19:25', NULL, '2026-05-03 14:19:25', '2026-05-03 14:19:25'),
(8, 'App\\Models\\User', 1, 'auth_token', '5955f150f7b9c0bc13452d01aba5c1d3371b84abd0ba3331f1af6ca676be82ed', '[\"*\"]', '2026-05-03 14:37:15', NULL, '2026-05-03 14:37:15', '2026-05-03 14:37:15'),
(10, 'App\\Models\\User', 1, 'auth_token', 'd9300a530d4f3428c8ff59f82ac50380b7cc34a0852caeef4f417548ae033e26', '[\"*\"]', '2026-05-03 14:39:06', NULL, '2026-05-03 14:39:05', '2026-05-03 14:39:06'),
(12, 'App\\Models\\User', 1, 'auth_token', '55c534a2b1fba867242f5899bc111a881d04567852274cc75306bc6c74416d85', '[\"*\"]', '2026-05-03 14:39:58', NULL, '2026-05-03 14:39:52', '2026-05-03 14:39:58'),
(17, 'App\\Models\\User', 1, 'auth_token', '5e8987a5bc80ac9c780d588cd7e1d3e9fa4c882c921bc231ee64ea65b79f8c62', '[\"*\"]', '2026-05-03 14:47:11', NULL, '2026-05-03 14:46:17', '2026-05-03 14:47:11');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `filiere_id` bigint(20) UNSIGNED DEFAULT NULL,
  `statut` enum('NEW','PENDING','VALIDATED','PAID') NOT NULL DEFAULT 'NEW',
  `montant_paye` decimal(12,2) NOT NULL DEFAULT 0.00,
  `montant_restant` decimal(12,2) NOT NULL DEFAULT 0.00,
  `progression` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`id`, `user_id`, `matricule`, `prenom`, `nom`, `email`, `filiere_id`, `statut`, `montant_paye`, `montant_restant`, `progression`, `created_at`, `updated_at`) VALUES
(2, 3, 'ETU-64724', 'John', 'KING', 'johnking@gmail.com', 1, 'VALIDATED', 160000.00, 140000.00, 53, '2026-05-03 14:24:29', '2026-05-03 14:45:33');

-- --------------------------------------------------------

--
-- Structure de la table `student_documents`
--

CREATE TABLE `student_documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `size` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `student_documents`
--

INSERT INTO `student_documents` (`id`, `student_id`, `type`, `title`, `original_name`, `path`, `mime_type`, `size`, `created_at`, `updated_at`) VALUES
(2, 2, 'diplome', 'Diplome ou attestation de reussite', '13.png', 'student-documents/2/V2fIqubaQFCooramy94chygde9kKAwVJiDuPztTb.png', 'image/png', 148974, '2026-05-03 14:43:22', '2026-05-03 14:43:22'),
(3, 2, 'releve', 'Releve de notes officiel', '12 pro.png', 'student-documents/2/SV0l7C74htdGe1MRRMojww6Haab593epbefbarnL.png', 'image/png', 19503, '2026-05-03 14:43:22', '2026-05-03 14:43:22'),
(4, 2, 'photo', 'Photo d\'identite recente', '16 pro max.png', 'student-documents/2/TVPweoK1vI31DGMqM0jebuDdtP1Gnp3PVLNNiQcE.png', 'image/png', 492225, '2026-05-03 14:43:22', '2026-05-03 14:43:22'),
(5, 2, 'cni', 'CNI ou passeport en cours de validite', '1769219844438.jpg', 'student-documents/2/TxHO8vkOSb2M8PbtxNHpRTx5u0uFX2QVV8x1qgYe.jpg', 'image/jpeg', 268799, '2026-05-03 14:43:22', '2026-05-03 14:43:22');

-- --------------------------------------------------------

--
-- Structure de la table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `reference` varchar(255) NOT NULL,
  `montant` decimal(12,2) NOT NULL,
  `mode_paiement` varchar(255) NOT NULL,
  `statut` varchar(255) NOT NULL DEFAULT 'SUCCES',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `transactions`
--

INSERT INTO `transactions` (`id`, `student_id`, `reference`, `montant`, `mode_paiement`, `statut`, `created_at`, `updated_at`) VALUES
(1, 2, 'PAY-NK2H2HLF', 100000.00, 'Carte Bancaire', 'SUCCES', '2026-05-03 14:44:49', '2026-05-03 14:44:49'),
(2, 2, 'PAY-TWJRCDDP', 60000.00, 'Carte Bancaire', 'SUCCES', '2026-05-03 14:45:33', '2026-05-03 14:45:33');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'student',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrateur', 'admin@school.com', 'admin', NULL, '$2y$12$.sFX9c5BFp7Knq5IwlRtfeWq42OwtlaID9/P8M4rdZXUsH0LvWRM2', NULL, '2026-05-03 13:24:45', '2026-05-03 14:01:09'),
(3, 'John KING', 'johnking@gmail.com', 'student', NULL, '$2y$12$nXFV11wvsbRlL1WildOloeQ3uzIBYXX4KryOkb9HFbWK6Rrxp/1hy', NULL, '2026-05-03 14:24:29', '2026-05-03 14:24:29');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `filieres`
--
ALTER TABLE `filieres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_matricule_unique` (`matricule`),
  ADD UNIQUE KEY `students_email_unique` (`email`),
  ADD KEY `students_user_id_foreign` (`user_id`),
  ADD KEY `students_filiere_id_foreign` (`filiere_id`);

--
-- Index pour la table `student_documents`
--
ALTER TABLE `student_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_documents_student_id_foreign` (`student_id`);

--
-- Index pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `transactions_reference_unique` (`reference`),
  ADD KEY `transactions_student_id_foreign` (`student_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `filieres`
--
ALTER TABLE `filieres`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `student_documents`
--
ALTER TABLE `student_documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_filiere_id_foreign` FOREIGN KEY (`filiere_id`) REFERENCES `filieres` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `student_documents`
--
ALTER TABLE `student_documents`
  ADD CONSTRAINT `student_documents_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
