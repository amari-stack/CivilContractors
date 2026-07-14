import React from 'react';
import { ArrowRight, ShieldCheck, Award, HardHat } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="hero-section">
      {/* Background photo area with overlay gradients */}
      <div className="hero-bg"></div>
      <div className="hero-skew-accent"></div>
      <div className="hero-overlay-dark"></div>
      <div className="hero-overlay-grad"></div>

      <div className="container hero-content">
        <div className="hero-grid">
          
          {/* Heading Column */}
          <div className="hero-main-col">
            {/* Tag Badge */}
            <motion.div 
              className="hero-badge" 
              id="hero-badge"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="pulse-dot"></span>
              <span>Brooksville's Trusted Site & Pipe Specialists</span>
            </motion.div>

            {/* Bold Headline title */}
            <motion.h1 
              className="hero-headline" 
              id="hero-headline"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              LA CONTRACTORS
            </motion.h1>

            {/* Supporting summary paragraph */}
            <motion.p 
              className="hero-paragraph" 
              id="hero-paragraph"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Building the foundation for Florida's future. From comprehensive site development and heavy earth moving to precision underground pipe installation, we deliver Brooksville's most reliable and professional commercial contracting work.
            </motion.p>

            {/* Buttons triggers */}
            <motion.div 
              className="hero-cta-group" 
              id="hero-cta-group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button className="btn-orange" onClick={() => onNavigate('contact')}>
                <span>BOOK NOW</span>
                <ArrowRight size={14} />
              </button>
              <button className="btn-slate-outline" onClick={() => onNavigate('work')}>
                <span>EXPLORE PROJECTS</span>
              </button>
            </motion.div>

            {/* Trust Badges List */}
            <motion.div 
              className="hero-trust-badges" 
              id="hero-trust-badges"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="trust-badge-item">
                <ShieldCheck size={22} className="text-orange-600" />
                <div>
                  <h4 className="trust-badge-title">Licensed & Insured</h4>
                  <p className="trust-badge-sub">State of Florida</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <Award size={22} className="text-orange-600" />
                <div>
                  <h4 className="trust-badge-title">Community Pillar</h4>
                  <p className="trust-badge-sub">Brooksville Proud</p>
                </div>
              </div>
              <div className="trust-badge-item">
                <HardHat size={22} className="text-orange-600" />
                <div>
                  <h4 className="trust-badge-title">Heavy Machinery</h4>
                  <p className="trust-badge-sub">Full Fleet Available</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Side Box containing credentials */}
          <motion.div 
            className="hero-sidebox-col" 
            id="hero-sidebox"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="sidebox-card">
              <h3 className="sidebox-title">Why Brooksville Contracts LA</h3>
              <div class="sidebox-list">
                <div className="sidebox-item">
                  <span className="sidebox-step">01 / GEOGRAPHY</span>
                  <p className="sidebox-desc">Deep familiarity with Hernando County geological conditions and code compliance.</p>
                </div>
                <div className="sidebox-item">
                  <span className="sidebox-step">02 / INTEGRITY</span>
                  <p className="sidebox-desc">Veteran operators committed to finishing on budget with no hidden fees.</p>
                </div>
                <div className="sidebox-item">
                  <span className="sidebox-step">03 / PERFORMANCE</span>
                  <p className="sidebox-desc">State-of-the-art pipe lasers, grade controls, and modern excavating machinery.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Accent border */}
      <div className="hero-bottom-accent"></div>
    </section>
  );
};
