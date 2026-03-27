import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, HelpCircle, ShieldCheck, CreditCard, Ship, Home, Mail } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const faqConfig = [
  {
    key: 'process',
    icon: <ShieldCheck className="text-orange-600" size={24} />,
    questions: ['q1', 'q2']
  },
  {
    key: 'money',
    icon: <CreditCard className="text-emerald-600" size={24} />,
    questions: ['q3', 'q4']
  },
  {
    key: 'travel',
    icon: <Home className="text-blue-600" size={24} />,
    questions: ['q5', 'q6']
  }
];

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-xs font-black uppercase tracking-widest mb-6"
          >
            <HelpCircle size={14} /> Centrum nápovědy
          </motion.div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-6">{t('faq.title')}</h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {faqConfig.map((section, sIdx) => (
            <div key={section.key} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 italic">
                  {section.icon}
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">
                  {t(`faq.categories.${section.key}.title`)}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {section.questions.map((qId) => (
                  <FAQItem 
                    key={qId} 
                    question={t(`faq.categories.${section.key}.${qId}.q`)} 
                    answer={t(`faq.categories.${section.key}.${qId}.a`)} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-slate-900 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 rounded-full -mr-32 -mt-32 blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full -ml-32 -mb-32 blur-3xl opacity-10" />
          
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4 tracking-tight">{t('faq.cta_title')}</h3>
            <p className="text-white/60 text-lg font-medium mb-10 max-w-xl mx-auto">
              {t('faq.cta_desc')}
            </p>
            <a 
              href="mailto:info@gonl.app"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-50 transition-all active:scale-95 shadow-xl shadow-orange-950/20"
            >
              <Mail size={18} /> {t('faq.cta_btn')}
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-orange-200 transition-all shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left group transition-colors"
      >
        <span className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-orange-600 transition-colors">{question}</span>
        <div className={`p-2 rounded-xl transition-all ${isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-8 pt-0">
              <div className="h-px bg-slate-100 mb-6 w-1/4" />
              <p className="text-slate-600 font-medium leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
