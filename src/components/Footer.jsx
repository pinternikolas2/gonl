import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

export default function Footer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Candidates */}
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              {t('footer.candidates')}
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <button onClick={() => scrollToSection('jobs')} className="hover:text-orange-600 transition-colors">
                  {t('footer.jobs')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('calculator')} className="hover:text-orange-600 transition-colors">
                  {t('footer.calc')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/guide')} className="hover:text-orange-600 transition-colors">
                  {t('footer.faq')}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Column 2: For Agencies */}
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              {t('footer.agencies')}
            </h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li>
                <button onClick={() => navigate('/partners')} className="hover:text-orange-600 transition-colors text-slate-900 underline decoration-orange-500/30 underline-offset-4">
                  {t('footer.become_partner')}
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/partner-login')} className="hover:text-orange-600 transition-colors">
                  {t('footer.portal')}
                </button>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h4 className="font-black text-slate-900 mb-6 uppercase text-xs tracking-[0.2em]">
              {t('footer.contact')}
            </h4>
            <div className="space-y-4">
              <a href="mailto:info@gonl.app" className="block text-lg font-black text-orange-600 hover:text-orange-500 transition-colors tracking-tight">
                info@gonl.app
              </a>
              <p className="text-sm font-bold text-slate-400 leading-relaxed max-w-[200px]">
                {t('footer.tech')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-8">
            <button onClick={() => navigate('/faq')} className="hover:text-slate-600 transition-colors">Privacy Policy</button>
            <button className="hover:text-slate-600 transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
