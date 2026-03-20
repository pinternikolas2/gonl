import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import PartnerPage from './pages/PartnerPage';
import JobPage from './pages/JobPage';
import JobsListPage from './pages/JobsListPage';
import ProfilePage from './pages/ProfilePage';
import GuidePage from './pages/GuidePage';
import PartnersPage from './pages/PartnersPage';
import BottomNav from './components/BottomNav';
import { LanguageProvider } from './context/LanguageContext';

import PartnerLoginPage from './pages/PartnerLoginPage';

function useAuth() {
  const role = sessionStorage.getItem('gonl_role');
  return { loggedIn: !!role, role };
}

function ProtectedRoute({ children, requiredRole }) {
  const { loggedIn, role } = useAuth();
  if (!loggedIn) return <Navigate to="/auth" replace />;
  if (requiredRole && role !== requiredRole) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/partner-login" element={<PartnerLoginPage />} />
          <Route path="/jobs" element={<JobsListPage />} />
          <Route path="/jobs/:id" element={<JobPage />} />
          <Route path="/partners" element={<PartnersPage />} />

          {/* Candidate / Private */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/guide" element={<ProtectedRoute><GuidePage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

          {/* Partner / Private */}
          <Route path="/partner" element={<ProtectedRoute requiredRole="partner"><PartnerPage /></ProtectedRoute>} />
          <Route path="/partner/settings" element={<ProtectedRoute requiredRole="partner"><PartnerPage /></ProtectedRoute>} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global UI */}
        <BottomNav />
      </LanguageProvider>
    </BrowserRouter>
  );
}
