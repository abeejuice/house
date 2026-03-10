
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2, XCircle, Brain, Activity, Stethoscope, HeartPulse, Trophy, RotateCcw } from 'lucide-react';
import { Case } from '../data/cases';
import { getQuizForCase, QuizQuestion, QuizOption } from '../services/quizService';

interface QuizViewProps {
  caseData: Case;
  onClose: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ caseData, onClose }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ question: string; selected: QuizOption; correct: QuizOption }[]>([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      const quizQuestions = await getQuizForCase(caseData);
      setQuestions(quizQuestions);
      setLoading(false);
    };
    fetchQuiz();
  }, [caseData]);

  const handleOptionSelect = (option: QuizOption) => {
    if (selectedOption) return;
    setSelectedOption(option);
    
    const correctOption = questions[currentQuestionIndex].options.find(o => o.type === 'correct')!;
    setAnswers([...answers, { question: questions[currentQuestionIndex].question, selected: option, correct: correctOption }]);

    if (option.type === 'correct') {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

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

  if (showResult) {
    const percentage = (score / questions.length) * 100;
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

          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="px-8 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2"
            >
              Next Case <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentQuestionIndex(0);
                setScore(0);
                setAnswers([]);
                setSelectedOption(null);
              }}
              className="px-8 py-4 border border-[#141414] text-white font-bold rounded-xl hover:bg-[#151619] transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Retake Quiz
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white mb-6">Clinical Review</h3>
          {answers.map((answer, i) => (
            <div key={i} className="bg-[#151619] border border-[#141414] rounded-xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  answer.selected.type === 'correct' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                }`}>
                  {answer.selected.type === 'correct' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white font-medium mb-2">{answer.question}</p>
                  <p className="text-xs font-mono text-[#8E9299] uppercase tracking-widest mb-4">Bloom's Level: {questions[i].bloomLevel}</p>
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
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Differential Diagnosis</h2>
          <p className="text-[#8E9299] text-sm">Case: {caseData.episode} - Patient: {caseData.patient}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#F27D26]">{currentQuestionIndex + 1}/{questions.length}</p>
          <p className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest">Question</p>
        </div>
      </div>

      <div className="w-full h-1 bg-[#141414] rounded-full mb-12 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          className="h-full bg-[#F27D26]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-8"
        >
          <div className="bg-[#151619] border border-[#141414] rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-5 h-5 text-[#F27D26]" />
              <span className="text-[10px] font-mono text-[#F27D26] uppercase tracking-widest">{currentQuestion.bloomLevel}</span>
            </div>
            <h3 className="text-2xl font-medium text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={!selectedOption ? { scale: 1.01, x: 10 } : {}}
                whileTap={!selectedOption ? { scale: 0.99 } : {}}
                onClick={() => handleOptionSelect(option)}
                disabled={!!selectedOption}
                className={`w-full text-left p-6 rounded-xl border transition-all flex items-center justify-between group ${
                  selectedOption === option
                    ? option.type === 'correct'
                      ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-rose-500/10 border-rose-500 text-white'
                    : selectedOption && option.type === 'correct'
                      ? 'bg-emerald-500/10 border-emerald-500 text-white'
                      : 'bg-[#151619] border-[#141414] text-[#8E9299] hover:border-[#F27D26] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm border ${
                    selectedOption === option
                      ? 'border-white/20'
                      : 'border-[#141414] group-hover:border-[#F27D26]/50'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-lg font-medium">{option.text}</span>
                </div>
                
                {selectedOption && (
                  <div className="shrink-0">
                    {option.type === 'correct' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : selectedOption === option ? (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    ) : null}
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className={`p-6 rounded-xl border ${
                  selectedOption.type === 'correct' ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-rose-500/5 border-rose-500/30'
                }`}>
                  <h4 className={`text-sm font-bold uppercase tracking-widest mb-2 ${
                    selectedOption.type === 'correct' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {selectedOption.type === 'correct' ? 'Correct Reasoning' : 'Diagnostic Error'}
                  </h4>
                  <p className="text-[#8E9299] leading-relaxed italic">
                    {selectedOption.explanation}
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-10 py-4 bg-[#F27D26] text-black font-bold rounded-xl hover:bg-[#FF8B3D] transition-all flex items-center gap-2 shadow-lg shadow-[#F27D26]/20"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
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
};
