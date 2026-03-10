
import React from 'react';
import { ChevronRight, Stethoscope, Activity, Brain, HeartPulse, ShieldCheck } from 'lucide-react';
import { Case } from '../data/cases';
import { motion } from 'motion/react';

interface CaseCardProps {
  caseData: Case;
  onClick: (caseData: Case) => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseData, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(caseData)}
      className="bg-[#151619] border border-[#141414] rounded-xl p-6 cursor-pointer group hover:border-[#F27D26]/50 transition-all shadow-lg"
    >
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
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-white mb-1 group-hover:text-[#F27D26] transition-colors">
        {caseData.episode}
      </h3>
      <p className="text-[#8E9299] text-sm mb-4">Patient: {caseData.patient}</p>
      
      <div className="flex items-center text-[#F27D26] text-xs font-mono uppercase tracking-wider">
        Start Diagnosis <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
