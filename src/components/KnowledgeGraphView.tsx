import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { motion, AnimatePresence } from "motion/react";
import { NetworkIcon, X, ChevronRight, AlertTriangle, CheckCircle2, Zap } from "lucide-react";
import { Case, cases } from "../data/cases";
import { useProgress } from "../context/ProgressContext";
import { buildGraph, casesForSubject, GraphNode, GraphLink } from "../services/graphBuilder";

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

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveId(val: unknown): string {
  return typeof val === "object" && val !== null ? (val as GraphNode).id : val as string;
}

// ── Main component ────────────────────────────────────────────────────────────

export const KnowledgeGraphView: React.FC<KnowledgeGraphViewProps> = ({ onSelectCase }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<{ node: GraphNode; x: number; y: number } | null>(null);
  const [focusedSubject, setFocusedSubject] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<{ link: GraphLink; x: number; y: number } | null>(null);

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

  // Nodes visible in the current focus/selection state
  const visibleSet = useMemo(() => {
    // Mode 1: subject focused — hub + connected case satellites
    if (focusedSubject) {
      const subjectId = `subject::${focusedSubject}`;
      const visible = new Set<string>();
      for (const link of graphData.links) {
        const src = resolveId(link.source);
        const tgt = resolveId(link.target);
        if (tgt === subjectId) visible.add(src);
      }
      visible.add(subjectId);
      return visible;
    }
    // Mode 2: case selected — case + its connected subject hubs
    if (selectedCase) {
      const caseId = `case::${selectedCase}`;
      const visible = new Set<string>([caseId]);
      for (const link of graphData.links) {
        const src = resolveId(link.source);
        const tgt = resolveId(link.target);
        if (src === caseId) visible.add(tgt);
      }
      return visible;
    }
    return null;
  }, [focusedSubject, selectedCase, graphData]);

  const handleNodeClick = useCallback((node: unknown) => {
    const n = node as GraphNode;
    if (n.kind === "subject") {
      setSelectedCase(null);
      setHoveredLink(null);
      setFocusedSubject(prev => prev === n.subject ? null : (n.subject ?? null));
      setTooltip(null);
      return;
    }
    // Case node — toggle selected, clear subject focus
    setFocusedSubject(null);
    setHoveredLink(null);
    setSelectedCase(prev => prev === n.caseId ? null : (n.caseId ?? null));
  }, []);

  const handleNodeHover = useCallback((node: unknown, _prev: unknown) => {
    setHoveredLink(null); // clear edge tooltip when hovering a node
    if (!node) { setTooltip(null); return; }
    const n = node as GraphNode;
    const cx = dimensions.width / 2;
    const cy = dimensions.height / 2;
    setTooltip({ node: n, x: cx - 144, y: Math.max(20, cy - 280) });
  }, [dimensions]);

  const handleLinkHover = useCallback((link: unknown, _prev: unknown) => {
    if (!link) { setHoveredLink(null); return; }
    const l = link as GraphLink & { source: unknown; target: unknown };
    const src = l.source as { x?: number; y?: number };
    const tgt = l.target as { x?: number; y?: number };
    const mx = ((src.x ?? 0) + (tgt.x ?? 0)) / 2;
    const my = ((src.y ?? 0) + (tgt.y ?? 0)) / 2;
    setHoveredLink({ link: l as GraphLink, x: mx, y: my });
    setTooltip(null); // clear node tooltip when hovering an edge
  }, []);

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
    const isSelected = n.kind === "case" && n.caseId === selectedCase;
    const isFocused = n.kind === "subject" && n.subject === focusedSubject;
    const isConnectedSubject = n.kind === "subject" && visibleSet !== null && visibleSet.has(n.id) && selectedCase !== null;

    ctx.globalAlpha = dimmed ? 0.05 : 1;

    // Indigo glow ring for case-select mode: selected case + its subject connections
    if (!dimmed && (isSelected || isConnectedSubject)) {
      ctx.beginPath();
      ctx.arc(x, y, r + 6, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.18)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y, r + 3, 0, 2 * Math.PI);
      ctx.fillStyle = isSelected ? "rgba(139,92,246,0.45)" : "rgba(139,92,246,0.25)";
      ctx.fill();
    }

    if (n.kind === "subject") {
      // Outer accuracy glow ring
      ctx.beginPath();
      ctx.arc(x, y, r + 4, 0, 2 * Math.PI);
      ctx.fillStyle = isFocused
        ? n.color.replace(/[\d.]+\)$/, "0.3)")   // brighter when focused
        : n.color.replace(/[\d.]+\)$/, "0.12)");
      ctx.fill();
    }

    // Fill circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = n.color;
    ctx.fill();

    // Bright outline ring for focused subject hub
    if (isFocused) {
      ctx.beginPath();
      ctx.arc(x, y, r + 1.5, 0, 2 * Math.PI);
      ctx.strokeStyle = n.color.replace(/[\d.]+\)$/, "0.9)");
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    if (n.kind === "subject") {
      // Label below hub
      ctx.globalAlpha = dimmed ? 0.05 : 0.9;
      ctx.fillStyle = "#e5e7eb";
      ctx.font = "bold 7px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const words = n.label.split(" ");
      words.forEach((word, i) => ctx.fillText(word, x, y + r + 5 + i * 9));
    }

    ctx.globalAlpha = 1;
  }, [visibleSet, selectedCase, focusedSubject]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      <Header completedCount={completedCount} />

      {(focusedSubject || selectedCase) && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
          <div className={`bg-[#0a0a0b]/80 backdrop-blur border rounded-xl px-4 py-2 ${
            selectedCase ? "border-violet-500/30" : "border-[#F27D26]/30"
          }`}>
            <p className={`text-xs font-mono uppercase tracking-widest ${
              selectedCase ? "text-violet-400" : "text-[#F27D26]"
            }`}>
              {focusedSubject ?? cases.find(c => c.id === selectedCase)?.episode ?? selectedCase}
            </p>
          </div>
          <button
            onClick={() => { setFocusedSubject(null); setSelectedCase(null); }}
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
          const l = link as GraphLink & { source: unknown; target: unknown };
          const srcId = resolveId(l.source);
          const tgtId = resolveId(l.target);
          const inVisible = visibleSet !== null && visibleSet.has(srcId) && visibleSet.has(tgtId);
          if (visibleSet && !inVisible) return "rgba(255,255,255,0.01)";
          if (inVisible && focusedSubject) return (l.color || "rgba(74,74,74,1)").replace(/[\d.]+\)$/, "0.7)");
          if (inVisible && selectedCase)  return "rgba(139,92,246,0.7)";
          return l.color || "rgba(255,255,255,0.06)";
        }}
        linkWidth={(link: unknown) => {
          const l = link as GraphLink & { source: unknown; target: unknown };
          const srcId = resolveId(l.source);
          const tgtId = resolveId(l.target);
          if (visibleSet && visibleSet.has(srcId) && visibleSet.has(tgtId)) return 2;
          return 0.5;
        }}
        onNodeClick={handleNodeClick}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        nodeLabel={() => ""}
        cooldownTicks={120}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />

      <Legend />

      {/* Edge hover tooltip */}
      {hoveredLink && (
        <div
          className="absolute z-30 pointer-events-none bg-[#0a0a0b]/95 border border-[#F27D26]/25 rounded-lg px-3 py-2 max-w-xs shadow-lg"
          style={{ left: hoveredLink.x - 120, top: hoveredLink.y - 44 }}
        >
          <span className="text-[#F27D26] font-mono text-[10px] font-bold mr-2">
            {hoveredLink.link.competencyCode}
          </span>
          <span className="text-[#8E9299] text-[10px] leading-tight">
            {hoveredLink.link.competencyText}
          </span>
        </div>
      )}

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
