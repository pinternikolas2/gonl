import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';

export default function Header({ onLoginClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!sessionStorage.getItem('gonl_role');
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    if (!isLandingPage) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t('nav.jobs'), id: 'jobs' },
    { label: t('nav.calculator'), id: 'calculator' },
    { label: t('nav.about'), id: 'about' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Nav Links */}
        <div className="flex items-center gap-12">
          <button 
            onClick={() => navigate('/')} 
            className="text-2xl font-black tracking-tighter text-orange-600 select-none"
          >
            GoNL.
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-bold text-slate-500 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Language Switcher & Actions */}
        <div className="flex items-center gap-6">
          
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-100">
            {['cz', 'sk', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${language === lang ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {lang}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 group"
              >
                <span className="hidden sm:block text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{t('nav.my_journey')}</span>
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-all border border-slate-200 group-hover:border-orange-200 shadow-sm">
                  <User size={20} />
                </div>
              </button>
            ) : (
              <button 
                onClick={() => onLoginClick ? onLoginClick() : navigate('/auth')}
                className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-500 transition-all shadow-lg shadow-orange-200 active:scale-95"
              >
                {t('nav.login')}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <div className="flex gap-4 mb-4 pb-4 border-b border-slate-50">
                {['cz', 'sk', 'en'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); setIsMenuOpen(false); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${language === lang ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-500'}`}
                  >
                    {lang === 'cz' ? 'Česky' : lang === 'sk' ? 'Slovensky' : 'English'}
                  </button>
                ))}
              </div>
              {navLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-lg font-bold text-slate-700 hover:text-orange-600 py-2"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
