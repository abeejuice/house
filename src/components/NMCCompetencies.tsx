import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown, ChevronUp, GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import { getCompetenciesForCase, MappedCompetency } from '../data/competencyMap';
import { fetchNMCCompetencies, domainLabel, NMCGroup } from '../services/nmcService';

interface NMCCompetenciesProps {
  caseId: string;
  diagnosis: string;
}

const DOMAIN_COLORS: Record<string, string> = {
  K:     'text-blue-400 bg-blue-400/10 border-blue-400/30',
  S:     'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  A:     'text-purple-400 bg-purple-400/10 border-purple-400/30',
  'K/S': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  'K/A': 'text-violet-400 bg-violet-400/10 border-violet-400/30',
  'S/A': 'text-teal-400 bg-teal-400/10 border-teal-400/30',
  'K/S/A': 'text-amber-400 bg-amber-400/10 border-amber-400/30',
};

function domainColor(domain: string): string {
  return DOMAIN_COLORS[domain] ?? 'text-[#8E9299] bg-[#8E9299]/10 border-[#8E9299]/30';
}

// Convert static map entries → grouped by subject (same shape as live API)
function groupBySubject(comps: MappedCompetency[]): Array<{ subject: string; competencies: MappedCompetency[] }> {
  const map = new Map<string, MappedCompetency[]>();
  for (const c of comps) {
    if (!map.has(c.subject)) map.set(c.subject, []);
    map.get(c.subject)!.push(c);
  }
  return [...map.entries()].map(([subject, competencies]) => ({ subject, competencies }));
}

export const NMCCompetencies: React.FC<NMCCompetenciesProps> = ({ caseId, diagnosis }) => {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Array<{ subject: string; competencies: MappedCompetency[] }>>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(false);
  const [source, setSource] = useState<'static' | 'live' | null>(null);

  useEffect(() => {
    if (!open || fetched) return;

    // 1. Try static map first — instant, no network call
    const staticComps = getCompetenciesForCase(caseId);
    if (staticComps.length > 0) {
      setGroups(groupBySubject(staticComps));
      setSource('static');
      setFetched(true);
      return;
    }

    // 2. Fall back to live NMC search API
    setLoading(true);
    setError(false);
    fetchNMCCompetencies(diagnosis)
      .then((nmcGroups: NMCGroup[]) => {
        const mapped = nmcGroups.map(g => ({
          subject: g.subject.name,
          competencies: g.competencies.map(c => ({
            code: c.competency_code,
            subject: c.subject_name,
            topic: c.topic_name,
            domain: c.domain,
            isCore: c.is_core === 1,
            text: c.competency_text,
          })),
        }));
        setGroups(mapped);
        setSource('live');
        setFetched(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [open, fetched, caseId, diagnosis]);

  const totalCount = groups.reduce((n, g) => n + g.competencies.length, 0);

  return (
    <div className="bg-[#151619] border border-[#141414] rounded-xl overflow-hidden">
      {/* Header / toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between p-6 hover:bg-[#1a1d22] transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F27D26]/10 rounded-lg">
            <GraduationCap className="w-5 h-5 text-[#F27D26]" />
          </div>
          <div className="text-left">
            <p className="text-white font-semibold">NMC Curriculum Connections</p>
            <p className="text-[#8E9299] text-xs mt-0.5">
              {fetched
                ? totalCount > 0
                  ? `${totalCount} competencies across ${groups.length} subject${groups.length !== 1 ? 's' : ''}`
                  : 'No NMC matches found'
                : 'See which NMC competencies this case addresses'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {fetched && source === 'static' && (
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded border border-[#F27D26]/20">
              AI Mapped
            </span>
          )}
          <div className="text-[#8E9299] group-hover:text-white transition-colors">
            {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#141414]">
              {loading && (
                <div className="flex items-center gap-3 py-8 justify-center text-[#8E9299]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Searching NMC curriculum...</span>
                </div>
              )}

              {error && (
                <div className="flex items-center gap-3 py-6 text-rose-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">
                    Could not reach the NMC app. Make sure it's running at{' '}
                    <code className="font-mono bg-rose-400/10 px-1 rounded">localhost:3000</code>.
                  </p>
                </div>
              )}

              {!loading && !error && fetched && totalCount === 0 && (
                <div className="py-6 text-center text-[#8E9299] text-sm">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>No NMC competency matches for <span className="italic">{diagnosis}</span>.</p>
                </div>
              )}

              {!loading && !error && groups.length > 0 && (
                <div className="mt-4 space-y-6">
                  {/* Domain legend */}
                  <div className="flex flex-wrap gap-2">
                    {[['K', 'Knowledge'], ['S', 'Skills'], ['A', 'Attitude']].map(([code, label]) => (
                      <span key={code} className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded border ${domainColor(code)}`}>
                        {code} — {label}
                      </span>
                    ))}
                  </div>

                  {groups.map(group => (
                    <div key={group.subject}>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#F27D26] mb-3">
                        {group.subject}
                      </p>
                      <div className="space-y-2">
                        {group.competencies.map(comp => (
                          <div
                            key={comp.code}
                            className="flex items-start gap-3 p-3 bg-[#050505] border border-[#141414] rounded-lg"
                          >
                            <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                              <span className="text-[11px] font-mono font-bold text-white whitespace-nowrap">
                                {comp.code}
                              </span>
                              {comp.isCore && (
                                <span className="text-[8px] font-mono uppercase tracking-wider text-[#F27D26]">
                                  Core
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[#D0D3D9] text-sm leading-relaxed">{comp.text}</p>
                              <p className="text-[#8E9299] text-[10px] mt-1">{comp.topic}</p>
                            </div>
                            <span
                              className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded border self-start ${domainColor(comp.domain)}`}
                              title={domainLabel(comp.domain)}
                            >
                              {comp.domain}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
