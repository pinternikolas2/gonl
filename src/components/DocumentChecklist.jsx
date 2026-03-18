import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, ShieldCheck, FileText, User, Home } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function DocumentChecklist() {
  const { t } = useTranslation();
  const [items, setItems] = useState([
    { id: 'passport', icon: <User size={18}/>, checked: false },
    { id: 'birth', icon: <FileText size={18}/>, checked: false },
    { id: 'housing', icon: <Home size={18}/>, checked: false },
  ]);

  const toggleItem = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const allChecked = items.every(item => item.checked);

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col gap-6">
      <div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
           <ShieldCheck className="text-orange-600" /> {t('guide.docs.title')}
        </h3>
        <p className="text-sm text-slate-500 font-medium mt-1">
          {t('guide.docs.subtitle')}
        </p>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <button 
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.checked ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-200 hover:border-slate-300'}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item.checked ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
              {item.checked ? <Check size={20} /> : item.icon}
            </div>
            
            <div className="flex-1 text-left">
              <h4 className={`text-sm font-bold ${item.checked ? 'text-emerald-900' : 'text-slate-700'}`}>
                {t(`guide.docs.items.${item.id}.title`)}
              </h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {t(`guide.docs.items.${item.id}.sub`)}
              </p>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {!allChecked ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-800"
          >
            <AlertCircle className="shrink-0" size={20} />
            <p className="text-xs font-bold leading-relaxed">
              {t('guide.docs.not_ready')}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800"
          >
            <ShieldCheck className="shrink-0 text-emerald-600" size={20} />
            <p className="text-xs font-bold leading-relaxed">
              {t('guide.docs.ready')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
