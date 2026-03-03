//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { BrandDisplayPage } from './pages/BrandDisplayPage';
import { LoadingScreen } from './components/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './components/Common';

import { BackgroundEffect } from './components/BackgroundEffect';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [glitch, setGlitch] = useState(false);

  const triggerGlitch = () => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 500);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={cn(
        "min-h-screen bg-[#000000] text-gray-100 selection:bg-amber-500/30 font-rosemary transition-all duration-75 relative overflow-x-hidden",
        glitch && "animate-glitch-intense"
      )}>
        {/* BackgroundEffect is placed here, z-index will be managed inside it */}
        <BackgroundEffect />

        {!isLoading && (
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/brand" element={<BrandDisplayPage />} />
            </Routes>

            <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto px-6 py-2 bg-black/60 backdrop-blur-md border border-white/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-gray-500 shadow-xl flex items-center gap-4">
              <Link to="/brand" className="text-amber-500/80 hover:text-amber-500 transition-colors font-bold group">
                Sigil
              </Link>
              <span className="w-[1px] h-3 bg-white/10"></span>
              <button
                onClick={triggerGlitch}
                className="text-red-500 font-bold hover:scale-110 transition-transform cursor-pointer relative overflow-hidden px-2 group"
              >
                <span className="relative z-10">© {new Date().getFullYear()} Veridian Zenith</span>
                <AnimatePresence>
                  {glitch && (
                    <motion.div
                      key="glitch-overlay"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-500/40 blur-md mix-blend-screen pointer-events-none"
                    />
                  )}
                </AnimatePresence>
                <motion.div
                  className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors duration-300"
                />
              </button>
              <span className="w-[1px] h-3 bg-white/10"></span>
              <a href="https://opensource.org/licenses/OSL-3.0" target="_blank" rel="noopener noreferrer" className="text-amber-500/80 hover:text-amber-500 transition-colors font-bold">
                OSL-3.0
              </a>
            </footer>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

