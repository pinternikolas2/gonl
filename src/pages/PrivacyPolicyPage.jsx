import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-3 rounded-2xl bg-orange-50 text-orange-600 mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Zásady ochrany osobních údajů</h1>
          <p className="text-slate-500 text-lg">Transparentnost a bezpečnost vašich dat u GoNL.</p>
        </motion.div>

        <div className="prose prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Eye className="text-orange-500" size={24} /> Jaké údaje sbíráme?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Při používání GoNL.app zpracováváme údaje, které nám dobrovolně poskytnete při registraci a nahrávání dokumentů. To zahrnuje:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Jméno, příjmení a kontaktní údaje (e-mail, telefon).</li>
              <li>Podklady pro životopis (pracovní zkušenosti, jazykové znalosti).</li>
              <li>Dokumenty pro ověření identity (ID) a organizaci cesty (letenky, jízdenky).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Lock className="text-orange-500" size={24} /> Bezpečnost a sdílení dat
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Vaše data jsou u nás v bezpečí. Jsou šifrována a sdílena pouze s partnery (pracovními agenturami), u kterých se ucházíte o práci. Nikdy neprodáváme vaše údaje třetím stranám pro marketingové účely.
            </p>
          </section>

          <footer className="pt-12 border-t border-slate-100 italic text-slate-400 text-sm">
            Poslední aktualizace: 30. března 2026. Pokud máte dotazy, pište na info@gonl.app.
          </footer>
        </div>
      </div>
    </div>
  );
}
