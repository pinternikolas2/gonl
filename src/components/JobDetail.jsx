import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, ChevronLeft, Info } from 'lucide-react';
import { calculateWeeklySalary } from '../lib/salaryCalculator';

export default function JobDetail({ job, onBack, onApply, isApplied }) {
  const [hours, setHours] = useState(40);

  // Reaktivní výpočet mzdy pro konkrétní práci
  const salaryData = useMemo(() => {
    return calculateWeeklySalary({
      hourlyRate: job.hourly_brutto,
      hoursWorked: hours,
      age: 22, // Zjednodušení pro MVP
      housingCostWeekly: job.housing_cost_weekly,
      shiftAllowance: job.shift_allowance || 1.0,
      applyET: true
    });
  }, [job, hours]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="bg-white border text-left border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[700px] w-full md:w-[440px] sticky top-24"
    >
      {/* Header Info */}
      <div className="relative h-48 shrink-0">
        <img src={job.image_url} alt={job.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-6">
           <button onClick={onBack} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <ChevronLeft size={20} />
           </button>
           
           {job.shift_allowance > 1.0 && (
              <span className="bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md w-max mb-2">
                Příplatek {parseFloat(((job.shift_allowance - 1) * 100).toFixed(1))}%
              </span>
           )}
           <h2 className="text-2xl font-black text-white leading-tight">{job.title}</h2>
           <div className="flex gap-4 mt-2 text-white/80 text-sm font-medium">
             <span className="flex items-center gap-1"><Building2 size={14}/> {job.company_name}</span>
             <span className="flex items-center gap-1"><MapPin size={14}/> {job.location_city}</span>
           </div>
        </div>
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 overflow-auto p-6 flex flex-col gap-8">
        
        {/* The Interactive Calculator Area */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Namodeluj si výplatu
          </h3>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-bold text-slate-700">Kolik chceš odpracovat hodin?</label>
              <span className="font-black text-orange-600 text-lg">{hours} h</span>
            </div>
            
            <input 
              type="range" 
              min="20" max="60" step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30 mb-2"
            />
            <div className="flex justify-between text-xs text-slate-400 font-medium px-1">
              <span>Méně (20h)</span>
              <span>Přesčasy (60h)</span>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-sm font-medium text-slate-500 mb-1">Tvoje čistá mzda (týdně)</p>
              <div className="text-5xl font-black text-slate-900 tracking-tight mb-2">
                €{salaryData.netto_total.toFixed(0)}
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-sm font-bold border border-emerald-100 mb-4">
                Účinná hodinovka €{salaryData.effective_hourly_rate.toFixed(2)}/h
              </div>
              
              <div className="flex gap-2 items-start text-left bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <Info className="shrink-0 mt-0.5 text-blue-500" size={16} />
                <p className="text-xs text-blue-800 leading-relaxed font-medium">
                  Tato částka jíž zahrnuje uplatněný ET Regeling, příplatek za směny a máš <strong>stržené ubytování ({job.housing_cost_weekly}€) i pojištění</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Economics Breakdown */}
        <div>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Ekonomika tvého měsíce
          </h3>
          <div className="grid grid-cols-1 gap-3">
             <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-sm font-medium text-slate-600">Co vyděláš (Hrubé + Bonusy)</span>
                <span className="font-bold text-slate-900">€{(salaryData.breakdown.grossWeekly * 4.33).toFixed(0)}</span>
             </div>
             <div className="flex justify-between items-center bg-rose-50 p-4 rounded-xl border border-rose-100">
                <span className="text-sm font-medium text-rose-700">Co tě stojí život (Ubytování, Pojištění)</span>
                <span className="font-bold text-rose-700">-€{(salaryData.breakdown.deductions.total * 4.33).toFixed(0)}</span>
             </div>
             <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl shadow-md">
                <span className="text-sm font-medium text-white/80">Co ti zbude na účtu (Čistá ruka)</span>
                <span className="font-black text-white text-lg">€{(salaryData.netto_total * 4.33).toFixed(0)}</span>
             </div>
          </div>
        </div>

      </div>

      {/* Footer Action */}
      <div className="p-6 border-t border-slate-100 bg-white shrink-0">
        <button 
          onClick={onApply}
          disabled={isApplied}
          className="w-full bg-orange-600 text-white py-4 rounded-2xl text-lg font-bold shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.4)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none"
        >
          {isApplied ? 'Zpracováváme zájem 🎉' : 'Mám zájem o tuto výplatu'}
        </button>
      </div>
      
    </motion.div>
  );
}
