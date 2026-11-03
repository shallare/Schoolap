import { useEffect, useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { adminApi, DashboardStats, StudentResponse } from '../../lib/api';
import { formatMoney } from '../../lib/data';
import { Users, FileText, TrendingUp, GraduationCap, ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const STATUS_CONFIG = {
  NEW:       { label: 'Brouillon',   class: 'bg-slate-700/50 text-slate-300 border-slate-600' },
  PENDING:   { label: 'En attente', class: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  VALIDATED: { label: 'Validé',     class: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30' },
  PAID:      { label: 'Inscrit',    class: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
} as const;

export default function Overview() {
  const { token } = useAuth();
  const [stats, setStats] = useState<DashboardStats['stats'] | null>(null);
  const [recentStudents, setRecentStudents] = useState<StudentResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      adminApi.dashboard(token)
        .then(res => {
          setStats(res.stats);
          setRecentStudents(res.activite_recente);
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-sm">Chargement des statistiques...</p>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Étudiants inscrits',
      value: stats.total_etudiants,
      icon: <Users size={20} />,
      iconBg: 'bg-indigo-500/10 text-indigo-400',
      trend: `${stats.inscrits} finalisés`,
    },
    {
      label: 'Dossiers en attente',
      value: stats.dossiers_attente,
      icon: <FileText size={20} />,
      iconBg: 'bg-amber-500/10 text-amber-400',
      trend: stats.dossiers_attente > 0 ? `${stats.dossiers_attente} à traiter` : 'Tout traité',
    },
    {
      label: 'Chiffre d\'affaires',
      value: formatMoney(stats.chiffre_affaires),
      icon: <TrendingUp size={20} />,
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      trend: 'Paiements reçus',
    },
    {
      label: 'Filières actives',
      value: stats.filieres_actives,
      icon: <GraduationCap size={20} />,
      iconBg: 'bg-violet-500/10 text-violet-400',
      trend: 'Année 2025-2026',
    },
  ];

  const getActionLabel = (status: string) => {
    switch (status) {
      case 'PAID':      return 'Paiement effectué';
      case 'VALIDATED': return 'Dossier validé';
      case 'PENDING':   return 'Soumission du dossier';
      default:          return 'Création du compte';
    }
  };

  return (
    <div className="flex flex-col gap-6">

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                {card.icon}
              </div>
              <ArrowUpRight size={15} className="text-slate-600" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
            </div>
            <p className="text-[11px] text-slate-500 border-t border-slate-800 pt-3">{card.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display font-semibold text-white text-sm">Activité récente</h3>
          <span className="text-xs text-slate-500">{recentStudents.length} entrées</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Étudiant</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {recentStudents.length > 0 ? (
                recentStudents.map((s) => {
                  const cfg = STATUS_CONFIG[s.statut] ?? STATUS_CONFIG.NEW;
                  return (
                    <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-300 font-display">
                            {s.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-slate-200">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{getActionLabel(s.statut)}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-mono">{new Date().toLocaleDateString('fr-FR')}</td>
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
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-sm">
                    Aucune activité récente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
