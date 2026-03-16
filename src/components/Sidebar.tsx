
import React from 'react';
import { LayoutDashboard, List, ChevronRight, Network } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSeason: number | null;
  onSelectSeason: (season: number | null) => void;
  onGoHome: () => void;
  onShowGraph: () => void;
  showGraph: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSeason, onSelectSeason, onGoHome, onShowGraph, showGraph }) => {
  const seasons = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-64 bg-[#050505] border-r border-[#141414] flex flex-col h-screen sticky top-0">
      <div className="p-8" onClick={onGoHome} style={{ cursor: 'pointer' }}>
        <h1 className="text-2xl font-bold text-white tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F27D26] rounded flex items-center justify-center">
            <span className="text-black font-black">H</span>
          </div>
          DIAGNOSTIC
        </h1>
        <p className="text-[10px] font-mono text-[#8E9299] mt-1 tracking-[0.2em] uppercase">
          Case-Based Learning
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <button
          onClick={onGoHome}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            !showGraph && activeSeason === null ? 'bg-[#151619] text-[#F27D26]' : 'text-[#8E9299] hover:bg-[#151619] hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>

        <button
          onClick={onShowGraph}
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
            onClick={() => onSelectSeason(season)}
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
    </div>
  );
};
