import { useAppDB, formatMoney } from '../../lib/data';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

export default function Finance() {
  const { data } = useAppDB();
  const students = data.students || [];

  const allTransactions = students
    .flatMap((s) => s.transactions.map((t) => ({ ...t, studentName: s.name, studentId: s.id })))
    .reverse();

  const totalRevenue = students.reduce((acc, s) => acc + s.paidAmount, 0);
  const totalExpected = students.reduce((acc, s) => acc + s.tuitionTotal, 0);
  const collectionRate = totalExpected > 0 ? Math.round((totalRevenue / totalExpected) * 100) : 0;

  return (
    <div className="flex flex-col gap-5">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total encaissé',    value: formatMoney(totalRevenue),   icon: <TrendingUp size={18} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total attendu',     value: formatMoney(totalExpected),  icon: <ArrowUpRight size={18}/>, color: 'text-indigo-400',  bg: 'bg-indigo-500/10' },
          { label: 'Taux de collecte',  value: `${collectionRate}%`,        icon: <TrendingUp size={18} />, color: 'text-amber-400',   bg: 'bg-amber-500/10' },
        ].map((card) => (
          <div key={card.label} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bg} ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-xl font-display font-bold text-white">{card.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display font-semibold text-white text-sm">Transactions financières</h3>
          <span className="text-xs text-slate-500">{allTransactions.length} transaction{allTransactions.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800">
                {['Référence', 'Étudiant', 'Montant', 'Date', 'Statut'].map((h) => (
                  <th key={h} className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {allTransactions.length > 0 ? (
                allTransactions.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{t.ref}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-[10px] font-bold text-emerald-300 font-display shrink-0">
                          {t.studentName.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-slate-200">{t.studentName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-400 font-display">
                      {formatMoney(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        Payé
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-sm">
                    Aucune transaction financière enregistrée.
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
