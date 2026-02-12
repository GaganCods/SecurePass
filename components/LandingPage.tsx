import React from 'react';
import { Hero } from './Hero';
import { FeaturesSection } from './FeaturesSection';
import { EducationalSection } from './EducationalSection';
import { PrivacySection } from './PrivacySection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { PageView } from '../App';

interface LandingPageProps {
  onNavigate: (page: PageView) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <Hero onNavigate={onNavigate} />
      <FeaturesSection />
      <EducationalSection />
      <PrivacySection />
      <CTASection onNavigate={onNavigate} />
      <FAQSection />
    </div>
  );
};