import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Is my password sent to a server?",
      a: "No. This tool runs 100% in your browser using JavaScript. Your password never leaves your device. We use client-side logic to calculate entropy and estimate crack times locally."
    },
    {
      q: "How accurate is the crack time?",
      a: "It is an estimation based on current hardware capabilities (Basic, GPU, and Botnet scenarios). Technology improves rapidly, so treat these as guidelines rather than guarantees."
    },
    {
      q: "What is the best way to manage passwords?",
      a: "We highly recommend using a Password Manager (like Bitwarden, 1Password, or LastPass). They generate and store unique, complex passwords for every account so you don't have to remember them."
    },
    {
      q: "Why does adding a symbol help?",
      a: "It increases the 'pool size' of possible characters. Mathematically, this makes the number of possible combinations grow exponentially, making it much harder for brute-force algorithms to guess."
    },
    {
        q: "What is entropy in passwords?",
        a: "Entropy is a measure of randomness and unpredictability. A password like 'password123' has low entropy because it follows a pattern. A random string like 'X9#m$kLP' has high entropy, making it significantly harder to crack."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-gray-50/50 dark:bg-black/20 border-t border-gray-200 dark:border-white/5 scroll-mt-20 overflow-hidden">
      {/* Gradient Overlay for seamless transition to footer */}
      <div 
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[var(--footer-base)] pointer-events-none z-0" 
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Common questions about password security and how our tool works.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className={`
                    group rounded-[24px] border transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-md
                    ${isOpen 
                        ? 'bg-white/70 dark:bg-gray-900/60 border-blue-500/30 dark:border-blue-500/30 shadow-lg scale-[1.01]' 
                        : 'bg-white/40 dark:bg-gray-900/30 border-white/50 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/20'
                    }
                `}
              >
                <button 
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                >
                    <span className={`text-lg font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                        {item.q}
                    </span>
                    <span className={`
                        flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 
                        ${isOpen ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rotate-45' : 'bg-gray-100/50 dark:bg-white/5 text-gray-400 dark:text-gray-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20'}
                    `}>
                        <Plus size={18} strokeWidth={2.5} />
                    </span>
                </button>
                
                <div 
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                    <div className="overflow-hidden">
                        <div className="p-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed border-t border-transparent">
                            {item.a}
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};