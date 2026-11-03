<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PublicController;
use App\Http\Controllers\Api\StudentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    // Public routes
    Route::get('/filieres', [PublicController::class, 'getFilieres']);
    
    // Auth routes
    Route::post('/auth/register', [AuthController::class, 'registerStudent']);
    Route::post('/auth/login', [AuthController::class, 'loginStudent']);
    Route::post('/admin/auth/login', [AuthController::class, 'loginAdmin']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // Auth protected
        Route::post('/student/logout', [AuthController::class, 'logout']);
        Route::get('/student/me', [AuthController::class, 'me']);

        // Student routes
        Route::get('/student/profile', [StudentController::class, 'getProfile']);
        Route::put('/student/profile', [StudentController::class, 'updateProfile']);
        Route::post('/student/dossier', [StudentController::class, 'submitDossier']);
        Route::post('/student/paiement', [StudentController::class, 'makePayment']);

        // Admin routes
        Route::middleware('can:admin')->group(function () {
            Route::get('/admin/dashboard', [AdminController::class, 'getDashboardStats']);
            Route::get('/admin/students', [AdminController::class, 'getStudents']);
            Route::put('/admin/students/{id}', [AdminController::class, 'updateStudent']);
            Route::delete('/admin/students/{id}', [AdminController::class, 'deleteStudent']);
            Route::put('/admin/students/{id}/statut', [AdminController::class, 'updateStudentStatus']);
            Route::get('/admin/students/{id}/documents', [AdminController::class, 'getStudentDocuments']);
            Route::get('/admin/documents/{documentId}/view', [AdminController::class, 'viewStudentDocument']);
            Route::get('/admin/transactions', [AdminController::class, 'getTransactions']);
            Route::get('/admin/filieres', [AdminController::class, 'getFilieres']);
            Route::post('/admin/filieres', [AdminController::class, 'createFiliere']);
        });
    });
});
