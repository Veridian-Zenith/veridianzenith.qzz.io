//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoHoverTime, setLogoHoverTime] = useState(0);
  const [isLogoPulsing, setIsLogoPulsing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer: number;
    if (logoHoverTime > 0) {
      timer = window.setInterval(() => {
        setLogoHoverTime(prev => {
          if (prev >= 3000) {
            setIsLogoPulsing(true);
            return 3000;
          }
          return prev + 100;
        });
      }, 100);
    } else {
      setIsLogoPulsing(false);
    }
    return () => clearInterval(timer);
  }, [logoHoverTime]);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        whileHover={{ scale: 1.01 }}
        className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-2 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:border-amber-500/40 transition-all group"
      >
        <Link
          to="/"
          className="flex items-center gap-2"
          onMouseEnter={() => setLogoHoverTime(100)}
          onMouseLeave={() => setLogoHoverTime(0)}
        >
          <motion.div className="relative overflow-hidden rounded-lg">
            <motion.img
              src="/assets/brand-image.png"
              alt="VZ Logo"
              className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(255,179,71,0.4)]"
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
          <span className="text-xl font-black bg-gradient-to-r from-amber-400 via-gold-500 to-amber-400 bg-clip-text text-transparent hidden sm:inline drop-shadow-[0_0_10px_rgba(255,179,71,0.3)] filter brightness-110 tracking-tight">
            Veridian Zenith
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {['Home', 'About', 'Projects'].map((item) => (
            <Link
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="px-4 py-2 rounded-full text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all relative group/link"
            >
              {item}
              <motion.div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-amber-500 group-hover/link:w-1/2 transition-all" />
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { navigate('/contact'); setIsOpen(false); }}
            className="ml-4 bg-amber-600/10 hover:bg-amber-500 text-amber-500 hover:text-black font-black border border-amber-500/40 px-6 py-2 rounded-full transition-all cursor-pointer flex items-center gap-2"
          >
            Summon <ChevronRight size={16} />
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
            <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">About</Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">Projects</Link>
            <button
              onClick={() => { navigate('/contact'); setIsOpen(false); }}
              className="w-full bg-amber-600 py-4 rounded-full text-xl font-bold"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
