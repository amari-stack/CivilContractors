import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [preFill, setPreFill] = useState<{
    service: string;
    scale: string;
    notes: string;
    triggerCount: number;
  } | null>(null);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      // Offset scrolling slightly to account for the sticky header
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleBookServiceDirect = (serviceName: string) => {
    setPreFill({
      service: serviceName,
      scale: 'Standard Contract Run',
      notes: `Proposal Request: ${serviceName}. Booking a formal site walk evaluation or delivery coordination request.`,
      triggerCount: Date.now()
    });
    handleNavigate('contact');
  };

  const handleLockInEstimate = (service: string, scale: string, notes: string) => {
    setPreFill({
      service,
      scale,
      notes,
      triggerCount: Date.now()
    });
    handleNavigate('contact');
  };

  return (
    <div className="app-shell">
      <Header onNavigate={handleNavigate} />
      
      <main>
        <Hero onNavigate={handleNavigate} />
        <About />
        <Services onBookService={handleBookServiceDirect} />
        <Pricing onLockInEstimate={handleLockInEstimate} />
        <Work />
        <Contact preFill={preFill} onClearPreFill={() => setPreFill(null)} />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
