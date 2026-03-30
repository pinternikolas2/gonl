import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' | 'check_inbox'
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      if (error) throw error;
      setStep('check_inbox');
    } catch (err) {
      console.error(err);
      setError('Chyba při odesílání e-mailu. Zkontrolujte připojení.');
    } finally {
      setLoading(false);
    }
  };

  // Profile creation is typically handled via a trigger in DB or in a landing component 
  // but we can also use a useEffect on the Dashboard to ensure it exists.
  // For simplicity here, we assume Supabase triggers or a separate confirm step.

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium animate-shake">
            {error}
          </div>
        )}

        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8">
          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.div
                key="email-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-2xl font-black text-slate-900 mb-1">Přihlášení</h2>
                <p className="text-slate-500 text-sm mb-8">Zadejte svůj e-mail, pošleme vám odkaz pro vstup.</p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">E-mailová adresa</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="vas@email.cz"
                        className="w-full px-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email.includes('@')}
                    className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-base shadow-[0_8px_24px_rgba(234,88,12,0.28)] hover:bg-orange-500 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>Poslat odkaz <ChevronRight size={18}/></>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="check-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">E-mail odeslán</h2>
                <p className="text-slate-500 text-sm mb-8">
                  Odeslali jsme přihlašovací odkaz na <strong>{email}</strong>. Klikněte na něj a budete přihlášeni.
                </p>
                
                <button 
                  onClick={() => setStep('email')}
                  className="text-orange-600 font-bold text-sm hover:underline"
                >
                  Zkusit jiný e-mail
                </button>
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
