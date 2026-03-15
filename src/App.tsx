/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { SeasonView } from './components/SeasonView';
import { QuizView } from './components/QuizView';
import { AllCasesView } from './components/AllCasesView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { Case } from './data/cases';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSeason, setActiveSeason] = useState<number | null>(null);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [showAllCases, setShowAllCases] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  const handleSelectSeason = (season: number | null) => {
    setActiveSeason(season);
    setSelectedCase(null);
    setShowAllCases(false);
    setShowGraph(false);
  };

  const handleSelectCase = (caseData: Case) => {
    setSelectedCase(caseData);
    setShowAllCases(false);
    setShowGraph(false);
  };

  const handleGoHome = () => {
    setActiveSeason(null);
    setSelectedCase(null);
    setShowAllCases(false);
    setShowGraph(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
    setActiveSeason(null);
    setSelectedCase(null);
    setShowAllCases(false);
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-[#F27D26]/30 selection:text-[#F27D26]">
      <Sidebar
        activeSeason={activeSeason}
        onSelectSeason={handleSelectSeason}
        onGoHome={handleGoHome}
        onShowGraph={handleShowGraph}
        showGraph={showGraph}
      />
      
      <main className="flex-1 relative overflow-y-auto h-screen">
        <AnimatePresence mode="wait">
          {selectedCase ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <QuizView 
                caseData={selectedCase} 
                onClose={() => setSelectedCase(null)} 
              />
            </motion.div>
          ) : showGraph ? (
            <motion.div
              key="graph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-screen"
            >
              <KnowledgeGraphView onSelectCase={handleSelectCase} />
            </motion.div>
          ) : showAllCases ? (
            <motion.div
              key="all-cases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <AllCasesView
                onSelectCase={handleSelectCase}
                onBack={handleGoHome}
              />
            </motion.div>
          ) : activeSeason !== null ? (
            <motion.div
              key={`season-${activeSeason}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <SeasonView
                season={activeSeason}
                onSelectCase={handleSelectCase}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <HomeView onSelectCase={handleSelectCase} onViewAll={() => setShowAllCases(true)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative elements */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#F27D26]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[300px] h-[300px] bg-[#FF4444]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      </main>
    </div>
  );
}
