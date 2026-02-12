import React from 'react';
import { StrengthResult } from '../types';
import { Check, Circle, Star } from 'lucide-react';

interface RequirementChecklistProps {
  result: StrengthResult;
}

export const RequirementChecklist: React.FC<RequirementChecklistProps> = ({ result }) => {
  const items = [
    { label: "8+ Characters", met: result.length >= 8 },
    { label: "Uppercase (A-Z)", met: result.hasUpper },
    { label: "Lowercase (a-z)", met: result.hasLower },
    { label: "Numbers (0-9)", met: result.hasNumber },
    { label: "Symbols (!@#)", met: result.hasSymbol },
  ];

  return (
    <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-lg rounded-2xl p-6 border border-white/50 dark:border-white/10 h-full shadow-soft-sm hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors">
      <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
        Requirements
      </h3>
      
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <span className={`text-sm font-medium transition-colors duration-300 ${item.met ? 'text-gray-900 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500'}`}>
              {item.label}
            </span>
            <div className={`
              flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${item.met ? 'bg-green-500 text-white scale-100' : 'bg-gray-200 dark:bg-gray-700 text-transparent scale-90'}
            `}>
              <Check size={14} strokeWidth={3} className={`transition-all duration-300 ${item.met ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
            </div>
          </div>
        ))}
        
        {/* Bonus Divider */}
        <div className="h-px w-full bg-gray-200 dark:bg-gray-700/50 my-2" />
        
        <div className="flex items-center justify-between">
             <span className={`text-sm font-medium transition-colors duration-300 ${result.length >= 12 ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400 dark:text-gray-500'}`}>
              Bonus: 12+ Chars
            </span>
             <div className={`
              flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              ${result.length >= 12 ? 'bg-yellow-500 text-white scale-100' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 scale-90'}
            `}>
              <Star size={12} fill="currentColor" strokeWidth={0} className={`transition-all duration-300 ${result.length >= 12 ? 'opacity-100 rotate-0 scale-100' : 'opacity-50 rotate-90 scale-75'}`} />
            </div>
        </div>
      </div>
    </div>
  );
};