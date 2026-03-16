
import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { CaseCard } from './CaseCard';
import { Case, cases } from '../data/cases';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Activity, Stethoscope, Brain, ChevronRight } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { getRecommendedCases } from '../services/graphBuilder';
import { houseQuotes, getAccuracyRange } from '../data/houseQuotes';

interface HomeViewProps {
  onSelectCase: (caseData: Case) => void;
  onViewAll: () => void;
}

const SCAN_TERMS = [
  'LUPUS', 'SARCOIDOSIS', 'VASCULITIS', 'WEGENER\'S', 'AMYLOIDOSIS',
  'LYMPHOMA', 'PARANEOPLASTIC', 'WILSON\'S', 'MENINGITIS', 'ADDISON\'S',
];
const SCAN_DURATION_MS = 1400;
const SCAN_INTERVAL_MS = 90;
const TYPE_INTERVAL_MS = 26;
const AUTO_CYCLE_MS = 8000;

const HouseVerdict: React.FC<{ accuracyPct: number; casesAttempted: number }> = ({
  accuracyPct,
  casesAttempted,
}) => {
  const range = getAccuracyRange(accuracyPct, casesAttempted);
  const quotes = houseQuotes[range];

  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Phase: 'scan' | 'type' | 'idle'
  const [phase, setPhase] = useState<'scan' | 'type' | 'idle'>(reducedMotion ? 'idle' : 'scan');
  const [scanLabel, setScanLabel] = useState('SCANNING...');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(reducedMotion ? quotes[0] : '');
  const [visible, setVisible] = useState(true);
  const isHovered = useRef(false);

  // Scanning phase
  useEffect(() => {
    if (phase !== 'scan') return;
    let i = 0;
    const id = setInterval(() => {
      setScanLabel(SCAN_TERMS[i % SCAN_TERMS.length] + '...');
      i++;
    }, SCAN_INTERVAL_MS);
    const timeout = setTimeout(() => {
      clearInterval(id);
      setPhase('type');
    }, SCAN_DURATION_MS);
    return () => { clearInterval(id); clearTimeout(timeout); };
  }, [phase]);

  // Typewriter phase
  useEffect(() => {
    if (phase !== 'type') return;
    const full = quotes[quoteIndex];
    let i = 0;
    setDisplayedText('');
    const id = setInterval(() => {
      i++;
      setDisplayedText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setPhase('idle');
      }
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [phase, quoteIndex, quotes]);

  // Auto-cycle in idle phase
  useEffect(() => {
    if (phase !== 'idle' || reducedMotion) return;
    const id = setInterval(() => {
      if (!isHovered.current) advance();
    }, AUTO_CYCLE_MS);
    return () => clearInterval(id);
  }, [phase, reducedMotion, quoteIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const advance = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setQuoteIndex(i => (i + 1) % quotes.length);
      setDisplayedText(quotes[(quoteIndex + 1) % quotes.length]);
      setVisible(true);
    }, 300);
  }, [quoteIndex, quotes]);

  const handleClick = useCallback(() => {
    if (phase === 'idle') advance();
  }, [phase, advance]);

  const accuracyLabel = casesAttempted > 0 ? `${accuracyPct}% ACCURACY` : 'NO DATA YET';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={handleClick}
      onPointerEnter={() => { isHovered.current = true; }}
      onPointerLeave={() => { isHovered.current = false; }}
      className="md:col-span-2 lg:col-span-2 bg-[#151619] border border-[#141414] rounded-2xl p-6 shadow-lg cursor-pointer hover:border-[#F27D26]/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#050505] border border-[#141414] text-[#F27D26]">
            <Brain className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">
              Dr. House's Verdict
            </span>
            <span className="text-[10px] font-mono text-[#F27D26]/70 uppercase tracking-widest">
              · {accuracyLabel}
            </span>
          </div>
        </div>
        {phase === 'idle' && (
          <button
            onClick={e => { e.stopPropagation(); advance(); }}
            aria-label="Next quote"
            className="p-2 text-[#8E9299] hover:text-[#F27D26] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="min-h-[3.5rem] flex items-center">
        {phase === 'scan' ? (
          <p className="text-sm font-mono text-[#F27D26]/60 tracking-widest animate-pulse">
            {scanLabel}
          </p>
        ) : (
          <AnimatePresence mode="wait">
            {visible && (
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white text-lg italic leading-snug"
              >
                &ldquo;{displayedText}
                {phase === 'type' && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-[#F27D26] ml-[2px] align-middle animate-pulse" />
                )}
                {phase !== 'type' && <>&rdquo;</>}
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export const HomeView: React.FC<HomeViewProps> = ({ onSelectCase, onViewAll }) => {
  const { all, stats: progressStats } = useProgress();
  const { cases: recommended, weakestSubject } = useMemo(
    () => getRecommendedCases(cases, all),
    [all]
  );

  const stats = [
    {
      icon: Activity,
      label: 'Cases Completed',
      value: progressStats.casesAttempted > 0
        ? `${progressStats.casesAttempted}/${cases.length}`
        : '0',
      color: 'text-emerald-500',
    },
    {
      icon: Stethoscope,
      label: 'Total Cases',
      value: String(cases.length),
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-[#F27D26]" />
          <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">Diagnostic Dashboard</span>
        </div>
        <h1 className="text-6xl font-bold text-white tracking-tighter mb-6">
          Welcome back, <span className="text-[#F27D26]">Fellow.</span>
        </h1>
        <p className="text-[#8E9299] text-xl max-w-2xl leading-relaxed">
          Select a case to begin your diagnostic evaluation. Remember: everybody lies, but the symptoms don't.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#151619] border border-[#141414] rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg bg-[#050505] border border-[#141414] ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}

        <HouseVerdict
          accuracyPct={progressStats.avgAccuracyPercent}
          casesAttempted={progressStats.casesAttempted}
        />
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">
              {progressStats.casesAttempted === 0 ? "Start Here" : "Targeted Practice"}
            </h2>
            {weakestSubject ? (
              <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-mono rounded border border-rose-500/20 uppercase tracking-widest">
                Weakest: {weakestSubject}
              </span>
            ) : (
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono rounded border border-emerald-500/20 uppercase tracking-widest">High Grade Data</span>
            )}
          </div>
          <div className="h-px flex-1 mx-8 bg-[#141414]" />
          <button
            onClick={onViewAll}
            className="text-xs font-mono text-[#8E9299] hover:text-[#F27D26] transition-colors uppercase tracking-widest"
          >
            View All Cases
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommended.map((caseData, i) => (
            <motion.div
              key={caseData.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <CaseCard caseData={caseData} onClick={onSelectCase} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
