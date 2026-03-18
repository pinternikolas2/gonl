import React, { useMemo } from 'react';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import { calculateWeeklySalary } from '../lib/salaryCalculator';

export default function JobCard({ job, onClick }) {
  // Výpočet odhadované týdenní mzdy (pro standardních 40h) při načtení karty
  const estimatedSalary = useMemo(() => {
    return calculateWeeklySalary({
      hourlyRate: job.hourly_brutto,
      hoursWorked: 40,
      age: 22, // default pro dospělého
      housingCostWeekly: job.housing_cost_weekly,
      shiftAllowance: job.shift_allowance || 1.0
    });
  }, [job]);

  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
    >
      {/* Job Image */}
      <div className="h-32 rounded-xl mb-4 overflow-hidden bg-slate-100 relative">
        <img src={job.image_url} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {job.shift_allowance > 1.0 && (
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-lg">
            +{Math.round((job.shift_allowance - 1)*100)}% Příplatek
          </div>
        )}
      </div>

      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">{job.title}</h3>
      </div>
      
      <div className="space-y-1 mb-4">
        <div className="flex items-center text-xs font-medium text-slate-500">
          <Building2 size={14} className="mr-1.5 opacity-70" /> {job.company_name}
        </div>
        <div className="flex items-center text-xs font-medium text-slate-500">
          <MapPin size={14} className="mr-1.5 opacity-70" /> {job.location_city}
        </div>
      </div>
      
      {/* Interactive Preview na kartě */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center group-hover:bg-orange-50/50 group-hover:border-orange-100 transition-colors">
         <div>
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Odhad za týden (40h)</p>
           <p className="text-lg font-black text-slate-900">€{estimatedSalary.netto_total.toFixed(0)}</p>
         </div>
         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
            <ArrowRight size={18} />
         </div>
      </div>

    </div>
  );
}
