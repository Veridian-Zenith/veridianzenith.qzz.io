//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion } from 'framer-motion';

export const BrandDisplayPage = () => {
  return (
    <div className="pt-32 pb-24 px-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative group"
      >
        {/* Decorative Glow Background */}
        <div className="absolute -inset-10 bg-gradient-to-r from-amber-500/20 via-red-500/20 to-gold-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000"></div>
        
        {/* Main Logo Image */}
        <motion.img 
          src="/assets/brand-image.png" 
          alt="Veridian Zenith Core Logo" 
          className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain drop-shadow-[0_0_30px_rgba(255,179,71,0.3)] hover:drop-shadow-[0_0_50px_rgba(255,179,71,0.5)] transition-all duration-500"
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-amber-500 mb-4 tracking-wider">
          The Central Sigil
        </h1>
        <p className="text-gray-500 uppercase tracking-[0.4em] text-xs sm:text-sm">
          Core Branding & Digital Identity
        </p>
      </motion.div>
    </div>
  );
};
