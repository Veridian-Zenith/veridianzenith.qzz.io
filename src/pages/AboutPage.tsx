//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion } from 'framer-motion';

export const AboutPage = () => {
  return (
    <div className="pt-32 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold mb-8 text-amber-500"
      >
        The Nordic Zenith
      </motion.h1>
      <div className="prose prose-invert lg:prose-xl">
        <p className="text-gray-300 leading-relaxed mb-6">
          Veridian Zenith is a digital forge where ancient aesthetics meet modern technology.
          We specialize in high-performance web applications, interactive experiences, and systems
          built with the precision of a master craftsman.
        </p>
        <p className="text-gray-300 leading-relaxed mb-6">
          Our philosophy is simple: Every line of code should be as intentional as a rune carved in stone.
          We prioritize speed, accessibility, and breathtaking visuals.
        </p>
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-500 italic">
          Veridian Zenith and its artifacts are typically licensed under the <a href="https://opensource.org/licenses/OSL-3.0" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline">Open Software License 3.0 (OSL-3.0)</a>.
        </div>
      </div>
    </div>
  );
};
