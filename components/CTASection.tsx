import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PageView } from '../App';

interface CTASectionProps {
  onNavigate: (page: PageView) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full py-24 flex justify-center px-4 animate-fade-in-up">
      <div
        className="relative w-full max-w-6xl rounded-[32px] overflow-hidden py-24 px-8 md:px-16 text-center shadow-2xl transition-all duration-500 backdrop-blur-2xl border border-white/50 dark:border-white/10"
        style={{ 
            backgroundColor: "rgba(105, 90, 240, 0.25)",
            boxShadow: "0 25px 50px -12px rgba(105, 90, 240, 0.25)"
        }}
      >
        
        {/* Radial Depth Background */}
        <div
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(105, 90, 240, 0.25), transparent)"
          }}
        />

        {/* Subtle Grid Overlay */}
        <div
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: `linear-gradient(rgba(105, 90, 240, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(105, 90, 240, 0.1) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white drop-shadow-sm">
            Ready to Strengthen Your Security?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed opacity-90 font-light">
            Stop guessing. Start knowing. Use our advanced tools to ensure your digital life is protected against modern threats.
          </p>
          
          <button 
              onClick={() => onNavigate('tool')}
              className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto overflow-hidden shadow-lg shadow-gray-900/10 dark:shadow-white/10"
          >
              <span className="relative z-10 flex items-center gap-2">
                  Test My Password <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Button Hover Glow */}
              <div className="absolute inset-0 bg-white/20 dark:bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

      </div>
    </div>
  );
};