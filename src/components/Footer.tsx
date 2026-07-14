import React from 'react';
import { Layers, HardHat, Phone, Mail, MapPin, ChevronUp, Github } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        
        {/* Footer Top Content Row */}
        <div className="footer-top-row">
          
          {/* Brand and licensing */}
          <div className="footer-brand-sec">
            <div className="footer-logo" onClick={scrollToTop}>
              <div className="footer-logo-icon">
                <Layers size={18} />
              </div>
              <span className="footer-logo-text">LA Contractors</span>
            </div>
            <p className="footer-brand-desc">
              Brooksville’s heavy site grading, retention excavation, and underground utility specialists. Delivering state-licensed, civil-certified excavation results across Hernando County since 2004.
            </p>
            <div className="footer-brand-lic flex items-center gap-1.5 font-mono text-slate-500">
              <HardHat size={12} className="text-orange-500" />
              <span>Certified Florida Utility Contractor • Lic #CUC1224558</span>
            </div>
          </div>

          {/* Quick links shortcuts */}
          <div className="footer-links-sec">
            <h4 className="footer-sec-title">NAVIGATION SHORTCUTS</h4>
            <div className="footer-nav-list" id="footer-nav-list">
              <button onClick={() => onNavigate('home')}>HOME</button>
              <button onClick={() => onNavigate('about')}>ABOUT</button>
              <button onClick={() => onNavigate('services')}>SERVICES</button>
              <button onClick={() => onNavigate('pricing')}>PRICING ESTIMATOR</button>
              <button onClick={() => onNavigate('work')}>OUR WORK</button>
              <button onClick={() => onNavigate('contact')}>CONTACT / BOOK NOW</button>
            </div>
          </div>

          {/* Contact details */}
          <div className="footer-contact-sec">
            <h4 className="footer-sec-title">DIRECT DISPATCH</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={14} className="text-orange-500 flex-shrink-0" />
                <span>15372 Cobb Road, Brooksville, FL 34601</span>
              </li>
              <li>
                <Phone size={14} className="text-orange-500 flex-shrink-0" />
                <a href="tel:8134626154" className="hover:text-orange-500">(813) 462-6154</a>
              </li>
              <li>
                <Mail size={14} className="text-orange-500 flex-shrink-0" />
                <a href="mailto:office@lacontractors.co" className="hover:text-orange-500 lowercase">office@lacontractors.co</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-copyright">
            <span>© {new Date().getFullYear()} LA Contractors. All Rights Reserved.</span>
            <span className="sub-copyright font-mono text-[9px] text-slate-600 block mt-0.5">
              Engineering Foundation Infrastructure in Hernando County
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* GitHub Profile link to reinforce repo integrations */}
            <a 
              href="https://github.com/haywoodamari/la-contractors" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors"
              title="View Source on GitHub"
            >
              <Github size={14} />
              <span>GITHUB REPO</span>
            </a>

            <button 
              className="back-to-top-btn" 
              onClick={scrollToTop} 
              title="Scroll Back To Top"
            >
              <span>TOP</span>
              <ChevronUp size={12} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
