import React from 'react';
import { Zap, Clock, Shield, Brain, Lock, Smartphone } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      color: "bg-amber-100/80 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
      glow: "bg-amber-500/10 group-hover:bg-amber-500/40",
      title: "Real-Time Meter",
      desc: "Instant feedback as you type. No delay, purely reactive analysis engine."
    },
    {
      icon: <Clock size={24} />,
      color: "bg-blue-100/80 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
      glow: "bg-blue-500/10 group-hover:bg-blue-500/40",
      title: "Crack Estimation",
      desc: "Accurate time-to-crack calculations based on modern GPU & botnet capabilities."
    },
    {
      icon: <Brain size={24} />,
      color: "bg-purple-100/80 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
      glow: "bg-purple-500/10 group-hover:bg-purple-500/40",
      title: "Entropy Analysis",
      desc: "Go beyond length. We measure true randomness and information density."
    },
    {
      icon: <Shield size={24} />,
      color: "bg-green-100/80 text-green-600 dark:bg-green-900/20 dark:text-green-400",
      glow: "bg-green-500/10 group-hover:bg-green-500/40",
      title: "Privacy First",
      desc: "Zero data collection. Your password never leaves your browser's memory."
    },
    {
      icon: <Lock size={24} />,
      color: "bg-red-100/80 text-red-600 dark:bg-red-900/20 dark:text-red-400",
      glow: "bg-red-500/10 group-hover:bg-red-500/40",
      title: "Client-Side Only",
      desc: "No backend servers involved. Verification happens locally on your device."
    },
    {
      icon: <Smartphone size={24} />,
      color: "bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
      glow: "bg-indigo-500/10 group-hover:bg-indigo-500/40",
      title: "Smart Suggestions",
      desc: "Get actionable tips to improve weak passwords instantly."
    }
  ];

  return (
    <section id="features" className="py-24 relative scroll-mt-20">
      {/* Background with Soft Fade In/Out */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-gray-50/80 to-transparent dark:from-transparent dark:via-black/20 dark:to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Security. Simplified.
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Everything you need to understand your password's strength, packaged in a beautiful, private interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="group p-8 rounded-[32px] bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
              
              {/* Stronger Soft Blur Glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none transition-colors duration-500 ${feature.glow}`} />
              
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color} transition-colors relative z-10 backdrop-blur-sm`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm relative z-10">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};