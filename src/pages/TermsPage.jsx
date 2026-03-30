import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-6">
            <Gavel size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Obchodní podmínky</h1>
          <p className="text-slate-500 text-lg">Pravidla používání platformy GoNL.</p>
        </motion.div>

        <div className="prose prose-slate max-w-none space-y-12 text-slate-600">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Poskytované služby</h2>
            <p>
              GoNL.app funguje jako digitální platforma pro zprostředkování informací o pracovních pozicích v Nizozemsku a usnadnění procesu onboardingu. Nejsme přímým zaměstnavatelem, ale technickým zprostředkovatelem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Povinnosti uživatele</h2>
            <p>
              Uživatel se zavazuje nahrávat pouze pravdivé údaje a originální dokumenty v platném formátu. Nahrávání nepravdivých údajů může vést k okamžitému zablokování účtu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Poplatky</h2>
            <p className="flex items-center gap-2 text-emerald-600 font-bold">
              <CheckCircle2 size={18} /> Používání GoNL.app je pro kandidáty zcela zdarma.
            </p>
          </section>

          <footer className="pt-12 border-t border-slate-100 italic text-slate-400 text-sm text-center">
            GoNL Enterprise B.V. · Amsterdam, Netherlands.
          </footer>
        </div>
      </div>
    </div>
  );
}
