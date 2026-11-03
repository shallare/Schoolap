import { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { studentApi } from '../../lib/api';
import { formatMoney } from '../../lib/data';
import { CreditCard, CheckCircle, Receipt, Loader2, ShieldCheck } from 'lucide-react';

export default function Payment({ student }: { student: any }) {
  const { token, refreshUser } = useAuth();
  const tuitionTotal = student.filiere?.frais_annuels || 0;
  const remaining = tuitionTotal - student.montant_paye;
  const progress  = Math.min((student.montant_paye / tuitionTotal) * 100, 100);
  
  const [payAmount, setPayAmount] = useState(remaining);
  const [loading, setLoading]     = useState(false);

  const handlePay = async () => {
    if (!token) return;
    if (payAmount <= 0 || payAmount > remaining) {
      alert('Montant invalide');
      return;
    }
    setLoading(true);
    try {
      await studentApi.effectuerPaiement(token, payAmount, 'Carte Bancaire');
      await refreshUser();
      setPayAmount(0);
    } catch (err) {
      console.error(err);
      alert('Erreur lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PAYMENT CARD */}
      <div className="bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/20 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center">
            <CreditCard size={20} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white text-sm">Solde à régler</h3>
            <p className="text-xs text-slate-500 mt-0.5">Scolarité {student.filiere?.nom || '—'}</p>
          </div>
        </div>

        <p className="text-4xl font-display font-bold text-white mb-5">
          {formatMoney(remaining)}
        </p>

        {/* PROGRESS BAR */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Versé : {formatMoney(student.montant_paye)}</span>
            <span className="font-semibold text-white">{progress.toFixed(0)}%</span>
          </div>
          {/* CSS var set on wrapper; actual width declared in .progress-fill (index.css) */}
          <div
            className="h-2 bg-slate-800 rounded-full overflow-hidden"
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          >
            <div className="progress-fill h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full" />
          </div>
          <p className="text-xs text-slate-500 mt-1.5">Total : {formatMoney(tuitionTotal)}</p>
        </div>

        {remaining <= 0 ? (
          <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle size={16} /> Inscription finalisée — Félicitations !
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Montant du versement (FCFA)
              </label>
              <input
                type="number"
                title="Montant du versement en FCFA"
                placeholder="Ex : 150000"
                value={payAmount}
                onChange={(e) => setPayAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl py-3 px-4 text-sm text-white font-mono focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> Traitement en cours…</>
              ) : (
                <><CreditCard size={16} /> Effectuer le paiement</>
              )}
            </button>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={12} className="text-emerald-500" />
              Paiement sécurisé — Carte bancaire ou Mobile Money
            </div>
          </div>
        )}
      </div>

      {/* TRANSACTION HISTORY */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <Receipt size={15} className="text-slate-400" />
          <h3 className="font-display font-semibold text-white text-sm">Historique des versements</h3>
        </div>

        {(!student.transactions || student.transactions.length === 0) ? (
          <div className="px-6 py-10 text-center text-slate-500 text-sm">
            Aucune transaction enregistrée.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {student.transactions.map((t: any, i: number) => (
              <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-800/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <CheckCircle size={14} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Versement scolarité</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{t.reference} · {new Date(t.created_at).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-emerald-400 font-display">
                  +{formatMoney(t.montant)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
