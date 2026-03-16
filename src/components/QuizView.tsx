
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight, CheckCircle2, XCircle, Brain, HeartPulse,
  Trophy, RotateCcw, BookOpen, ExternalLink, FlaskConical, ArrowLeft,
} from 'lucide-react';
import { Case } from '../data/cases';
import { getEnhancedQuizForCase, getQuizForCase, QuizQuestion, QuizOption } from '../services/quizService';
import { EnhancedQuizQuestion, EnhancedQuizOption, DISTANCE_COLOR } from '../data/quizzes';
import { NMCCompetencies } from './NMCCompetencies';
import { useProgress } from '../context/ProgressContext';

interface QuizViewProps {
  caseData: Case;
  onClose: () => void;
}

// ─── Weighted Clinical Reasoning Score ───────────────────────────────────────
// correct=3, similar_wrong=2, misconception=1, wildly_wrong=0
const POINTS: Record<string, number> = {
  correct: 3, similar_wrong: 2, misconception: 1, wildly_wrong: 0,
  // legacy types
  distractor: 1, misconception_legacy: 1, wrong: 0,
};

function optionPoints(type: string): number {
  return POINTS[type] ?? 0;
}

// ─── Enhanced mode types ──────────────────────────────────────────────────────

type EnhancedAnswer = {
  question: EnhancedQuizQuestion;
  selected: EnhancedQuizOption;
};

