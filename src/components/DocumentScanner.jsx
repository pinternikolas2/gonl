import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Webcam from 'react-webcam';
import { Check, ChevronLeft, Scan, RefreshCw } from 'lucide-react';

export default function DocumentScanner({ onComplete, onBack }) {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsScanning(true);
    
    // Simulate OCR processing time
    setTimeout(() => {
      setIsScanning(false);
      onComplete({
        firstName: 'Jan',
        lastName: 'Novákov',
        birthDate: '15.08.1995',
        documentId: 'OP12345678',
        validUntil: '15.08.2035'
      });
    }, 2500);
  }, [webcamRef, onComplete]);

  const retake = () => {
    setImgSrc(null);
    setIsScanning(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 absolute inset-0 z-50">
      
      {/* Header */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center p-6 text-white">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="ml-4 font-semibold">Zpět</span>
      </div>

      {/* Main Viewfinder Area */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
        {!imgSrc ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover"
              videoConstraints={{ facingMode: "environment" }}
            />
            
            {/* Dark Overlay with Transparent Center Hole */}
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center z-10 pointer-events-none">
              <div className="w-[85%] aspect-[1.58/1] border-2 border-white/50 rounded-xl relative shadow-[0_0_0_9999px_rgba(15,23,42,0.6)] box-content">
                 {/* Corner guides */}
                 <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl -ml-0.5 -mt-0.5" />
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl -mr-0.5 -mt-0.5" />
                 <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl -ml-0.5 -mb-0.5" />
                 <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl -mr-0.5 -mb-0.5" />
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 font-medium text-sm text-center w-full">
                    Umísti přední stranu<br/>OP do rámečku
                 </div>
              </div>
            </div>
          </>
        ) : (
          <div className="relative w-full h-full">
             <img src={imgSrc} alt="Scanned Document" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-slate-900/80 z-10" />
             
             {/* Captured Image Preview in Frame */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-[1.58/1] z-20 overflow-hidden rounded-xl border border-white/20">
                <img src={imgSrc} alt="Preview" className="w-full h-full object-cover" />
                
                {/* Laser Scanning Animation */}
                {isScanning && (
                  <motion.div 
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-1 bg-orange-500 shadow-[0_0_15px_3px_rgba(234,88,12,0.6)] z-30"
                  />
                )}
             </div>

             {/* Scanning Status Text */}
             {isScanning && (
               <div className="absolute bottom-32 inset-x-0 text-center z-20 text-white flex flex-col items-center">
                 <Scan className="animate-pulse mb-3 text-orange-500" size={32} />
                 <p className="font-medium text-lg animate-pulse">Čtu údaje z dokladu...</p>
                 <p className="text-sm text-slate-400 mt-1">Držte telefon v klidu</p>
               </div>
             )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="h-32 bg-slate-900 z-20 relative flex items-center justify-center px-8 border-t border-white/10">
        {!imgSrc ? (
          <button 
            onClick={capture}
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform"
          >
            <div className="w-12 h-12 bg-white rounded-full" />
          </button>
        ) : !isScanning ? (
           <div className="w-full flex justify-between items-center text-white">
              <button onClick={retake} className="flex flex-col items-center gap-2 p-2 opacity-80 hover:opacity-100 transition-opacity">
                 <RefreshCw size={24} />
                 <span className="text-xs font-medium">Znovu</span>
              </button>
           </div>
        ) : null}
      </div>

    </div>
  );
}
