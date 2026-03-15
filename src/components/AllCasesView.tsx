
import React, { useMemo, useState } from 'react';
import { CaseCard } from './CaseCard';
import { Case, cases } from '../data/cases';
import { motion } from 'motion/react';
import { Search, LayoutGrid, ArrowLeft } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface AllCasesViewProps {
  onSelectCase: (caseData: Case) => void;
  onBack: () => void;
}

const SEASONS = Array.from(new Set(cases.map(c => c.season))).sort((a, b) => a - b);

export const AllCasesView: React.FC<AllCasesViewProps> = ({ onSelectCase, onBack }) => {
  const [query, setQuery] = useState('');
  const { all } = useProgress();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return cases;
    return cases.filter(
      c =>
        c.episode.toLowerCase().includes(q) ||
        c.diagnosis.toLowerCase().includes(q) ||
        c.patient.toLowerCase().includes(q),
    );
  }, [query]);

  const bySeason = useMemo(() => {
    const map: Record<number, Case[]> = {};
    for (const c of filtered) {
      if (!map[c.season]) map[c.season] = [];
      map[c.season].push(c);
    }
    return map;
  }, [filtered]);

  const completedTotal = Object.keys(all).length;

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#8E9299] hover:text-[#F27D26] transition-colors text-xs font-mono uppercase tracking-widest mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-4 h-4 text-[#F27D26]" />
          <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">All Cases</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl font-bold text-white tracking-tighter">
              Case <span className="text-[#F27D26]">Archive.</span>
            </h1>
            <p className="text-[#8E9299] mt-2">
              {completedTotal} / {cases.length} completed
            </p>
          </div>
          <div className="relative group">
            <Search className="w-4 h-4 text-[#8E9299] absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-[#F27D26] transition-colors" />
            <input
              type="text"
              placeholder="Search episode, diagnosis, patient..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-[#151619] border border-[#141414] rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-[#F27D26] transition-all w-80"
            />
          </div>
        </div>
      </header>

      {SEASONS.filter(s => bySeason[s]?.length > 0).map(season => {
        const seasonCases = bySeason[season];
        const completedInSeason = seasonCases.filter(c => all[c.id]).length;
        return (
          <section key={season} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-white">Season {season}</h2>
              <span className="text-[10px] font-mono text-[#8E9299] bg-[#151619] border border-[#141414] px-2 py-0.5 rounded">
                {completedInSeason}/{seasonCases.length} done
              </span>
              <div className="h-px flex-1 bg-[#141414]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonCases.map((caseData, i) => (
                <motion.div
                  key={caseData.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <CaseCard caseData={caseData} onClick={onSelectCase} />
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-center text-[#8E9299] py-24 font-mono">No cases match your search.</p>
      )}
    </div>
  );
};
