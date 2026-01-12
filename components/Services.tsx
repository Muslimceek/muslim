import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Code2, Layers, Star, MousePointer2 } from 'lucide-react';
// import { useLanguage } from '../LanguageContext'; 

// --- MOCK DATA ---
const mockServices = [
  {
    id: 'development',
    title: 'Engineering',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    stack: ['React', 'Node.js', 'Python', 'Telegram API', 'PostgreSQL', 'Docker'],
    packages: [
      { name: 'MVP / Bot', price: 800, duration: '2 weeks', features: ['Telegram Bot Logic', 'Admin Panel', 'Basic Analytics', '1 Month Support'], isPopular: false },
      { name: 'Full Platform', price: 2500, duration: '1.5 months', features: ['Web App + Bot', 'Custom Design', 'Payment Gateway', 'SEO Optimization', '3 Months Support'], isPopular: true },
      { name: 'Enterprise', price: 5000, duration: '3 months', features: ['Microservices', 'High Load Architecture', 'AI Integration', 'Dedicated Team', '1 Year Support'], isPopular: false },
    ],
    extraInfo: [
      { title: 'Included', items: ['Code Review', 'Daily Reports', 'Figma Files'] },
      { title: 'Add-ons', items: ['Hosting Setup', 'Domain Registration', 'Copyright'] }
    ]
  },
  {
    id: 'design',
    title: 'Design & AI',
    icon: Layers,
    color: 'from-purple-500 to-pink-500',
    stack: ['Figma', 'Midjourney', 'Stable Diffusion', 'Photoshop', 'After Effects'],
    packages: [
      { name: 'Logo Pack', price: 300, duration: '3 days', features: ['3 Concepts', 'Vector Files', 'Brand Guidelines', 'Social Media Kit'], isPopular: false },
      { name: 'Visual Identity', price: 900, duration: '2 weeks', features: ['Logo System', 'Typography', 'Merch Design', 'Web Assets', 'Presentation'], isPopular: true },
      { name: 'AI Generation', price: 1200, duration: '1 week', features: ['Custom Models', '1000+ Assets', 'Prompt Engineering', 'Commercial Rights'], isPopular: false },
    ],
    extraInfo: [
      { title: 'Formats', items: ['.SVG', '.PNG', '.AI', '.FIG'] },
      { title: 'Revisions', items: ['Unlimited during draft', '3 Final touches'] }
    ]
  }
];

// --- 1. COMPONENT: SPOTLIGHT CARD (Карточка с подсветкой) ---
const SpotlightCard = ({ children, className = "", isPopular = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative border rounded-[2rem] bg-[#0A0A0A] overflow-hidden ${isPopular ? 'border-blue-500/50 shadow-2xl shadow-blue-900/20' : 'border-white/10'} ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {/* Spotlight Gradient Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Popular Glow Background */}
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      )}

      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};

