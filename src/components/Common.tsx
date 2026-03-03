//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'red' | 'gold';
  delay?: number;
}

const glowColors = {
  amber: 'shadow-[0_0_15px_#FFB347]',
  red: 'shadow-[0_0_15px_#D72638]',
  gold: 'shadow-[0_0_15px_#FFD700]',
};

export const AnimatedCard = ({ children, className, glowColor = 'amber', delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 transition-all duration-300",
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

interface InteractiveButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'amber' | 'red' | 'gold';
  children: React.ReactNode;
}

export const InteractiveButton = ({ children, variant = 'amber', className, ...props }: InteractiveButtonProps) => {
  const bgColors = {
    amber: 'bg-amber-700/90 hover:bg-red-700 shadow-[0_0_10px_#FFD700]',
    red: 'bg-red-700/90 hover:bg-gold-700 shadow-[0_0_10px_#FFB347]',
    gold: 'bg-gold-600/90 hover:bg-amber-700 shadow-[0_0_10px_#D72638]',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "rounded-full px-8 py-3 font-semibold text-white transition-all duration-300 cursor-pointer",
        bgColors[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
