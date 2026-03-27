import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Briefcase, TrendingUp, Filter, Search, 
  MoreVertical, CheckCircle, XCircle, Eye, 
  ShieldCheck, ArrowUpRight, BarChart3, Building2,
  Calendar, Check, UserPlus
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const mockPartners = [
  { id: 'P1', name: 'Albert Heijn Zaandam' },
  { id: 'P2', name: 'Philips Eindhoven' },
  { id: 'P3', name: 'DSV Logistics Rotterdam' },
];

const initialCandidates = [
  { 
    id: 'C1045', name: 'Jan Novák', status: 'ready', 
    location: 'Slovakia', partnerId: 'P1', 
    idVerified: false, ticketUploaded: true,
    photoUrl: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=100&h=100'
  },
  { 
    id: 'C1046', name: 'Petr Svoboda', status: 'onboarding', 
    location: 'Czech Republic', partnerId: null, 
    idVerified: false, ticketUploaded: false,
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100'
  },
  { 
    id: 'C1047', name: 'Martina Veselá', status: 'active', 
    location: 'Netherlands', partnerId: 'P1', 
    idVerified: true, ticketUploaded: true,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100'
  },
  {
    id: 'C1048', name: 'Karel Muller', status: 'ready',
    location: 'Czech Republic', partnerId: 'P2',
    idVerified: true, ticketUploaded: true,
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100',
    bsnAppointment: {
      qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BSN-C1048-XYZ',
      date: '2026-04-12',
      time: '14:30',
      address: 'Rijndatalaan 2, 2404 BG Alphen aan den Rijn'
    }
  }
];

