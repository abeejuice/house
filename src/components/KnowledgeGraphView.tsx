import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { motion, AnimatePresence } from "motion/react";
import { NetworkIcon, X, ChevronRight, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { Case, cases } from "../data/cases";
import { useProgress } from "../context/ProgressContext";
import { buildGraph, casesForSubject, GraphNode } from "../services/graphBuilder";

interface KnowledgeGraphViewProps {
  onSelectCase: (c: Case) => void;
}

// ── Tooltip card ──────────────────────────────────────────────────────────────

const TooltipCard: React.FC<{
  node: GraphNode;
  x: number;
  y: number;
  onClose: () => void;
  onSelectCase: (c: Case) => void;
  weakestCase: Case | null;
}> = ({ node, x, y, onClose, onSelectCase, weakestCase }) => {
  const isSubject = node.kind === "subject";
  const accuracyLabel =
    node.accuracy === null ? "Untried" :
    node.accuracy < 50     ? "Needs work" :
    node.accuracy < 80     ? "Progressing" :
                             "Mastered";

  const accentColor =
    node.accuracy === null ? "text-[#4A4A4A]" :
    node.accuracy < 50     ? "text-rose-400" :
    node.accuracy < 80     ? "text-orange-400" :
                             "text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      style={{ left: x, top: y }}
      className="absolute z-50 w-72 backdrop-blur-xl bg-[#0a0a0b]/90 border border-[#2a2a2a] rounded-2xl p-5 shadow-2xl pointer-events-auto"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${accentColor}`}>
            {isSubject ? "Medical Subject" : `Season ${node.season}`}
          </p>
          <h3 className="text-white font-bold text-sm leading-snug">
            {isSubject ? node.label : node.episode}
          </h3>
          {!isSubject && (
            <p className="text-[#8E9299] text-xs mt-0.5 line-clamp-1">{node.diagnosis}</p>
          )}
        </div>
        <button onClick={onClose} className="text-[#4A4A4A] hover:text-white ml-2 shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className={`flex items-center gap-2 mb-4 text-xs font-mono ${accentColor}`}>
        {node.accuracy === null ? (
          <span className="text-[#4A4A4A]">Not yet attempted</span>
        ) : (
          <>
            {node.accuracy >= 80
              ? <CheckCircle2 className="w-3.5 h-3.5" />
              : node.accuracy < 50
              ? <AlertTriangle className="w-3.5 h-3.5" />
              : <Zap className="w-3.5 h-3.5" />}
            <span>{node.accuracy}% — {accuracyLabel}</span>
          </>
        )}
      </div>

      {isSubject && weakestCase && node.accuracy !== null && node.accuracy < 80 && (
        <button
          onClick={() => {
            const found = cases.find(c => c.id === weakestCase.id);
            if (found) onSelectCase(found);
          }}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#F27D26]/10 border border-[#F27D26]/30 rounded-xl text-[#F27D26] text-xs font-mono hover:bg-[#F27D26]/20 transition-all"
        >
          <span className="uppercase tracking-wider">Fix My Weakness</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {!isSubject && (
        <button
          onClick={() => {
            const found = cases.find(c => c.id === node.caseId);
            if (found) onSelectCase(found);
          }}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#151619] border border-[#141414] rounded-xl text-white text-xs font-mono hover:border-[#F27D26]/50 transition-all"
        >
          <span>{node.accuracy === null ? "Start Quiz" : "Retake Quiz"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

// ── Legend ────────────────────────────────────────────────────────────────────

const Legend: React.FC = () => (
  <div className="absolute bottom-6 left-6 bg-[#0a0a0b]/80 backdrop-blur border border-[#2a2a2a] rounded-xl px-4 py-3 flex gap-5">
    {[
      { color: "bg-[#4A4A4A]/60", label: "Untried" },
      { color: "bg-rose-500/80",    label: "< 50%" },
      { color: "bg-orange-400/80",  label: "50–79%" },
      { color: "bg-emerald-400/80", label: "≥ 80%" },
    ].map(({ color, label }) => (
      <div key={label} className="flex items-center gap-1.5">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
        <span className="text-[9px] font-mono text-[#8E9299] uppercase tracking-widest">{label}</span>
      </div>
    ))}
  </div>
);

// ── Header ────────────────────────────────────────────────────────────────────

const Header: React.FC<{ completedCount: number }> = ({ completedCount }) => (
  <div className="absolute top-6 left-6 z-10 pointer-events-none">
    <div className="flex items-center gap-2 mb-1">
      <NetworkIcon className="w-4 h-4 text-[#F27D26]" />
      <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">Knowledge Map</span>
    </div>
    <h1 className="text-3xl font-bold text-white tracking-tighter">
      Medical <span className="text-[#F27D26]">Constellation.</span>
    </h1>
    <p className="text-[#8E9299] text-xs mt-1 font-mono">
      {completedCount}/182 cases attempted · 13 subject domains
    </p>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ onSelectCase }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<{ node: GraphNode; x: number; y: number } | null>(null);
  const [focusedSubject, setFocusedSubject] = useState<string | null>(null);

  const { all } = useProgress();

  const graphData = useMemo(() => buildGraph(cases, all), [all]);

  const completedCount = Object.keys(all).length;

  // Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Nodes visible in the current focus state
  const visibleSet = useMemo(() => {
    if (!focusedSubject) return null;
    const subjectId = `subject::${focusedSubject}`;
    const connectedCases = new Set<string>();
    for (const link of graphData.links) {
      const src = typeof link.source === "object" ? (link.source as GraphNode).id : link.source;
      const tgt = typeof link.target === "object" ? (link.target as GraphNode).id : link.target;
      if (tgt === subjectId) connectedCases.add(src);
    }
    connectedCases.add(subjectId);
    return connectedCases;
  }, [focusedSubject, graphData]);

  const handleNodeClick = useCallback((node: unknown) => {
    const n = node as GraphNode;
    if (n.kind === "subject") {
      setFocusedSubject(prev => prev === n.subject ? null : (n.subject ?? null));
      setTooltip(null);
      return;
    }
    // Case node — close focus, show tooltip at canvas centre
    setFocusedSubject(null);
  }, []);

  const handleNodeHover = useCallback((node: unknown, _prev: unknown) => {
    if (!node) { setTooltip(null); return; }
    const n = node as GraphNode;
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    // Place tooltip near centre-top to avoid edge clipping
    setTooltip({ node: n, x: cx - 144, y: Math.max(20, cy - 280) });
  }, [dimensions]);

  // "Fix My Weakness" — first untried/weakest case for the focused subject
  const weakestCase = useMemo(() => {
    if (!focusedSubject) return null;
    const ranked = casesForSubject(focusedSubject, cases, all);
    return ranked[0] ?? null;
  }, [focusedSubject, all]);

  // Node canvas rendering
  const paintNode = useCallback((node: unknown, ctx: CanvasRenderingContext2D) => {
    const n = node as GraphNode & { x?: number; y?: number };
    const x = n.x ?? 0;
    const y = n.y ?? 0;
    const r = n.kind === "subject" ? 14 : 5;
    const dimmed = visibleSet !== null && !visibleSet.has(n.id);

    ctx.globalAlpha = dimmed ? 0.08 : 1;

    if (n.kind === "subject") {
      // Outer glow ring
      ctx.beginPath();
      ctx.arc(x, y, r + 4, 0, 2 * Math.PI);
      ctx.fillStyle = n.color.replace(/[\d.]+\)$/, "0.12)");
      ctx.fill();
    }

    // Fill circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = n.color;
    ctx.fill();

    if (n.kind === "subject") {
      // Label below hub
      ctx.globalAlpha = dimmed ? 0.08 : 0.9;
      ctx.fillStyle = "#e5e7eb";
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const words = n.label.split(" ");
      words.forEach((word, i) => ctx.fillText(word, x, y + r + 5 + i * 9));
    }

    ctx.globalAlpha = 1;
  }, [visibleSet]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <Header completedCount={completedCount} />

      {focusedSubject && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <div className="bg-[#0a0a0b]/80 backdrop-blur border border-[#F27D26]/30 rounded-xl px-4 py-2">
            <p className="text-[#F27D26] text-xs font-mono uppercase tracking-widest">{focusedSubject}</p>
          </div>
          <button
            onClick={() => setFocusedSubject(null)}
            className="p-2 bg-[#151619] border border-[#141414] rounded-lg text-[#8E9299] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="#050505"
        nodeCanvasObject={paintNode}
        nodeCanvasObjectMode={() => "replace"}
        linkColor={(link: unknown) => {
          const l = link as { color: string; source: unknown; target: unknown };
          const srcId = typeof l.source === "object" ? (l.source as GraphNode).id : l.source as string;
          const tgtId = typeof l.target === "object" ? (l.target as GraphNode).id : l.target as string;
          if (visibleSet && (!visibleSet.has(srcId) || !visibleSet.has(tgtId))) {
            return "rgba(255,255,255,0.01)";
          }
          return l.color || "rgba(255,255,255,0.06)";
        }}
        linkWidth={0.5}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        nodeLabel={() => ""}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />

      <Legend />

      <AnimatePresence>
        {tooltip && (
          <TooltipCard
            node={tooltip.node}
            x={tooltip.x}
            y={tooltip.y}
            onClose={() => setTooltip(null)}
            onSelectCase={onSelectCase}
            weakestCase={tooltip.node.kind === "subject" ? weakestCase : null}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
