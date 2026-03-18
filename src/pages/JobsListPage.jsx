import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';

const allJobs = [
  {
    id: '1', title: 'Skladník – Order Picker', company_name: 'Albert Heijn',
    location_city: 'Zaandam', hourly_brutto: 14.50, housing_cost_weekly: 135, shift_allowance: 1.0,
    image_url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=400&h=250',
  },
  {
    id: '2', title: 'Operátor Výroby', company_name: 'Philips',
    location_city: 'Eindhoven', hourly_brutto: 15.20, housing_cost_weekly: 125, shift_allowance: 1.15,
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400&h=250',
  },
  {
    id: '3', title: 'Řidič VZV', company_name: 'DSV Logistics',
    location_city: 'Rotterdam', hourly_brutto: 16.00, housing_cost_weekly: 140, shift_allowance: 1.25,
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400&h=250',
  },
];

import Header from '../components/Header';

export default function JobsListPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <Header />
      <div className="max-w-2xl mx-auto px-6 pt-28">
        <div className="py-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pracovní nabídky</p>
          <h1 className="text-3xl font-black text-slate-900">Dostupné pozice</h1>
          <p className="text-slate-500 mt-2 font-medium text-sm">{allJobs.length} aktivní nabídky v Holandsku</p>
        </div>

        <div className="space-y-4">
          {allJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <JobCard job={job} onClick={(j) => navigate(`/jobs/${j.id}`)} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
