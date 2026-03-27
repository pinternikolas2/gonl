import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileCheck, Plane, Search, Download, X, Eye, CheckCircle2, FileText, Video, Building2, Plus, Settings } from 'lucide-react';
import AddJobModal from './AddJobModal';
import { useTranslation } from '../context/LanguageContext';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock candidates
const mockCandidates = [
  {
    id: 'C1045',
    name: 'Jan Novák',
    age: 26,
    language: 'EN (B2)',
    docStatus: 'verified',
    bsnDate: '2023-11-15',
    departureDate: '2023-11-18',
    status: 'ready',
    jobTarget: 'Warehouse - Order Picker',
    photoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=200&h=200',
    idPhotoUrl: 'https://images.unsplash.com/photo-1621252178972-e1d1377b5d19?auto=format&fit=crop&q=80&w=600&h=400',
    hasVideo: true,
    cvUrl: 'https://example.com/cv1.pdf',
  },
  {
    id: 'C1046',
    name: 'Petr Svoboda',
    age: 22,
    language: 'EN (A2)',
    docStatus: 'verified',
    bsnDate: 'Waiting',
    departureDate: '-',
    status: 'waiting_bsn',
    jobTarget: 'Production Operator',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    idPhotoUrl: 'https://images.unsplash.com/photo-1621252178972-e1d1377b5d19?auto=format&fit=crop&q=80&w=600&h=400',
    hasVideo: false,
    cvUrl: 'https://example.com/cv2.pdf',
  },
  {
    id: 'C1047',
    name: 'Martina Veselá',
    age: 29,
    language: 'EN (C1)',
    docStatus: 'verified',
    bsnDate: '2023-10-10',
    departureDate: 'Left on 12.10.',
    status: 'active',
    jobTarget: 'Team Leader',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200&h=200',
    idPhotoUrl: 'https://images.unsplash.com/photo-1621252178972-e1d1377b5d19?auto=format&fit=crop&q=80&w=600&h=400',
    hasVideo: true,
    cvUrl: 'https://example.com/cv3.pdf',
    current_location: 'Netherlands',
    has_bsn: true,
  }
];