// --- 2. COMPONENT: COUNTER (Анимация цифр) ---
const NumberTicker = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });

  useEffect(() => {
    springValue.set(value);
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [value, springValue]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// --- 3. MAIN COMPONENT ---
const Services = () => {
  const services = mockServices;
  const [activeTab, setActiveTab] = useState(services[0].id);
  const scrollContainerRef = useRef(null);
  
  // Mobile Scroll Progress Logic
  const { scrollXProgress } = useScroll({ container: scrollContainerRef });
  const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const activeService = services.find(s => s.id === activeTab) || services[0];

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#020202] min-h-screen relative overflow-hidden">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-blue-900/10 via-purple-900/5 to-transparent blur-[120px] pointer-events-none"></div>
      
      {/* Animated Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* --- HEADER BLOCK --- */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-white/5"
          >
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            <span>Investment Plans</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Simple pricing, <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
              maximum scale.
            </span>
          </motion.h2>
        </div>

        {/* --- LIQUID TABS CONTROL --- */}
        <div className="sticky top-24 z-30 flex justify-center mb-12">
          <div className="p-2 rounded-full bg-[#0F0F0F]/80 backdrop-blur-2xl border border-white/10 flex items-center gap-2 shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)]">
            {services.map((service) => {
              const Icon = service.icon;
              const isActive = activeTab === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`
                    relative px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 flex items-center gap-2 z-10
                    ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} opacity-20 border border-white/10`}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                    >
                        {/* Inner light glow */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${service.color} blur-md opacity-40`}></div>
                    </motion.div>
                  )}
                  <Icon size={16} className={isActive ? "text-white" : "text-zinc-500"} />
                  {service.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
          >
            
            {/* --- CARDS CONTAINER --- */}
            <div className="relative group">
               
              {/* Mobile Swipe Indicators (Fade masks) */}
              <div className="absolute left-0 inset-y-0 w-12 bg-gradient-to-r from-[#020202] to-transparent z-20 pointer-events-none md:hidden" />
              <div className="absolute right-0 inset-y-0 w-12 bg-gradient-to-l from-[#020202] to-transparent z-20 pointer-events-none md:hidden" />

              <div
                ref={scrollContainerRef}
                className="
                  flex md:grid md:grid-cols-3 gap-6 md:gap-8
                  overflow-x-auto md:overflow-visible 
                  snap-x snap-mandatory scroll-smooth
                  px-4 md:px-0 pb-12
                  no-scrollbar
                "
              >
                {activeService.packages.map((pkg, idx) => (
                  <div key={idx} className={`min-w-[85vw] md:min-w-0 snap-center relative flex flex-col ${pkg.isPopular ? 'md:-translate-y-6 z-10' : 'z-0'}`}>
                    
                    {/* Floating Label for Popular */}
                    {pkg.isPopular && (
                        <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-10 inset-x-0 flex justify-center mb-4 z-20"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] flex items-center gap-2">
                                <Zap size={10} fill="currentColor" /> Most Popular
                            </div>
                        </motion.div>
                    )}

                    <SpotlightCard className="h-full p-8 flex flex-col relative" isPopular={pkg.isPopular}>
                      
                      {/* Card Header */}
                      <div className="mb-6">
                        <h3 className={`text-xl font-bold mb-2 ${pkg.isPopular ? 'text-white' : 'text-zinc-200'}`}>
                            {pkg.name}
                        </h3>
                        <p className="text-sm text-zinc-500 min-h-[40px] leading-relaxed">
                            Full-service solution for scaling your business operations.
                        </p>
                      </div>

                      {/* Price Section with Animation */}
                      <div className="mb-8 pb-8 border-b border-white/5">
                        <div className="flex items-start gap-1">
                            <span className="text-xl text-zinc-500 font-serif italic mt-1">$</span>
                            <span className="text-5xl font-bold text-white tracking-tighter">
                                <NumberTicker value={pkg.price} />
                            </span>
                        </div>
                        <div className="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-wide">
                             / {pkg.duration} timeline
                        </div>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                                w-full mt-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2
                                ${pkg.isPopular 
                                    ? 'bg-white text-black shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)] hover:bg-zinc-200' 
                                    : 'bg-[#1a1a1a] text-white border border-white/5 hover:bg-[#222] hover:border-white/20'
                                }
                            `}
                        >
                            Start Project <ArrowRight size={16} />
                        </motion.button>
                      </div>

                      {/* Features List */}
                      <ul className="flex-1 space-y-4">
                        {pkg.features.map((feat, i) => (
                           <li key={i} className="flex items-start gap-3 text-sm group/item">
                              <div className={`
                                w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors
                                ${pkg.isPopular ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500 group-hover/item:text-zinc-300'}
                              `}>
                                <Check size={10} strokeWidth={3} />
                              </div>
                              <span className="text-zinc-400 group-hover/item:text-zinc-200 transition-colors leading-snug">{feat}</span>
                           </li>
                        ))}
                      </ul>
                    </SpotlightCard>
                  </div>
                ))}
              </div>
              
              {/* --- MOBILE SCROLL PROGRESS INDICATOR --- */}
              <div className="md:hidden mt-6 px-12">
                 <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                        style={{ scaleX }}
                        className="h-full bg-blue-500 origin-left"
                    />
                 </div>
                 <p className="text-center text-[10px] text-zinc-600 mt-2 uppercase tracking-widest animate-pulse">
                    Swipe to explore
                 </p>
              </div>

            </div>

            {/* --- DETAILS SECTION (BENTO STYLE) --- */}
            {activeService.extraInfo && (
                <div className="mt-16 md:mt-24 pt-12 border-t border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeService.extraInfo.map((info, idx) => (
                            <SpotlightCard key={idx} className="p-6 flex items-center justify-between !rounded-2xl !bg-[#050505]">
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wider">
                                        <div className={`w-2 h-2 rounded-sm ${idx === 0 ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                                        {info.title}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {info.items.map((item, i) => (
                                            <span key={i} className="text-xs text-zinc-500 font-mono px-2 py-1 bg-white/5 rounded-md border border-white/5">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;
