import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X, Filter } from 'lucide-react';
import JobCard from '../components/JobCard';
import Header from '../components/Header';
import { useTranslation } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { Skeleton } from '../components/Skeleton';

export default function JobsListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const { data, error } = await supabase.from('jobs').select('*');
        if (error) throw error;
        setAllJobs(data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Získání unikátních měst pro filtry
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(allJobs.map(job => job.location_city))];
    return uniqueCities.sort();
  }, [allJobs]);

  // Filtrování seznamu prací
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location_city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCity = !selectedCity || job.location_city === selectedCity;
      
      return matchesSearch && matchesCity;
  if (loading) return (
    <div className="min-h-screen bg-slate-50 pt-28 space-y-6 max-w-4xl mx-auto px-6">
      <Skeleton variant="title" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-[32px]" />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 pt-28">
        <div className="py-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('footer.jobs')}</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dostupné pozice</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">
            {filteredJobs.length} {t('hero.jobs_active')} v Holandsku
          </p>
        </div>

        {/* Search and Filters UI */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-600 transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text"
              placeholder={t('jobs.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-[24px] py-4 pl-14 pr-12 text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* City Filters */}
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
               <Filter size={14} />
               {t('jobs.filter_city')}
             </div>
             <div className="flex flex-wrap gap-2">
               <button
                 onClick={() => setSelectedCity(null)}
                 className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${!selectedCity ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
               >
                 {t('jobs.filter_all')}
               </button>
               {cities.map(city => (
                 <button
                   key={city}
                   onClick={() => setSelectedCity(city)}
                   className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${selectedCity === city ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                 >
                   {city}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <JobCard job={job} onClick={(j) => navigate(`/jobs/${j.id}`)} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <Search className="text-slate-300" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Žádné shody</h3>
                <p className="text-slate-500 font-medium mt-1">{t('jobs.no_results')}</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCity(null); }}
                  className="mt-6 text-orange-600 font-bold hover:underline"
                >
                  Zrušit všechny filtry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
