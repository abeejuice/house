
import React from 'react';
import { LayoutDashboard, List, ChevronRight, Network, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSeason: number | null;
  onSelectSeason: (season: number | null) => void;
  onGoHome: () => void;
  onShowGraph: () => void;
  showGraph: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSeason,
  onSelectSeason,
  onGoHome,
  onShowGraph,
  showGraph,
  isOpen,
  onClose,
}) => {
  const seasons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 h-screen
        md:relative md:sticky md:top-0 md:z-auto md:translate-x-0
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-64 bg-[#050505] border-r border-[#141414] flex flex-col
      `}
    >
      <div className="p-8 flex items-start justify-between" onClick={onGoHome} style={{ cursor: 'pointer' }}>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
            <img src="/galen-icon.svg" className="w-8 h-8 rounded" alt="GalenAI" onClick={e => { e.stopPropagation(); onGoHome(); onClose(); }} />
            IT'S NOT LUPUS
          </h1>
          <p className="text-[10px] font-mono text-[#8E9299] mt-1 tracking-[0.2em] uppercase">
            Case-Based Learning
          </p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={e => { e.stopPropagation(); onClose(); }}
          aria-label="Close menu"
          className="md:hidden p-1 text-[#8E9299] hover:text-white transition-colors mt-1 flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <button
          onClick={() => { onGoHome(); onClose(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            !showGraph && activeSeason === null ? 'bg-[#151619] text-[#F27D26]' : 'text-[#8E9299] hover:bg-[#151619] hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => { onShowGraph(); onClose(); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            showGraph ? 'bg-[#151619] text-[#F27D26]' : 'text-[#8E9299] hover:bg-[#151619] hover:text-white'
          }`}
        >
          <Network className="w-5 h-5" />
          <span className="text-sm font-medium">Knowledge Map</span>
        </button>

        <div className="pt-4 pb-2 px-4">
          <span className="text-[10px] font-mono text-[#4A4A4A] uppercase tracking-widest">Seasons</span>
        </div>

        {seasons.map((season) => (
          <button
            key={season}
            onClick={() => { onSelectSeason(season); onClose(); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              activeSeason === season ? 'bg-[#151619] text-[#F27D26]' : 'text-[#8E9299] hover:bg-[#151619] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <List className="w-5 h-5" />
              <span className="text-sm font-medium">Season {season}</span>
            </div>
            {activeSeason === season && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#141414] flex items-center justify-center">
        <img src="/galen-wordmark.svg" className="h-5 opacity-60" alt="GalenAI" />
      </div>
    </div>
  );
};
