import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { PasswordStrengthTool } from './components/PasswordStrengthTool';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ContactPage } from './components/ContactPage';
import { CosmicBackground } from './components/CosmicBackground';

export type PageView = 'home' | 'tool' | 'privacy' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<PageView>('home');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Theme effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleNavigate = (page: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(page);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        
        <CosmicBackground />

        <Header 
          darkMode={darkMode} 
          toggleDarkMode={() => setDarkMode(!darkMode)} 
          onNavigate={handleNavigate}
          currentPage={view}
        />

        <main className="flex-grow pt-24"> 
          {/* pt-24 accounts for fixed header height */}
          {view === 'home' && (
            <LandingPage onNavigate={handleNavigate} />
          )}
          
          {view === 'tool' && (
             <PasswordStrengthTool />
          )}

          {view === 'privacy' && (
             <PrivacyPolicy />
          )}

          {view === 'contact' && (
             <ContactPage />
          )}
        </main>

        <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;