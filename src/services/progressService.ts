
const STORAGE_KEY = "housemd_progress";

export interface BloomBreakdown {
  [level: string]: { correct: number; total: number };
}

export interface CompetencyBreakdown {
  [competencyCode: string]: { correct: number; total: number };
}

export interface CaseProgress {
  caseId: string;
  earnedPoints: number;
  maxPoints: number;
  correctCount: number;
  totalQuestions: number;
  mode: "enhanced" | "legacy";
  completedAt: string; // ISO 8601
  bloomBreakdown: BloomBreakdown;
  competencyBreakdown: CompetencyBreakdown;
}

export interface ProgressStats {
  casesAttempted: number;
  avgAccuracyPercent: number;
  totalPointsEarned: number;
  totalPointsPossible: number;
}

export function loadAllProgress(): Record<string, CaseProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Saves a completed attempt. Keeps the best-ever earnedPoints for a case. */
export function saveProgress(p: CaseProgress): void {
  try {
    const all = loadAllProgress();
    const existing = all[p.caseId];
    // Keep whichever attempt scored higher
    if (!existing || p.earnedPoints >= existing.earnedPoints) {
      all[p.caseId] = p;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Storage quota exceeded or private browsing — silently skip
  }
}

export function computeStats(all: Record<string, CaseProgress>): ProgressStats {
  const entries = Object.values(all);
  if (entries.length === 0) {
    return { casesAttempted: 0, avgAccuracyPercent: 0, totalPointsEarned: 0, totalPointsPossible: 0 };
  }
  const totalPointsEarned = entries.reduce((s, e) => s + e.earnedPoints, 0);
  const totalPointsPossible = entries.reduce((s, e) => s + e.maxPoints, 0);
  const avgAccuracyPercent =
    totalPointsPossible > 0 ? Math.round((totalPointsEarned / totalPointsPossible) * 100) : 0;
  return {
    casesAttempted: entries.length,
    avgAccuracyPercent,
    totalPointsEarned,
    totalPointsPossible,
  };
}

export function clearAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
