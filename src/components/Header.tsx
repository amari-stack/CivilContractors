import React, { useState, useEffect } from 'react';
import { Layers, Phone, Calendar, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, darkMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'pricing', 'work', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={isScrolled ? 'scrolled' : ''} id="app-header">
      <div className="container header-container">
        {/* Logo brand block */}
        <div className="logo" id="logo-container" onClick={() => handleNavClick('home')}>
          <div className="logo-icon">
            <Layers size={20} />
          </div>
          <div>
            <span className="logo-text">LA Contractors</span>
            <span className="logo-subtext">HEAVY CIVIL</span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="desktop-nav" id="desktop-nav">
          {['home', 'about', 'services', 'pricing', 'work', 'contact'].map((section) => (
            <button
              key={section}
              id={`nav-${section}`}
              className={activeSection === section ? 'active' : ''}
              onClick={() => handleNavClick(section)}
            >
              {section.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="header-actions">
          <button 
            onClick={onToggleTheme} 
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
            style={{ marginRight: '0.25rem' }}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a href="tel:8134626154" className="header-phone" id="header-phone-link">
            <Phone size={14} />
            <span>(813) 462-6154</span>
          </a>
          


          <button 
            id="header-book-now-btn" 
            className="btn-orange" 
            onClick={() => handleNavClick('contact')}
          >
            <Calendar size={14} />
            <span>BOOK NOW</span>
          </button>
        </div>

        {/* Mobile navigation actions */}
        <div className="mobile-header-actions">
          <button 
            onClick={onToggleTheme} 
            className="theme-toggle-btn-mobile"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a href="tel:8134626154" className="mobile-phone-btn" aria-label="Call LA Contractors">
            <Phone size={18} />
          </a>
          <button 
            id="mobile-menu-toggle" 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Panel */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`} id="mobile-menu-drawer">
        {['home', 'about', 'services', 'pricing', 'work', 'contact'].map((section) => (
          <button
            key={section}
            id={`mobile-nav-${section}`}
            className={activeSection === section ? 'active' : ''}
            onClick={() => handleNavClick(section)}
          >
            {section.toUpperCase()}
          </button>
        ))}
        <div className="mobile-drawer-footer">
          <div className="mobile-drawer-phone">
            <Phone size={14} />
            <span>Call us: (813) 462-6154</span>
          </div>
          <button 
            id="mobile-book-now-btn" 
            className="btn-orange" 
            onClick={() => handleNavClick('contact')}
          >
            <Calendar size={14} />
            <span>BOOK NOW</span>
          </button>
        </div>
      </div>
    </header>
  );
};
