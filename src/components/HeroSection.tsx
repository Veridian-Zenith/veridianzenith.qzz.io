//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion } from 'framer-motion';
import { InteractiveButton } from './Common';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../hooks/useIsMobile';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!isMobile && [...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-amber-500 rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, '-20%', '100%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-6xl sm:text-8xl font-black mb-6 bg-gradient-to-b from-amber-400 via-red-500 to-gold-500 bg-clip-text text-transparent filter brightness-110 tracking-tighter"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl sm:text-2xl text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 italic mb-10 text-sm sm:text-base"
        >
          {t('hero.void')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <InteractiveButton onClick={() => navigate('/projects')}>
            {t('hero.explore')}
          </InteractiveButton>
          <InteractiveButton variant="red" onClick={() => navigate('/contact')}>
            <span className="text-white">{t('hero.summon')}</span> <span className="text-red-500 font-extrabold ml-1 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8) transition-all">{t('hero.architect')}</span>
          </InteractiveButton>
        </motion.div>
      </div>
    </section>
  );
};

