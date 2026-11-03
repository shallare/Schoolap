import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/public/Home';
import Filieres from './pages/public/Filieres';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        
        {/* Auth Routes & Other Pages without the main PublicLayout */}
        <Route path="/filieres" element={<Navigate to="/#filieres" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="inscriptions" element={<AdminInscriptions />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="finance" element={<AdminFinance />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
