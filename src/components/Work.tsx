import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, Star, Award } from 'lucide-react';
import { PortfolioItem, Testimonial } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithSkeleton } from './ImageWithSkeleton';

const portfolioItems: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Brooksville Shopping Center Base',
    description: 'Mass earth excavation, structural stabilization, and base preparation for a 12,000 sq ft retail pad.',
    category: 'Site Work',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    location: 'South Broad St, Brooksville',
    date: 'March 2026'
  },
  {
    id: 'p2',
    title: 'Oak Hills Storm Drainage Install',
    description: 'Laying 1,800 linear feet of 36-inch Reinforced Concrete Piping (RCP) to mitigate local regional flooding.',
    category: 'Underground Pipe',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    location: 'Oak Hills Subdivision, FL',
    date: 'January 2026'
  },
  {
    id: 'p3',
    title: 'Hernando County Park Civil Prep',
    description: 'Topsoil stripping, retention pond excavation, and structural grade work for new public park layouts.',
    category: 'Site Work',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    location: 'State Road 50, Brooksville',
    date: 'November 2025'
  },
  {
    id: 'p4',
    title: 'Sewer Bypass & Sanitary Tie-In',
    description: 'Meticulous deep-trench sanitary pipe connections and compliance flow test sign-offs under live highway route.',
    category: 'Underground Pipe',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    location: 'US-98 Bypass, Brooksville',
    date: 'September 2025'
  },
  {
    id: 'p5',
    title: 'Lime Rock Delivery Subgrade',
    description: 'Fast dispatch and tailgate spread of 120 loads of DOT approved aggregate for parking subbase grading.',
    category: 'Material Sales',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    location: 'Cobb Road Warehouse, FL',
    date: 'June 2025'
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Darrell Vance",
    role: "Project Manager",
    company: "Vance Commercial Properties",
    quote: "LA Contractors is easily the most reliable site preparation crew in Hernando County. Their operator grade accuracy is unmatched. They excavated our foundation pads ahead of schedule and the civil engineers signed off with zero adjustments. A true Brooksville pillar.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Sarah Mitchell",
    role: "County Engineer Coordinator",
    company: "Hernando Public Works (Consultant)",
    quote: "Laying large diameter utility drainage near commercial corridors is highly risk-sensitive. LA Contractors followed state utility safety standards flawlessly, managed the trench boxes with care, and finished the pipe run with laser precision. Excellent contractors to work with.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
  },
  {
    name: "Gene Hollister",
    role: "Owner & President",
    company: "Hollister Agricultural Feed",
    quote: "We ordered over 80 tons of DOT-grade lime rock for heavy tractor lanes. The team dispatched drivers who tailgate-spread it beautifully. They saved our operators hours of blade work. Great price, friendly local dispatch, honest company.",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
  }
];

export const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const testimonialIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const categories = ['All', 'Site Work', 'Underground Pipe', 'Material Sales'];

  const filteredItems = portfolioItems.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  // Auto cycling for testimonials
  const startTimer = () => {
    if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    
    testimonialIntervalRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    };
  }, []);

  const handleTestimonialChange = (index: number) => {
    setActiveTestimonial(index);
    startTimer(); // reset auto-cycle timer on click
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section id="work" className="section-py-dark bg-[#0b1329]">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">OUR RECORD</span>
          <h2 className="section-title">Completed Works & Local Trust</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            Explore our real job history across Hernando County. We treat every civil municipal pipe run, parking pad layout, and material dispatch load with strict engineering care.
          </p>
        </div>

        {/* Portfolio Filters */}
        <div className="portfolio-filters" id="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={`portfolio-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Items Grid with Animation */}
        <div className="portfolio-grid" id="portfolio-items-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                id={`portfolio-item-${item.id}`}
                className="portfolio-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="portfolio-card-img-box">
                    <ImageWithSkeleton src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <span className="portfolio-card-badge">{item.category}</span>
                  </div>
                  <div className="portfolio-card-body">
                    <h4 className="portfolio-card-title">{item.title}</h4>
                    <p className="portfolio-card-desc">{item.description}</p>
                  </div>
                </div>
                <div className="portfolio-card-footer">
                  <div className="portfolio-footer-item">
                    <MapPin size={12} className="text-orange-600 flex-shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <div className="portfolio-footer-item">
                    <Calendar size={12} className="text-orange-600 flex-shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Testimonials Bento Row */}
        <div className="testimonials-divider">
          <div className="testimonials-grid">
            
            {/* Intro left box */}
            <div className="testimonials-intro">
              <span className="testimonials-intro-subtitle font-bold text-orange-500">VOICES OF ACCURACY</span>
              <h3 className="testimonials-intro-title text-white font-extrabold text-2xl uppercase">Engineered for absolute satisfaction</h3>
              <p className="testimonials-intro-desc text-slate-300">
                Don’t just take our word for it. Read honest reviews from commercial project managers, public works civil directors, and agricultural owners across Hernando County.
              </p>
              <div className="testimonials-intro-badge">
                <Award size={18} className="text-orange-500" />
                <span className="testimonials-intro-badge-text font-bold text-slate-300">5-STAR RATED ON GOOGLE MY BUSINESS</span>
              </div>
            </div>

            {/* Testimonials Slider area */}
            <div className="testimonials-slider-col">
              <div className="testimonial-card relative min-h-[300px] flex flex-col justify-between">
                <span className="testimonial-quote-bg absolute right-4 top-4 select-none pointer-events-none text-8xl text-slate-800 opacity-20">“</span>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      {/* Stars */}
                      <div className="testimonial-stars" id="testimonial-stars">
                        {Array.from({ length: currentTestimonial.stars }).map((_, i) => (
                          <Star key={i} size={14} className="fill-orange-600 text-orange-600" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <p className="testimonial-quote mt-4 leading-relaxed font-medium text-slate-200 text-sm md:text-base">
                        "{currentTestimonial.quote}"
                      </p>
                    </div>

                    {/* User profile details */}
                    <div className="testimonial-user flex justify-between items-center pt-4 border-t-2 border-[#1a253a]">
                      <div className="testimonial-user-info flex items-center gap-3">
                        <div className="testimonial-avatar w-12 h-12 border-2 border-slate-700 rounded-full overflow-hidden">
                          <ImageWithSkeleton 
                            src={currentTestimonial.avatar} 
                            alt={currentTestimonial.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <h4 className="testimonial-name font-bold text-white uppercase text-xs tracking-wider">{currentTestimonial.name}</h4>
                          <p className="testimonial-role text-[10px] text-slate-400 font-mono tracking-widest mt-0.5">
                            {currentTestimonial.role} at <span className="text-orange-500 font-bold">{currentTestimonial.company}</span>
                          </p>
                        </div>
                      </div>

                      {/* Manual switcher dots */}
                      <div className="testimonial-dots flex gap-1.5">
                        {testimonials.map((_, idx) => (
                          <button
                            key={idx}
                            className={`testimonial-dot h-2 rounded-none transition-all duration-300 ${activeTestimonial === idx ? 'active w-6 bg-orange-600' : 'w-2 bg-slate-800'}`}
                            onClick={() => handleTestimonialChange(idx)}
                            aria-label={`Show testimonial ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
