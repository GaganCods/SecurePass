
import React, { useState, useMemo, useCallback } from 'react';
import { PasswordInput } from './PasswordInput';
import { StrengthMeter } from './StrengthMeter';
import { CrackTimeDisplay } from './CrackTimeDisplay';
import { RequirementChecklist } from './RequirementChecklist';
import { PasswordGenerator } from './PasswordGenerator';
import { calculatePasswordStrength, estimateCrackTime, improvePassword } from '../utils/passwordLogic';
import { COMMON_PASSWORDS } from '../constants';
import { Wand2, AlertTriangle, Sparkles, RotateCcw, ArrowUp } from 'lucide-react';

export const PasswordStrengthTool: React.FC = () => {
  // History State
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // The current password is derived from history
  const password = history[historyIndex];

  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  
  // Improvement State for UI Feedback (Comparison only)
  const [comparisonState, setComparisonState] = useState<{
    originalEntropy: number;
    improvedEntropy: number;
    show: boolean;
  } | null>(null);

  const strengthResult = useMemo(() => calculatePasswordStrength(password), [password]);
  const crackTimes = useMemo(() => estimateCrackTime(strengthResult.combinations), [strengthResult.combinations]);
  const isCommon = useMemo(() => COMMON_PASSWORDS.includes(password.toLowerCase()), [password]);
  const isVeryStrong = strengthResult.strength === 'very-strong';

  // Helper to push to history
  const pushHistory = useCallback((newPassword: string) => {
    setHistory(prev => {
        const currentSlice = prev.slice(0, historyIndex + 1);
        // Avoid duplicates if user clicks same button multiple times (though logic handles this upstream usually)
        if (currentSlice[currentSlice.length - 1] === newPassword) return prev;
        return [...currentSlice, newPassword];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Handle Undo/Redo
  const handleUndo = () => {
      if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1);
          setComparisonState(null); // Clear comparison card on manual navigation
      }
  };

  const handleRedo = () => {
      if (historyIndex < history.length - 1) {
          setHistoryIndex(historyIndex + 1);
          setComparisonState(null);
      }
  };

  const updatePassword = (newPassword: string) => {
      // Logic for typing:
      // If the change is small (1 char) and recent, ideally we'd group it.
      // For this implementation, we'll store every change but rely on the array being cheap.
      // This ensures exact undoability.
      pushHistory(newPassword);
      
      // Clear comparison state if user manually types
      if (comparisonState && comparisonState.show) {
          setComparisonState(null);
      }
  };

  const handleImprove = () => {
      if (!password) return;
      const improved = improvePassword(password);
      
      // Calculate entropy difference for the card
      const oldStrength = calculatePasswordStrength(password);
      const newStrength = calculatePasswordStrength(improved);
      
      pushHistory(improved);

      setComparisonState({
          originalEntropy: oldStrength.entropy,
          improvedEntropy: newStrength.entropy,
          show: true
      });
  };

  return (
    <div className="relative w-full pt-12 pb-24">
      {/* Seamless transition background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-gray-50/50 to-[var(--footer-base)] dark:from-transparent dark:via-black/10 dark:to-[var(--footer-base)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto animate-fade-in-up px-4 md:px-0">
        
        {/* 1. Headline - Centered, Clean */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Check Your Password
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 font-light">
            See how long it takes for a computer to crack it.
          </p>
        </div>

        {/* 2. Primary Input Container (Isolated) */}
        <div 
          className={`
              relative bg-white/80 dark:bg-gray-900/60 backdrop-blur-2xl 
              rounded-[32px] p-6 md:p-10 
              border transition-all duration-700 ease-out z-10 mb-8
              ${isVeryStrong 
                  ? 'border-green-500/50 shadow-[0_0_60px_rgba(34,197,94,0.15)] scale-[1.01] bg-white/90 dark:bg-gray-900/80' 
                  : 'border-white/50 dark:border-white/10 shadow-2xl'
              }
          `}
        >
          {/* Background Ambient Glow inside card */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-[32px] pointer-events-none transition-opacity duration-1000 ${isVeryStrong ? 'opacity-0' : 'opacity-100'}`} />

          <div className="relative z-10 flex flex-col gap-6">
              
              {/* Input Section */}
              <div>
                  <PasswordInput 
                      value={password} 
                      onChange={updatePassword} 
                      strengthResult={strengthResult}
                      onGenerate={() => setIsGeneratorOpen(true)}
                      onUndo={handleUndo}
                      onRedo={handleRedo}
                      canUndo={historyIndex > 0}
                      canRedo={historyIndex < history.length - 1}
                  />
              </div>

              {/* Common Password Warning */}
              {isCommon && (
                  <div className="flex items-center gap-3 p-4 bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-xl animate-in fade-in slide-in-from-top-2">
                      <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0" size={20} />
                      <span className="text-yellow-800 dark:text-yellow-400 text-sm font-medium">
                          This is a commonly used password. It can be cracked instantly.
                      </span>
                  </div>
              )}

              {/* Strength Meter */}
              <StrengthMeter strengthResult={strengthResult} />

              {/* ACTION BUTTONS ROW */}
              <div className="grid grid-cols-2 gap-4">
                  <button 
                      onClick={() => setIsGeneratorOpen(true)}
                      className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 font-semibold transition-all flex items-center justify-center gap-2 group"
                  >
                      <Wand2 size={18} className="group-hover:rotate-12 transition-transform text-gray-400 dark:text-gray-500" />
                      Generate
                  </button>

                  <button 
                      onClick={handleImprove}
                      disabled={!password}
                      className="py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      <Sparkles size={18} fill="currentColor" className="text-blue-200" />
                      Improve
                  </button>
              </div>
              
              {/* IMPROVED RESULT CARD (Conditional - shows only after explicit Improvement) */}
              {comparisonState && comparisonState.show && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-indigo-50/80 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20 rounded-2xl p-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Before</span>
                                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{Math.round(comparisonState.originalEntropy)} bits</span>
                              </div>
                              <ArrowUp className="text-indigo-500 rotate-90 md:rotate-0" size={20} />
                              <div className="flex flex-col">
                                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Now</span>
                                  <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                      {Math.round(comparisonState.improvedEntropy)} 
                                      <span className="text-xs font-normal text-gray-500 self-end mb-1">bits</span>
                                  </span>
                              </div>
                          </div>
                          
                          {/* We use the main undo logic now, but having a contextual revert here is nice UX too */}
                          <button 
                              onClick={handleUndo}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-black/20 text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-100 dark:border-white/5"
                          >
                              <RotateCcw size={12} />
                              Undo
                          </button>
                      </div>
                  </div>
              )}

          </div>
        </div>

        {/* 3. Detailed Stats Container (Stacked Below) */}
        <div className="flex flex-col gap-6">
            {/* Crack Times - Full Width for better internal layout */}
            <CrackTimeDisplay times={crackTimes} entropy={strengthResult.entropy} />
            
            {/* Checklist - Full Width */}
            <RequirementChecklist result={strengthResult} />
        </div>

        {/* 4. Educational Note */}
        <div className="text-center mt-12 max-w-lg mx-auto px-6">
          <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed font-medium">
            <span className="block mb-2 uppercase tracking-widest text-[10px] text-gray-300 dark:text-gray-600">Privacy Note</span>
            All calculations are performed locally on your device. <br className="hidden md:block"/> No data is ever sent to our servers.
          </p>
        </div>

        <PasswordGenerator 
            isOpen={isGeneratorOpen} 
            onClose={() => setIsGeneratorOpen(false)} 
            onGenerate={updatePassword}
        />
      </div>
    </div>
  );
};
