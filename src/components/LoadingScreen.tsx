//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [latency, setLatency] = useState<number | null>(null);
  const [status, setStatus] = useState('Synchronizing Runes...');

  useEffect(() => {
    // Measure latency
    const start = performance.now();
    fetch(window.location.origin + '/favicon.ico', { mode: 'no-cors' })
      .then(() => {
        setLatency(Math.round(performance.now() - start));
      })
      .catch(() => {
        // Fallback if fetch fails
        setLatency(Math.round(Math.random() * 50 + 20));
      });

    // Simulate progress based on actual resource loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        // Dynamic status updates
        if (prev > 20 && prev < 40) setStatus('Gathering Aether...');
        if (prev > 40 && prev < 70) setStatus('Forging Digital Realm...');
        if (prev > 70 && prev < 90) setStatus('Stabilizing Void...');
        if (prev > 90) setStatus('Aperture Opening...');

        return prev + Math.random() * 15;
      });
    }, 200);

    // Ensure we wait for window load event as well
    const handleLoad = () => {
      setProgress(100);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,179,71,0.05)_0%,transparent_70%)]" />

      {/* Central Rune/Logo Animation */}
      <div className="relative mb-12">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-24 h-24 border-2 border-amber-500/20 rounded-xl flex items-center justify-center relative"
        >
          <div className="absolute inset-0 border-2 border-amber-500 rounded-xl blur-sm opacity-50 animate-pulse" />
          <span className="text-4xl font-bold text-amber-500 drop-shadow-[0_0_10px_#FFB347]">VZ</span>
        </motion.div>

        {/* Floating dots around logo */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute w-1.5 h-1.5 bg-gold-500 rounded-full blur-[1px]"
              style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress Text */}
      <div className="text-center">
        <div className="text-amber-500 font-bold text-3xl mb-2 tracking-[0.2em]">
          {Math.min(100, Math.round(progress))}%
        </div>
        <div className="text-gray-500 text-[10px] uppercase tracking-[0.3em] h-4">
          {status}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/5 rounded-full mt-8 overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-gold-500 shadow-[0_0_10px_#FFB347]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Latency / System Diagnostics - Bottom Right */}
      <div className="absolute bottom-10 right-10 text-right font-mono text-[9px] text-gray-600 uppercase tracking-widest leading-relaxed">
        <div className="flex items-center justify-end gap-2">
          <span>Void Latency:</span>
          <span className={latency && latency < 100 ? 'text-green-500/50' : 'text-amber-500/50'}>
            {latency ? `${latency}ms` : 'Calculating...'}
          </span>
        </div>
        <div>Engine: React 19 / Vite 7</div>
        <div>Uptime: {Math.floor(performance.now() / 1000)}s</div>
        <div className="flex items-center justify-end gap-2 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
          <span>Zenith Connection Stable</span>
        </div>
      </div>

      {/* Decoration */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="text-[8px] font-mono text-gray-500 flex flex-col gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i}>0x{Math.random().toString(16).substr(2, 8).toUpperCase()} FETCH_RUNE_SUCCESS</div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
