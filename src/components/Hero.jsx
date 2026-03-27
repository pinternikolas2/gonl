import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import JobDetail from './JobDetail';
import { useTranslation } from '../context/LanguageContext';

// Aktuální nabídky (v produkci z Supabase)
const featuredJobs = [
  {
    id: '1',
    title: 'Skladník – Order Picker',
    company_name: 'Albert Heijn',
    location_city: 'Zaandam',
    hourly_brutto: 14.50,
    housing_cost_weekly: 135,
    shift_allowance: 1.0,
    description: 'Příprava objednávek pro největší supermarket v Holandsku. Ranní, odpolední i noční směny.',
    image_url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=400&h=250',
  },
  {
    id: '2',
    title: 'Operátor Výroby',
    company_name: 'Philips',
    location_city: 'Eindhoven',
    hourly_brutto: 15.20,
    housing_cost_weekly: 125,
    shift_allowance: 1.15,
    description: 'Asistence při montáži elektronických součástek v moderní továrně. Příplatek za směny +15 %.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=250',
  },
  {
    id: '3',
    title: 'Řidič vysokozdvižného vozíku',
    company_name: 'DSV Logistics',
    location_city: 'Rotterdam',
    hourly_brutto: 16.00,
    housing_cost_weekly: 140,
    shift_allowance: 1.25,
    description: 'Obsluha VZV v moderním logistickém centru. Vyžadován průkaz VZV (zprostředkujeme).',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400&h=250',
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (job) => {
    const isLoggedIn = !!sessionStorage.getItem('gonl_role');
    
    if (!isLoggedIn) {
      // Value First: Save progress and go to auth
      sessionStorage.setItem('gonl_applied_job', JSON.stringify(job));
      navigate('/auth');
      return;
    }

    // If logged in, update profile and go to dashboard
    const profile = JSON.parse(sessionStorage.getItem('gonl_user_profile') || '{}');
    profile.assigned_job = job;
    sessionStorage.setItem('gonl_user_profile', JSON.stringify(profile));
    sessionStorage.setItem('gonl_applied_job', JSON.stringify(job)); // Ensure consistency with JobPage
    
    setAppliedJobs(prev => [...prev, job.id]);
    navigate('/dashboard');
  };

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const calculator = document.getElementById('calculator');
        if (calculator) {
          calculator.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ─── Hero Headline ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-12 lg:pt-24 text-center mb-16"
      >
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-tight">
          {t('hero.title_main')}<br/>
          <span className="text-orange-600">{t('hero.title_sub')}</span>
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-slate-500 font-medium max-w-xl mx-auto">
          {t('hero.description')}
        </p>
      </motion.div>

      {/* ─── Two-column layout: Jobs | Detail ─── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start scroll-mt-24" id="jobs">

        {/* Job Cards Column */}
        <div className="w-full lg:flex-1">
          <div className="flex items-center justify-between mb-5 px-1">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {t('hero.jobs_active')} · {featuredJobs.length}
            </p>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full animate-pulse">
              ● {t('hero.jobs_live')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {featuredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <JobCard
                  job={job}
                  onClick={handleJobSelect}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Detail or CTA */}
        <div className="w-full lg:w-[420px] xl:w-[460px] shrink-0 sticky top-28 self-start scroll-mt-28" id="calculator">
          <AnimatePresence mode="wait">
            {selectedJob ? (
              <JobDetail
                key={selectedJob.id}
                job={selectedJob}
                onBack={() => setSelectedJob(null)}
                onApply={() => handleApply(selectedJob)}
                isApplied={appliedJobs.includes(selectedJob.id)}
              />
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="bg-white rounded-[24px] border border-slate-200 shadow-xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
                  👆
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">
                  {t('hero.cta_title')}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                  {t('hero.cta_desc')}
                </p>

                <div className="space-y-4 text-left mb-8">
                  {[
                    { icon: '✅', text: t('hero.cta_feature1') },
                    { icon: '🏠', text: t('hero.cta_feature2') },
                    { icon: '📊', text: t('hero.cta_feature3') },
                    { icon: '🏥', text: t('hero.cta_feature4') },
                  ].map(item => (
                    <div key={item.text} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <span className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-xs">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedJob(featuredJobs[0])}
                  className="w-full bg-slate-900 text-white py-4 rounded-full font-bold text-base shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  {t('hero.cta')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-20" />
    </div>
  );
}
