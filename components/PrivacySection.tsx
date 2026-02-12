import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacySection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Soft Fade In/Out */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-gray-50/80 to-transparent dark:from-transparent dark:via-black/20 dark:to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl text-green-600 dark:text-green-400 mb-8">
            <ShieldCheck size={32} />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          Built for Privacy.
        </h2>
        
        <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
          Your password never leaves your device. No servers. No databases. No tracking. 
          The analysis code runs 100% locally in your browser.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                🚫 No Backend
            </span>
            <span className="px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                🔒 SSL Encrypted Delivery
            </span>
            <span className="px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-sm font-medium text-gray-600 dark:text-gray-300 backdrop-blur-sm">
                💾 No Local Storage Logging
            </span>
        </div>
      </div>
    </section>
  );
};