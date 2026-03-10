
import React from 'react';
import { LayoutDashboard, List, History, Settings, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSeason: number | null;
  onSelectSeason: (season: number | null) => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSeason, onSelectSeason, onGoHome }) => {
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
            activeSeason === null ? 'bg-[#151619] text-[#F27D26]' : 'text-[#8E9299] hover:bg-[#151619] hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-medium">Dashboard</span>
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

      <div className="p-4 border-t border-[#141414]">
        <div className="bg-[#151619] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F27D26] to-[#FF4444] flex items-center justify-center text-white font-bold">
              MD
            </div>
            <div>
              <p className="text-sm font-medium text-white">Fellow</p>
              <p className="text-[10px] font-mono text-[#8E9299]">Princeton-Plainsboro</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#8E9299] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
