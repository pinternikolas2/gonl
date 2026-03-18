import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { useTranslation } from '../context/LanguageContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Clear state so it doesn't scroll again on refresh
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onLoginClick={() => navigate('/auth')} />
      <main className="pt-24 pb-16">
        <Hero />
        
        {/* About Section */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-24">
          <div className="bg-white rounded-[40px] p-12 lg:p-20 border border-slate-200 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
                {t('about.title')}
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                {t('about.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">{t('about.feature1_title')}</h4>
                  <p className="text-sm text-slate-500 font-medium">{t('about.feature1_desc')}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">{t('about.feature2_title')}</h4>
                  <p className="text-sm text-slate-500 font-medium">{t('about.feature2_desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
