import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ShieldCheck, User } from 'lucide-react';
import DocumentScanner from './DocumentScanner';

// Dummy funkce pro simulaci ulozeni do Supabase
const verifyProfile = async (data) => {
  return new Promise((resolve) => setTimeout(resolve, 1500));
};

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(1); // 1: Phone, 2: Scanner, 3: Verification
  const [phone, setPhone] = useState('');
  const [scannedData, setScannedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length > 8) setStep(2);
  };

  const handleScanComplete = (data) => {
    setScannedData(data);
    setStep(3);
  };

  const handleFinalConfirm = async () => {
    setIsSubmitting(true);
    await verifyProfile(scannedData); // Simulace uložení
    setIsSubmitting(false);
    onComplete(); // Presun na Dashboard (Fáze 4)
  };

  return (
    <div className="fixed inset-0 z-50 bg-white sm:bg-slate-50 flex items-center justify-center overflow-hidden">
      
      <div className="w-full h-full sm:h-[800px] sm:w-[400px] sm:rounded-[32px] sm:shadow-2xl bg-white relative overflow-hidden flex flex-col">
        
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Apple ID-like Phone Input */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col p-8 pt-20"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-8">
                <User size={32} className="text-slate-900" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">
                Vaše číslo
              </h2>
              <p className="text-slate-500 mb-8 max-w-[280px]">
                Zadejte telefonní číslo pro přihlášení nebo registraci.
              </p>

              <form onSubmit={handlePhoneSubmit} className="flex-1 flex flex-col">
                <div className="relative mb-auto">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    +420
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="777 123 456"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-16 pr-4 text-xl font-medium focus:ring-2 focus:ring-orange-600 focus:bg-white transition-all outline-none"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={phone.length < 9}
                  className="w-full bg-slate-900 text-white pb-4 pt-4 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  Pokračovat <ChevronRight size={20} />
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: The Scanner */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-50 bg-slate-900"
            >
              <DocumentScanner 
                onBack={() => setStep(1)} 
                onComplete={handleScanComplete} 
              />
            </motion.div>
          )}

          {/* STEP 3: Verification Card */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col p-8 pt-16 bg-slate-50"
            >
              <div className="flex justify-center mb-6">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                   <ShieldCheck size={32} />
                 </div>
              </div>
              
              <h2 className="text-2xl font-bold text-center text-slate-900 mb-1">
                Ověřeno
              </h2>
              <p className="text-slate-500 text-center text-sm mb-8">
                Údaje jsme úspěšně načetli z dokladu.
              </p>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1 space-y-4">
                 <div>
                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jméno a příjmení</label>
                   <div className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">{scannedData.firstName} {scannedData.lastName}</div>
                 </div>
                 
                 <div>
                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Datum narození</label>
                   <div className="text-lg font-medium text-slate-900 border-b border-slate-100 pb-2">{scannedData.birthDate}</div>
                 </div>

                 <div>
                   <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Číslo dokladu</label>
                   <div className="text-lg font-medium text-slate-900 pb-2">{scannedData.documentId}</div>
                 </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={handleFinalConfirm}
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgb(234,88,12,0.3)] hover:shadow-[0_8px_40px_rgb(234,88,12,0.4)] transition-all active:scale-[0.98] flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    'Vytvořit profil'
                  )}
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
