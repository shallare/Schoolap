import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Code2, LineChart, Briefcase, ChevronRight, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { FILIERES } from '../../lib/data';

const iconMap: Record<string, ReactNode> = {
  'Licence Design UI/UX':          <PenTool size={22} />,
  'Master Ingénierie Logicielle':  <Code2 size={22} />,
  "MBA Finance d'Entreprise":      <LineChart size={22} />,
  'Master Management Stratégique': <Briefcase size={22} />,
  'Bachelor Design Graphique':     <PenTool size={22} />,
  'Licence Développement Web':     <Code2 size={22} />,
};

const iconColors: Record<string, string> = {
  'Licence Design UI/UX':          'bg-amber-500/10 text-amber-400',
  'Master Ingénierie Logicielle':  'bg-indigo-500/10 text-indigo-400',
  "MBA Finance d'Entreprise":      'bg-emerald-500/10 text-emerald-400',
  'Master Management Stratégique': 'bg-violet-500/10 text-violet-400',
  'Bachelor Design Graphique':     'bg-rose-500/10 text-rose-400',
  'Licence Développement Web':     'bg-cyan-500/10 text-cyan-400',
};

export default function Filieres() {
  return (
    <div className="w-full bg-[#0B0D1A] min-h-screen">

      {/* HEADER */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-indigo-400 font-semibold uppercase tracking-widest text-xs">Catalogue 2025-2026</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mt-3 mb-5 leading-tight">
            Nos Filières d'Excellence
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            Découvrez notre catalogue complet de formations conçues pour les métiers d'avenir, dispensées par des experts reconnus.
          </p>
        </div>
      </section>

      {/* FILTER PILLS */}
      <section className="border-y border-slate-800/60 py-5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3">
          {['Toutes les filières', 'Design', 'Tech', 'Business', 'Management'].map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                i === 0
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-900 border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(FILIERES).map(([name, data], i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconColors[name] || 'bg-slate-700 text-slate-300'}`}>
                    {iconMap[name] || <BookOpen size={22} />}
                  </div>
                  <span className="bg-slate-800 text-slate-400 border border-slate-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {data.level.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-slate-400 mb-5 flex-1 leading-relaxed">{data.desc}</p>

                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                    Programme certifié — crédits ECTS
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock size={13} className="text-indigo-400 shrink-0" />
                    Cours en présentiel et à distance
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center mt-auto">
                  <span className="font-display font-bold text-white">
                    {(data.price / 1000).toFixed(0)}k{' '}
                    <span className="text-slate-500 font-normal text-xs">FCFA/an</span>
                  </span>
                  <Link
                    to="/register"
                    className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    S'inscrire <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