const initialJobs = [
  { id: 'J1', title: 'Skladník - Order Picker', company: 'Albert Heijn', location: 'Zaandam', candidates: 12 },
  { id: 'J2', title: 'Operátor Výroby', company: 'Philips', location: 'Eindhoven', candidates: 8 },
  { id: 'J3', title: 'Řidič VZV', company: 'DSV Logistics', location: 'Rotterdam', candidates: 5 }
];

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [jobs, setJobs] = useState(initialJobs);
  const [activeTab, setActiveTab] = useState('crm'); // 'crm' or 'jobs'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Stats
  const stats = useMemo(() => ({
    totalCandidates: candidates.length,
    readyCount: candidates.filter(c => c.status === 'ready').length,
    activeCount: candidates.filter(c => c.status === 'active').length,
    profit: candidates.filter(c => c.status === 'active').length * 450 // Simplified
  }), [candidates]);

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (statusFilter === 'all' || c.status === statusFilter)
  );

  const handleVerifyId = (id) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, idVerified: true } : c));
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => ({ ...prev, idVerified: true }));
    }
  };

  const handleAssignPartner = (id, partnerId) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, partnerId } : c));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500/30">
      {/* Sidebar Placeholder / Layout */}
      <div className="flex flex-1">
        
        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 overflow-auto">
          
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-1">Admin Central <span className="text-orange-500 text-sm font-bold bg-orange-500/10 px-2 py-0.5 rounded ml-2 uppercase tracking-widest border border-orange-500/20">GoNL HQ</span></h1>
              <p className="text-slate-500 font-semibold tracking-wide flex items-center gap-2">
                <BarChart3 size={14} className="text-orange-500" /> System Monitoring & Candidate CRM
              </p>
            </div>
            <div className="flex items-center gap-3">
               <button className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-400 hover:text-white transition-colors shadow-xl">
                 <Calendar size={20} />
               </button>
               <div className="flex flex-col items-end mr-2">
                 <span className="text-xs font-bold text-slate-500 uppercase">Administrator</span>
                 <span className="text-sm font-black text-white">Nikolas M.</span>
               </div>
               <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-orange-950/20 active:scale-95 transition-transform cursor-pointer">
                 N
               </div>
            </div>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard icon={Users} label="Total Candidates" value={stats.totalCandidates} trend="+12%" />
            <StatCard icon={CheckCircle} label="Ready to Board" value={stats.readyCount} trend="+3" color="text-orange-500" />
            <StatCard icon={ArrowUpRight} label="Active in NL" value={stats.activeCount} trend="+1" color="text-blue-500" />
            <StatCard icon={TrendingUp} label="Monthly Profit" value={`€${stats.profit.toLocaleString()}`} trend="Estimate" color="text-emerald-500" />
          </div>

          {/* CRM / Jobs Toggle */}
          <div className="flex gap-2 p-1 bg-slate-900 border border-slate-800 rounded-2xl w-max">
            <button 
              onClick={() => setActiveTab('crm')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'crm' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Candidates CRM
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'jobs' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Work Locations
            </button>
          </div>

          {activeTab === 'crm' ? (
            <CRMTable 
              candidates={filteredCandidates} 
              onView={setSelectedCandidate}
              onAssign={handleAssignPartner}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          ) : (
            <JobsTable jobs={jobs} />
          )}

        </div>
      </div>

      {/* Candidate Detail Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <CandidateModal 
            candidate={selectedCandidate} 
            onClose={() => setSelectedCandidate(null)} 
            onVerify={handleVerifyId}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend, color = 'text-white' }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[24px] group hover:border-slate-700 transition-all shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={80} />
      </div>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-4 bg-slate-950 border border-slate-800 rounded-2xl ${color} shadow-inner`}>
          <Icon size={24} />
        </div>
        <span className="text-emerald-500 text-xs font-black tracking-tighter bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black text-white">{value}</h3>
    </div>
  );
}

function CRMTable({ candidates, onView, onAssign, searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl flex flex-col">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID or location..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all text-white placeholder:text-slate-600"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
          >
            <option value="all">All Statuses</option>
            <option value="onboarding">Onboarding</option>
            <option value="ready">Ready to Go</option>
            <option value="active">Active in NL</option>
          </select>
          <button className="p-2.5 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-auto border-b border-slate-800">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/30">
              <th className="py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Candidate</th>
              <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">Roadmap Status</th>
              <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">Partner Assign</th>
              <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">Verification</th>
              <th className="py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {candidates.map(c => (
              <tr key={c.id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="py-4 px-8">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={c.photoUrl} alt={c.name} className="w-12 h-12 rounded-2xl object-cover bg-slate-800 border border-slate-700 shadow-lg" />
                    </div>
                    <div>
                      <span className="block font-black text-white text-base group-hover:text-orange-500 transition-colors tracking-tight">{c.name}</span>
                      <span className="block text-xs text-slate-500 font-black tracking-widest uppercase mt-0.5">{c.id} · {c.location}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                   <StatusBadge status={c.status} />
                </td>
                <td className="py-4 px-6">
                  <select 
                    value={c.partnerId || ''}
                    onChange={(e) => onAssign(c.id, e.target.value)}
                    className="bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-black text-slate-400 focus:outline-none focus:border-orange-500/50 transition-all uppercase tracking-tighter w-48"
                  >
                    <option value="">Unassigned</option>
                    {mockPartners.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </td>
                <td className="py-4 px-6">
                   <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${c.idVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-600'}`} title="ID Card">
                         <ShieldCheck size={18} />
                      </div>
                      <div className={`p-1.5 rounded-lg ${c.ticketUploaded ? 'bg-blue-500/10 text-blue-500' : 'bg-slate-800 text-slate-600'}`} title="Ticket">
                         <Briefcase size={18} />
                      </div>
                   </div>
                </td>
                <td className="py-4 px-8 text-right">
                  <button 
                    onClick={() => onView(c)}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg border border-slate-700/50 inline-flex items-center gap-2"
                  >
                    <Eye size={14} /> Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-950/50 flex justify-between items-center px-8">
        <span className="text-xs font-bold text-slate-500 italic">Showing {candidates.length} candidate records</span>
        <div className="flex gap-2">
           <button className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-bold text-slate-500 hover:text-white cursor-not-allowed">Previous</button>
           <button className="px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-bold text-slate-500 hover:text-white cursor-not-allowed">Next</button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const configs = {
    onboarding: { label: 'In Onboarding', color: 'bg-slate-800 text-slate-400 border-slate-700' },
    ready: { label: 'Ready to Goal', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    active: { label: 'Active in NL', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }
  };
  const config = configs[status] || configs.onboarding;
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${config.color}`}>
      {config.label}
    </span>
  );
}

function JobsTable({ jobs }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
          <Building2 size={20} className="text-orange-500" /> Active Job Pools
        </h3>
        <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-2">
           <Plus size={18} /> New Posting
        </button>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-950/30 border-b border-slate-800">
              <th className="py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest">Position</th>
              <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest">Location</th>
              <th className="py-4 px-6 text-xs font-black text-slate-500 uppercase tracking-widest text-center">Active Talent</th>
              <th className="py-4 px-8 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Management</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {jobs.map(j => (
              <tr key={j.id} className="hover:bg-slate-800/20 transition-colors group">
                <td className="py-4 px-8">
                  <div>
                    <span className="block font-black text-white text-base">{j.title}</span>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{j.company}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-400 tracking-tight">{j.location}</td>
                <td className="py-4 px-6 text-center">
                   <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-950 font-black text-orange-500 border border-slate-800 text-sm shadow-inner">{j.candidates}</span>
                </td>
                <td className="py-4 px-8 text-right">
                   <div className="flex justify-end gap-2 pr-0 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-700/50"><MoreVertical size={16}/></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CandidateModal({ candidate, onClose, onVerify }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-slate-900 border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="p-8 border-b border-slate-800 bg-slate-950/20 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl">
               <img src={candidate.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white mb-1 group">{candidate.name} <span className="text-xs text-slate-500 font-bold ml-2">#{candidate.id}</span></h2>
              <div className="flex gap-4">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1"><MapPin size={10} className="text-orange-500"/> {candidate.location}</span>
                <StatusBadge status={candidate.status} />
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all active:scale-90 text-slate-400">
            <XCircle size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           
           {/* Document 1: ID Card */}
           <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={16} className="text-blue-500" /> Identity Document (Scan)
                </h3>
                {candidate.idVerified ? (
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest flex items-center gap-1">
                    <Check size={10} /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-widest">Pending Check</span>
                )}
              </div>
              <div className="relative aspect-[1.58/1] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 group shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1621252178972-e1d1377b5d19?auto=format&fit=crop&q=80&w=800" 
                  alt="ID" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent flex flex-col justify-end p-6">
                    <p className="text-xs text-slate-500 font-bold tracking-widest bg-slate-900/80 w-max px-2 py-1 rounded-lg backdrop-blur mb-2 uppercase">Official Dutch ID Spec</p>
                 </div>
              </div>
              {!candidate.idVerified && (
                <button 
                  onClick={() => onVerify(candidate.id)}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> Approve & Verify Document
                </button>
              )}
           </div>

           {/* Document 2: Ticket */}
           <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Briefcase size={16} className="text-blue-500" /> Arrival Ticket / Ticket
              </h3>
              {candidate.ticketUploaded ? (
                <div className="aspect-[1.58/1] bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center gap-4 group cursor-pointer hover:border-slate-700 transition-all shadow-2xl">
                   <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 shadow-inner group-hover:scale-110 transition-transform">
                      <FileText size={32} />
                   </div>
                   <div>
                     <p className="text-white font-black tracking-tight mb-1">Flight_Bratislava_AMS.pdf</p>
                     <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Uploaded 12.10.2023 at 14:45</p>
                   </div>
                   <button className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-black text-slate-300 hover:text-white transition-colors border border-slate-700">Open Full Detail</button>
                </div>
              ) : (
                <div className="aspect-[1.58/1] bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-600 font-bold uppercase tracking-widest text-xs gap-3">
                   <ArrowUpRight size={24} className="opacity-30" />
                   Missing Departure Doc
                </div>
              )}
           </div>

        </div>

        <div className="p-8 border-t border-slate-800 bg-slate-950/20 flex gap-4">
           <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
             <UserPlus size={18} /> Update CRM data
           </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-all">
              <BarChart3 size={18} /> View Analytics
            </button>
         </div>

         {/* BSN Appointment Section (New) */}
         <div className="p-8 border-t border-slate-800 space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Building2 size={16} className="text-orange-500" /> BSN Appointment Scheduling
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">QR Code Link / Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    defaultValue={candidate.bsnAppointment?.qrUrl}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:border-orange-500 outline-none" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Date</label>
                    <input 
                      type="date" 
                      defaultValue={candidate.bsnAppointment?.date}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:border-orange-500 outline-none" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Time</label>
                    <input 
                      type="time" 
                      defaultValue={candidate.bsnAppointment?.time}
                      className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:border-orange-500 outline-none" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Office Address (for Maps)</label>
                  <textarea 
                    rows={4}
                    placeholder="Ulica, Číslo, PSČ, Mesto"
                    defaultValue={candidate.bsnAppointment?.address || 'Rijndatalaan 2, 2404 BG Alphen aan den Rijn'}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:border-orange-500 outline-none resize-none"
                  />
                </div>
                <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95">
                  Confirm & Send to Candidate
                </button>
              </div>
            </div>
         </div>
       </motion.div>
    </div>
  );
}

function Plus({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}

function MapPin({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}
