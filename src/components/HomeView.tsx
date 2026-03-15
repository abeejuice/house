
import React from 'react';
import { CaseCard } from './CaseCard';
import { Case, topInterestingCases, cases } from '../data/cases';
import { motion } from 'motion/react';
import { TrendingUp, Activity, Brain, HeartPulse, Stethoscope } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface HomeViewProps {
  onSelectCase: (caseData: Case) => void;
  onViewAll: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectCase, onViewAll }) => {
  const { stats: progressStats } = useProgress();
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
      icon: Brain,
      label: 'Diagnostic Accuracy',
      value: progressStats.casesAttempted > 0 ? `${progressStats.avgAccuracyPercent}%` : '—',
      color: 'text-[#F27D26]',
    },
    {
      icon: HeartPulse,
      label: 'Points Earned',
      value: progressStats.casesAttempted > 0
        ? `${progressStats.totalPointsEarned}`
        : '0',
      color: 'text-rose-500',
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
      </div>

      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">Verified Clinical Modules</h2>
            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-mono rounded border border-emerald-500/20 uppercase tracking-widest">High Grade Data</span>
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
          {topInterestingCases.map((caseData, i) => (
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
