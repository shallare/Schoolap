<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private function studentPayload(Student $student): Student
    {
        return $student->load(['filiere', 'transactions', 'documents']);
    }

    public function registerStudent(Request $request)
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'filiere_id' => 'nullable|exists:filieres,id',
        ]);

        $user = User::create([
            'name' => $request->prenom . ' ' . $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student',
        ]);

        $student = Student::create([
            'user_id' => $user->id,
            'matricule' => 'ETU-' . rand(10000, 99999),
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'filiere_id' => $request->filiere_id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'student' => $this->studentPayload($student),
            'token' => $token,
        ], 201);
    }

    public function loginStudent(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        if ($user->role !== 'student') {
            Auth::logout();
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        $student = Student::where('user_id', $user->id)->firstOrFail();

        return response()->json([
            'student' => $this->studentPayload($student),
            'token' => $token,
        ]);
    }

    public function loginAdmin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Identifiants incorrects.'],
            ]);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        if ($user->role !== 'admin') {
            Auth::logout();
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès.']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'student') {
            return response()->json($this->studentPayload(Student::where('user_id', $user->id)->firstOrFail()));
        }
        return response()->json($user);
    }
}
