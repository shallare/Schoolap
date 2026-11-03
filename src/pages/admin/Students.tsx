import { useAppDB } from '../../lib/data';

const STATUS_CONFIG = {
  NEW:       { label: 'Brouillon',   class: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  PENDING:   { label: 'En attente', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  VALIDATED: { label: 'Validé',     class: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  PAID:      { label: 'Inscrit',    class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
} as const;

export default function Students() {
  const { data } = useAppDB();
  const students = data.students || [];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-display font-semibold text-white text-sm">Liste des étudiants</h3>
        <span className="text-xs text-slate-500">{students.length} étudiant{students.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800">
              {['Matricule', 'Nom complet', 'Email', 'Filière', 'Statut'].map((h) => (
                <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {students.length > 0 ? (
              students.map((s) => {
                const cfg = STATUS_CONFIG[s.status] ?? STATUS_CONFIG.NEW;
                return (
                  <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{s.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300 font-display shrink-0">
                          {s.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">{s.email}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 max-w-[200px] truncate">{s.filiere || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${cfg.class}`}>
                        {cfg.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                  Aucun étudiant inscrit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
