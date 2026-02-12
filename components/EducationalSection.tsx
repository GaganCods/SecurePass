import React from 'react';
import { Maximize, Shuffle, Layers, ArrowRight, X, Check } from 'lucide-react';

export const EducationalSection: React.FC = () => {
  return (
    <section id="learn" className="py-24 relative scroll-mt-20">
      {/* Background with Soft Fade In/Out */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-gray-50/80 to-transparent dark:from-transparent dark:via-black/20 dark:to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                What Makes a Password Secure?
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                Strong passwords aren’t just long — they’re unpredictable and mathematically resistant to brute-force attacks.
            </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8">
            
            {/* Card 1: Length */}
            <div className="group bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                
                {/* Visual Idea: Exponential Bars */}
                <div className="h-24 flex items-end justify-center gap-3 mb-8 border-b border-gray-100/50 dark:border-white/5 pb-6">
                    <div className="w-8 bg-blue-200 dark:bg-blue-900/30 rounded-t-md h-[20%] relative group-hover:h-[25%] transition-all duration-500"></div>
                    <div className="w-8 bg-blue-300 dark:bg-blue-800/50 rounded-t-md h-[40%] relative group-hover:h-[50%] transition-all duration-500 delay-75"></div>
                    <div className="w-8 bg-blue-500 dark:bg-blue-500 rounded-t-md h-[80%] relative group-hover:h-[90%] transition-all duration-500 delay-150 shadow-lg shadow-blue-500/20"></div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <Maximize size={18} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">12+ Characters</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Length Is Critical</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Each additional character exponentially increases the time required to crack a password. It's the single most effective factor.
                </p>
            </div>

            {/* Card 2: Entropy */}
            <div className="group bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                {/* Visual Idea: Random vs Predictable */}
                <div className="h-24 flex flex-col justify-center gap-3 mb-8 border-b border-gray-100/50 dark:border-white/5 pb-6 font-mono text-sm">
                    <div className="flex items-center justify-between bg-red-50/50 dark:bg-red-900/10 px-3 py-2 rounded-lg text-red-600/70 dark:text-red-400/70 line-through decoration-red-500/50 backdrop-blur-sm">
                        <span>12345678</span>
                        <X size={14} />
                    </div>
                    <div className="flex items-center justify-between bg-purple-50/50 dark:bg-purple-900/20 px-3 py-2 rounded-lg text-purple-700 dark:text-purple-300 font-semibold shadow-sm backdrop-blur-sm">
                        <span>f9K$2vL!8</span>
                        <Check size={14} />
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <Shuffle size={18} className="text-purple-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">High Entropy</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">True Randomness</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Predictable patterns reduce security. High entropy means higher randomness and resistance against AI and dictionary attacks.
                </p>
            </div>

            {/* Card 3: Variety */}
            <div className="group bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-amber-500/10 transition-colors" />

                {/* Visual Idea: Pool Size Counter */}
                <div className="h-24 flex items-center justify-center mb-8 border-b border-gray-100/50 dark:border-white/5 pb-6">
                    <div className="flex items-center gap-2 text-sm font-mono font-bold">
                        <span className="text-gray-400">26</span>
                        <ArrowRight size={14} className="text-gray-300" />
                        <span className="text-gray-500">52</span>
                         <ArrowRight size={14} className="text-gray-300" />
                        <span className="text-amber-500 text-lg scale-110">94</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <Layers size={18} className="text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Expanded Pool</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Character Variety</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Mixing uppercase, lowercase, numbers, and symbols increases the pool of possible combinations attackers must test.
                </p>
            </div>

        </div>
      </div>
    </section>
  );
};