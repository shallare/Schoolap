import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { adminApi, StudentDocumentResponse, StudentResponse } from '../../lib/api';
import { Check, CheckCircle2, Eye, FileCheck2, FileText, Loader2, X } from 'lucide-react';

const STATUS_CONFIG = {
  NEW:       { label: 'Brouillon',  class: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  PENDING:   { label: 'En attente', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  VALIDATED: { label: 'Valide',     class: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  PAID:      { label: 'Inscrit',    class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
} as const;

export default function Inscriptions() {
  const { token } = useAuth();
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentResponse | null>(null);
  const [documents, setDocuments] = useState<StudentDocumentResponse[]>([]);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [loadingDocs, setLoadingDocs] = useState(false);

  const fetchStudents = async () => {
    if (!token) return;
    try {
      const res = await adminApi.students(token);
      setStudents(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const toProcess = students.filter((s) => s.statut === 'PENDING');
  const processed = students.filter((s) => s.statut === 'VALIDATED' || s.statut === 'PAID');
  const displayList = [...toProcess, ...processed];

  const handleValidate = async (id: number) => {
    if (!token) return;
    setValidating(id);
    try {
      await adminApi.updateStatut(token, id, 'VALIDATED');
      await fetchStudents();
    } finally {
      setValidating(null);
    }
  };

  const closeModal = () => {
    if (documentUrl) URL.revokeObjectURL(documentUrl);
    setSelectedStudent(null);
    setDocuments([]);
    setDocumentUrl(null);
    setDocumentName('');
  };

  const openDocuments = async (student: StudentResponse) => {
    if (!token) return;
    setSelectedStudent(student);
    setDocuments([]);
    setDocumentUrl(null);
    setDocumentName('');
    setLoadingDocs(true);
    try {
      const docs = await adminApi.studentDocuments(token, student.id);
      setDocuments(docs);
    } finally {
      setLoadingDocs(false);
    }
  };

  const viewDocument = async (doc: StudentDocumentResponse) => {
    if (!token) return;
    if (documentUrl) URL.revokeObjectURL(documentUrl);
    const blob = await adminApi.documentBlob(token, doc.id);
    setDocumentUrl(URL.createObjectURL(blob));
    setDocumentName(doc.original_name);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-sm">Chargement des dossiers...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-display font-semibold text-white text-sm">Dossiers d'inscription</h3>
        <div className="flex items-center gap-3">
          {toProcess.length > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {toProcess.length} a traiter
            </span>
          )}
          <span className="text-xs text-slate-500">{displayList.length} total</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              {['Etudiant', 'Filiere choisie', 'Date soumission', 'Documents', 'Action'].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {displayList.length > 0 ? (
              displayList.map((s) => {
                const isPending = s.statut === 'PENDING';
                const cfg = STATUS_CONFIG[s.statut] ?? STATUS_CONFIG.NEW;
                const docCount = s.documents?.length ?? 0;

                return (
                  <tr
                    key={s.id}
                    onClick={() => openDocuments(s)}
                    className={`cursor-pointer transition-colors ${isPending ? 'hover:bg-amber-500/5' : 'hover:bg-slate-800/30'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold font-display shrink-0 ${
                          isPending
                            ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
                            : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                        }`}>
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400 max-w-[200px] truncate">{s.filiere?.nom || '-'}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                      {new Date().toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openDocuments(s); }}
                        className={`flex items-center gap-1.5 text-xs font-semibold ${isPending ? 'text-amber-400' : 'text-emerald-400'}`}
                      >
                        {isPending ? <FileCheck2 size={13} /> : <CheckCircle2 size={13} />}
                        {docCount > 0 ? `${docCount} fichier${docCount > 1 ? 's' : ''}` : 'Voir dossier'}
                      </button>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      {isPending ? (
                        <button
                          type="button"
                          onClick={() => handleValidate(s.id)}
                          disabled={validating === s.id}
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          {validating === s.id ? (
                            <><Loader2 size={11} className="animate-spin" /> Validation...</>
                          ) : (
                            <><Check size={11} /> Valider</>
                          )}
                        </button>
                      ) : (
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.class}`}>
                          {cfg.label}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                  Aucune demande en attente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-5xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-display font-semibold text-white text-sm">Dossier de {selectedStudent.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedStudent.filiere?.nom || 'Filiere non selectionnee'}</p>
              </div>
              <button type="button" onClick={closeModal} className="text-slate-500 hover:text-slate-200">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-0">
              <div className="border-r border-slate-800 p-4 flex flex-col gap-2 overflow-auto">
                {loadingDocs ? (
                  <div className="py-10 text-center text-slate-500 text-sm">Chargement...</div>
                ) : documents.length > 0 ? (
                  documents.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => viewDocument(doc)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-left transition-colors"
                    >
                      <FileText size={17} className="text-indigo-300 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-200 truncate">{doc.title}</p>
                        <p className="text-xs text-slate-500 truncate">{doc.original_name}</p>
                      </div>
                      <Eye size={14} className="text-slate-500" />
                    </button>
                  ))
                ) : (
                  <div className="py-10 text-center text-slate-500 text-sm">
                    Aucun fichier n'a encore ete envoye pour ce dossier.
                  </div>
                )}
              </div>

              <div className="min-h-[520px] bg-slate-900/70 flex items-center justify-center">
                {documentUrl ? (
                  <iframe title={documentName} src={documentUrl} className="w-full h-[70vh] bg-white" />
                ) : (
                  <div className="text-center text-slate-500 text-sm px-6">
                    Selectionnez un fichier pour afficher son contenu.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
