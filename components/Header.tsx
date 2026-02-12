import React, { useState, useEffect } from 'react';
import { Shield, Moon, Sun, Home, Sparkles, BookOpen, Menu, X, ArrowRight, HelpCircle, Info } from 'lucide-react';
import { PageView } from '../App';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigate: (page: PageView) => void;
  currentPage: PageView;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (target: string) => {
    setIsMenuOpen(false);
    
    if (target === 'home') {
      onNavigate('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (target === 'tool') {
      onNavigate('tool');
      return;
    }

    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Backdrop - Click to close */}
      <div 
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center py-4 px-4 sm:px-6 pointer-events-none">
        {/* Main Header Bar - Enable pointer events for the bar itself */}
        <div className="pointer-events-auto w-full max-w-6xl bg-white/80 dark:bg-card-dark/80 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-2xl shadow-soft-md flex items-center justify-between px-6 py-3 transition-all duration-300 relative z-50">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleNavigation('home')}
          >
            <div className="bg-gradient-to-br from-primary-start to-primary-end p-2 rounded-lg text-white shadow-lg shadow-primary-start/30 group-hover:scale-105 transition-transform duration-300">
               <Shield size={20} fill="currentColor" className="opacity-90" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              SecurePass
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 px-2 py-1.5 rounded-full border border-transparent dark:border-white/5">
              <button 
                onClick={() => handleNavigation('home')} 
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentPage === 'home' ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5'}`}
              >
                <Home size={16} />
                Home
              </button>
              <button 
                onClick={() => handleNavigation('features')} 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5 transition-all duration-200"
              >
                <Sparkles size={16} />
                Features
              </button>
              <button 
                onClick={() => handleNavigation('learn')} 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-white/5 transition-all duration-200"
              >
                <Info size={16} />
                About
              </button>
          </nav>
          
          {/* Right Actions */}
          <div className="flex items-center gap-3">
              {/* Desktop Theme Toggle */}
              <button 
                  onClick={toggleDarkMode}
                  className="hidden md:flex p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle dark mode"
              >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              {/* Desktop CTA */}
              <button 
                onClick={() => onNavigate('tool')}
                className="hidden md:flex px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-sm font-semibold hover:scale-105 active:scale-95 transition-all shadow-soft-md"
              >
                Check Now
              </button>

              {/* Mobile Menu Button - ONLY Visible on Mobile */}
              <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-colors"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`
            pointer-events-auto md:hidden
            absolute top-[calc(100%+8px)] left-4 right-4 sm:left-6 sm:right-6
            bg-white/95 dark:bg-[#161b28]/95 backdrop-blur-xl 
            border border-gray-200/50 dark:border-white/10
            rounded-[20px] shadow-soft-xl p-5
            flex flex-col gap-4
            origin-top transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-4 scale-95 invisible pointer-events-none'}
          `}
        >
          {/* Navigation Items */}
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => handleNavigation('home')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left group"
            >
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                <Home size={18} />
              </div>
              Home
            </button>
            <button 
              onClick={() => handleNavigation('features')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left group"
            >
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-105 transition-transform">
                <Sparkles size={18} />
              </div>
              Features
            </button>
           
            <button 
              onClick={() => handleNavigation('learn')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left group"
            >
               <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-600 dark:text-green-400 group-hover:scale-105 transition-transform">
                <Info size={18} />
              </div>
              About
            </button>
             <button 
              onClick={() => handleNavigation('faq')}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left group"
            >
               <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400 group-hover:scale-105 transition-transform">
                <HelpCircle size={18} />
              </div>
              FAQ
            </button>
          </nav>

          {/* Divider */}
          <div className="h-px bg-gray-100 dark:bg-white/5 w-full" />

          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-4 py-2">
            <span className="font-medium text-sm text-gray-900 dark:text-white flex items-center gap-2">
               {darkMode ? <Moon size={18} className="text-gray-500" /> : <Sun size={18} className="text-amber-500" />}
               {darkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${darkMode ? 'bg-primary-start' : 'bg-gray-200'}`}
              aria-label="Toggle theme"
            >
               <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => handleNavigation('tool')}
            className="w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform mt-2"
          >
            Try Now <ArrowRight size={16} />
          </button>
        </div>
      </header>
    </>
  );
};