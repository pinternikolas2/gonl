import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoleSwitcher() {
  const navigate = useNavigate();
  const currentRole = sessionStorage.getItem('gonl_role');

  if (!currentRole) return null;

  const switchRole = (role) => {
    sessionStorage.setItem('gonl_role', role);
    navigate(role === 'partner' ? '/partner' : '/dashboard');
    window.location.reload(); // Force a re-render on role change
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-2 rounded-xl shadow-xl border border-slate-200 flex gap-2">
      <button 
        onClick={() => switchRole('candidate')} 
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${currentRole === 'candidate' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
      >
        Kandidát
      </button>
      <button 
        onClick={() => switchRole('partner')} 
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${currentRole === 'partner' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
      >
        Agentura (B2B)
      </button>
    </div>
  );
}
