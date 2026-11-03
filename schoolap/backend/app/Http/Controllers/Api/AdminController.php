<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentDocument;
use App\Models\Transaction;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function getDashboardStats()
    {
        $students = Student::with('filiere')->get();
        $totalExpected = $students->sum(fn (Student $student) => (float) ($student->filiere?->frais_annuels ?? 0));

        return response()->json([
            'stats' => [
                'total_etudiants' => $students->count(),
                'dossiers_attente' => Student::where('statut', 'PENDING')->count(),
                'inscrits' => Student::where('statut', 'PAID')->count(),
                'chiffre_affaires' => Student::sum('montant_paye'),
                'total_attendu' => $totalExpected,
                'filieres_actives' => Filiere::where('active', true)->count(),
            ],
            'activite_recente' => Student::with(['filiere', 'documents'])->latest()->take(10)->get(),
        ]);
    }

    public function getStudents(Request $request)
    {
        $query = Student::with(['filiere', 'documents']);

        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'LIKE', "%$search%")
                  ->orWhere('prenom', 'LIKE', "%$search%")
                  ->orWhere('matricule', 'LIKE', "%$search%");
            });
        }

        return response()->json($query->paginate(10));
    }

    public function updateStudentStatus(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:NEW,PENDING,VALIDATED,PAID',
        ]);

        $student = Student::findOrFail($id);
        $student->update(['statut' => $request->statut]);

        return response()->json($student->load('filiere'));
    }

    public function updateStudent(Request $request, $id)
    {
        $student = Student::with('user')->findOrFail($id);

        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('students', 'email')->ignore($student->id),
                Rule::unique('users', 'email')->ignore($student->user_id),
            ],
            'filiere_id' => 'nullable|exists:filieres,id',
            'statut' => 'required|in:NEW,PENDING,VALIDATED,PAID',
            'password' => 'nullable|string|min:8',
        ]);

        $student->update($request->only(['prenom', 'nom', 'email', 'filiere_id', 'statut']));

        $userData = [
            'name' => $student->prenom . ' ' . $student->nom,
            'email' => $student->email,
        ];

        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $student->user()->update($userData);

        return response()->json($student->load(['filiere', 'documents']));
    }

    public function deleteStudent($id)
    {
        $student = Student::with(['user', 'documents'])->findOrFail($id);

        foreach ($student->documents as $document) {
            Storage::disk('local')->delete($document->path);
        }

        $student->user?->tokens()->delete();
        $student->user?->delete();

        return response()->json(['message' => 'Etudiant supprime avec succes.']);
    }

    public function getTransactions()
    {
        return response()->json(Transaction::with('student')->latest()->paginate(15));
    }

    public function getFilieres()
    {
        return response()->json(Filiere::all());
    }

    public function createFiliere(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255|unique:filieres,nom',
            'niveau' => 'required|string|max:255',
            'description' => 'nullable|string',
            'frais_annuels' => 'required|numeric|min:0',
            'active' => 'boolean',
        ]);

        $filiere = Filiere::create($data + ['active' => true]);

        return response()->json($filiere, 201);
    }

    public function getStudentDocuments($id)
    {
        $student = Student::with('documents')->findOrFail($id);

        return response()->json($student->documents);
    }

    public function viewStudentDocument($documentId)
    {
        $document = StudentDocument::findOrFail($documentId);

        abort_unless(Storage::disk('local')->exists($document->path), 404);

        return Storage::disk('local')->response(
            $document->path,
            $document->original_name,
            ['Content-Type' => $document->mime_type ?: 'application/octet-stream']
        );
    }
}
