import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { AuthProvider, useAuth } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import AdminLayout from './layouts/AdminLayout';
import AdminOverview from './pages/admin/Overview';
import AdminInscriptions from './pages/admin/Inscriptions';
import AdminStudents from './pages/admin/Students';
import AdminCourses from './pages/admin/Courses';
import AdminFinance from './pages/admin/Finance';

import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/Dashboard';
import StudentDossier from './pages/student/Dossier';
import StudentPayment from './pages/student/Payment';

// Helper to check if user is already logged in and redirect accordingly
function RedirectIfAuth() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate(role === 'admin' ? '/admin' : '/student', { replace: true });
    }
  }, [user, role, loading, navigate]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
          
          <Route path="/filieres" element={<Navigate to="/#filieres" replace />} />
          
          <Route path="/login" element={<><RedirectIfAuth /><Login /></>} />
          <Route path="/register" element={<><RedirectIfAuth /><Register /></>} />
          
          {/* Admin Routes - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/overview" replace />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="inscriptions" element={<AdminInscriptions />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="finance" element={<AdminFinance />} />
            </Route>
          </Route>
          
          {/* Student Routes - Protected */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="dossier" element={<StudentDossierFromAuth />} />
              <Route path="paiement" element={<StudentPaymentFromAuth />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function StudentDossierFromAuth() {
  const { user } = useAuth();
  return user ? <StudentDossier student={user} /> : null;
}

function StudentPaymentFromAuth() {
  const { user } = useAuth();
  return user ? <StudentPayment student={user} /> : null;
}
