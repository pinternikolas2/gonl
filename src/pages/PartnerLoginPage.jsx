import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, ChevronRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function PartnerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200)); // Simulating API call
    
    sessionStorage.setItem('gonl_role', 'partner');
    sessionStorage.setItem('gonl_user', JSON.stringify({ email, name: 'Albert Heijn Zaandam' }));
    navigate('/partner');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 font-medium text-sm"
        >
          <ArrowLeft size={16} /> Zpět na úvod
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-slate-200">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Partner Login</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Přístup pro náborové agentury</p>
        </div>

        <div className="bg-white rounded-[28px] shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="hr@firma.nl"
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Heslo</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 rounded-2xl border border-slate-200 text-base font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-orange-600 font-semibold hover:underline">
                Zapomenuté heslo?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-base transition-all hover:bg-slate-800 disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" 
                />
              ) : (
                <>Přihlásit se <ChevronRight size={18}/></>
              )}
            </button>
          </form>

          <p className="text-xs text-center text-slate-400 mt-6 leading-relaxed">
            Nemáte vytvořený partnerský účet?<br/>
            <a href="mailto:partners@gonl.app" className="text-orange-600 font-semibold hover:underline">Kontaktujte náš obchodní tým →</a>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8">
          © 2026 GoNL Enterprise B.V.
        </p>
      </div>
    </div>
  );
}
