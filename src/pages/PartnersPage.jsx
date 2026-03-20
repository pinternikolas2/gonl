import React, { useEffect } from 'react';
import { CheckCircle, Shield, Truck, Globe, Award, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PartnersPage() {
  useEffect(() => {
    // SEO Meta Tags
    document.title = "GoNL | Recruitment CZ SK to NL - Partner with us";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Scale your Dutch recruitment with verified talent from Czech and Slovak Republics. Biometric ID check, real-time travel tracking, and language screening.");
    }
  }, []);

  const features = [
    {
      icon: <Shield className="text-orange-600" size={32} />,
      title: "ID & Compliance",
      desc: "Biometric ID verification before arrival. We ensure all candidates are legally cleared and documentation is 100% compliant."
    },
    {
      icon: <Truck className="text-orange-600" size={32} />,
      title: "Travel Tracking",
      desc: "Real-time arrival confirmations and GPS logistics. Know exactly when your candidate arrives at the office or accommodation."
    },
    {
      icon: <Globe className="text-orange-600" size={32} />,
      title: "Language Filtering",
      desc: "Candidates screened for English/Dutch proficiency levels using standardized testing. No surprises on the work floor."
    }
  ];

  const scoringMetrics = [
    { label: "Identity Check", value: "100%", detail: "Biometric & Doc verify", status: "Verified" },
    { label: "Travel Confirmation", value: "Yes/No", detail: "Real-time GPS status", status: "Active" },
    { label: "Experience Level", value: "Jr / Mid / Sr", detail: "Verified work history", status: "Screened" },
    { label: "Language Skills", value: "A1 - B2", detail: "Oral & Written Test", status: "Tested" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 text-center mb-24">
          <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-orange-600 text-sm font-bold mb-6">
            For Dutch Recruitment Agencies
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8">
            Smart Recruitment for <br/>
            <span className="text-orange-600">Dutch Agencies.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10">
            Verified CZ/SK Talent at Scale. Reduce no-shows and compliance risks with our automated digital pipeline.
          </p>
          <a 
            href="mailto:info@gonl.app"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Mail size={20} />
            Request Demo / Partner with us
          </a>
        </section>

        {/* Key Selling Points */}
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed italic">"{f.desc}"</p>
            </div>
          ))}
        </section>

        {/* Candidate Scoring Visual */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -mr-48 -mt-48" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-black mb-6 leading-tight">
                  Our Proprietary <br/>
                  <span className="text-orange-500">Candidate Scoring.</span>
                </h2>
                <p className="text-slate-400 text-lg font-medium mb-8">
                  We don't just send resumes. We provide a comprehensive data profile of every candidate before they even board the plane.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-orange-500 font-bold">
                    <CheckCircle size={20} />
                    <span>Quality over Quantity</span>
                  </div>
                  <div className="flex items-center gap-3 text-orange-500 font-bold">
                    <CheckCircle size={20} />
                    <span>Fraud-proof ID verification</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scoringMetrics.map((m, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-sm p-6 rounded-[24px]">
                    <div className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">{m.status}</div>
                    <div className="text-lg font-bold mb-1">{m.label}</div>
                    <div className="text-3xl font-black text-white mb-2">{m.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{m.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
