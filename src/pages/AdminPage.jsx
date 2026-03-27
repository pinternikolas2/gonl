import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const userRole = sessionStorage.getItem('gonl_role');
  const userEmail = sessionStorage.getItem('gonl_user_email');
  
  // Real check should be here, but for MVP we allow via role
  const isAdmin = userRole === 'admin' || userEmail === 'nikolas@gonl.app';

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-[40px] text-center max-w-sm w-full shadow-2xl">
           <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
           </div>
           <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Access Restricted</h2>
           <p className="text-slate-500 font-bold text-sm mb-8 leading-relaxed">Only authorized personnel can access the HQ Enterprise Dashboard.</p>
           <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all border border-slate-700"
          >
            Return to Surface
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
