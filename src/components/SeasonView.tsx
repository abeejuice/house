
import React, { useState, useMemo } from 'react';
import { CaseCard } from './CaseCard';
import { Case, cases } from '../data/cases';
import { motion } from 'motion/react';
import { Search, Filter, List } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface SeasonViewProps {
  season: number;
  onSelectCase: (caseData: Case) => void;
}

export const SeasonView: React.FC<SeasonViewProps> = ({ season, onSelectCase }) => {
  const [query, setQuery] = useState('');
  const { all } = useProgress();
  const seasonCases = cases.filter(c => c.season === season);
  const filteredCases = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return seasonCases;
    return seasonCases.filter(
      c =>
        c.episode.toLowerCase().includes(q) ||
        c.diagnosis.toLowerCase().includes(q) ||
        c.patient.toLowerCase().includes(q),
    );
  }, [seasonCases, query]);
  const completedCount = seasonCases.filter(c => all[c.id]).length;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <List className="w-4 h-4 text-[#F27D26]" />
            <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">Season {season}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter">
            Diagnostic <span className="text-[#F27D26]">Archive.</span>
          </h1>
          <p className="text-[#8E9299] mt-2 text-sm font-mono">
            {completedCount}/{seasonCases.length} completed
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative group flex-1 sm:flex-none">
            <Search className="w-4 h-4 text-[#8E9299] absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F27D26] transition-colors" />
            <input
              type="text"
              placeholder="Search diagnosis..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full sm:w-64 bg-[#151619] border border-[#141414] rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-all"
            />
          </div>
          <button className="p-3 bg-[#151619] border border-[#141414] rounded-xl text-[#8E9299] hover:text-white transition-colors flex-shrink-0">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((caseData, i) => (
          <motion.div
            key={caseData.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <CaseCard caseData={caseData} onClick={onSelectCase} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
