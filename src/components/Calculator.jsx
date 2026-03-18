import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { calculateWeeklySalary } from '../lib/salaryCalculator';

export default function Calculator() {
  const [hours, setHours] = useState(40);
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);
  
  // Parametry pro rok 2026 (dle zadani: 14.50 eur/h fixne, vek >= 21)
  const hourlyRate = 14.50; 
  const age = 22;

  const salaryData = useMemo(() => {
    return calculateWeeklySalary({
      hourlyRate,
      hoursWorked: hours,
      age,
      housingCostWeekly: 135,
      insuranceCostWeekly: 38.50,
      zorgtoeslagWeekly: 32
    });
  }, [hours]);

  return (
    <div className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 p-6 lg:p-8 border border-slate-100">
      
      {/* Header Kalkulačky */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Můj výdělek</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-medium text-slate-400">Při sazbě</span>
            <span className="text-slate-900 font-bold">{hourlyRate.toFixed(2)} €/h</span>
          </div>
        </div>
      </div>

      {/* Slider hodin */}
      <div className="mb-8 relative">
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-4">
          <span>Pracovní doba</span>
          <span className="font-bold text-orange-600">{hours} h / týden</span>
        </label>
        
        <input 
          type="range" 
          min="20" 
          max="60" 
          step="1"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
          <span>20h</span>
          <span>40h</span>
          <span>60h</span>
        </div>
      </div>

      {/* Live Result Card */}
      <div className="bg-slate-50 rounded-2xl p-6 text-center mb-6">
        <p className="text-sm font-medium text-slate-500 mb-1">Čistý zisk za týden</p>
        <div className="text-5xl font-black text-orange-600 tracking-tight">
          €{salaryData.netto_total.toFixed(0)}
        </div>
        <div className="flex justify-center items-center gap-4 mt-3">
          <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            Účinná hodinovka: €{salaryData.effective_hourly_rate.toFixed(2)}/h
          </p>
          <p className="text-xs font-medium text-slate-400">
             ≈ €{salaryData.monthlyEstimated.toFixed(0)} měsíčně
          </p>
        </div>
      </div>

      {/* Expandable Breakdown */}
      <div className="mb-8">
        <button 
          onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
          className="flex items-center justify-between w-full text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
        >
          <span>Detailní rozpis srážek</span>
          {isBreakdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        <AnimatePresence>
          {isBreakdownOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Hrubá mzda (vč. přesčasů a 8% dov.)</span>
                  <span className="font-medium">€{salaryData.breakdown.grossWeekly.toFixed(2)}</span>
                </div>
                {salaryData.breakdown.deductions.housingET > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Nezdanitelné (ET Ubytování)</span>
                    <span className="font-medium text-emerald-600">-€{salaryData.breakdown.deductions.housingET.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Daň (19%)</span>
                  <span className="font-medium text-red-500">-€{salaryData.breakdown.taxAmount.toFixed(2)}</span>
                </div>
                {salaryData.breakdown.deductions.housingNetto > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Ubytování (Srážka z Netta)</span>
                    <span className="font-medium text-red-500">-€{salaryData.breakdown.deductions.housingNetto.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Zdr. Pojištění</span>
                  <span className="font-medium text-red-500">-€{salaryData.breakdown.deductions.insurance.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200">
                  <span>Příspěvek státu (Zorgtoeslag)</span>
                  <span className="font-medium text-emerald-600">+€{salaryData.breakdown.allowances.zorgtoeslag.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <motion.button 
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-orange-600 text-white rounded-xl py-4 font-bold text-lg shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.4)] transition-shadow"
      >
        Chci tuhle výplatu
      </motion.button>

    </div>
  );
}
