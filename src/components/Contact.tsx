import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle, Loader2 } from 'lucide-react';
import { BookingProposal } from '../types';

interface ContactProps {
  preFill: {
    service: string;
    scale: string;
    notes: string;
    triggerCount: number; // to detect changes
  } | null;
  onClearPreFill: () => void;
}

export const Contact: React.FC<ContactProps> = ({ preFill, onClearPreFill }) => {
  const [formData, setFormData] = useState<BookingProposal>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'General Contracting Consultation',
    scale: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [showBadge, setShowBadge] = useState(false);

  // Apply pre-filled values when they come from Estimator or Services
  useEffect(() => {
    if (preFill) {
      setFormData((prev) => ({
        ...prev,
        service: preFill.service,
        scale: preFill.scale,
        notes: preFill.notes,
      }));
      setShowBadge(true);
      
      // Auto-hide the badge pulse after 5 seconds to look premium
      const timer = setTimeout(() => setShowBadge(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [preFill]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill out the required Name, Phone, and Email fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate reliable API proposal submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTicketId(`LA-${Math.floor(10000 + Math.random() * 90000)}`);
      onClearPreFill();
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'General Contracting Consultation',
      scale: '',
      notes: '',
    });
    setIsSuccess(false);
    setTicketId('');
  };

  return (
    <section id="contact" className="section-py-light bg-slate-50 dark:bg-slate-950">
      <div className="container">
        <div className="contact-grid">
          
          {/* Left Column: Direct Contacts info panels */}
          <div className="contact-info-col">
            <div className="contact-info-header">
              <span className="about-subtitle">GET IN TOUCH</span>
              <h2 className="contact-info-title">Headquarters & Dispatch Yard</h2>
              <p className="contact-info-desc">
                Whether you need a bulk delivery of aggregates or are requesting a bid package for major subgrade utilities, we coordinate everything promptly from our central Brooksville location.
              </p>
            </div>

            {/* Channels Lists */}
            <div className="contact-channels">
              
              <div className="contact-channel-item">
                <Phone size={24} className="flex-shrink-0 text-orange-600 mt-1" />
                <div>
                  <h4 className="contact-channel-label">Direct Line / Dispatch</h4>
                  <a href="tel:8134626154" className="contact-channel-value block hover:text-orange-600">
                    (813) 462-6154
                  </a>
                </div>
              </div>

              <div className="contact-channel-item">
                <Mail size={24} className="flex-shrink-0 text-orange-600 mt-1" />
                <div>
                  <h4 className="contact-channel-label">General Office Email</h4>
                  <a href="mailto:office@lacontractors.co" className="contact-channel-value block hover:text-orange-600 lowercase">
                    office@lacontractors.co
                  </a>
                </div>
              </div>

              <div className="contact-channel-item">
                <MapPin size={24} className="flex-shrink-0 text-orange-600 mt-1" />
                <div>
                  <h4 className="contact-channel-label">Main Dispatch Office Yard</h4>
                  <p className="contact-channel-value">
                    15372 Cobb Road, Brooksville, FL 34601
                  </p>
                </div>
              </div>

              <div className="contact-channel-item">
                <Clock size={24} className="flex-shrink-0 text-orange-600 mt-1" />
                <div>
                  <h4 className="contact-channel-label">Active Operating Hours</h4>
                  <div className="contact-channel-hours mt-1 font-bold">
                    <span>Weekdays: 7:00 AM - 5:00 PM</span>
                    <span className="sec-hours block text-slate-500">Saturday: 8:00 AM - 1:00 PM</span>
                    <span className="sec-hours block text-slate-500">Sunday: Closed (Emergency dispatch only)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Safeguards Certifications */}
            <div className="contact-trust-card bg-[#090f1d] border-2 border-slate-800 p-6 flex flex-col gap-3">
              <div className="contact-trust-header flex items-center gap-2">
                <ShieldCheck size={20} className="text-orange-500" />
                <span className="contact-trust-badge font-bold text-white uppercase text-xs tracking-wider">State Safeguards Activated</span>
              </div>
              <p className="contact-trust-desc text-slate-300 text-xs leading-relaxed">
                LA Contractors is fully licensed under the State of Florida, carrying extensive commercial liability policies, environmental hazard mitigation protections, and strictly safety bonded up to $2,000,000.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking form */}
          <div className="contact-form-col bg-white border-2 border-slate-900 shadow-2xl p-6 md:p-10">
            
            {!isSuccess ? (
              <form onSubmit={handleSubmit} id="booking-form">
                <div className="form-header flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="form-header-title font-extrabold text-slate-950 uppercase text-lg">BOOKING PROPOSAL FORM</h3>
                    <p className="form-header-desc text-slate-500 text-xs mt-1">
                      Fill out our ballpark details below to secure a priority site inspection.
                    </p>
                  </div>
                  {showBadge && (
                    <span className="form-loaded-badge bg-orange-600 text-white font-mono text-[10px] tracking-wider px-3 py-1 animate-pulse" id="form-loaded-badge">
                      ESTIMATE LOADED
                    </span>
                  )}
                </div>

                {/* Form Fields Inputs */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name-input">FULL NAME *</label>
                    <input 
                      type="text" 
                      id="name-input" 
                      name="name"
                      className="form-control" 
                      placeholder="Jane Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone-input">DIRECT CELL PHONE *</label>
                    <input 
                      type="tel" 
                      id="phone-input" 
                      name="phone"
                      className="form-control" 
                      placeholder="(352) 555-0199" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="email-input">EMAIL ADDRESS *</label>
                    <input 
                      type="email" 
                      id="email-input" 
                      name="email"
                      className="form-control" 
                      placeholder="jane@company.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company-input">COMPANY NAME (OPTIONAL)</label>
                    <input 
                      type="text" 
                      id="company-input" 
                      name="company"
                      className="form-control" 
                      placeholder="Doe Land Development Co." 
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="service-select">REQUIRED PROGRAM / SERVICE</label>
                    <select 
                      id="service-select" 
                      name="service"
                      className="form-control cursor-pointer"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="Site Development">Site Development</option>
                      <option value="Pipe Installation">Pipe Installation</option>
                      <option value="Material Sales">Material Sales</option>
                      <option value="General Contracting Consultation">General Contracting Consultation</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="scale-input">PROJECT SCALE (APPROXIMATE)</label>
                    <input 
                      type="text" 
                      id="scale-input" 
                      name="scale"
                      className="form-control" 
                      placeholder="e.g., 3 Acres Clearing, 12 Loads Limerock" 
                      value={formData.scale}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="notes-textarea">ADDITIONAL SPECIFICATIONS OR DIRECTIONS</label>
                  <textarea 
                    id="notes-textarea" 
                    name="notes"
                    rows={4} 
                    className="form-control resize-none" 
                    placeholder="Provide heavy site entry directions, utility drawing specs, aggregate spreading requirements, or scheduling urgency details..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Form Footer */}
                <div className="form-footer flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-3 border-t border-slate-100">
                  <p className="form-disclaimer text-[10px] text-slate-500 leading-normal max-w-[280px]">
                    By submitting, you agree to receive follow-up phone calls or email proposals from LA Contractors to coordinate site visits.
                  </p>
                  <button 
                    type="submit" 
                    className="btn-orange flex justify-center items-center gap-2 min-w-[180px] h-12"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      <span>SUBMIT PROPOSAL</span>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Submission Success state panel */
              <div className="success-panel flex flex-col items-center text-center gap-6 py-12" id="form-success-panel">
                <div className="success-icon-box bg-orange-600 text-white p-4 shadow-xl">
                  <CheckCircle size={40} />
                </div>
                <div className="success-text-container flex flex-col gap-2 max-w-md">
                  <span className="success-badge font-mono text-[10px] text-orange-600 font-black tracking-widest uppercase">PROPOSAL LOGGED</span>
                  <h3 className="success-title font-extrabold text-slate-950 uppercase text-xl">Thank You, {formData.name}!</h3>
                  <p className="success-desc text-slate-600 text-xs leading-relaxed">
                    Your site proposal details have been registered into our local dispatch log. A veteran field supervisor will review your project specs and call you back shortly.
                  </p>
                </div>
                
                {/* Simulated booking ticket details */}
                <div className="success-receipt bg-slate-950 border border-slate-900 p-4 w-full max-w-sm flex flex-col gap-1.5">
                  <span className="success-receipt-label font-mono text-[9px] text-slate-400 tracking-wider">YOUR TRACKING TICKETS</span>
                  <span className="success-receipt-code font-mono text-2xl font-black text-orange-500 tracking-wide" id="success-receipt-code">
                    {ticketId}
                  </span>
                  <span className="success-receipt-footer font-mono text-[8px] text-slate-500 tracking-widest uppercase">
                    LA CONTRACTORS BROOKSVILLE
                  </span>
                </div>

                <button 
                  id="reset-form-btn" 
                  className="btn-slate-outline btn-small mt-2" 
                  onClick={handleReset}
                >
                  SUBMIT ANOTHER PROPOSAL
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};
