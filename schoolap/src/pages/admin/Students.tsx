import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { adminApi, FiliereResponse, StudentResponse } from '../../lib/api';
import { Edit3, Loader2, Save, Trash2, X } from 'lucide-react';

const STATUS_CONFIG = {
  NEW:       { label: 'Brouillon',  class: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  PENDING:   { label: 'En attente', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  VALIDATED: { label: 'Valide',     class: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  PAID:      { label: 'Inscrit',    class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
} as const;

export default function Students() {
  const { token } = useAuth();
  const [students, setStudents] = useState<StudentResponse[]>([]);
  const [filieres, setFilieres] = useState<FiliereResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<StudentResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    prenom: '',
    nom: '',
    email: '',
    filiere_id: '',
    statut: 'NEW',
    password: '',
  });

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
    if (!token) return;
    fetchStudents();
    adminApi.filieres(token).then(setFilieres);
  }, [token]);

  const openEdit = (student: StudentResponse) => {
    setEditing(student);
    setForm({
      prenom: student.prenom,
      nom: student.nom,
      email: student.email,
      filiere_id: student.filiere_id ? String(student.filiere_id) : '',
      statut: student.statut,
      password: '',
    });
  };

  const closeEdit = () => {
    setEditing(null);
    setForm({ prenom: '', nom: '', email: '', filiere_id: '', statut: 'NEW', password: '' });
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!token || !editing) return;
    setSaving(true);
    try {
      await adminApi.updateStudent(token, editing.id, {
        prenom: form.prenom,
        nom: form.nom,
        email: form.email,
        filiere_id: form.filiere_id ? Number(form.filiere_id) : null,
        statut: form.statut,
        ...(form.password ? { password: form.password } : {}),
      });
      await fetchStudents();
      closeEdit();
    } catch (err) {
      console.error(err);
      alert("Impossible de modifier l'etudiant.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (student: StudentResponse) => {
    if (!token) return;
    const confirmed = window.confirm(`Supprimer definitivement ${student.name} ?`);
    if (!confirmed) return;

    try {
      await adminApi.deleteStudent(token, student.id);
      await fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer l'etudiant.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-sm">Chargement des etudiants...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-display font-semibold text-white text-sm">Liste des etudiants</h3>
        <span className="text-xs text-slate-500">{students.length} etudiant{students.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              {['Matricule', 'Nom complet', 'Email', 'Filiere', 'Statut', 'Actions'].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {students.length > 0 ? (
              students.map((s) => {
                const cfg = STATUS_CONFIG[s.statut] ?? STATUS_CONFIG.NEW;
                return (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.matricule}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300 font-display shrink-0">
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{s.email}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-[200px] truncate">{s.filiere?.nom || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.class}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(s)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Modifier"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500 text-sm">
                  Aucun etudiant inscrit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <form onSubmit={handleSave} className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-display font-semibold text-white text-sm">Modifier l'etudiant</h3>
              <button type="button" onClick={closeEdit} className="text-slate-500 hover:text-slate-200">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={form.prenom} onChange={(e) => setForm((p) => ({ ...p, prenom: e.target.value }))} required placeholder="Prenom" className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              <input value={form.nom} onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))} required placeholder="Nom" className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required placeholder="Email" className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              <input type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} placeholder="Nouveau mot de passe" className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
              <select value={form.filiere_id} onChange={(e) => setForm((p) => ({ ...p, filiere_id: e.target.value }))} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500">
                <option value="">Aucune filiere</option>
                {filieres.map((f) => <option key={f.id} value={f.id}>{f.nom}</option>)}
              </select>
              <select value={form.statut} onChange={(e) => setForm((p) => ({ ...p, statut: e.target.value }))} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500">
                <option value="NEW">Brouillon</option>
                <option value="PENDING">En attente</option>
                <option value="VALIDATED">Valide</option>
                <option value="PAID">Inscrit</option>
              </select>
              <button type="submit" disabled={saving} className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl py-3 text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2">
                <Save size={16} />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
