import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileCheck, Plane, Search, Download, X, Eye, CheckCircle2, FileText, Video, Building2, Plus } from 'lucide-react';
import AddJobModal from './AddJobModal';

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
  }
];

export default function PartnerDashboard() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isPhotoBlurred, setIsPhotoBlurred] = useState(true);
  const [showAddJob, setShowAddJob] = useState(false);

  // Stats
  const readyCount = candidates.filter(c => c.status === 'ready').length;
  const waitingBsnCount = candidates.filter(c => c.status === 'waiting_bsn').length;
  const activeCount = candidates.filter(c => c.status === 'active').length;

  const handleApprove = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: 'active', departureDate: 'Dnes' } : c));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, status: 'active', departureDate: 'Today' }));
    }
    alert('Candidate approved for start and notified.');
  };

  const handleExport = () => {
    alert('Exporting candidate list to a sleek PDF with GoNL logo...');
  };

  const generatePDFPack = () => {
    alert(`Generating "PDF Pack" (Profile, ID, BSN) for ${selectedCandidate.name}.`);
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
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.jobTarget.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Navbar / Header pro Partnery */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
            <Building2 className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Partner Dashboard</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Albert Heijn Zaandam</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Download size={16} /> Export (CSV/PDF)
          </button>
          <button 
            onClick={() => setShowAddJob(true)}
            className="flex items-center gap-2 text-sm font-bold text-white bg-orange-600 hover:bg-orange-500 px-4 py-2 rounded-lg transition-colors shadow-sm shadow-orange-200"
          >
            <Plus size={16} /> Add Job
          </button>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" alt="Agent" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-[1400px] mx-auto w-full">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
               <Users size={24} />
             </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Candidates Available (Ready-to-Go)</p>
                <h3 className="text-3xl font-black text-slate-900">{readyCount}</h3>
              </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
               <FileCheck size={24} />
             </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Waiting for BSN</p>
                <h3 className="text-3xl font-black text-slate-900">{waitingBsnCount}</h3>
              </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
               <Plane size={24} />
             </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Active in NL</p>
                <h3 className="text-3xl font-black text-slate-900">{activeCount}</h3>
              </div>
          </div>
        </div>

        {/* Pipeline Table Section */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[600px]">
          
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Candidate Pipeline</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search candidate..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                <tr>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Position</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Age / Language</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">BSN Date</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6 flex items-center gap-3">
                         <img src={c.photoUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover bg-slate-200" />
                         <div>
                           <span className="block font-bold text-slate-900">{c.name}</span>
                           <span className="block text-xs text-slate-500 font-medium">ID: {c.id}</span>
                         </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-slate-700">{c.jobTarget}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{c.age} years / <span className="font-semibold text-slate-900">{c.language}</span></td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">{c.bsnDate}</td>
                      <td className="py-4 px-6">{getStatusPill(c.status)}</td>
                      <td className="py-4 px-6 text-right">
                        <button 
                          onClick={() => { setSelectedCandidate(c); setIsPhotoBlurred(true); }}
                          className="text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm mr-2"
                        >
                          Detail
                        </button>
                        <button 
                          onClick={() => handleApprove(c.id)}
                          disabled={c.status === 'active'}
                          className="text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-50"
                        >
                          {c.status === 'active' ? 'Approved' : 'Approve'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            {filteredCandidates.length === 0 && (
              <div className="p-12 text-center text-slate-500">
                No candidates found.
              </div>
            )}
          </div>
          
        </div>
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
              className="fixed top-0 right-0 bottom-0 w-[500px] bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200"
            >
              {/* Drawer Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <UserAvatar url={selectedCandidate.photoUrl} />
                  {selectedCandidate.name}
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
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Record Status</p>
                    {getStatusPill(selectedCandidate.status)}
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="flex-1 text-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Position</p>
                    <p className="text-sm font-bold text-slate-900">{selectedCandidate.jobTarget}</p>
                  </div>
                </div>

                {/* Secure Documents */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" /> Verified Documents
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
                          <Eye size={16} /> Show Document
                        </button>
                        <p className="text-xs text-slate-600 font-medium mt-2 bg-white/80 px-2 py-1 rounded">For verification purposes only</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Age</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.age} years</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Language</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.language}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">BSN Date</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.bsnDate}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Departure</p>
                    <p className="font-bold text-slate-900">{selectedCandidate.departureDate}</p>
                  </div>
                </div>

                {/* Media Links */}
                {selectedCandidate.hasVideo && (
                  <div>
                    <button className="w-full flex items-center justify-center gap-2 bg-orange-50 text-orange-700 py-3 rounded-xl hover:bg-orange-100 transition-colors border border-orange-200">
                      <Video size={18} /> <span className="font-bold text-sm">Play Video-CV</span>
                    </button>
                  </div>
                )}

              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-white space-y-3">
                <button 
                  onClick={generatePDFPack}
                  className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl border border-slate-200 hover:bg-slate-200 transition-colors font-bold text-sm"
                >
                  <FileText size={18} /> Generate PDF Pack
                </button>
                <button 
                  onClick={() => handleApprove(selectedCandidate.id)}
                  disabled={selectedCandidate.status === 'active'}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  {selectedCandidate.status === 'active' ? 'Approved for Join' : 'Approve for Join'}
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

function UserAvatar({ url }) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
      <img src={url} alt="Ava" className="w-full h-full object-cover" />
    </div>
  );
}
