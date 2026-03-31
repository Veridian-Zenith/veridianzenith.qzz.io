//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion } from 'framer-motion';
import { AnimatedCard } from '../components/Common';
import { Package, Terminal, Shield, Download, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AurPage = () => {
  const { t } = useTranslation();

  const packages = [
    {
      id: 'meshiji',
      icon: <Package className="text-amber-500" size={32} />,
      title: 'meshiji',
      description: t('projects.meshiji.description'),
      url: 'https://aur.archlinux.org/packages/meshiji'
    },
    {
      id: 'voix',
      icon: <Download className="text-red-500" size={32} />,
      title: 'voix',
      description: t('projects.voix.description'),
      url: 'https://aur.archlinux.org/packages/voix'
    },
    {
      id: 'peguni_draem-la',
      icon: <Shield className="text-gold-500" size={32} />,
      title: 'peguni_draem-la',
      description: t('projects.peguni.description'),
      url: 'https://aur.archlinux.org/packages/peguni_draem-la'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl sm:text-7xl font-black mb-6 bg-gradient-to-r from-amber-400 via-red-500 to-gold-500 bg-clip-text text-transparent filter brightness-110 tracking-tight">
          {t('aur.title')}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {t('aur.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {packages.map((pkg, i) => (
          <AnimatedCard key={pkg.id} delay={i * 0.1}>
            <div className="flex flex-col h-full">
              <div className="mb-6">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-500 transition-colors">
                {pkg.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow">
                {pkg.description}
              </p>

              <a
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors group/link mt-auto"
              >
                {t('projects.inspect')} <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </AnimatedCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sm:p-12">
          <div className="flex items-center gap-4 mb-8">
            <Terminal className="text-amber-500" size={24} />
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
              {t('aur.install.title')}
            </h2>
          </div>

          {/* Installing paru section */}
          <div className="mb-10 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-sm font-bold text-amber-500 uppercase tracking-[0.2em] mb-4">First: Install paru (AUR Helper)</h3>
            <div className="bg-black/40 rounded-xl p-5 font-mono text-xs sm:text-sm text-gray-300 space-y-2 border border-white/5">
              <div className="flex gap-3"><span className="text-amber-500 select-none">$</span><span>sudo pacman -S --needed base-devel</span></div>
              <div className="flex gap-3"><span className="text-amber-500 select-none">$</span><span>git clone https://aur.archlinux.org/paru.git</span></div>
              <div className="flex gap-3"><span className="text-amber-500 select-none">$</span><span>cd paru</span></div>
              <div className="flex gap-3"><span className="text-amber-500 select-none">$</span><span>makepkg -si</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/60 rounded-2xl p-6 font-mono text-sm border border-white/5 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-gray-500 mb-2"># Install with paru (Recommended)</div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-500 select-none">$</span>
                  <span className="text-gray-300">paru -S meshiji voix peguni_draem-la</span>
                </div>
              </div>
            </div>
            <div className="bg-black/60 rounded-2xl p-6 font-mono text-sm border border-white/5 relative group overflow-hidden opacity-70 hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-gray-500 mb-2"># Alternative: Install with yay</div>
                <div className="flex items-center gap-3">
                  <span className="text-red-500 select-none">$</span>
                  <span className="text-gray-300">yay -S meshiji voix peguni_draem-la</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t('aur.maintainer')}: Veridian Zenith
            </div>
            <div className="hidden sm:block">
              Architecture: x86_64
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
