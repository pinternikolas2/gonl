import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black tracking-tighter text-orange-600 mb-4">
              GoNL.
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed font-medium">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">{t('footer.app')}</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li><button onClick={() => navigate('/')} className="hover:text-orange-600 transition-colors">{t('nav.about')}</button></li>
              <li><button onClick={() => navigate('/jobs')} className="hover:text-orange-600 transition-colors">{t('nav.jobs')}</button></li>
              <li><button onClick={() => navigate('/auth')} className="hover:text-orange-600 transition-colors">{t('nav.login')}</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">{t('footer.partners')}</h4>
            <ul className="space-y-2 text-sm text-slate-500 font-medium">
              <li>
                <button 
                  onClick={() => navigate('/partner-login')} 
                  className="text-slate-400 hover:text-orange-600 transition-colors"
                >
                  {t('footer.partner_login')}
                </button>
              </li>
              <li><a href="mailto:partners@gonl.app" className="hover:text-orange-600 transition-colors">{t('footer.collaboration')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <button className="hover:text-slate-600">{t('footer.privacy')}</button>
            <button className="hover:text-slate-600">{t('footer.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
