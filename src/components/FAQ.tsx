import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Clock, FileText, ShieldAlert, Search } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'timeline' | 'permitting' | 'contracts' | 'general';
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const faqs: FAQItem[] = [
  {
    category: 'timeline',
    question: 'How long does a typical site development project take?',
    answer: 'Timelines vary by scope. Minor site preparation, land clearing, and general grading usually span 1 to 3 weeks. Comprehensive commercial infrastructure, heavy grading, and utility installations typically require 2 to 6 months. We provide a guaranteed baseline milestone schedule before mobilizing.',
    icon: Clock
  },
  {
    category: 'permitting',
    question: 'Who handles the municipal permitting process and what is the typical wait time?',
    answer: 'Our dedicated operations team handles all municipal submissions, environmental zoning clearances, and county engineering approvals. In Hernando County and the surrounding Florida region, standard site preparation permits take 2 to 6 weeks, depending on wetland delineations and stormwater drainage review requirements.',
    icon: ShieldAlert
  },
  {
    category: 'contracts',
    question: 'What is your standard contract procedure and milestone billing structure?',
    answer: 'We utilize standardized contract frameworks detailing exact line-item specifications. Progress billing is milestone-based: an initial mobilization deposit is followed by staged draws tied to verified project milestones (e.g., rough grading completed, deep utilities installed, final grading and subgrade stabilization certified).',
    icon: FileText
  },
  {
    category: 'timeline',
    question: 'How do weather delays affect the established project schedule?',
    answer: 'Florida heavy site operations must account for seasonal precipitation. We integrate "weather allowance days" into all proposals. If a significant tropical event or torrential rain delays active excavation, we adjust soil stabilization schedules and work extended shifts once ground conditions permit, minimizing overall timeline impacts.',
    icon: Clock
  },
  {
    category: 'contracts',
    question: 'How are unforeseen subsurface conditions (such as heavy rock or sinkholes) managed?',
    answer: 'We utilize historical Hernando County geological data and perform comprehensive soil borings during scoping to reduce surprises. If extreme subsurface anomalies (e.g., solid limestone layers, high water tables) are encountered, we immediate pause operations in that zone, present detailed geotechnical reports, and issue clear, itemized change-orders.',
    icon: FileText
  },
  {
    category: 'general',
    question: 'Do you offer modern 3D site modeling or GPS grading before excavation begins?',
    answer: 'Yes, we develop advanced 3D topographical models of all planned earthwork. Our state-of-the-art grading equipment is equipped with integrated 3D GPS machine control systems, ensuring cuts and fills are executed with sub-inch grade accuracy compared to engineering plans.',
    icon: HelpCircle
  }
];

export const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'timeline', label: 'Timelines' },
    { id: 'permitting', label: 'Permitting' },
    { id: 'contracts', label: 'Contracts' },
    { id: 'general', label: 'Technical' }
  ];

  return (
    <section id="faq" className="section-py-grey border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="container max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-orange-500 font-bold bg-orange-500/10 dark:bg-orange-500/20 px-3.5 py-1.5 rounded-full inline-block mb-4"
          >
            FAQ &bull; Technical Guidelines
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase font-sans"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-3 text-sm md:text-base font-sans"
          >
            Clear answers about site planning, permitting schedules, milestone payments, and geological mitigation procedures.
          </motion.p>
        </div>

        {/* Search and Categories Toolbar */}
        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm transition-colors duration-300">
          
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-3 py-1.5 text-xs font-mono rounded-md transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/10'
                    : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              placeholder="Search terms, permitting..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 min-h-[150px]">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = openIndex === index;
                return (
                  <motion.div
                    key={faq.question}
                    layout="position"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'border-orange-500/40 bg-orange-500/[0.01] dark:bg-orange-500/[0.02] shadow-sm shadow-orange-500/5'
                        : 'border-slate-200/70 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className="w-full flex items-start justify-between p-4 text-left transition-colors focus:outline-none"
                    >
                      <div className="flex gap-3.5 pr-4">
                        <div className={`mt-0.5 p-2 rounded-lg transition-colors ${
                          isOpen 
                            ? 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-1">
                            {faq.category}
                          </span>
                          <h3 className={`text-sm font-bold tracking-tight transition-colors font-sans ${
                            isOpen ? 'text-orange-600 dark:text-orange-400' : 'text-slate-900 dark:text-slate-100'
                          }`}>
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <div className={`mt-2 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-500' : ''}`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-4 pb-5 pl-[3.25rem] pr-6 border-t border-slate-100 dark:border-slate-800/40 pt-3">
                            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              >
                <HelpCircle size={32} className="mx-auto text-slate-300 dark:text-slate-700 mb-3 animate-pulse" />
                <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">No matching questions found.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
                  className="mt-3 text-xs text-orange-500 hover:text-orange-600 font-mono underline"
                >
                  Reset active filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
