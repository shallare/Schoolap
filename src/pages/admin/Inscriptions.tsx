import { useState } from 'react';
import { useAppDB } from '../../lib/data';
import { Check, Loader2, FileCheck2, CheckCircle2 } from 'lucide-react';

const STATUS_CONFIG = {
  NEW:       { label: 'Brouillon',   class: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  PENDING:   { label: 'En attente', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  VALIDATED: { label: 'Validé',     class: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  PAID:      { label: 'Inscrit',    class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
} as const;

export default function Inscriptions() {
  const { data, updateStudentById } = useAppDB();
  const [validating, setValidating] = useState<string | null>(null);

  const students = data.students || [];
  const toProcess = students.filter((s) => s.status === 'PENDING');
  const processed  = students.filter((s) => s.status === 'VALIDATED' || s.status === 'PAID');
  const displayList = [...toProcess, ...processed];

  const handleValidate = (id: string) => {
    setValidating(id);
    setTimeout(() => {
      updateStudentById(id, { status: 'VALIDATED' });
      setValidating(null);
    }, 1000);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-display font-semibold text-white text-sm">Dossiers d'inscription</h3>
        <div className="flex items-center gap-3">
          {toProcess.length > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              {toProcess.length} à traiter
            </span>
          )}
          <span className="text-xs text-slate-500">{displayList.length} total</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              {['Étudiant', 'Filière choisie', 'Date soumission', 'Documents', 'Action'].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {displayList.length > 0 ? (
              displayList.map((s) => {
                const isPending   = s.status === 'PENDING';
                const cfg = STATUS_CONFIG[s.status] ?? STATUS_CONFIG.NEW;

                return (
                  <tr
                    key={s.id}
                    className={`transition-colors ${isPending ? 'hover:bg-amber-500/5' : 'hover:bg-slate-800/30'}`}
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
                    <td className="px-6 py-4 text-sm text-slate-400 max-w-[200px] truncate">{s.filiere}</td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                      {new Date().toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      {isPending ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                          <FileCheck2 size={13} /> Complet
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                          <CheckCircle2 size={13} /> Vérifié
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isPending ? (
                        <button
                          type="button"
                          onClick={() => handleValidate(s.id)}
                          disabled={validating === s.id}
                          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          {validating === s.id ? (
                            <><Loader2 size={11} className="animate-spin" /> Validation…</>
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
    </div>
  );
}
