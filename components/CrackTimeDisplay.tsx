import React, { useEffect, useState, useRef } from 'react';
import { CrackTimeScenarios } from '../types';
import { Shield, Zap, Globe, Activity } from 'lucide-react';

interface CrackTimeDisplayProps {
  times: CrackTimeScenarios;
  entropy: number;
}

// Hook for counting up numbers
const useCountUp = (end: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / duration, 1);
      // Ease out quart
      const ease = 1 - Math.pow(1 - percentage, 4);
      
      const nextCount = Math.floor(countRef.current + (end - countRef.current) * ease);
      setCount(nextCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        countRef.current = end;
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return count;
};

export const CrackTimeDisplay: React.FC<CrackTimeDisplayProps> = ({ times, entropy }) => {
  // Round entropy to nearest integer for clean display
  const roundedEntropy = Math.round(entropy);
  const displayEntropy = useCountUp(roundedEntropy);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Entropy Card */}
      <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 dark:border-white/10 flex flex-col justify-between shadow-soft-sm hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
             <Activity size={20} />
             <span className="text-xs font-bold uppercase tracking-wider">Entropy</span>
         </div>
         <div className="flex items-baseline gap-2">
             <span className="text-4xl font-bold text-gray-900 dark:text-white tabular-nums tracking-tight">
                 {displayEntropy}
             </span>
             <span className="text-sm font-medium text-gray-500 dark:text-gray-400">bits</span>
         </div>
         <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Higher is better. Aim for 60+.</p>
      </div>

      {/* Crack Time Card - Botnet (Worst Case) */}
      <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 dark:border-white/10 flex flex-col justify-between shadow-soft-sm hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400">
             <Globe size={20} />
             <span className="text-xs font-bold uppercase tracking-wider">Time to Crack</span>
         </div>
         
         {/* Fade Transition for Text */}
         <div key={times.botnet} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
             <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-none block">
                 {times.botnet}
             </span>
         </div>
         
         <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Based on botnet attack scenario.</p>
      </div>

      {/* Secondary Times (Smaller) - Stacked Below */}
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-4 border border-white/40 dark:border-white/10 flex items-center justify-between shadow-soft-xs hover:bg-white/40 dark:hover:bg-gray-900/40 transition-colors">
               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
                   <Zap size={14} /> GPU Cluster
               </div>
               <span key={times.gpu} className="text-sm font-bold text-gray-900 dark:text-gray-200 animate-in fade-in duration-500">
                   {times.gpu}
               </span>
          </div>
          <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl p-4 border border-white/40 dark:border-white/10 flex items-center justify-between shadow-soft-xs hover:bg-white/40 dark:hover:bg-gray-900/40 transition-colors">
               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
                   <Shield size={14} /> Basic Attack
               </div>
               <span key={times.basic} className="text-sm font-bold text-gray-900 dark:text-gray-200 animate-in fade-in duration-500">
                   {times.basic}
               </span>
          </div>
      </div>
    </div>
  );
};