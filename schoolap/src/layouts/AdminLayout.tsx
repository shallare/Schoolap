import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, GraduationCap, Wallet, Trash2, LogOut, BookOpen, BarChart3, GraduationCap as LogoIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin/overview',      icon: <BarChart3 size={17} />,      label: 'Vue d\'ensemble' },
    { path: '/admin/inscriptions',  icon: <BookOpen size={17} />,       label: 'Inscriptions' },
    { path: '/admin/students',      icon: <Users size={17} />,          label: 'Étudiants' },
    { path: '/admin/courses',       icon: <GraduationCap size={17} />,  label: 'Filières' },
    { path: '/admin/finance',       icon: <Wallet size={17} />,         label: 'Finance' },
  ];

  const currentLabel = menuItems.find(m => location.pathname.startsWith(m.path))?.label || 'Administration';

  return (
    <div className="flex min-h-screen bg-[#0B0D1A] font-sans text-slate-100">

      {/* SIDEBAR */}
      <aside className="w-60 bg-[#070912] border-r border-slate-800/70 fixed h-screen flex flex-col z-50 hidden md:flex">

        <div className="px-5 py-6 border-b border-slate-800/70">
          <Link to="/" className="no-underline">
            <span className="font-display font-bold text-lg text-white">
              School<span className="text-indigo-400">Ap</span>
            </span>
          </Link>
          <span className="mt-2 inline-block text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
            Espace Admin
          </span>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
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

        <div className="px-3 pb-5 flex flex-col gap-1 border-t border-slate-800/70 pt-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 transition-all text-left w-full"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-60 flex flex-col min-h-screen">

        {/* TOP HEADER */}
        <header className="h-16 bg-[#070912]/80 backdrop-blur-sm border-b border-slate-800/70 px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div>
            <h1 className="text-base font-display font-semibold text-white">
              {currentLabel}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-300 font-bold text-xs font-display">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AD'}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white leading-none">{user?.name || 'Administrateur'}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Super Admin</p>
            </div>
          </div>
        </header>

        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>

      </main>

    </div>
  );
}
