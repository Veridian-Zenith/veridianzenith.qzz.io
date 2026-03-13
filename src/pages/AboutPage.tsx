//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion } from 'framer-motion';
import { AnimatedCard } from '../components/Common';
import { Shield, Hammer, BookOpen } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 px-8 max-w-5xl mx-auto min-h-screen relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl sm:text-7xl font-bold text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(255,179,71,0.4)]">
          The Nordic Zenith
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl italic leading-relaxed">
          "Where ancient craftsmanship meets digital excellence."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        <AnimatedCard glowColor="amber" className="bg-black/60 backdrop-blur-xl border-white/10">
          <div className="flex items-start gap-6">
            <div className="hidden sm:flex p-4 bg-amber-500/10 rounded-2xl text-amber-500">
              <Hammer size={40} />
            </div>
            <div className="prose prose-invert lg:prose-xl max-w-none">
              <h2 className="text-3xl font-bold text-white mb-4">Our Digital Forge</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Veridian Zenith is more than a collective—it is a digital forge. We operate in the intersection
                of ancient aesthetics and cutting-edge performance. Our focus lies in building systems that
                are as resilient as they are beautiful.
              </p>
            </div>
          </div>
        </AnimatedCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedCard glowColor="red" className="bg-black/60 backdrop-blur-xl border-white/10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-red-500">
                <Shield size={28} />
                <h3 className="text-2xl font-bold text-white">The Philosophy</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Every line of code is intentional. Like runes carved into stone, our software is built for
                permanence, clarity, and uncompromising speed. We believe in the "Nordic Way"—minimalist,
                effective, and powerful.
              </p>
            </div>
          </AnimatedCard>

          <AnimatedCard glowColor="gold" className="bg-black/60 backdrop-blur-xl border-white/10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-gold-500">
                <BookOpen size={28} />
                <h3 className="text-2xl font-bold text-white">The License</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                We believe in the sanctity of open source. Veridian Zenith artifacts are released under
                the <a href="https://opensource.org/licenses/OSL-3.0" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline font-bold">Open Software License 3.0</a>,
                ensuring the code remains free and accessible to all who seek it.
              </p>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};
