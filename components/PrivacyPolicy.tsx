import React from 'react';
import { Shield, Lock, EyeOff, ServerOff } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We believe privacy is a fundamental right, not a feature. Here is exactly how SecurePass handles your data.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Main Content Card - Glassmorphism */}
        <div className="bg-white/60 dark:bg-gray-900/50 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-2xl border border-white/50 dark:border-white/10 relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-overlay dark:mix-blend-screen" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none mix-blend-overlay dark:mix-blend-screen" />

          <div className="space-y-12 relative z-10">
            
            {/* Key Highlights Grid */}
            <div className="grid md:grid-cols-2 gap-6 pb-12 border-b border-gray-200/50 dark:border-white/5">
              <div className="flex gap-4 items-start">
                  <div className="p-3 bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl shrink-0 backdrop-blur-sm">
                      <ServerOff size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">No Backend Storage</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-1">We do not have a database. Your passwords are never sent to a server.</p>
                  </div>
              </div>
              <div className="flex gap-4 items-start">
                  <div className="p-3 bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-xl shrink-0 backdrop-blur-sm">
                      <Lock size={24} />
                  </div>
                  <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">Local Processing</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-1">All calculations happen instantly in your browser using JavaScript.</p>
                  </div>
              </div>
            </div>

            {/* Policy Sections */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                1. Information We Collect
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  <strong>We do not collect, store, or transmit the passwords you enter.</strong>
                </p>
                <p>
                  SecurePass is a client-side application. When you type a password into the input field, the analysis logic runs locally on your device (computer, phone, or tablet). The data never leaves your browser environment.
                </p>
                <p>
                  We do not ask for, nor do we collect, personal information such as your name, email address, IP address, or location data.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                2. How We Use Information
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Since we do not collect personal data or passwords, we do not use your information for any purpose. The calculated results (strength score, crack time estimation) are displayed to you in real-time and are discarded immediately when you close the tab or refresh the page.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                3. Cookies and Local Storage
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                <p>
                  SecurePass does not use cookies for tracking or advertising purposes.
                </p>
                <p>
                  We use your browser's <strong>Local Storage</strong> strictly for functional purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2 marker:text-blue-500">
                  <li>To remember your theme preference (Dark Mode or Light Mode).</li>
                </ul>
                <p>
                  This data is stored only on your device and is not accessible to us.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                4. Third-Party Services
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  This website is hosted on a static hosting provider (e.g., GitHub Pages, Vercel, or Netlify). These providers may collect standard server logs (such as IP addresses) for security and performance monitoring. SecurePass itself does not integrate with third-party analytics trackers, advertising networks, or social media pixels.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5. Security
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  We take security seriously. Our site is served over HTTPS, ensuring that the code delivered to your browser has not been tampered with. Because our application is stateless and client-side only, there is no central database of user passwords that can be breached.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                6. Changes to This Policy
              </h2>
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The date at the top of this policy indicates when it was last updated.
                </p>
              </div>
            </section>

            <section className="pt-8 border-t border-gray-200/50 dark:border-white/5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a 
                  href="mailto:support@securepass.com" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl text-gray-900 dark:text-white font-medium transition-colors backdrop-blur-sm"
              >
                  support@securepass.com
              </a>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};