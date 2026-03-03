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
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="bg-black min-h-screen text-gray-100 selection:bg-amber-500/30 font-rosemary">
        {!isLoading && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/brand" element={<BrandDisplayPage />} />
            </Routes>

            <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto px-6 py-2 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-[10px] uppercase tracking-[0.2em] text-gray-500 shadow-xl flex items-center gap-4">
              <Link to="/brand" className="hover:text-amber-500 transition-colors flex items-center gap-1.5 group">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full group-hover:animate-pulse"></span>
                Sigil
              </Link>
              <span className="w-[1px] h-3 bg-gray-800"></span>
              <span>© {new Date().getFullYear()} Veridian Zenith</span>
              <span className="w-[1px] h-3 bg-gray-800"></span>
              <a href="https://opensource.org/licenses/OSL-3.0" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">OSL-3.0</a>
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
