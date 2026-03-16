
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { ChevronRight, Stethoscope, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Case } from '../data/cases';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useProgress } from '../context/ProgressContext';

interface CaseCardProps {
  caseData: Case;
  onClick: (caseData: Case) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData, onClick }) => {
  const { all } = useProgress();
  const progress = all[caseData.id];
  const scorePercent = progress
    ? Math.round((progress.earnedPoints / progress.maxPoints) * 100)
    : null;

  // Detect hover-capable device — skip glow on touch-only
  const [hasHover] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover)').matches
      : false
  );

  const ref = useRef<HTMLDivElement>(null);

  // MotionValues live outside React state — pointer moves cause zero re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const glowFade = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  // Derive the radial gradient background string from spring positions
  const glowBackground = useTransform([glowX, glowY], ([x, y]: number[]) => {
    const el = ref.current;
    if (!el) return 'none';
    const w = el.offsetWidth  || 300;
    const h = el.offsetHeight || 200;
    // Convert pixel offset from center → percentage within the card
    const cx = 50 + (x / w) * 100;
    const cy = 50 + (y / h) * 100;
    return `radial-gradient(var(--glow-radius, 380px) circle at ${cx}% ${cy}%, rgba(var(--glow-color-r,242),var(--glow-color-g,125),var(--glow-color-b,38),var(--glow-opacity,0.13)), transparent 80%)`;
  });

  const handlePointerEnter = useCallback(() => {
    glowOpacity.set(1);
  }, [glowOpacity]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width  / 2);
    mouseY.set(e.clientY - rect.top  - rect.height / 2);
  }, [mouseX, mouseY]);

  const handlePointerLeave = useCallback(() => {
    glowOpacity.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }, [glowOpacity, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(caseData)}
      onPointerEnter={hasHover ? handlePointerEnter : undefined}
      onPointerMove={hasHover ? handlePointerMove : undefined}
      onPointerLeave={hasHover ? handlePointerLeave : undefined}
      className="relative bg-[#151619] border border-[#141414] rounded-xl p-6 cursor-pointer group hover:border-[#F27D26]/50 transition-all shadow-lg overflow-hidden isolate"
    >
      {/* Glow layer — sits behind content, tracks pointer via spring */}
      {hasHover && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: glowBackground, opacity: glowFade }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-[#F27D26]/10 rounded-lg">
            <Stethoscope className="w-5 h-5 text-[#F27D26]" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299]">
              Season {caseData.season}
            </span>
            {caseData.verified && (
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-500 uppercase tracking-tighter bg-emerald-500/10 px-1.5 py-0.5 rounded">
                <ShieldCheck className="w-3 h-3" /> Verified
              </div>
            )}
            {scorePercent !== null && (
              <div className="flex items-center gap-1 text-[9px] font-mono text-[#F27D26] uppercase tracking-tighter bg-[#F27D26]/10 px-1.5 py-0.5 rounded border border-[#F27D26]/20">
                <CheckCircle2 className="w-3 h-3" /> {scorePercent}%
              </div>
            )}
          </div>
        </div>

        <h3 className="text-xl font-medium text-white mb-1 group-hover:text-[#F27D26] transition-colors">
          {caseData.episode}
        </h3>
        <p className="text-[#8E9299] text-sm mb-4">Patient: {caseData.patient}</p>

        <div className="flex items-center text-[#F27D26] text-xs font-mono uppercase tracking-wider">
          Start Diagnosis <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
