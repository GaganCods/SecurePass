import React from 'react';
import { StrengthResult } from '../types';
import { STRENGTH_LABELS } from '../constants';

interface StrengthMeterProps {
  strengthResult: StrengthResult;
}

export const StrengthMeter: React.FC<StrengthMeterProps> = ({ strengthResult }) => {
  const { strength, score } = strengthResult;
  
  // Dynamic gradient based on score
  const getGradient = () => {
    if (score <= 20) return 'from-red-500 to-red-600';
    if (score <= 40) return 'from-orange-500 to-orange-600';
    if (score <= 60) return 'from-yellow-400 to-yellow-500';
    if (score <= 80) return 'from-lime-500 to-lime-600';
    return 'from-green-500 to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]';
  };

  return (
    <div className="mt-8 mb-8 w-full">
      <div className="flex justify-between items-end mb-3 px-1">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Security Strength</span>
        <span className={`text-lg font-bold transition-all duration-500 ${score > 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} 
            ${strength === 'very-weak' ? 'text-red-500' : ''} 
            ${strength === 'weak' ? 'text-orange-500' : ''} 
            ${strength === 'medium' ? 'text-yellow-500' : ''} 
            ${strength === 'strong' ? 'text-lime-500' : ''} 
            ${strength === 'very-strong' ? 'text-emerald-500' : ''}
        `}>
          {STRENGTH_LABELS[strength]}
        </span>
      </div>
      
      {/* Continuous Bar */}
      <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-[2px]">
        <div 
            className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${getGradient()}`}
            style={{ width: `${Math.max(2, score)}%` }}
        />
      </div>
    </div>
  );
};