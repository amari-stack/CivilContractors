import React, { useState } from 'react';
import { Trophy, Shield, Heart, CheckCircle2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

type TabId = 'history' | 'values' | 'community';

interface TabContent {
  subtitle: string;
  title: string;
  content: string;
  bullets: string[];
}

const aboutTabsContent: Record<TabId, TabContent> = {
  history: {
    subtitle: "Serving Hernando County since 2004",
    title: "Roots in Brooksville, Built on Trust",
    content: "Founded as a small family operation, LA Contractors has grown to become Brooksville’s premier choice for site work and utility infrastructure. We started with a single backhoe and a promise: treat every jobsite like it’s in our own backyard. Over two decades later, we have laid hundreds of miles of underground pipe and shaped the ground for local neighborhoods, shopping centers, and parks.",
    bullets: [
      "Over 20 years of active local operation",
      "Built on client referrals and long-term contracts",
      "100% locally owned and operated in Florida"
    ]
  },
  values: {
    subtitle: "Where heavy iron meets absolute accuracy",
    title: "Precision Grade & Zero Compromise",
    content: "We take pride in our precision. Underground utility work requires rigorous engineering and meticulous execution; we use cutting-edge grade technology and laser leveling systems to make sure every grade is perfect and every pipe runs true. Our team consists of highly certified operators who prioritize safety and durability over shortcuts.",
    bullets: [
      "Rigorous OSHA safety standards on all sites",
      "State-of-the-art GPS grading & pipe-laying lasers",
      "Highly skilled local crew of professional operators"
    ]
  },
  community: {
    subtitle: "Supporting Brooksville beyond the job site",
    title: "Generations of Giving Back",
    content: "We don’t just construct in Brooksville; we live here, raise our kids here, and invest our profits back into Hernando County. We sponsor local Little League teams, support regional agricultural fairs, and volunteer our heavy equipment and crew for community park restorations. We believe a strong business is a pillar that holds the community high.",
    bullets: [
      "Proud sponsors of Brooksville youth sports",
      "Emergency response support for local flood clearance",
      "Annual apprenticeship program for high school graduates"
    ]
  }
};

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('history');
  const activeContent = aboutTabsContent[activeTab];

  return (
    <section id="about" className="section-py-light dark:bg-slate-950">
      <div className="container">
        <motion.div 
          className="about-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          
          {/* Left Column: Media assets and Stat blocks */}
          <div className="about-visual-col" id="about-left-col">
            <div className="about-img-container">
              <div className="about-img-glow"></div>
              <div className="about-img-box">
                <ImageWithSkeleton 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=80" 
                  alt="LA Contractors Site Ops" 
                  className="w-full h-full object-cover"
                />
                <div className="about-floating-badge">
                  <Users size={16} className="text-orange-500" />
                  <div>
                    <h4 className="about-floating-title">Brooksville Roots</h4>
                    <p className="about-floating-text">40+ Local Employees</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Block Grid */}
            <div className="about-stats-row">
              <div className="about-stat-block">
                <div className="about-stat-number">20+</div>
                <div className="about-stat-label">Years Active</div>
              </div>
              <div className="about-stat-block">
                <div className="about-stat-number">450+</div>
                <div className="about-stat-label">Jobs Done</div>
              </div>
              <div className="about-stat-block">
                <div className="about-stat-number">100%</div>
                <div className="about-stat-label">On-Spec</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tab Panel */}
          <div className="about-narrative-col" id="about-right-col">
            <span className="about-subtitle">MEET LA CONTRACTORS</span>
            <h2 className="about-title">Our Foundation is the Brooksville Community</h2>
            <p className="about-p">
              We believe a contract is more than a handshake—it is a community obligation. We handle heavy site preparations, laying high-integrity storm and sanitary lines, with clear transparency and local goodwill.
            </p>

            {/* Tab Buttons switching panel states */}
            <div className="about-tabs-nav" id="about-tabs-nav">
              <button 
                id="about-tab-btn-history" 
                className={`about-tab-btn ${activeTab === 'history' ? 'active' : ''}`} 
                onClick={() => setActiveTab('history')}
              >
                <Trophy size={14} />
                <span>OUR STORY</span>
              </button>
              <button 
                id="about-tab-btn-values" 
                className={`about-tab-btn ${activeTab === 'values' ? 'active' : ''}`} 
                onClick={() => setActiveTab('values')}
              >
                <Shield size={14} />
                <span>OUR WORKMANSHIP</span>
              </button>
              <button 
                id="about-tab-btn-community" 
                className={`about-tab-btn ${activeTab === 'community' ? 'active' : ''}`} 
                onClick={() => setActiveTab('community')}
              >
                <Heart size={14} />
                <span>COMMUNITY PILLAR</span>
              </button>
            </div>

            {/* Live Panel showing content with animation */}
            <div className="about-tab-panel" id="about-tab-content-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <span className="tab-panel-subtitle">{activeContent.subtitle}</span>
                    <h3 className="tab-panel-title">{activeContent.title}</h3>
                  </div>
                  <p className="tab-panel-content mt-2">
                    {activeContent.content}
                  </p>
                  <ul className="tab-panel-bullets mt-4">
                    {activeContent.bullets.map((bullet, i) => (
                      <li key={i} className="tab-panel-bullet">
                        <CheckCircle2 size={14} className="text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
