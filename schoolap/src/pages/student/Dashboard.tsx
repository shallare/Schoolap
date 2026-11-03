import { useAuth } from '../../lib/AuthContext';
import { Paperclip, Search, CreditCard, CheckCircle, ChevronRight, Loader2 } from 'lucide-react';
import Dossier from './Dossier';
import Pending from './Pending';
import Payment from './Payment';

const STEPS = [
  { id: 'NEW',       icon: Paperclip,   label: 'Dossier',    idx: 0 },
  { id: 'PENDING',   icon: Search,      label: 'Validation', idx: 1 },
  { id: 'VALIDATED', icon: CreditCard,  label: 'Paiement',   idx: 2 },
  { id: 'PAID',      icon: CheckCircle, label: 'Inscrit',    idx: 3 },
] as const;

export default function StudentDashboard() {
  const { user, loading } = useAuth();

  if (loading || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 gap-3">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
        <p className="text-sm">Chargement de votre espace...</p>
      </div>
    );
  }

  const s = user as any; // Casting to avoid complex type checks in JSX for now
  const currentIdx = STEPS.find((st) => st.id === s.statut)?.idx ?? 0;

  const statusLabel = {
    NEW:       'Dossier à compléter',
    PENDING:   "En cours d'examen",
    VALIDATED: 'Paiement en attente',
    PAID:      'Inscription finalisée',
  }[s.statut as 'NEW' | 'PENDING' | 'VALIDATED' | 'PAID'] ?? 'En cours';

  const statusColor = {
    NEW:       'bg-slate-700/50 text-slate-300 border-slate-600',
    PENDING:   'bg-amber-500/15 text-amber-300 border-amber-500/30',
    VALIDATED: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    PAID:      'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  }[s.statut as 'NEW' | 'PENDING' | 'VALIDATED' | 'PAID'] ?? 'bg-slate-700/50 text-slate-300 border-slate-600';

  const renderContent = () => {
    switch (s.statut) {
      case 'NEW':       return <Dossier student={s} />;
      case 'PENDING':   return <Pending />;
      case 'VALIDATED':
      case 'PAID':      return <Payment student={s} />;
      default:          return null;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-5">

      {/* MAIN COLUMN */}
      <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">

        {/* STATUS + STEPPER CARD */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                {statusLabel}
              </span>
              <h2 className="text-lg font-display font-bold text-white mt-2">
                {s.filiere?.nom || 'Filière non sélectionnée'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">Année académique 2025-2026</p>
            </div>
          </div>

          {/* STEPPER */}
          <div className="relative flex items-start justify-between max-w-xl mx-auto">
            {/* connecting line */}
            <div className="absolute top-4 left-[10%] right-[10%] h-px bg-slate-800 z-0" />
            <div
              className={`absolute top-4 left-[10%] h-px bg-indigo-600 z-0 transition-all duration-700 ${
                ['w-0', 'w-[27%]', 'w-[53%]', 'w-[80%]'][currentIdx] ?? 'w-0'
              }`}
            />

            {STEPS.map((step) => {
              const isCompleted = step.idx < currentIdx;
              const isActive    = step.idx === currentIdx;
              const Icon        = step.icon;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center w-20">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border ${
                    isCompleted
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : isActive
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                    {isCompleted ? <CheckCircle size={15} /> : <Icon size={15} />}
                  </div>
                  <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide text-center ${
                    isCompleted ? 'text-emerald-400' : isActive ? 'text-indigo-400' : 'text-slate-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT */}
        {renderContent()}
      </div>

      {/* SIDEBAR COLUMN */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">

        {/* Student info card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-300 text-xs uppercase tracking-wider mb-4">
            Mon profil
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-300 font-bold text-sm font-display">
              {s.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{s.name}</p>
              <p className="text-xs text-slate-500 font-mono">{s.matricule}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Email</span>
              <span className="text-slate-300 text-xs truncate max-w-[160px]">{s.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Filière</span>
              <span className="text-slate-300 text-xs text-right max-w-[160px]">{s.filiere?.nom || '—'}</span>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-slate-300 text-xs uppercase tracking-wider mb-4">
            Ressources
          </h3>
          <div className="flex flex-col gap-1">
            {[
              { label: 'Contacter l\'administration', sub: 'Réponse sous 24h' },
              { label: 'Guide de l\'étudiant',        sub: 'Document PDF' },
              { label: 'Planning des cours',          sub: 'Semestre 1 — 2025-2026' },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                className="group flex items-center justify-between w-full px-3 py-2.5 rounded-xl hover:bg-slate-800/60 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{item.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
