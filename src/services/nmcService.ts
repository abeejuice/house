export interface NMCCompetency {
  competency_code: string;
  competency_text: string;
  domain: string;
  is_core: number;
  subject_name: string;
  topic_name: string;
}

export interface NMCGroup {
  subject: { code: string; name: string };
  competencies: NMCCompetency[];
}

// Extract individual search terms from a compound diagnosis string.
// e.g. "Vitamin K deficiency & Wilson's disease" -> ["Vitamin K deficiency", "Wilson's disease"]
function extractSearchTerms(diagnosis: string): string[] {
  return diagnosis
    .split(/[&,()\/]/)
    .map((t) => t.trim())
    .filter((t) => t.length > 3);
}

const DOMAIN_LABELS: Record<string, string> = {
  K: 'Knowledge',
  S: 'Skills',
  A: 'Attitude',
  'K/S': 'Knowledge & Skills',
  'K/A': 'Knowledge & Attitude',
  'S/A': 'Skills & Attitude',
  'K/S/A': 'Knowledge, Skills & Attitude',
};

export function domainLabel(domain: string): string {
  return DOMAIN_LABELS[domain] ?? domain;
}

export async function fetchNMCCompetencies(diagnosis: string): Promise<NMCGroup[]> {
  const terms = extractSearchTerms(diagnosis);

  const results = await Promise.all(
    terms.map((term) =>
      fetch(`/nmc-api/api/competencies/search?q=${encodeURIComponent(term)}`)
        .then((r) => r.json())
        .catch(() => ({ groups: [] }))
    )
  );

  // Merge groups across all search results, deduplicating by competency_code
  const seenCodes = new Set<string>();
  const mergedGroups: Record<string, NMCGroup> = {};

  for (const result of results) {
    for (const group of result.groups ?? []) {
      const subjectCode: string = group.subject.code;
      if (!mergedGroups[subjectCode]) {
        mergedGroups[subjectCode] = { subject: group.subject, competencies: [] };
      }
      for (const comp of group.competencies) {
        if (!seenCodes.has(comp.competency_code)) {
          seenCodes.add(comp.competency_code);
          mergedGroups[subjectCode].competencies.push(comp);
        }
      }
    }
  }

  return Object.values(mergedGroups);
}
