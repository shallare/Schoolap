<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudentDocument;
use App\Models\Transaction;
use App\Models\Filiere;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StudentController extends Controller
{
    private function studentPayload(Student $student): Student
    {
        return $student->load(['filiere', 'transactions', 'documents']);
    }

    private function getStudent(Request $request)
    {
        return Student::where('user_id', $request->user()->id)->firstOrFail();
    }

    public function getProfile(Request $request)
    {
        return response()->json($this->studentPayload($this->getStudent($request)));
    }

    public function updateProfile(Request $request)
    {
        $student = $this->getStudent($request);
        $student->update($request->only(['prenom', 'nom', 'email']));

        $student->user()->update([
            'name' => $student->prenom . ' ' . $student->nom,
            'email' => $student->email,
        ]);

        return response()->json($this->studentPayload($student));
    }

    public function submitDossier(Request $request)
    {
        $request->validate([
            'filiere_id' => 'required|exists:filieres,id',
            'documents' => 'nullable|array',
            'documents.*' => 'file|max:10240|mimes:pdf,jpg,jpeg,png,doc,docx',
        ]);

        $student = $this->getStudent($request);
        $filiere = Filiere::findOrFail($request->filiere_id);

        $student->update([
            'filiere_id' => $filiere->id,
            'statut' => 'PENDING',
            'montant_restant' => $filiere->frais_annuels - $student->montant_paye,
        ]);

        $titles = [
            'diplome' => 'Diplome ou attestation de reussite',
            'releve' => 'Releve de notes officiel',
            'photo' => "Photo d'identite recente",
            'cni' => 'CNI ou passeport en cours de validite',
        ];

        foreach ($request->file('documents', []) as $type => $file) {
            $oldDocument = $student->documents()->where('type', $type)->first();
            if ($oldDocument) {
                Storage::disk('local')->delete($oldDocument->path);
                $oldDocument->delete();
            }

            $path = $file->store("student-documents/{$student->id}", 'local');

            StudentDocument::create([
                'student_id' => $student->id,
                'type' => $type,
                'title' => $titles[$type] ?? $type,
                'original_name' => $file->getClientOriginalName(),
                'path' => $path,
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize() ?: 0,
            ]);
        }

        return response()->json($this->studentPayload($student));
    }

    public function makePayment(Request $request)
    {
        $request->validate([
            'montant' => 'required|numeric|min:1000',
            'mode_paiement' => 'required|string',
        ]);

        $student = $this->getStudent($request);

        $transaction = Transaction::create([
            'student_id' => $student->id,
            'reference' => 'PAY-' . strtoupper(Str::random(8)),
            'montant' => $request->montant,
            'mode_paiement' => $request->mode_paiement,
            'statut' => 'SUCCES',
        ]);

        $newPaid = $student->montant_paye + $request->montant;
        $frais = $student->filiere ? $student->filiere->frais_annuels : 0;
        
        $student->update([
            'montant_paye' => $newPaid,
            'montant_restant' => max(0, $frais - $newPaid),
            'statut' => ($newPaid >= $frais && $frais > 0) ? 'PAID' : $student->statut,
            'progression' => ($frais > 0) ? min(100, round(($newPaid / $frais) * 100)) : 0,
        ]);

        return response()->json([
            'transaction' => $transaction,
            'student' => $this->studentPayload($student),
        ]);
    }
}
