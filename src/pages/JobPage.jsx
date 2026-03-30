import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import JobDetail from '../components/JobDetail';
import RoleSwitcher from '../components/RoleSwitcher';

import { allJobs as mockJobs } from '../data/jobs';

import { useUser } from '../context/UserContext';

export default function JobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, applyToJob } = useUser();
  const job = mockJobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Práce nenalezena</h2>
          <button onClick={() => navigate('/dashboard')} className="text-orange-600 font-medium hover:underline">
            Zpět na dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleApply = async () => {
    if (!profile) {
      // Not logged in, save and redirect
      sessionStorage.setItem('gonl_applied_job_id', job.id);
      navigate('/auth');
      return;
    }

    const success = await applyToJob(job.id);
    if (success) {
      sessionStorage.setItem('gonl_applied_job', 'true'); // For dashboard welcome msg
      navigate('/dashboard');
    } else {
      alert('Chyba při odesílání přihlášky.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16 flex justify-center">
        <JobDetail 
          job={job}
          onBack={() => navigate(-1)}
          onApply={handleApply}
          isApplied={false}
        />
      </main>
    </div>
  );
}
