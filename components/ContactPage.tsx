import React from 'react';
import { Mail, Clock, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="relative w-full pt-12 pb-24">
      {/* Seamless transition background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-gray-50/50 to-[var(--footer-base)] dark:from-transparent dark:via-black/10 dark:to-[var(--footer-base)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Contact SecurePass
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or security concerns? We are here to help.
            Reach out to our team directly.
          </p>
        </div>

        {/* Main Content Card - Glassmorphism */}
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-white/10 relative overflow-hidden">
          
          {/* Background Glow - Adjusted for glass effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-overlay dark:mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none mix-blend-overlay dark:mix-blend-screen" />

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            
            {/* Contact Information */}
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                  <div className="flex gap-5 items-start group">
                      <div className="p-4 bg-white/50 dark:bg-white/10 text-blue-600 dark:text-blue-400 rounded-2xl shrink-0 backdrop-blur-sm shadow-sm border border-white/50 dark:border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-500/20">
                          <Mail size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Email Support</h3>
                          <a href="mailto:support@securepass.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-lg font-medium block mt-1 transition-colors">
                              support@securepass.com
                          </a>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                              For general inquiries and support.
                          </p>
                      </div>
                  </div>

                  <div className="flex gap-5 items-start group">
                      <div className="p-4 bg-white/50 dark:bg-white/10 text-purple-600 dark:text-purple-400 rounded-2xl shrink-0 backdrop-blur-sm shadow-sm border border-white/50 dark:border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-purple-500/20">
                          <Clock size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Response Time</h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-2">
                              We aim to respond to all inquiries within <strong>24–48 hours</strong>.
                          </p>
                      </div>
                  </div>
              </div>
            </div>

            {/* Reassurance / Additional Info - Inner Glass Card */}
            <div className="bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/60 dark:border-white/10 h-fit shadow-lg">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-emerald-100/50 dark:bg-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={22} />
                  </div>
                  Privacy Assurance
               </h3>
               <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm mb-6 font-medium">
                  Please note that SecurePass does <strong>not</strong> store user passwords or personal data. 
                  All password analysis is performed locally in your browser.
               </p>
               <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-6 opacity-50" />
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs">
                  If you are reporting a bug, please include your browser version and device type to help us investigate.
               </p>
            </div>

          </div>

          {/* Closing */}
          <div className="mt-14 pt-8 border-t border-gray-200/30 dark:border-white/10 text-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                  Thank you for using SecurePass. We value your trust and privacy.
              </p>
          </div>

        </div>
      </div>
    </div>
  );
};