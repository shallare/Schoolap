import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowLeft, GraduationCap, User } from 'lucide-react';
import { motion } from 'motion/react';
import { FILIERES, useAppDB } from '../../lib/data';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [filiere, setFiliere] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerStudent } = useAppDB();

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const student = {
      name: `${firstName} ${lastName}`,
      email,
      id: 'ETU-' + Math.floor(Math.random() * 10000),
      status: 'NEW' as const,
      filiere,
      tuitionTotal: FILIERES[filiere as keyof typeof FILIERES]?.price || 0,
      paidAmount: 0,
      documents: {},
      transactions: [],
    };

    setTimeout(() => {
      registerStudent(student);
      navigate('/student');
    }, 1500);
  };

  const inputClass =
    'w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all';

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* LEFT PANEL — image illustrative + glassmorphism */}
      <div className="hidden lg:flex lg:w-[42%] relative overflow-hidden">
        {/* Background image */}
        <img
          src="https://i.pinimg.com/736x/b2/db/0b/b2db0be191eaf907636fa3a784ca6c89.jpg"
          alt="Étudiants africains"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/90 via-violet-900/50 to-violet-900/30" />

        {/* Glassmorphism content */}
        <div className="relative z-10 flex flex-col justify-end gap-8 p-14 w-full h-full">
          <Link to="/" className="no-underline w-fit">
            <span className="font-display font-bold text-2xl text-white">
              School<span className="text-violet-300">Ap</span>
            </span>
          </Link>

          <div>
            {/* Glass card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md">
              <h2 className="text-3xl font-display font-bold text-white leading-tight mb-3">
                Rejoignez<br />l'excellence.
              </h2>
              <p className="text-white/70 leading-relaxed text-sm mb-8">
                Créez votre compte en quelques secondes et accédez à l'une des 6 filières d'élite de SCHOOLAP.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '5 000+', label: 'Étudiants' },
                  { value: '98%', label: 'Réussite' },
                  { value: '6', label: 'Filières' },
                  { value: '150+', label: 'Partenaires' },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3.5 text-center">
                    <p className="text-xl font-display font-bold text-white">{s.value}</p>
                    <p className="text-[11px] text-white/60 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/40 text-xs">Rentrée 2025-2026 ouverte</p>
        </div>
      </div>

      {/* RIGHT PANEL — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative bg-white">

        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          {/* Logo (mobile only) */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to="/" className="no-underline">
              <span className="font-display font-bold text-2xl text-slate-900">
                School<span className="text-indigo-600">Ap</span>
              </span>
            </Link>
          </div>

          <h1 className="text-2xl font-display font-bold text-slate-900 mb-1">Créer un compte</h1>
          <p className="text-slate-500 text-sm mb-8">Rentrée 2025-2026 — Rejoignez l'excellence</p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Prénom
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Kofi"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Mensah"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Adresse email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="kofi.mensah@exemple.com"
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Filière d'intérêt
              </label>
              <div className="relative">
                <select
                  required
                  value={filiere}
                  onChange={(e) => setFiliere(e.target.value)}
                  title="Choisir une filière"
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all appearance-none"
                >
                  <option value="" disabled className="text-slate-400">Choisir une filière...</option>
                  {Object.keys(FILIERES).map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer group mt-1">
              <input
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-600 focus:ring-offset-white"
              />
              <span className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">
                J'accepte les{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-700">conditions générales</a>
                {' '}d'utilisation.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 mt-1"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> Création du compte...</>
              ) : (
                <>
                  <User size={16} />
                  Créer mon compte
                </>
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Déjà inscrit ?{' '}
            <Link to="/login" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Se connecter
            </Link>
          </p>

        </motion.div>
      </div>

    </div>
  );
}
