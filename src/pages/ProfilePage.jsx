import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Phone, ShieldCheck, MapPin, FileText, LogOut, ChevronRight, CheckCircle2, Globe, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = JSON.parse(sessionStorage.getItem('gonl_user') || '{}');
  const role = sessionStorage.getItem('gonl_role');
  const [profile, setProfile] = React.useState(() => 
    JSON.parse(sessionStorage.getItem('gonl_user_profile') || '{}')
  );

  const updateProfile = (updates) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    sessionStorage.setItem('gonl_user_profile', JSON.stringify(newProfile));
  };

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
            
            {/* Location Selection */}
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-600">
                  <Globe size={18}/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">{t('profile.location')}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{profile.current_location === 'Netherlands' ? t('profile.loc_nl') : t('profile.loc_other')}</p>
                </div>
              </div>
              <div className="flex gap-2 pl-14">
                <button 
                  onClick={() => updateProfile({ current_location: 'Netherlands' })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${profile.current_location === 'Netherlands' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  {t('profile.loc_nl')}
                </button>
                <button 
                  onClick={() => updateProfile({ current_location: 'Other' })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${profile.current_location !== 'Netherlands' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                   {t('profile.loc_other')}
                </button>
              </div>
            </div>

            {/* BSN Selection */}
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-slate-600">
                  <ShieldCheck size={18}/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-slate-900">{t('profile.has_bsn')}</p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{profile.has_bsn ? t('profile.yes') : t('profile.no')}</p>
                </div>
              </div>
              <div className="flex gap-2 pl-14">
                <button 
                  onClick={() => updateProfile({ has_bsn: true })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${profile.has_bsn ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  {t('profile.yes')}
                </button>
                <button 
                  onClick={() => updateProfile({ has_bsn: false })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${!profile.has_bsn ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                   {t('profile.no')}
                </button>
              </div>
            </div>
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
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white overflow-hidden relative shadow-xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full -mr-16 -mt-16 blur-3xl opacity-20" />
          <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3 relative z-10">Tvůj aktuální status</p>
          <div className="flex items-center gap-3 relative z-10">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${profile.assigned_job ? 'bg-orange-600' : 'bg-slate-700'}`}>
              {profile.assigned_job ? <Check size={20} /> : <ShieldCheck size={20} />}
            </div>
            <div>
              <p className="font-black text-lg">
                {!profile.assigned_job ? 'Čeká se na výběr' : 
                 !profile.is_cv_uploaded ? 'Nahrát CV' : 
                 !profile.is_id_verified ? 'Ověřit identitu' : 'Ověřen (Příprava)'}
              </p>
              <p className="text-xs text-white/60 font-medium italic">
                {!profile.assigned_job ? 'Vyber si svou první práci v NL' : 
                 !profile.is_cv_uploaded ? 'Tvoje vysněná práce už čeká' : 
                 !profile.is_id_verified ? 'Zbývá poslední krok - sken ID' : 'Jsi na cestě k novému začátku'}
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard')} className="mt-5 w-full bg-white/10 hover:bg-white/20 transition-all text-white py-3 rounded-xl text-sm font-bold border border-white/5 active:scale-[0.98]">
            {profile.assigned_job ? 'Pokračovat v Roadmapě →' : 'Zobrazit Timeline →'}
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
