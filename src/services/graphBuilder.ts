/**
 * graphBuilder.ts
 *
 * Pure function that derives the knowledge graph data structure from existing
 * in-memory data. No React, no side effects — returns plain objects ready to
 * feed into react-force-graph-2d.
 *
 * Node types:
 *   - "subject"  : 13 NMC medical subject hubs (e.g. "General Medicine")
 *   - "case"     : 182 House MD episodes
 *
 * Links: one directed edge per unique (case → subject) pair derived from
 * the case's competency map entries.
 *
 * Colour logic (applied at subject and case nodes):
 *   no data  → dim grey
 *   < 50%    → rose red
 *   50–79%   → amber
 *   ≥ 80%    → emerald green
 */

import { Case } from "../data/cases";
import { competencyMap } from "../data/competencyMap";
import { CaseProgress } from "./progressService";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GraphNode {
  id: string;
  kind: "subject" | "case";
  label: string;             // Display text
  // For subject nodes
  subject?: string;
  // For case nodes
  caseId?: string;
  season?: number;
  diagnosis?: string;
  episode?: string;
  patient?: string;
  // Performance (0–100, or null if untried)
  accuracy: number | null;
  // For graph rendering
  color: string;
  val: number;               // Node size
}

export interface GraphLink {
  source: string;
  target: string;
  color: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// ── Colour helpers ────────────────────────────────────────────────────────────

function accuracyColor(accuracy: number | null, alpha = 1): string {
  if (accuracy === null) return `rgba(74, 74, 74, ${alpha})`;   // untried grey
  if (accuracy < 50)    return `rgba(244, 63, 94, ${alpha})`;   // rose-500
  if (accuracy < 80)    return `rgba(251, 146, 60, ${alpha})`;  // orange-400
  return                        `rgba(52, 211, 153, ${alpha})`; // emerald-400
}

// ── Aggregation helpers ───────────────────────────────────────────────────────

/**
 * Compute average per-subject accuracy across all attempted cases,
 * using competencyBreakdown stored in each CaseProgress entry.
 */
function subjectAccuracyMap(
  all: Record<string, CaseProgress>,
  codeToSubject: Record<string, string>,
): Record<string, { correct: number; total: number }> {
  const agg: Record<string, { correct: number; total: number }> = {};
  for (const progress of Object.values(all)) {
    for (const [code, breakdown] of Object.entries(progress.competencyBreakdown ?? {})) {
      const subject = codeToSubject[code];
      if (!subject) continue;
      if (!agg[subject]) agg[subject] = { correct: 0, total: 0 };
      agg[subject].correct += breakdown.correct;
      agg[subject].total   += breakdown.total;
    }
  }
  return agg;
}

// ── Main builder ──────────────────────────────────────────────────────────────

export function buildGraph(
  cases: Case[],
  all: Record<string, CaseProgress>,
): GraphData {
  // 1. Build code → subject lookup from competencyMap
  const codeToSubject: Record<string, string> = {};
  for (const entries of Object.values(competencyMap)) {
    for (const e of entries) {
      codeToSubject[e.code] = e.subject;
    }
  }

  // 2. Derive the 13 subject names
  const allSubjects = Array.from(new Set(Object.values(codeToSubject))).sort();

  // 3. Compute per-subject accuracy across all attempted cases
  const subjectAccuracy = subjectAccuracyMap(all, codeToSubject);

  // 4. Subject nodes
  const subjectNodes: GraphNode[] = allSubjects.map(subject => {
    const agg = subjectAccuracy[subject];
    const accuracy = agg && agg.total > 0 ? Math.round((agg.correct / agg.total) * 100) : null;
    return {
      id: `subject::${subject}`,
      kind: "subject",
      label: subject,
      subject,
      accuracy,
      color: accuracyColor(accuracy),
      val: 20,  // Large hub
    };
  });

  // 5. Case nodes + edges
  const caseNodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const c of cases) {
    const progress = all[c.id];
    const accuracy = progress
      ? Math.round((progress.earnedPoints / progress.maxPoints) * 100)
      : null;

    caseNodes.push({
      id: `case::${c.id}`,
      kind: "case",
      label: `${c.episode}`,
      caseId: c.id,
      season: c.season,
      diagnosis: c.diagnosis,
      episode: c.episode,
      patient: c.patient,
      accuracy,
      color: accuracyColor(accuracy, accuracy === null ? 0.4 : 0.85),
      val: 4,   // Small satellite
    });

    // Edges: one per unique subject this case touches
    const caseEntries = competencyMap[c.id] ?? [];
    const seenSubjects = new Set<string>();
    for (const entry of caseEntries) {
      if (!seenSubjects.has(entry.subject)) {
        seenSubjects.add(entry.subject);
        links.push({
          source: `case::${c.id}`,
          target: `subject::${entry.subject}`,
          color: accuracyColor(accuracy, 0.15),
        });
      }
    }
  }

  return { nodes: [...subjectNodes, ...caseNodes], links };
}

/**
 * Returns cases connected to a given subject hub, sorted by:
 * 1. Untried first (always surface the unknown)
 * 2. Then by lowest accuracy (weakest attempts surface to top)
 */
export function casesForSubject(
  subject: string,
  cases: Case[],
  all: Record<string, CaseProgress>,
): Case[] {
  const connected = cases.filter(c => {
    const entries = competencyMap[c.id] ?? [];
    return entries.some(e => e.subject === subject);
  });

  return connected.sort((a, b) => {
    const pa = all[a.id];
    const pb = all[b.id];
    // Untried (null) sorts before attempted
    if (!pa && !pb) return 0;
    if (!pa) return -1;
    if (!pb) return 1;
    const accA = pa.earnedPoints / pa.maxPoints;
    const accB = pb.earnedPoints / pb.maxPoints;
    return accA - accB; // lowest accuracy first
  });
}