type LegacyAnswer = {
  question: string;
  selected: QuizOption;
  correct: QuizOption;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const PubMedBadge: React.FC<{ pmid: string; title: string; pubType: string }> = ({ pmid, title, pubType }) => (
  <div className="flex items-start gap-2 p-3 bg-[#050505] border border-[#141414] rounded-lg mt-3">
    <BookOpen className="w-3.5 h-3.5 text-[#F27D26] shrink-0 mt-0.5" />
    <div className="min-w-0">
      <p className="text-[9px] font-mono uppercase tracking-widest text-[#F27D26] mb-0.5">
        PubMed · {pubType}
      </p>
      <p className="text-[#8E9299] text-xs leading-snug line-clamp-2">{title}</p>
      {pmid && (
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[#F27D26]/70 hover:text-[#F27D26] flex items-center gap-0.5 mt-0.5"
        >
          PMID {pmid} <ExternalLink className="w-2.5 h-2.5" />
        </a>
      )}
    </div>
  </div>
);

const CompetencyTag: React.FC<{ code: string; text: string }> = ({ code, text }) => (
  <div className="flex items-center gap-2 mt-3">
    <span className="text-[9px] font-mono font-bold text-[#F27D26] bg-[#F27D26]/10 px-2 py-0.5 rounded border border-[#F27D26]/20 whitespace-nowrap shrink-0">
      {code}
    </span>
    <p className="text-[#8E9299] text-xs line-clamp-2">{text}</p>
  </div>
);

// ─── Enhanced Results screen ──────────────────────────────────────────────────

const EnhancedResults: React.FC<{
  caseData: Case;
  answers: EnhancedAnswer[];
  questions: EnhancedQuizQuestion[];
  onClose: () => void;
  onRetake: () => void;
}> = ({ caseData, answers, questions, onClose, onRetake }) => {
  const maxScore = questions.length * 3;
  const earned = answers.reduce((sum, a) => sum + optionPoints(a.selected.type), 0);
  const percentage = maxScore > 0 ? Math.round((earned / maxScore) * 100) : 0;
  const correctCount = answers.filter(a => a.selected.type === 'correct').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      {/* Score card */}
      <div className="bg-[#151619] border border-[#141414] rounded-2xl p-12 text-center mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F27D26] to-[#FF4444]" />
        <div className="w-24 h-24 bg-[#F27D26]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Trophy className="w-12 h-12 text-[#F27D26]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Diagnostic Evaluation Complete</h2>
        <p className="text-[#8E9299] text-lg mb-8">
          Case: {caseData.episode} — Patient: {caseData.patient}
        </p>

        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          <div>
            <p className="text-5xl font-bold text-white mb-2">{correctCount}/{questions.length}</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Correct</p>
          </div>
          <div className="w-px h-16 bg-[#141414]" />
          <div>
            <p className="text-5xl font-bold text-[#F27D26] mb-2">{earned}/{maxScore}</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Clinical Reasoning Score</p>
          </div>
          <div className="w-px h-16 bg-[#141414]" />
          <div>
            <p className="text-5xl font-bold text-white mb-2">{percentage}%</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Weighted Accuracy</p>
          </div>
        </div>

        {/* Scoring guide */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 text-[10px] font-mono">
          {[
            ['correct', 'Correct', '3 pts'],
            ['similar_wrong', 'Close', '2 pts'],
            ['misconception', 'Misconception', '1 pt'],
            ['wildly_wrong', 'Way off', '0 pts'],
          ].map(([type, label, pts]) => (
            <span key={type} className={`px-2 py-1 rounded border ${DISTANCE_COLOR[type as keyof typeof DISTANCE_COLOR]}`}>
              {label} — {pts}
            </span>
          ))}
        </div>

        <div className="bg-[#050505] border border-[#141414] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-[#F27D26] font-mono text-xs uppercase tracking-widest mb-4">
            Final Diagnosis Revealed
          </h3>
          <p className="text-2xl font-bold text-white mb-2">{caseData.diagnosis}</p>
          <p className="text-[#8E9299] text-sm italic">
            "Everybody lies, but the symptoms don't."
          </p>
        </div>

        <NMCCompetencies caseId={caseData.id} diagnosis={caseData.diagnosis} />

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={onClose}
            className="px-8 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2"
          >
            Next Case <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={onRetake}
            className="px-8 py-4 border border-[#141414] text-white font-bold rounded-xl hover:bg-[#151619] transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" /> Retake
          </button>
        </div>
      </div>

      {/* Per-question review */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-6">Clinical Review</h3>
        {answers.map((ans, i) => {
          const pts = optionPoints(ans.selected.type);
          const isCorrect = ans.selected.type === 'correct';
          return (
            <div key={i} className="bg-[#151619] border border-[#141414] rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isCorrect ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">{ans.question.question}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-mono text-[#8E9299] uppercase tracking-widest">
                      {ans.question.bloomLevel}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${DISTANCE_COLOR[ans.selected.type]}`}>
                      {ans.selected.distanceLabel} · {pts}/3 pts
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${DISTANCE_COLOR[ans.selected.type]}`}>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299] mb-1">Your Answer</p>
                  <p className="text-white text-sm mb-2">{ans.selected.text}</p>
                  <p className="text-[#8E9299] text-xs italic">{ans.selected.explanation}</p>
                </div>
                {!isCorrect && (() => {
                  const correct = ans.question.options.find(o => o.type === 'correct');
                  return correct ? (
                    <div className="p-4 rounded-lg border border-emerald-500/40 bg-emerald-500/5">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299] mb-1">Correct Answer</p>
                      <p className="text-white text-sm mb-2">{correct.text}</p>
                      <p className="text-[#8E9299] text-xs italic">{correct.explanation}</p>
                    </div>
                  ) : null;
                })()}
              </div>

              <CompetencyTag code={ans.question.competencyCode} text={ans.question.competencyText} />
              <PubMedBadge
                pmid={ans.question.pubmedSource.pmid}
                title={ans.question.pubmedSource.title}
                pubType={ans.question.pubmedSource.publicationType}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// ─── Legacy Results screen (unchanged) ───────────────────────────────────────

const LegacyResults: React.FC<{
  caseData: Case;
  score: number;
  questions: QuizQuestion[];
  answers: LegacyAnswer[];
  onClose: () => void;
  onRetake: () => void;
}> = ({ caseData, score, questions, answers, onClose, onRetake }) => {
  const percentage = Math.round((score / questions.length) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto py-12 px-6"
    >
      <div className="bg-[#151619] border border-[#141414] rounded-2xl p-12 text-center mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F27D26] to-[#FF4444]" />
        <div className="w-24 h-24 bg-[#F27D26]/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Trophy className="w-12 h-12 text-[#F27D26]" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Diagnostic Evaluation Complete</h2>
        <p className="text-[#8E9299] text-lg mb-8">Case: {caseData.episode} - Patient: {caseData.patient}</p>
        <div className="flex justify-center gap-12 mb-12">
          <div>
            <p className="text-5xl font-bold text-white mb-2">{score}/{questions.length}</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Final Score</p>
          </div>
          <div className="w-px h-16 bg-[#141414]" />
          <div>
            <p className="text-5xl font-bold text-[#F27D26] mb-2">{percentage}%</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Accuracy</p>
          </div>
        </div>
        <div className="bg-[#050505] border border-[#141414] rounded-xl p-8 mb-8 text-left">
          <h3 className="text-[#F27D26] font-mono text-xs uppercase tracking-widest mb-4">Final Diagnosis Revealed</h3>
          <p className="text-2xl font-bold text-white mb-2">{caseData.diagnosis}</p>
          <p className="text-[#8E9299] text-sm italic">"Everybody lies, but the symptoms don't."</p>
        </div>
        <NMCCompetencies caseId={caseData.id} diagnosis={caseData.diagnosis} />
        <div className="flex gap-4 justify-center mt-8">
          <button onClick={onClose} className="px-8 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2">
            Next Case <ChevronRight className="w-5 h-5" />
          </button>
          <button onClick={onRetake} className="px-8 py-4 border border-[#141414] text-white font-bold rounded-xl hover:bg-[#151619] transition-all flex items-center gap-2">
            <RotateCcw className="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-6">Clinical Review</h3>
        {answers.map((answer, i) => (
          <div key={i} className="bg-[#151619] border border-[#141614] rounded-xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                answer.selected.type === 'correct' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {answer.selected.type === 'correct' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-white font-medium mb-2">{answer.question}</p>
                <p className="text-xs font-mono text-[#8E9299] uppercase tracking-widest mb-4">
                  Bloom's Level: {questions[i].bloomLevel}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${answer.selected.type === 'correct' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`}>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299] mb-1">Your Selection</p>
                <p className="text-white text-sm mb-2">{answer.selected.text}</p>
                <p className="text-[#8E9299] text-xs italic">{answer.selected.explanation}</p>
              </div>
              {answer.selected.type !== 'correct' && (
                <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E9299] mb-1">Correct Answer</p>
                  <p className="text-white text-sm mb-2">{answer.correct.text}</p>
                  <p className="text-[#8E9299] text-xs italic">{answer.correct.explanation}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Main QuizView component ──────────────────────────────────────────────────

export const QuizView: React.FC<QuizViewProps> = ({ caseData, onClose }) => {
  const { save } = useProgress();
  const [mode, setMode] = useState<'enhanced' | 'legacy' | null>(null);

  // Enhanced state
  const [enhancedQuestions, setEnhancedQuestions] = useState<EnhancedQuizQuestion[]>([]);
  const [enhancedAnswers, setEnhancedAnswers] = useState<EnhancedAnswer[]>([]);

  // Legacy state
  const [legacyQuestions, setLegacyQuestions] = useState<QuizQuestion[]>([]);
  const [legacyScore, setLegacyScore] = useState(0);
  const [legacyAnswers, setLegacyAnswers] = useState<LegacyAnswer[]>([]);

  // Shared state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<EnhancedQuizOption | QuizOption | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEnhancedQuizForCase(caseData).then(enhanced => {
      if (enhanced && enhanced.length > 0) {
        setEnhancedQuestions(enhanced);
        setMode('enhanced');
        setLoading(false);
        return;
      }
      // Fall back to legacy/AI
      setMode('legacy');
      getQuizForCase(caseData).then(qs => {
        setLegacyQuestions(qs);
        setLoading(false);
      });
    });
  }, [caseData]);

  const handleRetake = () => {
    setShowResult(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setEnhancedAnswers([]);
    setLegacyScore(0);
    setLegacyAnswers([]);
  };

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#F27D26]/20 border-t-[#F27D26] rounded-full"
          />
          <HeartPulse className="w-6 h-6 text-[#F27D26] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-medium text-white mb-2">Analyzing Patient Data...</h2>
          <p className="text-[#8E9299] text-sm font-mono uppercase tracking-widest">Generating Diagnostic Quiz</p>
        </div>
      </div>
    );
  }

  // ── Enhanced results ─────────────────────────────────────────────────────────
  if (showResult && mode === 'enhanced') {
    return (
      <EnhancedResults
        caseData={caseData}
        answers={enhancedAnswers}
        questions={enhancedQuestions}
        onClose={onClose}
        onRetake={handleRetake}
      />
    );
  }

  // ── Legacy results ───────────────────────────────────────────────────────────
  if (showResult && mode === 'legacy') {
    return (
      <LegacyResults
        caseData={caseData}
        score={legacyScore}
        questions={legacyQuestions}
        answers={legacyAnswers}
        onClose={onClose}
        onRetake={handleRetake}
      />
    );
  }

  // ── Enhanced quiz ────────────────────────────────────────────────────────────
  if (mode === 'enhanced' && enhancedQuestions.length > 0) {
    const q = enhancedQuestions[currentIndex];
    const sel = selectedOption as EnhancedQuizOption | null;

    const handleSelect = (opt: EnhancedQuizOption) => {
      if (sel) return;
      setSelectedOption(opt);
    };

    const handleNext = () => {
      const newAnswers = [...enhancedAnswers, { question: q, selected: sel! }];
      setEnhancedAnswers(newAnswers);
      if (currentIndex < enhancedQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        const maxPoints = enhancedQuestions.length * 3;
        const earnedPoints = newAnswers.reduce((s, a) => s + optionPoints(a.selected.type), 0);
        const correctCount = newAnswers.filter(a => a.selected.type === 'correct').length;
        const bloomBreakdown: Record<string, { correct: number; total: number }> = {};
        const competencyBreakdown: Record<string, { correct: number; total: number }> = {};
        for (const a of newAnswers) {
          const lvl = a.question.bloomLevel;
          if (!bloomBreakdown[lvl]) bloomBreakdown[lvl] = { correct: 0, total: 0 };
          bloomBreakdown[lvl].total++;
          if (a.selected.type === 'correct') bloomBreakdown[lvl].correct++;

          const code = a.question.competencyCode;
          if (code) {
            if (!competencyBreakdown[code]) competencyBreakdown[code] = { correct: 0, total: 0 };
            competencyBreakdown[code].total++;
            if (a.selected.type === 'correct') competencyBreakdown[code].correct++;
          }
        }
        save({
          caseId: caseData.id,
          earnedPoints,
          maxPoints,
          correctCount,
          totalQuestions: enhancedQuestions.length,
          mode: 'enhanced',
          completedAt: new Date().toISOString(),
          bloomBreakdown,
          competencyBreakdown,
        });
        setShowResult(true);
      }
    };

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[#8E9299] hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Case
            </button>
            <h2 className="text-2xl font-bold text-white mb-1">Differential Diagnosis</h2>
            <p className="text-[#8E9299] text-sm">Case: {caseData.episode} — {caseData.patient}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#F27D26]">{currentIndex + 1}/{enhancedQuestions.length}</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Question</p>
          </div>
        </div>

        <div className="w-full h-1 bg-[#141414] rounded-full mb-12 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / enhancedQuestions.length) * 100}%` }}
            className="h-full bg-[#F27D26]"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-[#151619] border border-[#141414] rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-[#F27D26]" />
                  <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">
                    {q.bloomLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-3.5 h-3.5 text-[#8E9299]" />
                  <span className="text-[9px] font-mono text-[#8E9299]">{q.competencyCode}</span>
                </div>
              </div>
              <h3 className="text-2xl font-medium text-white leading-relaxed">{q.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, i) => {
                const isSelected = sel === opt;
                const colorClass = 'bg-[#151619] border-[#141414] text-[#8E9299] hover:border-[#F27D26] hover:text-white';

                return (
                  <motion.button
                    key={i}
                    whileHover={!sel ? { scale: 1.01, x: 10 } : {}}
                    whileTap={!sel ? { scale: 0.99 } : {}}
                    onClick={() => handleSelect(opt)}
                    disabled={!!sel}
                    className={`w-full text-left p-6 rounded-xl border transition-all flex items-center justify-between group ${colorClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm border ${
                        isSelected ? 'border-white/20' : 'border-[#141414] group-hover:border-[#F27D26]/50'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="text-lg font-medium">{opt.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {sel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {sel.explanation && (
                    <div className={`p-6 rounded-xl border ${DISTANCE_COLOR[sel.type]}`}>
                      <h4 className={`text-sm font-bold uppercase tracking-widest mb-2 ${DISTANCE_COLOR[sel.type].split(' ')[0]}`}>
                        {sel.type === 'correct' ? 'Correct Reasoning' : sel.distanceLabel}
                      </h4>
                      <p className="text-[#8E9299] leading-relaxed italic">{sel.explanation}</p>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-10 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2 shadow-lg shadow-[#F27D26]/20"
                    >
                      {currentIndex < enhancedQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // ── Legacy quiz ──────────────────────────────────────────────────────────────
  if (mode === 'legacy' && legacyQuestions.length > 0) {
    const q = legacyQuestions[currentIndex];
    const sel = selectedOption as QuizOption | null;

    const handleSelect = (opt: QuizOption) => {
      if (sel) return;
      setSelectedOption(opt);
      if (opt.type === 'correct') setLegacyScore(s => s + 1);
    };

    const handleNext = () => {
      const correct = q.options.find(o => o.type === 'correct')!;
      const newAnswers = [...legacyAnswers, { question: q.question, selected: sel!, correct }];
      setLegacyAnswers(newAnswers);
      if (currentIndex < legacyQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        const finalScore = newAnswers.filter(a => a.selected.type === 'correct').length;
        const bloomBreakdown: Record<string, { correct: number; total: number }> = {};
        for (let i = 0; i < newAnswers.length; i++) {
          const lvl = legacyQuestions[i]?.bloomLevel ?? 'Unknown';
          if (!bloomBreakdown[lvl]) bloomBreakdown[lvl] = { correct: 0, total: 0 };
          bloomBreakdown[lvl].total++;
          if (newAnswers[i].selected.type === 'correct') bloomBreakdown[lvl].correct++;
        }
        save({
          caseId: caseData.id,
          earnedPoints: finalScore,
          maxPoints: legacyQuestions.length,
          correctCount: finalScore,
          totalQuestions: legacyQuestions.length,
          mode: 'legacy',
          completedAt: new Date().toISOString(),
          bloomBreakdown,
          competencyBreakdown: {}, // legacy questions don't carry competency codes
        });
        setShowResult(true);
      }
    };

    return (
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-[#8E9299] hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mb-3"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Case
            </button>
            <h2 className="text-2xl font-bold text-white mb-1">Differential Diagnosis</h2>
            <p className="text-[#8E9299] text-sm">Case: {caseData.episode} - Patient: {caseData.patient}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#F27D26]">{currentIndex + 1}/{legacyQuestions.length}</p>
            <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Question</p>
          </div>
        </div>
        <div className="w-full h-1 bg-[#141414] rounded-full mb-12 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / legacyQuestions.length) * 100}%` }}
            className="h-full bg-[#F27D26]"
          />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="bg-[#151619] border border-[#141414] rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-5 h-5 text-[#F27D26]" />
                <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">{q.bloomLevel}</span>
              </div>
              <h3 className="text-2xl font-medium text-white leading-relaxed">{q.question}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={!sel ? { scale: 1.01, x: 10 } : {}}
                  whileTap={!sel ? { scale: 0.99 } : {}}
                  onClick={() => handleSelect(opt)}
                  disabled={!!sel}
                  className={`w-full text-left p-6 rounded-xl border transition-all flex items-center justify-between group ${
                    sel === opt
                      ? opt.type === 'correct' ? 'bg-emerald-500/10 border-emerald-500 text-white' : 'bg-rose-500/10 border-rose-500 text-white'
                      : sel && opt.type === 'correct' ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-[#151619] border-[#141414] text-[#8E9299] hover:border-[#F27D26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm border ${
                      sel === opt ? 'border-white/20' : 'border-[#141414] group-hover:border-[#F27D26]/50'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-lg font-medium">{opt.text}</span>
                  </div>
                  {sel && (
                    <div className="shrink-0">
                      {opt.type === 'correct' ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                      ) : sel === opt ? (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      ) : null}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
            <AnimatePresence>
              {sel && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className={`p-6 rounded-xl border ${sel.type === 'correct' ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'}`}>
                    <h4 className={`text-sm font-bold uppercase tracking-widest mb-2 ${sel.type === 'correct' ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {sel.type === 'correct' ? 'Correct Reasoning' : 'Diagnostic Error'}
                    </h4>
                    <p className="text-[#8E9299] leading-relaxed italic">{sel.explanation}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-10 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2 shadow-lg shadow-[#F27D26]/20"
                    >
                      {currentIndex < legacyQuestions.length - 1 ? 'Next Question' : 'View Results'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return null;
};
