import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Scan, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  Globe2, 
  Building2,
  Mail,
  UserCheck2,
  FileSearch,
  Truck
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PartnersPage() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "GoNL - Digital Recruitment Partner for Dutch Agencies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Reliable logistics talent, verified by technology. GoNL is your digital recruitment partner for Dutch agencies, focusing on compliance and reliability.");
    }
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-slate-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] -mr-48 -mt-24 animate-pulse" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] -ml-24 -mb-12" />
          </div>

          <div className="max-w-6xl mx-auto px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              <Zap size={14} className="text-orange-400 fill-orange-400" /> B2B PARTNERSHIP
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-8"
            >
              Digital Recruitment <br/>
              <span className="text-orange-600">Partner for Dutch Agencies</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 font-medium max-w-3xl mx-auto mb-12"
            >
              "Reliable logistics talent, <span className="text-slate-900">verified by technology.</span>"
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="mailto:info@gonl.app?subject=Partnership%20Inquiry%20-%20%5BAgency%20Name%5D"
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 group"
              >
                Become a Partner <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="text-slate-400 font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                <Terminal size={16} /> Fast Onboarding
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHY GoNL? - Compliance & Reliability */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Why GoNL?</h2>
              <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:translate-y-[-4px] transition-all">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Unmatched Compliance</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Every candidate undergoes a rigorous <span className="font-bold text-slate-900">Biometric ID Check</span> and documentation verification before they even leave their home country. We handle the complexity of international screening so you don't have to.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">Passport Verify</span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">BSN Prep</span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">VOG Ready</span>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:translate-y-[-4px] transition-all">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                  <Activity size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Real-time Reliability</h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Our <span className="font-bold text-slate-900">Travel Tracking</span> system provides real-time GPS updates for candidate groups arriving from CZ/SK. Know exactly when your team arrives at the office or accommodation – zero no-shows, 100% transparency.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">Live GPS</span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">Late Alerts</span>
                  <span className="px-3 py-1 bg-slate-50 text-slate-600 text-[10px] font-black uppercase rounded-lg border border-slate-100">ETA Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE PROCESS - Split Responsibilities */}
        <section className="py-24 border-t border-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-none mb-8">
                  The <span className="text-orange-600">Digital</span> <br/>Process.
                </h2>
                <p className="text-xl text-slate-500 font-medium mb-12">
                  We bridge the gap between CZ/SK talent and Dutch workforce demands with a clear division of expertise.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-1">1</div>
                    <div>
                      <h4 className="font-black text-slate-900">GoNL Sourcing</h4>
                      <p className="text-sm text-slate-500">Multichannel digital recruitment across CZ & SK networks.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-black text-slate-900">Documentation & Verification</h4>
                      <p className="text-sm text-slate-500">Biometric ID check, language screening, and legal readiness.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-black text-xs shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-black text-orange-600">Agency Onboarding</h4>
                      <p className="text-sm text-slate-500">Housing assignment and contract finalization by the Partner Agency.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500" />
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Responsibility Matrix</div>
                    <CheckCircle2 className="text-orange-500" size={20} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Powered by GoNL</p>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Zap size={12} className="text-orange-400" /> Sourcing</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Scan size={12} className="text-orange-400" /> ID Check</div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300"><Truck size={12} className="text-orange-400" /> Logistics</div>
                      </div>
                    </div>
                    <div className="space-y-4 text-right">
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Agency Partner</p>
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-right">
                        <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-300">Housing <Building2 size={12} className="text-blue-400" /></div>
                        <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-300">Contract <ArrowRight size={12} className="text-blue-400" /></div>
                        <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-300">Payroll <Zap size={12} className="text-blue-400" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CANDIDATE QUALITY SCORE SECTION */}
        <section className="py-24 bg-slate-900 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                {/* Profile Card Mockup */}
                <motion.div 
                  initial={{ rotate: -2, y: 0 }}
                  whileInView={{ rotate: 1, y: -20 }}
                  className="bg-white rounded-[32px] p-6 text-slate-900 shadow-2xl border-4 border-orange-500/10 max-w-[380px] mx-auto md:ml-0 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                    </div>
                  </div>

                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 overflow-hidden grayscale">
                      <img src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=200&h=200" alt="Mock" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black">Lucas K.</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Warehouse Specialist</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Scan size={18} className="text-slate-400" />
                        <span className="text-sm font-bold">Biometric ID check</span>
                      </div>
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <FileSearch size={18} className="text-slate-400" />
                        <span className="text-sm font-bold">Background verified</span>
                      </div>
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Activity size={18} className="text-slate-400" />
                        <span className="text-sm font-bold">Language screening</span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-center">B2 - Fluent</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">GoNL Score</p>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter">9.8<span className="text-lg text-slate-300">/10</span></div>
                    </div>
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-black italic">NL</div>
                  </div>
                </motion.div>

                {/* Decorative floating elements */}
                <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl -z-10 animate-pulse" />
              </div>

              <div className="order-1 md:order-2 text-white">
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  The <span className="text-orange-500 italic">Candidate Quality Score.</span>
                </h2>
                <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed italic">
                  "Stop guessing. Start hiring with data. We provide full digital transparency on every candidate before they board the transport."
                </p>
                
                <ul className="space-y-6">
                  <li className="flex items-center gap-4">
                    <UserCheck2 size={24} className="text-orange-500" />
                    <span className="text-lg font-bold">Biometric ID Verified ✅</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Globe2 size={24} className="text-orange-500" />
                    <span className="text-lg font-bold">Digital CV Standardized ✅</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Truck size={24} className="text-orange-500" />
                    <span className="text-lg font-bold">Travel Logistics Tracked ✅</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-32 relative overflow-hidden bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none mb-8 tracking-tighter">
              Ready to <span className="text-orange-600">Scale</span> Your Recruitment?
            </h2>
            <p className="text-xl text-slate-500 font-medium mb-12 italic">
              "Join the network of professional Dutch agencies relying on GoNL's digital supply chain."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="mailto:info@gonl.app?subject=Partnership%20Inquiry%20-%20%5BAgency%20Name%5D"
                className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-[24px] font-black text-xl hover:bg-slate-800 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
              >
                <Mail size={24} /> Become a Partner
              </a>
            </div>
            <p className="mt-8 text-slate-400 font-bold text-xs uppercase tracking-widest">Expect a response within 24 hours.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
