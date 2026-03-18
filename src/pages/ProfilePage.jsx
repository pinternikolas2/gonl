import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, ShieldCheck, MapPin, FileText, LogOut, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('gonl_user') || '{}');
  const role = sessionStorage.getItem('gonl_role');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const MenuItem = ({ icon, label, sublabel, onClick, danger }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-colors text-left ${danger ? 'hover:bg-rose-50' : 'hover:bg-slate-50'}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${danger ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-600'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={`font-semibold text-sm ${danger ? 'text-rose-600' : 'text-slate-900'}`}>{label}</p>
        {sublabel && <p className="text-xs text-slate-400 font-medium mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-6 pt-16 pb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Můj profil</p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
            {(user.name || 'G')[0]}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900">{user.name || 'GoNL Uživatel'}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={10} /> Ověřeno
              </span>
              <span className="text-xs text-slate-400 font-medium">{user.phone || user.email}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu */}
      <div className="max-w-lg mx-auto px-6 pt-8 space-y-6">

        {/* Account */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Účet</p>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            <MenuItem icon={<User size={18}/>} label="Osobní údaje" sublabel="Jméno, adresa, kontakt" onClick={() => {}} />
            <MenuItem icon={<Phone size={18}/>} label="Telefonní číslo" sublabel={user.phone || '—'} onClick={() => {}} />
            <MenuItem icon={<ShieldCheck size={18}/>} label="Doklady" sublabel="Občanský průkaz, BSN" onClick={() => {}} />
          </div>
        </div>

        {/* Moje dokumenty */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Dokumenty</p>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-50">
            <MenuItem icon={<FileText size={18}/>} label="Moje smlouvy" sublabel="Pracovní smlouvy ke stažení" onClick={() => {}} />
            <MenuItem icon={<MapPin size={18}/>} label="Adresa ubytování v NL" sublabel="Zaandam, Noord-Holland" onClick={() => {}} />
          </div>
        </div>

        {/* Status Timeline Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">Tvůj aktuální status</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-black text-lg">Ověřen</p>
              <p className="text-xs text-white/60 font-medium">Čeká se na výběr práce</p>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="mt-4 w-full bg-white/10 hover:bg-white/20 transition-colors text-white py-3 rounded-xl text-sm font-bold">
            Zobrazit celou Timeline →
          </button>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
          <MenuItem icon={<LogOut size={18}/>} label="Odhlásit se" onClick={handleLogout} danger />
        </div>

      </div>
    </div>
  );
}
