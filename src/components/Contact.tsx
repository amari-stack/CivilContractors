import React, { useState, useEffect } from 'react';
import type { FormEvent } from "react";
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle, Loader2, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
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

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [dbError, setDbError] = useState<{ error: string; instruction: string; details: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

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
      showToast('Project estimate details loaded into proposal form!', 'info');
      
      // Auto-hide the badge pulse after 5 seconds to look premium
      const timer = setTimeout(() => setShowBadge(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [preFill]);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Full name is required.';
      } else if (value.trim().length < 2) {
        error = 'Name must be at least 2 characters.';
      } else if (!/^[a-zA-Z\s'\-]+$/.test(value)) {
        error = 'Name must only contain letters, spaces, hyphens, or apostrophes.';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Please enter a valid email address.';
      }
    } else if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      if (!value.trim()) {
        error = 'Phone number is required.';
      } else if (digitsOnly.length < 10) {
        error = 'Phone number must contain at least 10 digits.';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'name' || name === 'email' || name === 'phone') {
      validateField(name, value);
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'phone') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
): Promise<void> => {
  event.preventDefault();
  setIsSubmitting(true);

  try {
    const apiUrl =
      window.location.hostname === "amari-stack.github.io"
        ? "https://lacontractors.onrender.com/api/proposal"
        : "/api/proposal";

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        message: [
          formData.scale
            ? `Project scale: ${formData.scale}`
            : "",
          formData.notes
            ? formData.notes
            : `Proposal request for ${
                formData.service || "construction services"
              }`,
        ]
          .filter(Boolean)
          .join("\n\n"),
      }),
    });

    const contentType =
      response.headers.get("content-type") || "";

    const data = contentType.includes("application/json")
      ? await response.json()
      : {
          message: await response.text(),
        };

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          "Your proposal could not be submitted."
      );
    }

    setTicketId(
      data.proposalId ||
        `LA-${Math.floor(10000 + Math.random() * 90000)}`
    );

    showToast(
      data.message ||
        "Your proposal was submitted successfully.",
      "success"
    );

    onClearPreFill?.();
  } catch (error: unknown) {
    console.error("Submission error:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Your proposal could not be submitted.";

    showToast(errorMessage, "error");
  } finally {
    setIsSubmitting(false);
  }
};

    if (nameErr || emailErr || phoneErr) {
      showToast('Please correct validation errors in the required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    showToast('Submitting site proposal details...', 'info');

      showToast(err.message || 'Could not reach backend server database dispatch.', 'error');
    }
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
    setTouched({
      name: false,
      email: false,
      phone: false,
    });
    setErrors({
      name: '',
      email: '',
      phone: '',
    });
    setIsSuccess(false);
    setTicketId('');
    setDbError(null);
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
                  <a href="mailto:office@lacontractors.com" className="contact-channel-value block hover:text-orange-600 lowercase">
                    office@lacontractors.com
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

                {dbError && (
                  <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30 text-rose-900 dark:text-rose-200">
                    <div className="flex items-start gap-2.5">
                      <AlertCircle className="text-rose-500 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-rose-600 dark:text-rose-400">
                          {dbError.error}
                        </h4>
                        <p className="text-xs font-sans mt-1 leading-relaxed">
                          {dbError.instruction}
                        </p>
                        {dbError.details && (
                          <div className="mt-2.5 p-2 bg-rose-100/50 dark:bg-rose-950/40 rounded border border-rose-200/50 dark:border-rose-900/20 text-[10px] font-mono text-rose-700 dark:text-rose-300 break-all">
                            <strong>Technical Detail:</strong> {dbError.details}
                          </div>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              showToast('Generating safe offline ticket fallback...', 'info');
                              setTimeout(() => {
                                setIsSuccess(true);
                                setTicketId(`LA-${Math.floor(10000 + Math.random() * 90000)}`);
                                showToast('Fallback proposal generated successfully!', 'success');
                                onClearPreFill();
                              }, 800);
                            }}
                            className="px-3 py-1.5 text-[10px] font-mono uppercase bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors font-semibold"
                          >
                            Proceed with Offline Fallback
                          </button>
                          <button
                            type="button"
                            onClick={() => setDbError(null)}
                            className="text-[10px] font-mono uppercase text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 underline"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Fields Inputs */}
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name-input" className="flex justify-between items-center w-full">
                      <span>FULL NAME *</span>
                      {touched.name && errors.name && (
                        <span className="text-[10px] text-rose-500 font-mono tracking-tight lowercase">{errors.name}</span>
                      )}
                    </label>
                    <input 
                      type="text" 
                      id="name-input" 
                      name="name"
                      className={`form-control ${
                        touched.name && errors.name 
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                          : touched.name && !errors.name && formData.name 
                          ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/40' 
                          : ''
                      }`} 
                      placeholder="Jane Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('name')}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone-input" className="flex justify-between items-center w-full">
                      <span>DIRECT CELL PHONE *</span>
                      {touched.phone && errors.phone && (
                        <span className="text-[10px] text-rose-500 font-mono tracking-tight lowercase">{errors.phone}</span>
                      )}
                    </label>
                    <input 
                      type="tel" 
                      id="phone-input" 
                      name="phone"
                      className={`form-control ${
                        touched.phone && errors.phone 
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                          : touched.phone && !errors.phone && formData.phone 
                          ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/40' 
                          : ''
                      }`} 
                      placeholder="(352) 555-0199" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('phone')}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="email-input" className="flex justify-between items-center w-full">
                      <span>EMAIL ADDRESS *</span>
                      {touched.email && errors.email && (
                        <span className="text-[10px] text-rose-500 font-mono tracking-tight lowercase">{errors.email}</span>
                      )}
                    </label>
                    <input 
                      type="email" 
                      id="email-input" 
                      name="email"
                      className={`form-control ${
                        touched.email && errors.email 
                          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                          : touched.email && !errors.email && formData.email 
                          ? 'border-emerald-500/60 focus:border-emerald-500 focus:ring-emerald-500/40' 
                          : ''
                      }`} 
                      placeholder="jane@company.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
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

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg ${
                toast.type === 'success'
                  ? 'bg-slate-900 border-emerald-500/20 text-white'
                  : toast.type === 'error'
                  ? 'bg-slate-950 border-rose-500/30 text-white'
                  : 'bg-slate-900 border-orange-500/20 text-white'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle className="text-emerald-500 mt-0.5 flex-shrink-0" size={18} />
              ) : toast.type === 'error' ? (
                <X className="text-rose-500 mt-0.5 flex-shrink-0" size={18} />
              ) : (
                <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={18} />
              )}
              <div className="flex-grow">
                <p className="text-[10px] font-semibold uppercase tracking-wider font-mono text-slate-400">
                  {toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'System Alert'}
                </p>
                <p className="text-xs text-slate-200 mt-0.5 font-sans leading-relaxed">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0 mt-0.5"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
};
