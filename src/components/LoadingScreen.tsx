//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

type Props = {
  onLoadingComplete: () => void;
};

export const LoadingScreen = ({ onLoadingComplete }: Props) => {
  const [progress, setProgress] = useState(0);
  const [latency, setLatency] = useState<number | null>(null);
  const [status, setStatus] = useState("Synchronizing Runes...");
  const [diagMode, setDiagMode] = useState(0);

  /* ---------------------------------- */
  /* Latency Measurement                */
  /* ---------------------------------- */
  useEffect(() => {
    const start = performance.now();

    fetch(window.location.origin + "/assets/favicon.ico", { mode: "no-cors" })
      .then(() => setLatency(Math.round(performance.now() - start)))
      .catch(() => setLatency(Math.round(Math.random() * 50 + 20)));
  }, []);

  /* ---------------------------------- */
  /* Progress Simulation                */
  /* ---------------------------------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;

        const next = Math.min(prev + Math.random() * 12 + 3, 100);

        if (next > 20 && next <= 40) setStatus("Gathering Aether...");
        else if (next > 40 && next <= 70) setStatus("Forging Digital Realm...");
        else if (next > 70 && next <= 90) setStatus("Stabilizing Void...");
        else if (next > 90) setStatus("Aperture Opening...");

        return next;
      });
    }, 200);

    const handleLoad = () => setProgress(100);

    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  /* ---------------------------------- */
  /* Completion Trigger                 */
  /* ---------------------------------- */
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  const [diagValues, setDiagValues] = useState({ lux: 0, dbm: 0, uptime: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setDiagValues({
        lux: Math.floor(Math.random() * 1000),
        dbm: Math.floor(Math.random() * 90),
        uptime: Math.floor(performance.now() / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ---------------------------------- */
  /* Stable Decorative Data             */
  /* ---------------------------------- */
  const [diagnosticHex] = useState<string[]>(() =>
    Array.from({ length: 5 }).map(
      () =>
        `0x${Math.random()
          .toString(16)
          .substring(2, 10)
          .toUpperCase()} FETCH_RUNE_SUCCESS`
    )
  );


  const cycleDiagMode = () => {
    setDiagMode((prev) => (prev + 1) % 3);
  };

  const roundedProgress = Math.min(100, Math.round(progress));

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-primary-themeable flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--vz-glow-color)_0%,transparent_70%)] opacity-20" />

      {/* Logo Animation */}
      <div className="relative mb-12">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 flex items-center justify-center"
        >
          <img
            src="/assets/brand-image.png"
            alt="Loading Logo"
            className="w-full h-full object-contain drop-shadow-[0_0_20px_var(--vz-glow-color)]"
          />
        </motion.div>

        {/* Orbiting Dots */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute w-1.5 h-1.5 bg-primary-themeable rounded-full blur-[1px]"
              style={{
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                transformOrigin: "center center"
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress Text */}
      <div className="text-center">
        <div className="text-primary-themeable font-bold text-3xl mb-2 tracking-[0.2em]">
          {roundedProgress}%
        </div>
        <div className="text-secondary-themeable/60 text-[10px] uppercase tracking-[0.3em] h-4">
          {status}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-secondary-themeable rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-themeable via-themeable to-primary-themeable shadow-primary-themeable"
          initial={{ width: 0 }}
          animate={{ width: `${roundedProgress}%` }}
        />
      </div>

      {/* Diagnostics Panel */}
      <div
        onClick={cycleDiagMode}
        className="absolute bottom-10 right-10 text-right font-mono text-[9px] text-secondary-themeable/40 uppercase tracking-widest leading-relaxed cursor-pointer hover:text-primary-themeable/50 transition-colors select-none group"
      >
        <div className="flex items-center justify-end gap-2">
          <span>
            {diagMode === 0
              ? "Void Latency:"
              : diagMode === 1
                ? "Aether Flux:"
                : "Signal Noise:"}
          </span>
          <span
            className={
              latency && latency < 100
                ? "text-green-500/50"
                : "text-primary-themeable/50"
            }
          >
            {diagMode === 0
              ? latency
                ? `${latency}ms`
                : "Calculating..."
              : diagMode === 1
                ? `${diagValues.lux} lux`
                : `-${diagValues.dbm} dBm`}
          </span>
        </div>

        <div>Engine: React / Vite</div>
        <div>Uptime: {diagValues.uptime}s</div>


        <div className="flex items-center justify-end gap-2 mt-1">
          <div
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${diagMode === 0
                ? "bg-green-500/50"
                : diagMode === 1
                  ? "bg-primary-themeable/50"
                  : "bg-red-500/50"
              }`}
          />
          <span>
            {diagMode === 0
              ? "Zenith Connection Stable"
              : diagMode === 1
                ? "Flux Integrity Nominal"
                : "Void Interference Detected"}
          </span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[7px] text-primary-themeable/30 mt-1">
          Click to toggle diagnostics
        </div>
      </div>

      {/* Decorative Debug Feed */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="text-[8px] font-mono text-secondary-themeable/40 flex flex-col gap-1">
          {diagnosticHex.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
