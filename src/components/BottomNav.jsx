import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Briefcase, User, LayoutDashboard, Users, Navigation, Settings } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem('gonl_role');
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  // Skrýt na landing a auth stránkách
  if (!role || location.pathname === '/' || location.pathname === '/auth' || location.pathname === '/onboarding' || location.pathname === '/partner-login' || location.pathname.startsWith('/admin')) {
    return null;
  }

  const candidateNav = [
    { icon: <Home size={22}/>, label: 'Domů', path: '/dashboard' },
    { icon: <Briefcase size={22}/>, label: 'Nabídky', path: '/jobs' },
    { icon: <Navigation size={22}/>, label: 'Cesta', path: '/guide' },
    { icon: <User size={22}/>, label: 'Profil', path: '/profile' },
  ];

  const partnerNav = [
    { icon: <LayoutDashboard size={22}/>, label: 'Dashboard', path: '/partner' },
    { icon: <Settings size={22}/>, label: 'Nastavení', path: '/partner/settings' },
  ];

  const navItems = role === 'partner' ? partnerNav : candidateNav;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur-lg border-t border-slate-200/60 pb-safe">
      <div className="max-w-lg mx-auto px-4 flex justify-around items-center h-16">
        {navItems.map(item => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${active ? 'text-orange-600' : 'text-slate-400 hover:text-slate-700'}`}
            >
              {item.icon}
              <span className={`text-[10px] font-bold uppercase tracking-wide ${active ? 'text-orange-600' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {active && <span className="absolute -bottom-px w-8 h-0.5 bg-orange-500 rounded-full" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
