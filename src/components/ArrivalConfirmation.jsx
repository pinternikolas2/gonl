import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Upload, Check, Calendar, Clock } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function ArrivalConfirmation({ onComplete }) {
  const { t } = useTranslation();
  const [ticketFile, setTicketFile] = useState(null);
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulace uploadu a změny statusu v DB na 'On the Way'
    await new Promise(r => setTimeout(r, 1500));
    
    // Update profile in session
    const profile = JSON.parse(sessionStorage.getItem('gonl_user_profile') || '{}');
    if (profile) {
      profile.is_ticket_uploaded = true;
      sessionStorage.setItem('gonl_user_profile', JSON.stringify(profile));
    }

    setFinished(true);
    setLoading(false);
    if (onComplete) onComplete({ arrivalDate, arrivalTime });
  };

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-emerald-600 rounded-[32px] p-8 text-center text-white shadow-xl shadow-emerald-200">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
          <Check size={32} />
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight">{t('guide.arrival.success_title')}</h3>
        <p className="text-sm text-emerald-100 font-medium">{t('guide.arrival.success_desc')}</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
          <Plane size={24} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{t('guide.arrival.title')}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t('guide.arrival.upload_label')}</label>
          <div className="relative group">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => setTicketFile(e.target.files[0])}
            />
            <div className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${ticketFile ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 group-hover:border-slate-300'}`}>
              <Upload className={`${ticketFile ? 'text-emerald-500' : 'text-slate-300'} mb-3`} />
              <p className="text-xs font-bold text-slate-500">
                {ticketFile ? ticketFile.name : t('guide.arrival.upload_placeholder')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Calendar size={12}/> {t('guide.arrival.date_label')}</label>
            <input 
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Clock size={12}/> {t('guide.arrival.time_label')}</label>
            <input 
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || !ticketFile}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold transition-all hover:bg-blue-500 active:scale-[0.98] shadow-xl shadow-blue-200 disabled:opacity-40"
        >
          {loading ? t('guide.arrival.loading') : t('guide.arrival.submit_btn')}
        </button>
      </form>
    </div>
  );
}
