import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: ('student' | 'admin')[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D1A] flex flex-col items-center justify-center text-slate-500 gap-4">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
        <p className="font-medium">Chargement de votre session…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // If admin tries to go to student or vice versa, redirect to their home
    return <Navigate to={role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return <Outlet />;
}
