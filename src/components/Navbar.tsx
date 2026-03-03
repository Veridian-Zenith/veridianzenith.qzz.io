//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_0_20px_rgba(255,179,71,0.2)]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/brand-image.png" alt="VZ Logo" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-gold-500 bg-clip-text text-transparent hidden sm:inline">
            Veridian Zenith
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-amber-500 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-amber-500 transition-colors">About</Link>
          <Link to="/projects" className="text-gray-300 hover:text-amber-500 transition-colors">Projects</Link>
          <button
            onClick={() => { navigate('/contact'); setIsOpen(false); }}
            className="bg-amber-600/20 hover:bg-amber-600/40 text-amber-500 border border-amber-500/30 px-5 py-2 rounded-full transition-all cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-amber-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 right-0 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col gap-6 items-center md:hidden"
        >
          <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">About</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="text-2xl text-gray-300 hover:text-amber-500">Projects</Link>
          <button className="w-full bg-amber-600 py-4 rounded-full text-xl font-bold">
            Contact
          </button>
        </motion.div>
      )}
    </nav>
  );
};
