
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  CaseProgress,
  ProgressStats,
  clearAllProgress,
  computeStats,
  loadAllProgress,
  saveProgress,
} from "../services/progressService";

interface ProgressContextValue {
  all: Record<string, CaseProgress>;
  stats: ProgressStats;
  save: (p: CaseProgress) => void;
  clear: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [all, setAll] = useState<Record<string, CaseProgress>>(() => loadAllProgress());
  const [stats, setStats] = useState<ProgressStats>(() => computeStats(loadAllProgress()));

  const save = useCallback((p: CaseProgress) => {
    saveProgress(p);
    const updated = loadAllProgress();
    setAll(updated);
    setStats(computeStats(updated));
  }, []);

  const clear = useCallback(() => {
    clearAllProgress();
    setAll({});
    setStats({ casesAttempted: 0, avgAccuracyPercent: 0, totalPointsEarned: 0, totalPointsPossible: 0 });
  }, []);

  return (
    <ProgressContext.Provider value={{ all, stats, save, clear }}>
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
