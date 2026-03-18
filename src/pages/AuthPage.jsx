import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ChevronRight } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulating OTP send
    setStep('otp');
    setLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulating verification
    
    // Silent Registration Logic
    sessionStorage.setItem('gonl_role', 'candidate');
    
    const userProfile = {
      name: 'Uživatel ' + phone.slice(-3),
      phone,
      is_id_verified: false,
      is_ticket_uploaded: false,
      assigned_job: null,
    };
    
    // Check if we have a pending job from landing
    const pendingJob = sessionStorage.getItem('gonl_applied_job');
    if (pendingJob) {
      userProfile.assigned_job = JSON.parse(pendingJob);
      sessionStorage.removeItem('gonl_applied_job');
    }

    sessionStorage.setItem('gonl_user_profile', JSON.stringify(userProfile));
    sessionStorage.setItem('gonl_user', JSON.stringify({ phone, name: userProfile.name }));
    
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo or Brand */}
        <div className="text-center mb-10">
          <button onClick={() => navigate('/')} className="text-3xl font-black tracking-tighter text-orange-600">
            GoNL.
          </button>
          <p className="text-sm text-slate-500 mt-2 font-medium">Tvá cesta do Nizozemska začíná zde</p>
        </div>

        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8">
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div
                key="phone-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-black text-slate-900 mb-1">Přihlášení</h2>
                <p className="text-slate-500 text-sm mb-8">Zadejte své číslo, pošleme vám kód.</p>

                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Telefonní číslo</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">+420</span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="777 123 456"
                        className="w-full pl-16 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || phone.length < 9}
                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-base shadow-[0_8px_24px_rgba(234,88,12,0.28)] hover:bg-orange-500 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>Odeslat kód <ChevronRight size={18}/></>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="otp-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button 
                  onClick={() => setStep('phone')}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-600 mb-6 font-medium text-xs uppercase tracking-widest"
                >
                  <ArrowLeft size={14} /> Změnit číslo
                </button>
                
                <h2 className="text-2xl font-black text-slate-900 mb-1">Ověření</h2>
                <p className="text-slate-500 text-sm mb-8">Zadejte kód, který jsme vám poslali na +420 {phone}.</p>

                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">SMS Kód</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="· · · · · ·"
                      className="w-full px-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                      required
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length < 4}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base transition-all hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>Potvrdit a vstoupit <ChevronRight size={18}/></>
                    )}
                  </button>
                  
                  <button type="button" className="w-full text-xs text-slate-400 font-medium py-2 hover:text-orange-600 transition-colors">
                    Nepřišel kód? Poslat znovu
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 font-medium">
          Pokračováním souhlasíte se zpracováním osobních údajů.
        </p>
      </div>
    </div>
  );
}
