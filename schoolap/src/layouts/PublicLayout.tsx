import { Outlet, Link, useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone, Menu, X, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Filières', href: '/#filieres' },
    { label: 'Avantages', href: '/#avantages' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          <Link to="/" className="no-underline group">
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900">
              School<span className="text-indigo-600">Ap</span>
            </span>
          </Link>

          <ul className="hidden md:flex gap-8 items-center list-none p-0 m-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`font-medium text-sm transition-colors ${
                    location.pathname === '/' && link.href === '/'
                      ? 'text-slate-900'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-3 items-center">
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-semibold text-sm text-slate-600 border border-slate-300 hover:border-indigo-400 hover:text-indigo-600 transition-all duration-200"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg font-semibold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
            >
              S'inscrire
            </Link>
          </div>

          <button
            className="md:hidden text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-600 hover:text-slate-900 py-3 border-b border-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 mt-4">
            <Link
              to="/login"
              className="text-sm font-bold text-slate-600 border border-slate-300 px-4 py-3 rounded-xl text-center hover:border-indigo-400 transition-colors"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-xl text-center transition-colors"
            >
              S'inscrire gratuitement
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer id="contact" className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          <div className="md:col-span-1">
            <Link to="/" className="mb-5 no-underline">
              <span className="font-display font-bold text-2xl text-white">
                School<span className="text-indigo-400">Ap</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              La référence de l'enseignement supérieur digital en Afrique. Formez-vous aujourd'hui pour diriger demain.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-display font-bold text-white mb-5 uppercase tracking-wider">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Filières', href: '/#filieres' },
                { label: 'Connexion', href: '/login' },
                { label: 'Inscription', href: '/register' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-slate-400 hover:text-white transition-colors text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-display font-bold text-white mb-5 uppercase tracking-wider">Légal</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {['Mentions Légales', 'Politique de Confidentialité', "Conditions d'Utilisation"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-slate-400 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-display font-bold text-white mb-5 uppercase tracking-wider">Contact</h3>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-center gap-3">
                <MapPin size={15} className="text-indigo-400 shrink-0" />
                Abomey-Calavi, Bénin
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-indigo-400 shrink-0" />
                contact@schoolap.bj
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-indigo-400 shrink-0" />
                +229 01 97 70 07 70
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SCHOOLAP. Tous droits réservés.
          </p>
          <p className="text-slate-600 text-xs">
            Année académique <span className="text-indigo-400 font-semibold">2025-2026</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
