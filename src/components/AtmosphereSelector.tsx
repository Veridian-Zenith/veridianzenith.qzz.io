import { useAtmosphere, atmospheres } from '../hooks/useAtmosphere';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud } from 'lucide-react';
import { useState } from 'react';

export function AtmosphereSelector() {
  const { atmosphere, switchAtmosphere } = useAtmosphere();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1 rounded border border-amber/30 hover:border-amber hover:bg-amber/10 transition-all text-sm relative z-50"
        title="Switch atmosphere"
      >
        <Cloud size={16} className="text-amber" />
        <span className="hidden sm:inline text-amber">Atmosphere</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-black/95 border border-amber/20 rounded shadow-lg z-50 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-2 space-y-1">
                {atmospheres.map((atm) => (
                  <button
                    key={atm.id}
                    onClick={() => {
                      switchAtmosphere(atm.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded text-sm transition-all
                      ${atmosphere === atm.id
                        ? 'bg-amber/20 text-amber border border-amber/50'
                        : 'text-gray-300 hover:bg-amber/10 hover:text-amber border border-transparent'
                      }
                    `}
                  >
                    <div className="font-medium">{atm.name}</div>
                    <div className="text-xs text-gray-500">{atm.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
