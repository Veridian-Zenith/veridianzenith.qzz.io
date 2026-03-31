import { useEffect, useState, useCallback } from 'react';

export type Atmosphere = 'default' | 'midnight-void' | 'blood-moon' | 'golden-zenith';

interface AtmosphereInfo {
  id: Atmosphere;
  name: string;
  description: string;
  color: string;
}

export const atmospheres: AtmosphereInfo[] = [
  { id: 'default', name: 'Veridian Origin', description: 'The amber root of the Zenith', color: '#FFB347' },
  { id: 'midnight-void', name: 'Obsidian Void', description: 'Deep indigo and spectral violet', color: '#818cf8' },
  { id: 'blood-moon', name: 'Crimson Eclipse', description: 'Fierce reds and lunar shadows', color: '#ef4444' },
  { id: 'golden-zenith', name: 'Golden Zenith', description: 'Pure gold and celestial amber', color: '#FFD700' },
];

const ATMOSPHERE_STORAGE_KEY = 'veridian-atmosphere';

// Apply atmosphere by adding/removing CSS classes
function applyAtmosphereClass(atm: Atmosphere) {
  const html = document.documentElement;

  // Remove all atmosphere classes
  atmospheres.forEach(({ id }) => {
    if (id !== 'default') {
      html.classList.remove(`atmosphere-${id}`);
    }
  });

  // Add the new atmosphere class if not default
  if (atm !== 'default') {
    html.classList.add(`atmosphere-${atm}`);
  }
}

// Apply atmosphere synchronously - called before React renders
function initializeAtmosphere(): Atmosphere {
  const stored = localStorage.getItem(ATMOSPHERE_STORAGE_KEY) as Atmosphere | null;
  const atmosphere = stored || 'default';
  applyAtmosphereClass(atmosphere);
  return atmosphere;
}

// Initialize on module load
const initialAtmosphere = initializeAtmosphere();

export function useAtmosphere() {
  const [atmosphere, setAtmosphere] = useState<Atmosphere>(initialAtmosphere);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const switchAtmosphere = useCallback((atm: Atmosphere) => {
    setAtmosphere(atm);
    applyAtmosphereClass(atm);
    localStorage.setItem(ATMOSPHERE_STORAGE_KEY, atm);
    // Force a repaint to ensure styles update
    document.documentElement.offsetHeight;
  }, []);

  return { atmosphere, switchAtmosphere, isLoaded };
}
