import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Building2 } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function TravelGuide({ 
  housingAddress = "Stationsplein 1, 1012 AB Amsterdam, Netherlands",
  workAddress = "Ankerweg 18, 1041 AT Amsterdam, Netherlands",
  rniOffice = "Basisweg 10, 1043 AP Amsterdam, Netherlands"
}) {
  const { t } = useTranslation();
  
  const openMaps = (address) => {
    const encoded = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encoded}`, '_blank');
  };

  const LocationCard = ({ title, address, icon: Icon, actionLabel, onAction, color }) => (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-slate-900 font-bold leading-tight">{address}</p>
      </div>

      <button 
        onClick={onAction}
        className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-slate-200"
      >
        <Navigation size={18} /> {actionLabel}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2 px-2">
        <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
        <h2 className="text-xl font-black text-slate-900 tracking-tight">{t('guide.travel.title')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <LocationCard 
            title={t('guide.travel.housing')}
            address={housingAddress}
            icon={MapPin}
            actionLabel={t('guide.travel.nav_here')}
            onAction={() => openMaps(housingAddress)}
            color="bg-orange-600"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <LocationCard 
            title={t('guide.travel.work')}
            address={workAddress}
            icon={Building2}
            actionLabel={t('guide.travel.nav_work')}
            onAction={() => openMaps(workAddress)}
            color="bg-slate-900"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <LocationCard 
            title={t('guide.travel.rni')}
            address={rniOffice}
            icon={Compass}
            actionLabel={t('guide.travel.nav_bsn')}
            onAction={() => openMaps(rniOffice)}
            color="bg-blue-600"
          />
        </motion.div>
      </div>
    </div>
  );
}
