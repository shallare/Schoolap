import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, CreditCard, LogOut, GraduationCap } from 'lucide-react';
import { useAppDB } from '../lib/data';

export default function StudentLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser: student, logout } = useAppDB();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/student', label: 'Tableau de bord', icon: <LayoutDashboard size={17} />, exact: true },
    { path: '/student/dossier', label: 'Mon Dossier', icon: <FolderOpen size={17} /> },
    { path: '/student/paiement', label: 'Scolarité', icon: <CreditCard size={17} /> },
  ];

  const initials = student?.name
    ? student.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
    : 'ET';

  return (
    <div className="flex min-h-screen bg-[#0B0D1A] font-sans text-slate-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-[#070912] border-r border-slate-800/70 fixed h-screen flex flex-col z-50 hidden lg:flex">

        <div className="px-5 py-6 border-b border-slate-800/70">
          <Link to="/" className="no-underline">
            <span className="font-display font-bold text-lg text-white">
              School<span className="text-indigo-400">Ap</span>
            </span>
          </Link>
          <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            Espace Étudiant
          </span>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-slate-500'}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5 border-t border-slate-800/70 pt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-all text-left w-full"
          >
            <LogOut size={16} />
            Déconnexion
          </button>

          <div className="flex items-center gap-3 px-1">
            <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-300 font-bold text-xs font-display shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-none truncate">{student?.name || 'Étudiant'}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{student?.id || 'ETU-0000'}</p>
            </div>
          </div>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        <header className="h-16 bg-[#070912]/80 backdrop-blur-sm border-b border-slate-800/70 px-6 lg:px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div>
            <h1 className="text-base font-display font-semibold text-white">
              Bonjour, {student?.name?.split(' ')[0] || 'Étudiant'}
            </h1>
            <p className="text-[12px] text-slate-500 mt-0.5">Année académique 2025-2026</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-300 font-bold text-xs font-display">
              {initials}
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-6 flex-1 overflow-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
