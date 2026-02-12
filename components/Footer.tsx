
import React from 'react';
import { Shield, Github, Instagram, Linkedin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PageView } from '../App';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigate('home');
      // Wait for home page to mount
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300); // Increased timeout slightly to ensure render completion
    }
  };

  const scrollToHero = () => {
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative w-full overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--footer-base)" }}
    >
      {/* Azure Depths Radial Background - Bottom Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 100%, var(--footer-radial-end) 0%, transparent 70%)",
          opacity: 0.35,
        }}
      />
      
      <div className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Block (Left - ~50%) */}
          <div className="lg:col-span-6 space-y-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit"
              onClick={() => onNavigate('home')}
            >
               <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Shield size={24} fill="currentColor" className="opacity-90" />
               </div>
               <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">SecurePass</span>
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md">
              Secure password analysis — fully client-side and private by design. 
              We believe security tools should be transparent, fast, and accessible to everyone.
            </p>
            
            <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>100% Client-Side</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>No Tracking</span>
                </div>
            </div>
          </div>

          {/* Navigation Columns (Right - ~50%) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:pl-12">
              
              {/* Product Column */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Product</h4>
                <ul className="space-y-4">
                  <li><button onClick={() => onNavigate('tool')} className="text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium">Password Checker</button></li>
                  <li><button onClick={() => handleNavigation('features')} className="text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium">Features</button></li>
                  <li><button onClick={() => handleNavigation('learn')} className="text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium">How It Works</button></li>
                  <li><button onClick={() => handleNavigation('faq')} className="text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200 font-medium">FAQ</button></li>
                </ul>
              </div>

              {/* About / Connect Column */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">Connect</h4>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-sm text-gray-400">Built by</p>
                        <button 
                            onClick={scrollToHero}
                            className="block text-base font-semibold text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        >
                            Gagan Pratap
                        </button>
                    </div>
                    
                    <ul className="space-y-3">
                        <li>
                            <a 
                                href="https://gaganpratap.vercel.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium"
                            >
                                Portfolio 
                                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                        </li>
                         <li>
                            <button onClick={() => onNavigate('contact')} className="group flex items-center gap-2 text-base text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-medium">
                                Contact
                                <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </li>
                    </ul>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 pt-2">
                        <a 
                            href="https://github.com/GaganCods/SecurePass" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                            title="GitHub"
                        >
                            <Github size={18} />
                        </a>
                        <a 
                            href="https://www.instagram.com/iamgaganpratap/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                            title="Instagram"
                        >
                            <Instagram size={18} />
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/gagan-pratap/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
                            title="LinkedIn"
                        >
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>
              </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-gray-500 dark:text-gray-400">
             <span>© {new Date().getFullYear()} SecurePass.</span>
             <span className="hidden md:inline w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
             <span>Privacy-first password checker.</span>
          </div>
          
          <button onClick={() => onNavigate('privacy')} className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
