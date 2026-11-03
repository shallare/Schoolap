import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../lib/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      // Check if it's an admin based on email or a specific toggle if we had one
      // Here we try admin login if it's the admin email, otherwise student
      const isAdmin = email.toLowerCase() === 'admin@school.com';
      await login(email, password, isAdmin);
      // Removed manual navigate() to prevent conflict with AuthRedirect
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">

      {/* LEFT PANEL — image illustrative + glassmorphism overlay */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background image */}
        <img
          src="https://i.pinimg.com/1200x/bd/f7/75/bdf775b3d21740d3f3488c20d6899e5b.jpg"
          alt="Étudiants africains"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/50 to-indigo-900/30" />

        {/* Glassmorphism content */}
        <div className="relative z-10 flex flex-col justify-end gap-8 p-14 w-full h-full">
          <Link to="/" className="no-underline w-fit">
            <span className="font-display font-bold text-2xl text-white">
              School<span className="text-indigo-300">Ap</span>
            </span>
          </Link>

          <div>
            {/* Glass card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md">
              <h2 className="text-3xl font-display font-bold text-white leading-tight mb-3">
                Votre carrière<br />commence ici.
              </h2>
              <p className="text-white/70 leading-relaxed text-sm mb-8">
                Accédez à votre espace personnel, suivez votre progression et gérez votre parcours académique en toute simplicité.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  'Diplômes reconnus par l\'État',
                  'Corps professoral expert',
                  'Réseau Alumni international',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-white/90 text-sm">
                    <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-white/40 text-xs">Année académique 2025-2026</p>
        </div>
      </div>

      {/* RIGHT PANEL — form with glassmorphism */}
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

          <h1 className="text-2xl font-display font-bold text-slate-900 mb-1">Bon retour</h1>
          <p className="text-slate-500 text-sm mb-8">Connectez-vous à votre espace scolaire</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm mb-6">
              <AlertCircle size={16} className="shrink-0" />
              Email ou mot de passe incorrect.
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Adresse email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="prenom.nom@exemple.com"
                  required
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-indigo-600 hover:text-indigo-700 transition-colors">
                  Oublié ?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50/80 backdrop-blur-sm border border-slate-200 rounded-xl py-3 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 mt-1"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={16} /> Vérification...</>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Pas de compte ?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Créer un compte
            </Link>
          </p>

          <div className="mt-8 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 text-center">
            <span className="font-semibold text-slate-600 block mb-1 uppercase tracking-wide text-[10px]">Identifiants de démo</span>
            Admin : <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">admin@school.com</code> / <code className="text-slate-700 bg-slate-100 px-1 py-0.5 rounded">admin</code>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
