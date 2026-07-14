import React, { useState } from 'react';
import { HardHat, Layers, Truck, CheckCircle2, X, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';
import { Service } from '../types';
import { ImageWithSkeleton } from './ImageWithSkeleton';

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

const servicesData: Record<string, Service> = {
  'site-dev': {
    id: 'site-dev',
    title: 'Site Development',
    estimate: '$5,000 - $150,000+',
    description: 'Comprehensive clearing, excavation, and structural grading for commercial and residential foundations.',
    bullets: [
      'Site Clearing & Grubbing',
      'Erosion Control & Silt Fencing',
      'Mass Earthwork & Rough Grading'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    icon: 'hard-hat',
    details: 'Our Site Development team possesses the heavy horsepower and engineering precision required to turn raw Florida woodland into build-ready foundations. We handle tree removal, structural leveling, lime rock base layout, and full retention pond excavation. Operating a modern fleet equipped with automated grade controls, we guarantee the highest precision for drainage profiles and load-bearing requirements.',
    specs: [
      'Site Clearing & Grubbing',
      'Erosion Control & Silt Fencing',
      'Mass Earthwork & Rough Grading',
      'Structural Pad Stabilization',
      'Retention Basin Digging'
    ]
  },
  'pipe-install': {
    id: 'pipe-install',
    title: 'Pipe Installation',
    estimate: '$8,000 - $200,000+',
    description: 'High-integrity storm drainage, sewer lines, fire mains, and underground potable water mains.',
    bullets: [
      'Stormwater RCP Installation',
      'Gravity Sanitary Sewers',
      'Underground Fire Service Mains'
    ],
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    icon: 'layers',
    details: 'Underground utility installation is our signature craft. We lay high-diameter concrete piping (RCP), PVC sewer installations, ductile iron water lines, and sanitary tie-ins. Our experienced pipe crew uses state-of-the-art pipe lasers and trench boxes to protect operators and ensure exact fall-rates. We have a solid record of compliance with Hernando County codes and Florida environmental mandates.',
    specs: [
      'Stormwater RCP Installation',
      'Gravity Sanitary Sewers',
      'Underground Fire Service Mains',
      'Force Mains & Lift Stations',
      'Trench Safety & De-watering'
    ]
  },
  'material-sales': {
    id: 'material-sales',
    title: 'Material Sales',
    estimate: '$350 - $4,500+ (load)',
    description: 'Direct dispatch of lime rock, crushed aggregate, screened fill-dirt, washed sand, and topsoil.',
    bullets: [
      'Florida DOT Approved Lime Rock',
      '#57 Crushed Concrete / Granite',
      'Clean Structural Fill-Dirt'
    ],
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80',
    icon: 'truck',
    details: 'Need reliable heavy supplies delivered on-schedule? We sell and deliver premium Florida structural materials directly to your site or home. Whether you need aggregate for a driveway, clean fill-dirt for elevation leveling, or local lime rock for subgrade stabilization, we provide flexible truckloads (single axle, tandem, or semi-dumps) with prompt dispatch and clear volume billing.',
    specs: [
      'Florida DOT Approved Lime Rock',
      '#57 Crushed Concrete / Granite',
      'Clean Structural Fill-Dirt',
      'Screened Topsoil & Red Clay',
      'Tailgate Spreading Available'
    ]
  }
};

export const Services: React.FC<ServicesProps> = ({ onBookService }) => {
  const [activeModalKey, setActiveModalKey] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'hard-hat':
        return <HardHat size={24} />;
      case 'layers':
        return <Layers size={24} />;
      case 'truck':
        return <Truck size={24} />;
      default:
        return <HardHat size={24} />;
    }
  };

  const handleModalOpen = (key: string) => {
    setActiveModalKey(key);
  };

  const handleModalClose = () => {
    setActiveModalKey(null);
  };

  const handleModalBook = (title: string) => {
    handleModalClose();
    onBookService(title);
  };

  const activeService = activeModalKey ? servicesData[activeModalKey] : null;

  return (
    <section id="services" className="section-py-dark">
      <div className="container">
        
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="section-subtitle">OUR CAPABILITIES</span>
          <h2 className="section-title">Our Primary Programs & Services</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            LA Contractors offers full-scale heavy site solutions. We own our fleet, hire local operators, and guarantee a standard of Brooksville work that stands the test of time.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="services-grid" 
          id="services-cards-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          {Object.values(servicesData).map((service) => (
            <div className="service-card" key={service.id} id={`service-card-${service.id}`}>
              <div className="service-card-img-box">
                <div className="service-card-img-overlay"></div>
                <ImageWithSkeleton src={service.image} alt={service.title} className="w-full h-full object-cover" />
                <div className="service-card-icon">
                  {getIcon(service.icon)}
                </div>
              </div>
              <div className="service-card-body">
                <div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-price">Estimate: <span>{service.estimate}</span></p>
                </div>
                <p className="service-card-desc">{service.description}</p>
                <div className="service-card-bullets">
                  {service.bullets.map((bullet, i) => (
                    <div className="service-card-bullet" key={i}>
                      <CheckCircle2 size={12} className="text-orange-500 flex-shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <div className="service-card-ctas">
                  <button className="btn-slate-outline btn-small" onClick={() => handleModalOpen(service.id)}>
                    DETAILS
                  </button>
                  <button className="btn-orange btn-small" onClick={() => onBookService(service.title)}>
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* SERVICE DETAILED MODAL OVERLAY */}
      {activeService && (
        <div 
          id="service-details-modal" 
          className="modal-overlay open" 
          onClick={(e) => {
            if (e.target === e.currentTarget) handleModalClose();
          }}
        >
          <div className="modal-container">
            {/* Modal Banner Photo */}
            <div className="modal-header-banner">
              <ImageWithSkeleton src={activeService.image} containerClassName="absolute inset-0" className="w-full h-full object-cover" alt={activeService.title} />
              <div className="modal-header-overlay"></div>
              <button 
                id="close-service-modal" 
                className="modal-close-btn" 
                onClick={handleModalClose}
              >
                <X size={16} />
              </button>
              <div className="modal-header-text">
                <span className="modal-badge">PRESTIGE PROGRAM</span>
                <h3 className="modal-title" id="modal-service-title">{activeService.title}</h3>
              </div>
            </div>

            {/* Modal Scrollable Details content */}
            <div className="modal-body">
              <div className="modal-body-section">
                <h4 className="modal-body-section-title">PROGRAM DESCRIPTION & CAPABILITY</h4>
                <p className="modal-body-desc" id="modal-service-details">
                  {activeService.details}
                </p>
              </div>

              <div className="modal-details-grid">
                {/* Specifications */}
                <div className="modal-body-section">
                  <h4 className="modal-body-section-title">OUR INCLUDED WORK SCOPES</h4>
                  <ul className="modal-specs-list" id="modal-specs-list">
                    {activeService.specs.map((spec, i) => (
                      <li className="modal-spec-item" key={i}>
                        <CheckCircle2 size={12} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing calculator quick info */}
                <div className="modal-cost-box">
                  <div>
                    <span className="modal-cost-label">ESTIMATED CONTRACT RANGE</span>
                    <div className="modal-cost-price" id="modal-cost-price">{activeService.estimate}</div>
                    <p className="modal-cost-disclaimer">
                      Prices are highly dependent on geological tests, permit logistics, grading area size, and pipe diameter specifications. Contact us for a free engineered site assessment.
                    </p>
                  </div>
                  <div className="modal-ctas">
                    <button className="modal-phone-call-btn" onClick={() => window.open('tel:8134626154')}>
                      <PhoneCall size={16} />
                    </button>
                    <button className="btn-orange" id="modal-book-now-trigger" onClick={() => handleModalBook(activeService.title)}>
                      <span>BOOK SERVICES NOW</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
