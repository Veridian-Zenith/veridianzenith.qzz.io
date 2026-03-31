//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AtmosphereSelector } from './AtmosphereSelector';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [logoHoverTime, setLogoHoverTime] = useState(0);
  const [isLogoPulsing, setIsLogoPulsing] = useState(false);
  const navigate = useNavigate();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    let pulseTimeout: ReturnType<typeof setTimeout>;
    let resetTimeout: ReturnType<typeof setTimeout>;

    if (logoHoverTime > 0) {
      pulseTimeout = setTimeout(() => {
        setIsLogoPulsing(true);
      }, 3000);
    } else {
      resetTimeout = setTimeout(() => {
        setIsLogoPulsing(false);
      }, 0);
    }

    return () => {
      clearTimeout(pulseTimeout);
      clearTimeout(resetTimeout);
    };
  }, [logoHoverTime]);


  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.01 }}
        className="navbar-custom backdrop-blur-2xl rounded-full px-6 py-2 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:border-amber-500/40 transition-all group"
      >
        <Link
          to="/"
          className="flex items-center gap-2 logo-custom"
          onMouseEnter={() => setLogoHoverTime(100)}
          onMouseLeave={() => setLogoHoverTime(0)}
        >
          <motion.div className="relative overflow-hidden rounded-lg">
            <motion.img
              src="/assets/brand-image.png"
              alt="VZ Logo"
              className="w-10 h-10 object-contain filter"
              whileHover={{
                scale: 1.2,
                rotate: 360,
                filter: "brightness(1.3) drop-shadow(0 0 20px #FFB347)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              animate={isLogoPulsing ? {
                scale: [1, 1.3, 1],
                filter: ["brightness(1)", "brightness(2) drop-shadow(0 0 15px #FFB347)", "brightness(1)"],
              } : {}}
            />
          </motion.div>
          <span className="text-xl font-black bg-gradient-to-r from-amber-400 via-gold-500 to-amber-400 bg-clip-text text-amber-500 hidden lg:inline drop-shadow-[0_0_10px_rgba(255,179,71,0.3)] filter brightness-110 tracking-tight whitespace-nowrap">
            Veridian Zenith
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {[
            { name: t('nav.home'), path: '/' },
            { name: t('nav.about'), path: '/about' },
            { name: t('nav.projects'), path: '/projects' },
            { name: t('nav.aur'), path: '/aur' },
          ].map((item) => (


            <Link
              key={item.path}
              to={item.path}
              className="px-4 py-2 rounded-full text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all relative group/link"
            >
              {item.name}
              <motion.div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-amber-500 group-hover/link:w-1/2 transition-all" />
            </Link>
          ))}
          <AtmosphereSelector />
          <div className="relative group/lang">
            <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
              <Languages size={20} className="text-gray-400 group-hover/lang:text-white" />
            </button>
            <div className="absolute top-full right-0 pt-3 -mt-1 opacity-0 group-hover/lang:opacity-100 transition-opacity pointer-events-none group-hover/lang:pointer-events-auto">
              <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-xl p-2 w-32">
                <button onClick={() => changeLanguage('en')} className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300 hover:text-amber-500 transition-colors">English</button>
                <button onClick={() => changeLanguage('de')} className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300 hover:text-amber-500 transition-colors">German</button>
                <button onClick={() => changeLanguage('ko')} className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300 hover:text-amber-500 transition-colors">Korean</button>
                <button onClick={() => changeLanguage('ru')} className="w-full text-left px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300 hover:text-amber-500 transition-colors">Russian</button>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/contact'); setIsOpen(false); }}
            className="ml-2 bg-amber-600/10 hover:bg-amber-500 text-amber-500 hover:text-black font-black border border-amber-500/40 px-6 py-2 rounded-full transition-all cursor-pointer flex items-center gap-2"
          >
            {t('hero.summon')} <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-amber-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 items-center md:hidden"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">{t('nav.home')}</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">{t('nav.about')}</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">{t('nav.projects')}</Link>
            <Link to="/aur" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">{t('nav.aur')}</Link>

            <button
              onClick={() => { navigate('/contact'); setIsOpen(false); }}
              className="w-full bg-amber-600 py-4 rounded-full text-xl font-bold"
            >
              {t('nav.contact')}
            </button>
            <div className="flex gap-4 mt-4">
              <button onClick={() => changeLanguage('en')} className="px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300">EN</button>
              <button onClick={() => changeLanguage('de')} className="px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300">DE</button>
              <button onClick={() => changeLanguage('ko')} className="px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300">KO</button>
              <button onClick={() => changeLanguage('ru')} className="px-3 py-1.5 text-sm rounded-md hover:bg-white/5 text-gray-300">RU</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
