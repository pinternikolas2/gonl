import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function BSNUpload({ onComplete }) {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate upload
    await new Promise(r => setTimeout(r, 1500));
    
    // Update profile in session
    const profile = JSON.parse(sessionStorage.getItem('gonl_user_profile') || '{}');
    if (profile) {
      profile.is_bsn_uploaded = true;
      sessionStorage.setItem('gonl_user_profile', JSON.stringify(profile));
    }

    setFinished(true);
    setLoading(false);
    if (onComplete) onComplete();
  };

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-emerald-600 rounded-[32px] p-12 text-center text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40">
          <Check size={32} />
        </div>
        <h3 className="text-xl font-black mb-2 tracking-tight">{t('guide.arrival.success_title')}</h3>
        <p className="text-sm text-emerald-100 font-medium">{t('guide.arrival.success_desc')}</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
          <FileText size={24} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{t('roadmap.step_bsn')}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{t('guide.arrival.bsn_document')}</label>
          <div className="relative group">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className={`p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${file ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200 group-hover:border-slate-300'}`}>
              <Upload className={`${file ? 'text-emerald-500' : 'text-slate-300'} mb-3`} />
              <p className="text-xs font-bold text-slate-500">
                {file ? file.name : t('guide.arrival.bsn_placeholder')}
              </p>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading || !file}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold transition-all hover:bg-slate-800 active:scale-[0.98] shadow-xl shadow-slate-200 disabled:opacity-40"
        >
          {loading ? t('guide.arrival.loading') : t('guide.arrival.submit')}
        </button>
      </form>
    </div>
  );
}
