
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface GalenAIButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GalenAIButton: React.FC<GalenAIButtonProps> = ({
  className = '',
  size = 'md',
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 280, damping: 18 });
  const sy = useSpring(my, { stiffness: 280, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.28);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.28);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  }[size];

  return (
    <motion.a
      ref={ref}
      href="https://app.galenai.io/"
      target="_blank"
      rel="noopener noreferrer"
      className={`relative inline-flex items-center ${sizeClasses} rounded-xl font-bold tracking-wide overflow-hidden cursor-pointer select-none ${className}`}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover="hover"
      whileTap="tap"
      initial="idle"
      animate="idle"
      variants={{
        idle: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      {/* Base fill — orange gradient */}
      <span className="absolute inset-0 bg-gradient-to-br from-[#F27D26] to-[#e06920] rounded-xl" />

      {/* Breathing glow ring — always on, pulses */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: [
            '0 0 0px 0px rgba(242,125,38,0.0)',
            '0 0 18px 4px rgba(242,125,38,0.45)',
            '0 0 0px 0px rgba(242,125,38,0.0)',
          ],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hover glow boost */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        variants={{
          idle: { boxShadow: '0 0 0px 0px rgba(242,125,38,0)' },
          hover: { boxShadow: '0 0 28px 8px rgba(242,125,38,0.5)' },
          tap: { boxShadow: '0 0 8px 2px rgba(242,125,38,0.3)' },
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(108deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)',
          backgroundSize: '250% 100%',
        }}
        variants={{
          idle: { backgroundPosition: '200% 0%', opacity: 0 },
          hover: {
            backgroundPosition: ['-200% 0%', '200% 0%'],
            opacity: 1,
          },
          tap: { opacity: 0 },
        }}
        transition={{
          backgroundPosition: {
            duration: 0.55,
            ease: 'easeInOut',
            repeat: Infinity,
          },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Top highlight edge */}
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full pointer-events-none" />

      {/* Label */}
      <motion.span
        className="relative z-10 text-black"
        variants={{
          idle: { letterSpacing: '0.04em' },
          hover: { letterSpacing: '0.07em' },
        }}
        transition={{ duration: 0.2 }}
      >
        Ask GalenAI
      </motion.span>

      {/* Arrow icon — slides in on hover */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 text-black/70 flex-shrink-0"
        style={{ width: size === 'sm' ? 12 : size === 'lg' ? 16 : 14, height: size === 'sm' ? 12 : size === 'lg' ? 16 : 14 }}
        variants={{
          idle: { x: 0, opacity: 0.6 },
          hover: { x: 3, opacity: 1 },
          tap: { x: 0, opacity: 0.6 },
        }}
        transition={{ duration: 0.2 }}
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </motion.svg>
    </motion.a>
  );
};
