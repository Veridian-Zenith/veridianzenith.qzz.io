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
  amber: 'shadow-[0_0_15px_#FFB347] hover:shadow-[0_0_30px_#FFB347]',
  red: 'shadow-[0_0_15px_#D72638] hover:shadow-[0_0_30px_#D72638]',
  gold: 'shadow-[0_0_15px_#FFD700] hover:shadow-[0_0_30px_#FFD700]',
};

export const AnimatedCard = ({ children, className, glowColor = 'amber', delay = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "bg-[#0a0a0a] rounded-3xl border border-white/5 p-8 transition-all duration-300",
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
    amber: 'bg-amber-700/80 hover:bg-amber-600 shadow-[0_0_15px_rgba(255,179,71,0.3)] hover:shadow-[0_0_25px_rgba(255,179,71,0.5)]',
    red: 'bg-red-700/80 hover:bg-red-600 shadow-[0_0_15px_rgba(215,38,56,0.3)] hover:shadow-[0_0_25px_rgba(215,38,56,0.5)]',
    gold: 'bg-gold-600/80 hover:bg-gold-500 shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]',
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-white transition-all duration-300 cursor-pointer group",
        bgColors[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
