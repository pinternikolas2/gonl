import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Building2, MapPin, DollarSign, Home, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AddJobModal({ isOpen, onClose, onSave }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    company_name: '',
    location_city: '',
    hourly_brutto: '',
    housing_cost_weekly: 135,
    insurance_cost_weekly: 38.50,
    shift_allowance: 1.0,
    description: '',
  });

  const validate = () => {
    const newErr = {};
    if (!form.title.trim()) newErr.title = 'Enter position title';
    if (!form.company_name.trim()) newErr.company_name = 'Enter company name';
    if (!form.location_city.trim()) newErr.location_city = 'Enter city';
    if (!form.hourly_brutto || isNaN(form.hourly_brutto) || form.hourly_brutto <= 0)
      newErr.hourly_brutto = 'Enter a valid hourly wage';
    return newErr;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulace uložení do Supabase (v produkci: supabase.from('jobs').insert(form))
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSaved(true);
    
    onSave?.({ ...form, id: Date.now().toString() });
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const Field = ({ label, name, type = 'text', placeholder, step }) => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        step={step}
        value={form[name]}
        placeholder={placeholder}
        onChange={(e) => handleChange(name, type === 'number' ? parseFloat(e.target.value) : e.target.value)}
        className={`w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium border transition-all outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white ${errors[name] ? 'border-rose-400 bg-rose-50' : 'border-slate-200'}`}
      />
      {errors[name] && (
        <p className="text-xs text-rose-600 font-medium mt-1 flex items-center gap-1">
          <AlertCircle size={12} /> {errors[name]}
        </p>
      )}
    </div>
  );  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-[580px] max-h-full bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-slate-200 relative z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <Plus className="text-white" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">Add Job Posting</h2>
                  <p className="text-xs text-slate-500 font-medium">Instantly visible to all matching candidates</p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Position Title" name="title" placeholder="Warehouse - Order Picker" />
                <Field label="Company" name="company_name" placeholder="Albert Heijn" />
              </div>
              
              <Field label="City / Location" name="location_city" placeholder="Zaandam, Noord-Holland" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Hourly Wage (€)" name="hourly_brutto" type="number" step="0.01" placeholder="14.50" />
                <Field label="Housing / week (€)" name="housing_cost_weekly" type="number" step="1" placeholder="135" />
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                    Shift Allowance
                  </label>
                  <select
                    value={form.shift_allowance}
                    onChange={(e) => handleChange('shift_allowance', parseFloat(e.target.value))}
                    className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-base font-bold focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                  >
                    <option value={1.0}>None (1.0×)</option>
                    <option value={1.10}>+10% (1.10×)</option>
                    <option value={1.15}>+15% (1.15×)</option>
                    <option value={1.25}>+25% (1.25×)</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  Job Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe role requirements, shifts, and benefits..."
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-base font-bold focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
            </form>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-4">
              <button 
                type="button" 
                onClick={onClose} 
                className="flex-1 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || saved}
                className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-40 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {saved ? (
                  <><CheckCircle2 size={18} className="text-emerald-400" /> Saved!</>
                ) : isSubmitting ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <><Plus size={18} /> Add Job</>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
