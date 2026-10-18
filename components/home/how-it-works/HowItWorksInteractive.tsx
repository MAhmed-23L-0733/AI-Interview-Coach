'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StepNavTabs } from './StepNavTabs';
import { StepDetailCard } from './StepDetailCard';
import { StepConfigureVisual } from './StepConfigureVisual';
import { StepSessionVisual } from './StepSessionVisual';
import { StepReportVisual } from './StepReportVisual';
import { HOW_IT_WORKS_STEPS } from './howItWorksData';
import type { StepId } from './types';

export function HowItWorksInteractive(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState<StepId>('configure');

  const currentIndex = HOW_IT_WORKS_STEPS.findIndex((s) => s.id === activeStep);
  const currentStep = HOW_IT_WORKS_STEPS[currentIndex] ?? HOW_IT_WORKS_STEPS[0];

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      setActiveStep(HOW_IT_WORKS_STEPS[currentIndex - 1].id);
    }
  };

  const handleNext = (): void => {
    if (currentIndex < HOW_IT_WORKS_STEPS.length - 1) {
      setActiveStep(HOW_IT_WORKS_STEPS[currentIndex + 1].id);
    }
  };

  const renderVisual = (): React.JSX.Element => {
    switch (activeStep) {
      case 'configure':
        return <StepConfigureVisual />;
      case 'session':
        return <StepSessionVisual />;
      case 'report':
        return <StepReportVisual />;
    }
  };

  return (
    <div className="w-full">
      <StepNavTabs
        steps={HOW_IT_WORKS_STEPS}
        activeStep={activeStep}
        onSelectStep={setActiveStep}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl border border-slate-800 bg-[#06111E]/70 p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl shadow-blue-950/20">
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <StepDetailCard
                step={currentStep}
                hasPrev={currentIndex > 0}
                hasNext={currentIndex < HOW_IT_WORKS_STEPS.length - 1}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderVisual()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
