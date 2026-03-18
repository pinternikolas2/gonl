import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserDashboard from '../components/UserDashboard';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleJobClick = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pb-24">
        <UserDashboard onJobClick={handleJobClick} />
      </main>
    </div>
  );
}
