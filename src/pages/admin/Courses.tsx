import type { ReactNode } from 'react';
import { FILIERES, formatMoney } from '../../lib/data';
import { PenTool, Code2, LineChart, Briefcase, BookOpen, Users } from 'lucide-react';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Object.entries(FILIERES).map(([name, data]) => {
        const colorClass = colorMap[name] || 'bg-slate-700/50 text-slate-300 border-slate-600';
        return (
          <div
            key={name}
            className="bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between mb-5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${colorClass}`}>
                {iconMap[name] || <BookOpen size={20} />}
              </div>
              <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {data.level.split(' ')[0]}
              </span>
            </div>

            <h4 className="font-display font-semibold text-white text-sm mb-2">{name}</h4>
            <p className="text-xs text-slate-400 mb-5 flex-1 leading-relaxed line-clamp-2">{data.desc}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div>
                <p className="text-base font-display font-bold text-white">
                  {formatMoney(data.price)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">par an</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Users size={13} />
                Actif
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
