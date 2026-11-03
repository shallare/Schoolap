import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { adminApi, FiliereResponse } from '../../lib/api';
import { formatMoney } from '../../lib/data';
import { PenTool, Code2, LineChart, Briefcase, BookOpen, Users, Loader2, Plus, X } from 'lucide-react';

const iconMap: Record<string, ReactNode> = {
  'Licence Design UI/UX':          <PenTool size={20} />,
  'Master Ingénierie Logicielle':  <Code2 size={20} />,
  "MBA Finance d'Entreprise":      <LineChart size={20} />,
  'Master Management Stratégique': <Briefcase size={20} />,
  'Bachelor Design Graphique':     <PenTool size={20} />,
  'Licence Développement Web':     <Code2 size={20} />,
};

const colorMap: Record<string, string> = {
  'Licence Design UI/UX':          'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Master Ingénierie Logicielle':  'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  "MBA Finance d'Entreprise":      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Master Management Stratégique': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Bachelor Design Graphique':     'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'Licence Développement Web':     'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
};

export default function Courses() {
  const { token } = useAuth();
  const [filieres, setFilieres] = useState<FiliereResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    niveau: '',
    description: '',
    frais_annuels: 0,
    active: true,
  });

  const fetchFilieres = async () => {
    if (token) {
      try {
        const data = await adminApi.filieres(token);
        setFilieres(data);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchFilieres();
  }, [token]);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      await adminApi.createFiliere(token, form);
      setForm({ nom: '', niveau: '', description: '', frais_annuels: 0, active: true });
      setShowForm(false);
      await fetchFilieres();
    } catch (err) {
      console.error(err);
      alert("Impossible d'ajouter la filière.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-sm">Chargement des filières...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-white text-sm">Filières</h3>
          <p className="text-xs text-slate-500 mt-1">{filieres.length} formation{filieres.length !== 1 ? 's' : ''} disponible{filieres.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? 'Fermer' : 'Ajouter'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.nom}
            onChange={(e) => setForm((prev) => ({ ...prev, nom: e.target.value }))}
            placeholder="Nom de la filière"
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            value={form.niveau}
            onChange={(e) => setForm((prev) => ({ ...prev, niveau: e.target.value }))}
            placeholder="Niveau"
            required
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            value={form.frais_annuels || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, frais_annuels: Number(e.target.value) }))}
            placeholder="Frais annuels"
            required
            min={0}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
          />
          <label className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
              className="accent-indigo-600"
            />
            Filière active
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Description"
            className="md:col-span-2 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white min-h-24 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="md:col-span-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl py-3 text-sm font-semibold transition-colors"
          >
            {saving ? 'Enregistrement...' : 'Créer la filière'}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filieres.map((f) => {
        const colorClass = colorMap[f.nom] || 'bg-slate-700/50 text-slate-300 border-slate-600';
        return (
          <div
            key={f.id}
            className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorClass}`}>
                {iconMap[f.nom] || <BookOpen size={20} />}
              </div>
              <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {f.niveau.split(' ')[0]}
              </span>
            </div>

            <h4 className="font-display font-semibold text-white text-sm mb-2">{f.nom}</h4>
            <p className="text-xs text-slate-400 mb-5 flex-1 leading-relaxed line-clamp-2">{f.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                <p className="text-base font-display font-bold text-white">
                  {formatMoney(f.frais_annuels)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">par an</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users size={13} />
                {f.active ? 'Actif' : 'Inactif'}
              </div>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
