import React, { useState, useEffect } from 'react';
import { Calculator, Info, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface PricingProps {
  onLockInEstimate: (serviceTitle: string, scale: string, estimateText: string) => void;
}

type EstimatorService = 'site' | 'pipe' | 'materials';
type MaterialType = 'limerock' | 'crushed' | 'filldirt' | 'topsoil';

const materialPrices = {
  limerock: { name: 'DOT Lime Rock', perLoad: 380 },
  crushed: { name: '#57 Crushed Concrete', perLoad: 450 },
  filldirt: { name: 'Structural Fill-Dirt', perLoad: 280 },
  topsoil: { name: 'Screened Gardening Topsoil', perLoad: 350 },
};

export const Pricing: React.FC<PricingProps> = ({ onLockInEstimate }) => {
  const [activeService, setActiveService] = useState<EstimatorService>('site');
  const [activeMaterial, setActiveMaterial] = useState<MaterialType>('limerock');
  
  // Sliders state
  const [acreage, setAcreage] = useState<number>(3);
  const [feet, setFeet] = useState<number>(150);
  const [loads, setLoads] = useState<number>(8);

  // Computed state totals
  const [materialsCost, setMaterialsCost] = useState<number>(0);
  const [laborCost, setLaborCost] = useState<number>(0);
  const [mobilizationCost, setMobilizationCost] = useState<number>(250);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    let materials = 0;
    let labor = 0;
    let mobilization = 250;

    if (activeService === 'site') {
      materials = Math.round(acreage * 2800);
      labor = Math.round(acreage * 4500);
      mobilization = acreage > 3 ? 750 : 350;
    } else if (activeService === 'pipe') {
      materials = Math.round(feet * 38);
      labor = Math.round(feet * 52);
      mobilization = feet > 200 ? 600 : 400;
    } else if (activeService === 'materials') {
      const pricePerLoad = materialPrices[activeMaterial].perLoad;
      materials = pricePerLoad * loads;
      labor = 80 * loads;
      mobilization = 150;
    }

    setMaterialsCost(materials);
    setLaborCost(labor);
    setMobilizationCost(mobilization);
    setTotalCost(materials + labor + mobilization);
  }, [activeService, activeMaterial, acreage, feet, loads]);

  const handleLockIn = () => {
    let serviceLabel = '';
    let specLabel = '';

    if (activeService === 'site') {
      serviceLabel = 'Site Development';
      specLabel = `${acreage} Acre(s) Clearing & Grading`;
    } else if (activeService === 'pipe') {
      serviceLabel = 'Pipe Installation';
      specLabel = `${feet} Linear Feet of Utility Piping`;
    } else if (activeService === 'materials') {
      serviceLabel = 'Material Sales';
      specLabel = `${loads} Truckloads Delivered - ${materialPrices[activeMaterial].name}`;
    }

    const totalStr = `$${totalCost.toLocaleString()}`;
    const notesText = `Automated Ballpark Estimate: ${totalStr}. Based on ${specLabel}. Please confirm subgrade requirements and scheduling availability.`;

    onLockInEstimate(serviceLabel, specLabel, notesText);
  };

  return (
    <section id="pricing" className="section-py-grey dark:bg-slate-900">
      <div className="container">
        
        {/* Section Header */}
        <motion.div 
          className="section-header max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="section-subtitle">LOCAL PRICING ENG</span>
          <h2 className="section-title">Interactive Cost Estimator</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            We operate with absolute transparency. Use our real-time estimation engine below to calculate a ballpark proposal for clearing, utility piping, or bulk material dispatch.
          </p>
        </motion.div>

        {/* Pricing Layout Container */}
        <motion.div 
          className="pricing-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          
          {/* Controls Column */}
          <div className="pricing-inputs-col">
            <h3 className="pricing-label flex items-center gap-2 mb-0">
              <Calculator size={14} className="text-orange-600" />
              <span>CONFIGURE SERVICE SCALE</span>
            </h3>

            {/* Service selectors buttons */}
            <div className="pricing-toggle-group" id="pricing-selectors">
              <button 
                id="pricing-select-site" 
                className={`pricing-toggle-btn ${activeService === 'site' ? 'active' : ''}`}
                onClick={() => setActiveService('site')}
              >
                SITE DEV
              </button>
              <button 
                id="pricing-select-pipe" 
                className={`pricing-toggle-btn ${activeService === 'pipe' ? 'active' : ''}`}
                onClick={() => setActiveService('pipe')}
              >
                PIPE LAYING
              </button>
              <button 
                id="pricing-select-materials" 
                className={`pricing-toggle-btn ${activeService === 'materials' ? 'active' : ''}`}
                onClick={() => setActiveService('materials')}
              >
                MATERIALS
              </button>
            </div>

            {/* Config Sliders Form Area */}
            <div className="pricing-dynamic-inputs">
              
              {/* Slider 1: Site Development acreage selection */}
              {activeService === 'site' && (
                <div className="pricing-slider-block" id="slider-group-site">
                  <div className="slider-header">
                    <label htmlFor="pricing-acreage-slider" className="slider-title">PROJECT SIZE (ACRES)</label>
                    <span className="slider-val-badge" id="badge-site-acres">
                      {acreage} {acreage === 1 ? 'Acre' : 'Acres'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="pricing-acreage-slider" 
                    className="pricing-slider" 
                    min="1" 
                    max="15" 
                    step="0.5" 
                    value={acreage}
                    onChange={(e) => setAcreage(parseFloat(e.target.value))}
                  />
                  <div className="slider-limits">
                    <span>1 Acre (Min)</span>
                    <span>5 Acres</span>
                    <span>10 Acres</span>
                    <span>15 Acres (Max)</span>
                  </div>
                  <p className="slider-description">Calculates mobilization, clearing, grubbing, retention grading, and erosion limits.</p>
                </div>
              )}

              {/* Slider 2: Pipe Laying linear feet selection */}
              {activeService === 'pipe' && (
                <div className="pricing-slider-block" id="slider-group-pipe">
                  <div className="slider-header">
                    <label htmlFor="pricing-feet-slider" className="slider-title">TOTAL PIPING DEPTH (LINEAR FEET)</label>
                    <span className="slider-val-badge" id="badge-pipe-feet">{feet} Linear Feet</span>
                  </div>
                  <input 
                    type="range" 
                    id="pricing-feet-slider" 
                    className="pricing-slider" 
                    min="20" 
                    max="1000" 
                    step="10" 
                    value={feet}
                    onChange={(e) => setFeet(parseInt(e.target.value))}
                  />
                  <div className="slider-limits">
                    <span>20 LF (Min)</span>
                    <span>300 LF</span>
                    <span>600 LF</span>
                    <span>1,000 LF (Max)</span>
                  </div>
                  <p className="slider-description">Includes pipe excavation, bedding sand, laser gradient setup, RCP joints, and backfill specs.</p>
                </div>
              )}

              {/* Slider 3: Material Sales loads selection & materials items buttons */}
              {activeService === 'materials' && (
                <div className="pricing-slider-block" id="slider-group-materials">
                  
                  {/* Sub Material select Buttons Grid */}
                  <label className="pricing-label mb-2">CHOOSE CORE MATERIAL TYPE</label>
                  <div className="pricing-materials-grid">
                    {(Object.keys(materialPrices) as MaterialType[]).map((mKey) => (
                      <button 
                        key={mKey}
                        id={`pricing-material-${mKey}`} 
                        className={`pricing-material-btn ${activeMaterial === mKey ? 'active' : ''}`}
                        onClick={() => setActiveMaterial(mKey)}
                      >
                        <span className="pricing-material-name">{materialPrices[mKey].name}</span>
                        <span className="pricing-material-cost">${materialPrices[mKey].perLoad}/ld</span>
                      </button>
                    ))}
                  </div>

                  <div className="slider-header">
                    <label htmlFor="pricing-loads-slider" className="slider-title">TANDEM TRUCKLOADS ORDERED</label>
                    <span className="slider-val-badge" id="badge-materials-loads">
                      {loads} {loads === 1 ? 'Load' : 'Loads'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    id="pricing-loads-slider" 
                    className="pricing-slider" 
                    min="1" 
                    max="30" 
                    step="1" 
                    value={loads}
                    onChange={(e) => setLoads(parseInt(e.target.value))}
                  />
                  <div className="slider-limits">
                    <span>1 Load (Min)</span>
                    <span>10 Loads</span>
                    <span>20 Loads</span>
                    <span>30 Loads (Max)</span>
                  </div>
                  <p className="slider-description">Tailgate spreading available on all aggregates. Tandem loads averages 16 tons of structural payload.</p>
                </div>
              )}

            </div>

            {/* Dynamic Info Panel details */}
            <div className="pricing-info-block">
              <Info size={18} className="flex-shrink-0 text-orange-600 mt-0.5" />
              <div>
                <h4 className="pricing-info-title">BALLPARK ASSESSMENT ONLY</h4>
                <p className="pricing-info-desc">
                  This estimator calculates averages based on dry-site soil conditions and standard state building compliance. Solid rock excavations, high groundwater dewatering runs, and custom zoning variances will affect formal bids.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Outputs Column */}
          <div className="pricing-outputs-col">
            <div className="pricing-out-header">
              <span className="pricing-out-subtitle">CONTRACT BREAKDOWN SUMMARY</span>
              <h3 className="pricing-out-title">
                {activeService === 'site' && 'SITE PREPARATION ESTIMATE'}
                {activeService === 'pipe' && 'UTILITY PIPELAYING PROPOSAL'}
                {activeService === 'materials' && 'MATERIAL COURIER ORDER'}
              </h3>
            </div>

            {/* Breakdown calculations */}
            <div className="pricing-breakdown-list">
              <div className="pricing-breakdown-item">
                <span className="label">MATERIALS & PAYLOADS</span>
                <span className="val" id="breakdown-materials">${materialsCost.toLocaleString()}</span>
              </div>
              <div className="pricing-breakdown-item">
                <span className="label">HEAVY EQUIPMENT & LABOR OPERATORS</span>
                <span className="val" id="breakdown-labor">${laborCost.toLocaleString()}</span>
              </div>
              <div className="pricing-breakdown-item">
                <span className="label">MOBILIZATION & INSURANCE DEPOT</span>
                <span className="val" id="breakdown-mobilization">${mobilizationCost.toLocaleString()}</span>
              </div>
              <div className="pricing-breakdown-total">
                <span>ESTIMATED PROJECT CONTRACT</span>
                <span className="val-big" id="breakdown-total">${totalCost.toLocaleString()}</span>
              </div>
            </div>

            {/* Quality Checkpoints */}
            <div className="pricing-checks">
              <div className="pricing-check-item">
                <Check size={12} className="text-orange-500" />
                <span>Includes all county erosion/sedimentation codes</span>
              </div>
              <div className="pricing-check-item">
                <Check size={12} className="text-orange-500" />
                <span>Zero administrative fees or compliance overheads</span>
              </div>
              <div className="pricing-check-item">
                <Check size={12} className="text-orange-500" />
                <span>Supervised by a state-licensed general contractor</span>
              </div>
            </div>

            {/* CTA action trigger */}
            <div className="pricing-cta-container">
              <button 
                id="pricing-lock-in-btn" 
                className="btn-orange" 
                onClick={handleLockIn}
              >
                LOCK IN ESTIMATE & BOOK PROPOSAL
              </button>
              <span className="pricing-cta-sub">SECURED LOCAL ESTIMATE ENGINE • LA CONTRACTORS</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
