import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Clock, 
  Briefcase, 
  ShieldCheck, 
  Plane, 
  ChevronRight, 
  AlertCircle,
  MapPin,
  Building2,
  Navigation,
  FileText,
  Upload,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DocumentScanner from './DocumentScanner';
import { useTranslation } from '../context/LanguageContext';
import { uploadResume } from '../lib/supabase';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [profile, setProfile] = useState(() => {
    const saved = sessionStorage.getItem('gonl_user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Uživatel',
      assigned_job: null,
      is_id_verified: false,
      is_cv_uploaded: false,
      cv_url: null,
      is_ticket_uploaded: false,
    };
  });

  const [showScanner, setShowScanner] = useState(false);
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [cvLoading, setCvLoading] = useState(false);

  // Sync profile to session for demo persistence
  useEffect(() => {
    sessionStorage.setItem('gonl_user_profile', JSON.stringify(profile));
  }, [profile]);

  // Load applied job if any (from Value First flow)
  useEffect(() => {
    const appliedJob = sessionStorage.getItem('gonl_applied_job');
    if (appliedJob && !profile.assigned_job) {
      setProfile(prev => ({ ...prev, assigned_job: JSON.parse(appliedJob) }));
      sessionStorage.removeItem('gonl_applied_job');
    }
  }, [profile.assigned_job]);

  const handleScanComplete = () => {
    setProfile(prev => ({ ...prev, is_id_verified: true }));
    setShowScanner(false);
  };

  const steps = [
    {
      id: 1,
      title: t('roadmap.step1'),
      description: profile.assigned_job ? `${t('roadmap.step1_desc')}: ${profile.assigned_job.title}` : t('roadmap.step1_desc'),
      status: profile.assigned_job ? 'completed' : 'active',
      icon: <Briefcase size={20} />,
      action: () => navigate('/')
    },
    {
      id: 2,
      title: t('roadmap.step_cv'),
      description: profile.is_cv_uploaded ? t('roadmap.step_cv_desc') : t('roadmap.step_cv_desc'),
      status: profile.is_cv_uploaded ? 'completed' : (profile.assigned_job ? 'active' : 'pending'),
      icon: <FileText size={20} />,
      action: () => setShowCVUpload(true)
    },
    {
      id: 3,
      title: t('roadmap.step2'),
      description: profile.is_id_verified ? t('roadmap.step2_desc') : t('roadmap.step2_desc'),
      status: profile.is_id_verified ? 'completed' : (profile.is_cv_uploaded ? 'active' : 'pending'),
      icon: <ShieldCheck size={20} />,
      action: () => setShowScanner(true)
    },
    {
      id: 4,
      title: t('roadmap.step3'),
      description: profile.is_ticket_uploaded ? t('roadmap.step3_desc') : t('roadmap.step3_desc'),
      status: profile.is_ticket_uploaded ? 'completed' : (profile.is_id_verified ? 'active' : 'pending'),
      icon: <Plane size={20} />,
      action: () => navigate('/guide')
    }
  ];

  const handleCVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setCvLoading(true);
      const publicUrl = await uploadResume(file, 'user_preview');
      setProfile(prev => ({ ...prev, is_cv_uploaded: true, cv_url: publicUrl }));
      setShowCVUpload(false);
    } catch (err) {
      console.error(err);
      alert('Chyba při nahrávání CV');
    } finally {
      setCvLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          {t('nav.my_journey')} <span className="text-orange-600">{t('roadmap.welcome_journey')}</span>
        </h1>
        <p className="text-lg text-slate-500 mt-2 font-medium">
          {t('roadmap.welcome')} {profile.name.split(' ')[0]}, {t('roadmap.welcome_sub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Roadmap Column */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-8">
          
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-30" />
            
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 relative z-10">{t('roadmap.title')}</h2>
            
            <div className="space-y-12 relative z-10">
              {steps.map((step, index) => {
                const isActive = step.status === 'active';
                const isCompleted = step.status === 'completed';
                const isPending = step.status === 'pending';

                return (
                  <div key={step.id} className="relative group">
                    {index !== steps.length - 1 && (
                      <div className={`absolute left-6 top-12 bottom-[-48px] w-1 -translate-x-1/2 rounded-full transition-colors duration-500 ${isCompleted ? 'bg-orange-500' : 'bg-slate-100'}`} />
                    )}
                    
                    <div className="flex gap-8">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-lg transition-all duration-300 ${isCompleted ? 'bg-emerald-500 text-white' : isActive ? 'bg-slate-900 text-white scale-110 shadow-orange-200' : 'bg-slate-50 text-slate-300'}`}>
                        {isCompleted ? <Check size={22} strokeWidth={3} /> : step.icon}
                      </div>
                      
                      <div className="flex-1 pb-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className={`text-xl font-black tracking-tight ${isActive ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-300'}`}>
                              {step.title}
                            </h3>
                            <p className={`text-sm mt-1 max-w-md ${isActive ? 'text-slate-600 font-medium' : 'text-slate-400 font-medium'}`}>
                              {step.description}
                            </p>
                          </div>

                          {isActive && (
                            <button 
                              onClick={step.action}
                              className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-orange-500 transition-all shadow-lg shadow-orange-100"
                            >
                              {step.id === 1 ? t('nav.jobs') : step.id === 2 ? t('roadmap.step_cv') : step.id === 3 ? t('roadmap.action_scan') : t('roadmap.action_guide')} 
                              <ChevronRight size={16} />
                            </button>
                          )}

                          {isCompleted && step.id === 1 && (
                             <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                               <MapPin size={14} className="text-orange-500" />
                               <span className="text-xs font-bold text-slate-700">{profile.assigned_job.location_city}</span>
                             </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Conditional: Moje Navigace (v produkci data ze Supabase) */}
          {profile.is_ticket_uploaded && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 rounded-[32px] p-8 lg:p-10 text-white shadow-2xl shadow-slate-300 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">{t('roadmap.my_nav')}</h3>
                  <p className="text-white/50 text-sm font-medium">{t('roadmap.my_nav_sub')}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => navigate('/guide')} className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all">
                    <Navigation size={18} /> {t('roadmap.my_nav_btn')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Info Column */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-6">
           <div className="bg-orange-600 rounded-[32px] p-8 text-white shadow-xl shadow-orange-200">
              <h4 className="text-lg font-black mb-4 tracking-tight">{t('roadmap.help_title')}</h4>
              <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                {t('roadmap.help_desc')}
              </p>
              <button className="w-full bg-white text-orange-600 py-4 rounded-2xl font-black text-sm shadow-lg shadow-orange-700/20 hover:bg-orange-50 transition-all">
                {t('roadmap.help_btn')}
              </button>
           </div>

           <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
               <AlertCircle className="text-blue-500" size={20} />
               <h4 className="font-bold text-slate-900">{t('roadmap.info_title')}</h4>
             </div>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">
               {t('roadmap.info_desc')}
             </p>
           </div>
        </div>

      </div>

      {/* Overlays */}
      <AnimatePresence>
        {showScanner && (
          <div className="fixed inset-0 z-[70] bg-white flex flex-col">
            <DocumentScanner 
              onBack={() => setShowScanner(false)}
              onComplete={handleScanComplete}
            />
          </div>
        )}

        {showCVUpload && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center px-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl overflow-hidden relative"
            >
              <button 
                onClick={() => setShowCVUpload(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-100 shadow-sm">
                  <FileText className="text-orange-600" size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">{t('roadmap.step_cv')}</h3>
                <p className="text-slate-500 font-medium text-sm mt-2">{t('roadmap.step_cv_desc')}</p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <div className={`
                    border-2 border-dashed rounded-[24px] p-10 text-center transition-all cursor-pointer
                    ${cvLoading ? 'bg-slate-50 border-slate-200' : 'bg-orange-50/50 border-orange-200 hover:bg-orange-50 hover:border-orange-300'}
                  `}>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleCVUpload}
                      disabled={cvLoading}
                    />
                    <Upload className="mx-auto mb-4 text-orange-600" size={32} />
                    <p className="text-sm font-bold text-slate-700">
                      {cvLoading ? 'Nahrávám...' : 'Vyberte soubor PDF nebo DOCX'}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">Maximální velikost 5MB</p>
                  </div>
                </label>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