export default function PartnerDashboard() {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNL, setFilterNL] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(true);
  const [showAddJob, setShowAddJob] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSettings = location.pathname === '/partner/settings';

  // Stats
  const readyCount = candidates.filter(c => c.status === 'ready').length;
  const waitingBsnCount = candidates.filter(c => c.status === 'waiting_bsn').length;
  const activeCount = candidates.filter(c => c.status === 'active').length;

  const handleApprove = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'active', departureDate: t('partner.detail.today') } : c));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, status: 'active', departureDate: t('partner.detail.today') }));
    }
  };

  const handleExport = () => {
    alert(t('partner.dashboard.export_alert'));
  };

  const generatePDFPack = () => {
    alert(`${t('partner.detail.pdf_pack_alert')} ${selectedCandidate.name}.`);
  };

  const getStatusPill = (status) => {
    switch (status) {
      case 'ready': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold tracking-wide">Ready-to-Go</span>;
      case 'waiting_bsn': return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-wide">Waiting for BSN</span>;
      case 'active': return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wide">Active in NL</span>;
      default: return null;
    }
  };

  const filteredCandidates = candidates.filter(c => 
    (c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.jobTarget.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterNL || (c.current_location === 'Netherlands' && c.has_bsn))
  ).sort((a, b) => {
    const aFastTrack = a.current_location === 'Netherlands' && a.has_bsn;
    const bFastTrack = b.current_location === 'Netherlands' && b.has_bsn;
    if (aFastTrack && !bFastTrack) return -1;
    if (!aFastTrack && bFastTrack) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar / Header pro Partnery */}
      <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
            <Building2 className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-900 leading-tight">{t('partner.dashboard.title')}</h1>
            <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-widest">{t('partner.dashboard.subtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-3 md:px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Download size={16} /> <span className="hidden md:inline">{t('partner.dashboard.export')}</span>
            </button>
            <button 
              onClick={() => setShowAddJob(true)}
              className="flex items-center gap-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 px-3 md:px-4 py-2 rounded-lg transition-colors shadow-sm shadow-orange-200"
            >
              <Plus size={16} /> <span className="hidden md:inline">{t('partner.dashboard.add_job')}</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => navigate('/partner/settings')}
              className={`p-2 transition-colors ${isSettings ? 'text-orange-600' : 'text-slate-400 hover:text-slate-900'}`}
            >
              <Settings size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0">
               <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" alt="Agent" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-[1400px] mx-auto w-full">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
               <Users size={24} />
             </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">{t('partner.dashboard.stats_available')}</p>
                <h3 className="text-3xl font-black text-slate-900">{readyCount}</h3>
              </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
               <FileCheck size={24} />
             </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">{t('partner.dashboard.stats_waiting')}</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">{waitingBsnCount}</h3>
              </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
               <Plane size={24} />
             </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-slate-500">{t('partner.dashboard.stats_active')}</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">{activeCount}</h3>
              </div>
          </div>
        </div>

        {/* Pipeline Table Section */}
        {isSettings ? (
          <SettingsView />
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px] md:h-[600px]">
          
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-bold text-slate-900">{t('partner.dashboard.pipeline_title')}</h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder={t('partner.dashboard.search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full sm:w-64 transition-all"
              />
            </div>
            <button 
              onClick={() => setFilterNL(!filterNL)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${filterNL ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
            >
              <CheckCircle2 size={16} /> {t('partner.dashboard.filter_nl')}
            </button>
          </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('partner.table.candidate')}</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('partner.table.position')}</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('partner.table.age_lang')}</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('partner.table.bsn_date')}</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">{t('partner.table.status')}</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">{t('partner.table.actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6 flex items-center gap-3">
                         <img src={c.photoUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                         <div>
                           <div className="flex items-center gap-2">
                             <span className="block font-bold text-slate-900">{c.name}</span>
                             {c.current_location === 'Netherlands' && c.has_bsn && (
                               <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-emerald-200">BSN</span>
                             )}
                           </div>
                           <span className="block text-xs text-slate-500 font-medium">ID: {c.id}</span>
                         </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-700">{c.jobTarget}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{c.age} {t('partner.detail.years')} / <span className="font-semibold text-slate-900">{c.language}</span></td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">{c.bsnDate}</td>
                      <td className="py-4 px-6">{getStatusPill(c.status)}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setSelectedCandidate(c); setIsPhotoBlurred(true); }}
                            className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm"
                          >
                            {t('partner.table.detail')}
                          </button>
                          <a 
                            href={c.cvUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5"
                          >
                            <FileText size={14} /> {t('partner.table.resume')}
                          </a>
                          <button 
                            onClick={() => handleApprove(c.id)}
                            disabled={c.status === 'active'}
                            className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-50"
                          >
                            {c.status === 'active' ? t('partner.table.approved') : t('partner.table.approve')}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden flex-1 overflow-auto p-4 space-y-4 bg-slate-50/50">
              {filteredCandidates.map(c => (
                <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={c.photoUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover bg-slate-200" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="block font-bold text-slate-900">{c.name}</span>
                          {c.current_location === 'Netherlands' && c.has_bsn && (
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter border border-emerald-200">BSN</span>
                          )}
                        </div>
                        <span className="block text-xs text-slate-500 font-medium">ID: {c.id}</span>
                      </div>
                    </div>
                    {getStatusPill(c.status)}
                  </div>
                  
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 pb-2">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('partner.table.position')}</p>
                      <p className="text-sm font-semibold text-slate-700 leading-tight">{c.jobTarget}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t('partner.table.age_lang')}</p>
                      <p className="text-sm text-slate-600 font-medium">{c.age} {t('partner.detail.years')} / <span className="font-bold text-slate-900">{c.language}</span></p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
                    <button 
                      onClick={() => { setSelectedCandidate(c); setIsPhotoBlurred(true); }}
                      className="flex-1 text-sm font-bold text-slate-700 bg-slate-50 py-2.5 rounded-lg border border-slate-200 active:bg-slate-100 transition-colors"
                    >
                      {t('partner.table.detail')}
                    </button>
                    <a 
                      href={c.cvUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 px-4 text-sm font-bold text-slate-700 bg-slate-50 py-2.5 rounded-lg border border-slate-200 active:bg-slate-100 transition-colors"
                    >
                      <FileText size={16} />
                    </a>
                    <button 
                      onClick={() => handleApprove(c.id)}
                      disabled={c.status === 'active'}
                      className="w-full text-sm font-bold text-white bg-slate-900 py-2.5 rounded-lg active:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                      {c.status === 'active' ? t('partner.table.approved') : t('partner.table.approve')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredCandidates.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                {t('partner.dashboard.no_candidates')}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Candidate Detail Side-Panel (Drawer) */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-sm"
              onClick={() => setSelectedCandidate(null)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[500px] bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-20">
                <h2 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2 truncate pr-2">
                  <UserAvatar url={selectedCandidate.photoUrl} />
                  <span className="truncate">{selectedCandidate.name}</span>
                </h2>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-auto p-6 space-y-8">
                
                {/* Status bar */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t('partner.detail.record_status')}</p>
                    {getStatusPill(selectedCandidate.status)}
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="flex-1 text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t('partner.table.position')}</p>
                    <p className="text-sm font-bold text-slate-900">{selectedCandidate.jobTarget}</p>
                  </div>
                </div>

                {/* Fast Track Badge in Detail */}
                {selectedCandidate.current_location === 'Netherlands' && selectedCandidate.has_bsn && (
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="text-sm font-bold text-emerald-800 leading-snug">
                       {t('partner.detail.fast_track_msg')}
                    </p>
                  </div>
                )}

                {/* Secure Documents */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> {t('partner.detail.secure_docs')}
                  </h3>
                  
                  {/* ID Card Wrapper */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-[1.58/1] bg-slate-100 group">
                    <img 
                      src={selectedCandidate.idPhotoUrl} 
                      alt="ID Scan" 
                      className={`w-full h-full object-cover transition-all duration-300 ${isPhotoBlurred ? 'blur-md grayscale' : ''}`}
                    />
                    
                    {isPhotoBlurred && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10">
                        <button 
                          onClick={() => setIsPhotoBlurred(false)}
                          className="bg-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors"
                        >
                          <Eye size={16} /> {t('partner.detail.show_doc')}
                        </button>
                        <p className="text-xs text-slate-600 font-medium mt-2 bg-white/80 px-2 py-1 rounded">{t('partner.detail.verification_only')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('partner.detail.age')}</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.age} {t('partner.detail.years')}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('partner.detail.language')}</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.language}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('partner.table.bsn_date')}</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.bsnDate}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{t('partner.detail.departure')}</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.departureDate}</p>
                  </div>
                </div>

                {/* Media Links */}
                {selectedCandidate.hasVideo && (
                  <div>
                    <button className="w-full flex items-center justify-center gap-2 bg-orange-50 text-orange-700 py-3 rounded-xl hover:bg-orange-100 transition-colors border border-orange-200">
                      <Video size={18} /> <span className="font-bold text-sm">{t('partner.detail.play_video')}</span>
                    </button>
                  </div>
                )}

                <div>
                  <a 
                    href={selectedCandidate.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 py-3 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    <FileText size={18} /> <span className="font-bold text-sm">{t('partner.detail.view_resume')}</span>
                  </a>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-white space-y-3">
                <button 
                  onClick={generatePDFPack}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors font-bold text-sm"
                >
                  <FileText size={18} /> {t('partner.detail.generate_pdf_pack')}
                </button>
                <button 
                  onClick={() => handleApprove(selectedCandidate.id)}
                  disabled={selectedCandidate.status === 'active'}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {selectedCandidate.status === 'active' ? t('partner.detail.approved_for_join') : t('partner.detail.approve_for_join')}
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Job Modal */}
      <AddJobModal 
        isOpen={showAddJob} 
        onClose={() => setShowAddJob(false)}
        onSave={(newJob) => console.log('New job created:', newJob)}
      />

    </div>
  );
}

function SettingsView() {
  const navigate = useNavigate();
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Nastavení partnera</h2>
        <p className="text-slate-500 font-medium">Správa profilu agentury a uživatelského účtu.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Název agentury</label>
            <input type="text" readOnly value="Albert Heijn Zaandam" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mail pro notifikace</label>
            <input type="email" readOnly value="contact@ah-zaandam.nl" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900" />
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100">
           <button 
            onClick={() => {
              sessionStorage.clear();
              navigate('/');
            }}
            className="w-full py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-colors border border-rose-100"
          >
            Odhlásit se z portálu
          </button>
        </div>
      </div>
    </div>
  );
}

function UserAvatar({ url }) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
      <img src={url} alt="Ava" className="w-full h-full object-cover" />
    </div>
  );
}
