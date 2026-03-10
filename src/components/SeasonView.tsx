
import React from 'react';
import { CaseCard } from './CaseCard';
import { Case, cases } from '../data/cases';
import { motion } from 'motion/react';
import { Search, Filter, List } from 'lucide-react';

interface SeasonViewProps {
  season: number;
  onSelectCase: (caseData: Case) => void;
}

export const SeasonView: React.FC<SeasonViewProps> = ({ season, onSelectCase }) => {
  const seasonCases = cases.filter(c => c.season === season);

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <List className="w-4 h-4 text-[#F27D26]" />
            <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">Season {season}</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tighter">
            Diagnostic <span className="text-[#F27D26]">Archive.</span>
          </h1>
        </div>

        <div className="flex gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 text-[#8E9299] absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F27D26] transition-colors" />
            <input
              type="text"
              placeholder="Search diagnosis..."
              className="bg-[#151619] border border-[#141414] rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-all w-64"
            />
          </div>
          <button className="p-3 bg-[#151619] border border-[#141414] rounded-xl text-[#8E9299] hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasonCases.map((caseData, i) => (
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
