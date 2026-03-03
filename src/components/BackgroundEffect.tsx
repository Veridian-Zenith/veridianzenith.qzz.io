//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const RUNES = [
  "ᚦ","ᚧ","ᚨ","ᚱ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ",
  "ᛈ","ᛇ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛝ","ᛟ","ᛞ"
];

export const BackgroundEffect = () => {
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const ySpring = useSpring(yRange, { stiffness: 50, damping: 20 });

  // Pre-generate positions for consistency
  const massiveRunes = [...Array(15)].map((_, i) => ({
    left: `${(i * 17) % 100}%`,
    top: `${(i * 23) % 100}%`,
    size: `${10 + Math.random() * 15}rem`,
    speed: 35 + i * 5,
    direction: i % 2 === 0 ? 1 : -1,
    rune: RUNES[i % RUNES.length],
  }));

  const tinyRunes = [...Array(60)].map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 0.8 + 0.5}rem`,
    speed: 6 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">

      {/* 1. Base Layer: vibrant gradients */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #d72638 0%, #ffb347 50%, #ffd700 100%)"
        }}
      />

      {/* 2. Middle Layer: Massive Runes (parallax drift) */}
      <motion.div style={{ y: ySpring }} className="absolute inset-0">
        {massiveRunes.map((r, i) => (
          <motion.div
            key={`massive-${i}`}
            className="absolute text-amber-500/40 font-serif select-none pointer-events-none filter blur-[0.5px]"
            style={{ fontSize: r.size, left: r.left, top: r.top }}
            animate={{
              x: [0, r.direction * 50, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: r.speed, repeat: Infinity, ease: "easeInOut" }}
          >
            {r.rune}
          </motion.div>
        ))}
      </motion.div>

      {/* 3. Surface Layer: Microscopic Grid Runes */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none grid grid-cols-10 gap-16 p-10 rotate-12 scale-150">
        {[...Array(200)].map((_, i) => (
          <motion.span
            key={i}
            className="text-2xl font-serif text-amber-500 block text-center"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4, delay: i * 0.02, repeat: Infinity, ease: "easeInOut" }}
          >
            {RUNES[i % RUNES.length]}
          </motion.span>
        ))}
      </div>

      {/* 4. Top Layer: Tiny Floating Runes */}
      <div className="absolute inset-0">
        {tinyRunes.map((r, i) => (
          <motion.div
            key={`tiny-${i}`}
            className="absolute text-amber-400 select-none font-serif drop-shadow-[0_0_10px_rgba(255,179,71,0.6)]"
            style={{ fontSize: r.size, left: r.left, top: r.top }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 180, 0]
            }}
            transition={{
              duration: r.speed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          >
            {RUNES[i % RUNES.length]}
          </motion.div>
        ))}
      </div>

      {/* 5. Depth Overlay: subtle dim only */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};
