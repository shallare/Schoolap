import { Clock, CheckCircle2, Mail } from 'lucide-react';

export default function Pending() {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-[320px]">

      <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5">
        <Clock size={30} className="text-amber-400" />
      </div>

      <h2 className="text-xl font-display font-bold text-white mb-2">
        Dossier en cours d'examen
      </h2>
      <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
        Votre dossier d'admission a été reçu avec succès et est actuellement en cours de traitement par notre équipe pédagogique. Vous recevrez une notification sous 48h.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <CheckCircle2 size={13} /> Dossier envoyé
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400">
          <Clock size={13} /> Validation en cours
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-500">
          <Mail size={13} /> Notification à venir
        </div>
      </div>

    </div>
  );
}
