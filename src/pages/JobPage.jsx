import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import JobDetail from '../components/JobDetail';
import RoleSwitcher from '../components/RoleSwitcher';

// Mock data for now - in production this comes from Supabase
const mockJobs = [
  {
    id: '1',
    title: 'Skladník - Order Picker',
    company_name: 'Albert Heijn',
    location_city: 'Zaandam',
    hourly_brutto: 14.50,
    housing_cost_weekly: 135,
    shift_allowance: 1.0,
    description: 'Příprava objednávek pro největší supermarket v NL.',
    image_url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800&h=400',
  },
  {
    id: '2',
    title: 'Operátor Výroby - Komponenty',
    company_name: 'Philips',
    location_city: 'Eindhoven',
    hourly_brutto: 15.20,
    housing_cost_weekly: 125,
    shift_allowance: 1.15,
    description: 'Asistence při montáži drobných elektronických součástek.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=400',
  }
];

export default function JobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-2xl mx-auto px-6 pt-28 pb-16 flex justify-center">
        <JobDetail 
          job={job}
          onBack={() => navigate(-1)}
          onApply={() => {
            const isLoggedIn = !!sessionStorage.getItem('gonl_role');
            sessionStorage.setItem('gonl_applied_job', JSON.stringify(job));
            
            if (isLoggedIn) {
              const profile = JSON.parse(sessionStorage.getItem('gonl_user_profile') || '{}');
              profile.assigned_job = job;
              sessionStorage.setItem('gonl_user_profile', JSON.stringify(profile));
            }

            if (!isLoggedIn) {
              navigate('/auth');
              return;
            }
            navigate('/dashboard');
          }}
          isApplied={false}
        />
      </main>
    </div>
  );
}
