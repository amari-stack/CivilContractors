import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Layers, HardHat, Compass } from 'lucide-react';

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    { label: 'Initializing Heavy Site Models...', icon: Layers },
    { label: 'Calibrating Brooksville Yard Telemetry...', icon: Compass },
    { label: 'Loading Cost Estimation Matrices...', icon: HardHat },
    { label: 'Dispatching Active Fleet Asset Maps...', icon: Truck },
  ];

  useEffect(() => {
    // Progress interval
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
          }, 400);
          return 100;
        }
        // Speed up near the end
        const increment = prev > 70 ? Math.random() * 15 + 5 : Math.random() * 8 + 4;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 25) {
      setActiveStep(0);
    } else if (progress < 55) {
      setActiveStep(1);
    } else if (progress < 80) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  }, [progress]);

  const CurrentIcon = steps[activeStep]?.icon || Layers;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

          {/* Premium Logo brand block */}
          <div className="flex flex-col items-center max-w-sm w-full px-6 text-center relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/10 mb-6"
            >
              <CurrentIcon className="w-8 h-8 text-white animate-pulse" />
            </motion.div>

            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-2xl font-bold tracking-tight text-white mb-2 font-sans"
            >
              LA Contractors
            </motion.h2>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xs tracking-widest text-orange-500 font-mono uppercase mb-8"
            >
              Brooksville Site Operations
            </motion.p>

            {/* Custom progress bar */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-4 border border-slate-800/80 p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full"
                style={{ width: `${progress}%` }}
                layoutId="loaderProgress"
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              />
            </div>

            {/* Loading text status */}
            <div className="h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeStep}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-slate-400 font-mono"
                >
                  {steps[activeStep]?.label}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Micro percentage indicator */}
            <span className="text-[10px] text-slate-500 font-mono mt-1">
              {Math.round(progress)}% loaded
            </span>
          </div>

          {/* Absolute bottom tagline */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-[9px] uppercase tracking-widest text-slate-600 font-mono">
              Heavy Site Solutions &bull; Established Brooksville FL
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
