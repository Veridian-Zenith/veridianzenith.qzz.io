//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';
import { useIsMobile } from '../hooks/useIsMobile';



interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'amber' | 'red' | 'gold';
  delay?: number;
}

export const AnimatedCard = ({ children, className, delay = 0 }: AnimatedCardProps) => {
  const isMobile = useIsMobile();
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
      whileHover={isMobile ? {} : {
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={cn(
        "bg-[var(--vz-card-bg)] rounded-3xl border border-[var(--vz-card-border)] p-8 transition-all duration-300 backdrop-blur-sm",
        "shadow-[0_0_15px_var(--vz-shadow-color)] hover:shadow-[0_0_35px_var(--vz-shadow-color)]",
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
  const isMobile = useIsMobile();
  const bgColors = {
    amber: 'bg-primary-themeable/80 hover:bg-primary-themeable shadow-primary-themeable',
    red: 'bg-primary-themeable/80 hover:bg-primary-themeable shadow-primary-themeable',
    gold: 'bg-primary-themeable/80 hover:bg-primary-themeable shadow-primary-themeable',
  };

  return (
    <motion.button
      whileHover={isMobile ? {} : {
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-white transition-all duration-300 cursor-pointer group border border-muted-themeable hover:border-primary-themeable",
        bgColors[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-themeable/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
