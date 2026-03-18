import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import TravelGuide from '../components/TravelGuide';
import DocumentChecklist from '../components/DocumentChecklist';
import ArrivalConfirmation from '../components/ArrivalConfirmation';
import { useTranslation } from '../context/LanguageContext';

export default function GuidePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-28">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <span className="text-orange-600">{t('guide.title')}</span> 🇳🇱
          </h1>
          <p className="text-xl text-slate-500 mt-2 font-medium">
             {t('guide.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Navigation & Checklist */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Maps & Locations */}
            <TravelGuide />

            {/* 2. Document Safety Checklist */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2 px-2">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('guide.prep_title')}</h2>
              </div>
              <DocumentChecklist />
            </div>

          </div>

          {/* Right Column: Travel Confirmation */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('guide.insurance_title')}</h2>
            </div>
            <ArrivalConfirmation />
            
            <div className="mt-8 p-6 bg-slate-100/50 border border-slate-200 rounded-3xl">
              <h4 className="text-sm font-bold text-slate-900 mb-2 italic">{t('guide.why_upload_title')}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {t('guide.why_upload_desc')}
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
