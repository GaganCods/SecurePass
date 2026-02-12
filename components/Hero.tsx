import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Eye, EyeOff, ShieldCheck, Zap, Activity, Clock, Lock } from 'lucide-react';
import { PageView } from '../App';
import { calculatePasswordStrength, estimateCrackTime } from '../utils/passwordLogic';
import { STRENGTH_LABELS } from '../constants';

interface HeroProps {
  onNavigate: (page: PageView) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true); // Ref to track animation state inside async loop

  const result = useMemo(() => calculatePasswordStrength(password), [password]);
  const crackTimes = useMemo(() => estimateCrackTime(result.combinations), [result.combinations]);

  // Demo Sequence Configuration
  const demoSequence = [
    "password123",        // Weak
    "Tr0ub4dor",          // Medium
    "Tr0ub4dor&3",        // Strong
    "f9K$2vL!8qP#xT7"     // Very Strong
  ];

  // Auto-typing animation loop
  useEffect(() => {
    let mounted = true;

    const typeText = async (text: string) => {
      for (let i = 1; i <= text.length; i++) {
        if (!mounted || !isAnimatingRef.current) return;
        setPassword(text.substring(0, i));
        // Random typing speed variation for realism
        await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 40));
      }
    };

    const deleteText = async (text: string) => {
      // Pause before deleting
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!mounted || !isAnimatingRef.current) return;
      
      // "Select All" + Delete effect (instant clear is cleaner for loop)
      // Or backspace effect? Let's do backspace for style
      for (let i = text.length; i >= 0; i--) {
         if (!mounted || !isAnimatingRef.current) return;
         setPassword(text.substring(0, i));
         await new Promise(resolve => setTimeout(resolve, 30));
      }
    };

    const runSequence = async () => {
      while (mounted && isAnimatingRef.current) {
        for (const phrase of demoSequence) {
          if (!mounted || !isAnimatingRef.current) break;
          await typeText(phrase);
          if (!mounted || !isAnimatingRef.current) break;
          await deleteText(phrase);
          if (!mounted || !isAnimatingRef.current) break;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    };

    if (isAnimating) {
      runSequence();
    }

    return () => {
      mounted = false;
    };
  }, [isAnimating]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic visual styles based on strength
  const getStrengthColor = () => {
    if (!password) return 'gray';
    if (result.strength === 'very-strong') return 'emerald';
    if (result.strength === 'strong') return 'emerald';
    if (result.strength === 'medium') return 'amber';
    return 'red';
  };

  const colorKey = getStrengthColor();
  
  const colors = {
    gray: { bar: 'bg-gray-200 dark:bg-gray-700', text: 'text-gray-400', border: 'border-white/50 dark:border-white/10', glow: '' },
    red: { bar: 'bg-red-500', text: 'text-red-500', border: 'border-red-500/30', glow: 'shadow-[0_0_30px_rgba(239,68,68,0.2)]' },
    amber: { bar: 'bg-amber-500', text: 'text-amber-500', border: 'border-amber-500/30', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]' },
    emerald: { bar: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.2)]' },
  };

  const currentStyle = colors[colorKey];

  return (
    <section className="relative pt-12 pb-24 lg:pt-24 lg:pb-40 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-10 animate-fade-in-up z-10">
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
              Know Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-start to-primary-end">
                Real Strength.
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Instantly analyze resilience. Estimate crack times. Zero data leaves your device.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <button 
                onClick={() => onNavigate('tool')}
                className="group w-full sm:w-auto px-9 py-5 bg-gradient-to-r from-primary-start to-primary-end text-white rounded-full font-bold text-lg hover:shadow-glow-purple hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
              >
                Try Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('learn')}
                className="w-full sm:w-auto px-9 py-5 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50/50 dark:hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm"
              >
                How It Works
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> No Database</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-emerald-500" /> 100% Private</span>
            </div>
          </div>

          {/* Right Content - Interactive Hero Tool */}
          <div className="relative perspective-1000 hidden lg:block z-20">
            {/* Decorative Background Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-full blur-[80px] -z-10 transition-all duration-1000 ${isAnimating ? 'opacity-80' : 'opacity-40'}`}></div>

            {/* The Floating Card */}
            <div className={`
                relative transform rotate-y-[-6deg] rotate-x-[4deg] transition-all duration-700 hover:rotate-y-0 hover:rotate-x-0 group
            `}>
               <div className={`
                  bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl 
                  border ${currentStyle.border} 
                  rounded-[32px] p-8 
                  shadow-2xl ${currentStyle.glow}
                  transition-all duration-500 ease-out
                  relative overflow-hidden
               `}>
                  {/* Subtle Inner Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-overlay dark:mix-blend-screen" />
                  
                  {/* Card Header Badge */}
                  <div className="relative z-10 flex items-center justify-between mb-8">
                     <div className="flex gap-2">
                        <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${colorKey === 'red' ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${colorKey === 'amber' ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                        <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${colorKey === 'emerald' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                     </div>
                     <div className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors duration-500 backdrop-blur-sm ${isAnimating ? 'bg-blue-100/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-gray-100/80 dark:bg-white/5 text-gray-500'}`}>
                        {isAnimating ? <Zap size={12} className="animate-pulse" /> : <Lock size={12} />}
                        <span className="text-[10px] font-bold uppercase tracking-wider">{isAnimating ? 'Live Demo' : 'Secure Check'}</span>
                     </div>
                  </div>

                  {/* 1. Password Input */}
                  <div className="relative z-10 mb-8 group/input">
                      <div className="relative overflow-hidden">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            readOnly
                            className="w-full bg-transparent text-2xl font-mono font-medium text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600 outline-none py-4 border-b-2 border-gray-100 dark:border-gray-700 transition-colors tracking-tight pr-10 cursor-default pointer-events-none"
                            placeholder=""
                            spellCheck={false}
                            autoComplete="off"
                            tabIndex={-1}
                        />
                        
                        {/* Interactive toggle that does NOT stop animation */}
                        <button
                            type="button"
                            onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation();
                                setShowPassword(!showPassword); 
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 transition-colors z-20 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                        
                        {/* Animated Underline */}
                        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-500 ease-out ${currentStyle.bar}`}
                                style={{ width: password ? `${Math.max(5, result.score)}%` : '0%' }}
                             />
                        </div>
                      </div>
                  </div>

                  {/* 2. Strength Meter */}
                  <div className="relative z-10 mb-6">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Security Level</span>
                        <span className={`text-lg font-bold transition-all duration-300 ${currentStyle.text} transform ${password ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                            {STRENGTH_LABELS[result.strength]}
                        </span>
                     </div>
                     <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                           className={`h-full rounded-full transition-all duration-500 ease-out ${currentStyle.bar}`}
                           style={{ width: password ? `${result.score}%` : '0%' }}
                        />
                     </div>
                  </div>

                  {/* 3 & 4. Stats Row */}
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                        {/* Crack Time */}
                        <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100/50 dark:border-white/5 transition-all duration-300 group-hover:bg-white/60 dark:group-hover:bg-white/10 backdrop-blur-sm">
                           <div className="flex items-center gap-2 mb-2 text-gray-400">
                                <Clock size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Crack Time</span>
                           </div>
                           <div className="text-xl font-bold text-gray-900 dark:text-white leading-none transition-all duration-300">
                                {password ? crackTimes.botnet : '...'}
                           </div>
                        </div>

                        {/* Entropy */}
                        <div className="p-4 rounded-2xl bg-gray-50/50 dark:bg-white/5 border border-gray-100/50 dark:border-white/5 transition-all duration-300 group-hover:bg-white/60 dark:group-hover:bg-white/10 backdrop-blur-sm">
                           <div className="flex items-center gap-2 mb-2 text-gray-400">
                                <Activity size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Entropy</span>
                           </div>
                           <div className="text-xl font-bold text-gray-900 dark:text-white leading-none transition-all duration-300">
                                {password ? Math.round(result.entropy) : 0} <span className="text-sm font-medium text-gray-400">bits</span>
                           </div>
                        </div>
                   </div>
               </div>
               
               {/* Floating Success Badge - Only for Strong/Very Strong */}
               <div className={`
                    absolute -right-6 top-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-3 pr-5 rounded-2xl shadow-soft-xl animate-float border border-gray-100 dark:border-white/5 flex items-center gap-3 transition-all duration-500
                    ${result.score >= 60 && password ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-4 -rotate-12 pointer-events-none'}
               `}>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Verdict</div>
                        <div className="font-bold text-gray-900 dark:text-white text-sm">Secure</div>
                    </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};