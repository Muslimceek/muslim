import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { getServices } from '../constants'; // Раскомментируйте, когда подключите данные
import { Check, X, ArrowRight, Zap, Code2, Layers, Smartphone, Database, Cpu } from 'lucide-react';
// import { useLanguage } from '../LanguageContext'; // Раскомментируйте

// --- MOCK DATA (Для примера, если constants нет под рукой) ---
// Удалите этот блок, если используете реальный getServices
const mockServices = [
  {
    id: 'development',
    title: 'Development',
    icon: Code2,
    stack: ['React', 'Node.js', 'Python', 'Telegram API', 'PostgreSQL', 'Docker'],
    packages: [
      { name: 'MVP / Bot', price: '$800+', duration: '2 weeks', features: ['Telegram Bot Logic', 'Admin Panel', 'Basic Analytics', '1 Month Support'], isPopular: false },
      { name: 'Full Platform', price: '$2,500+', duration: '1.5 months', features: ['Web App + Bot', 'Custom Design', 'Payment Gateway', 'SEO Optimization', '3 Months Support'], isPopular: true },
      { name: 'Enterprise', price: '$5,000+', duration: '3 months', features: ['Microservices', 'High Load Architecture', 'AI Integration', 'Dedicated Team', '1 Year Support'], isPopular: false },
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
    stack: ['Figma', 'Midjourney', 'Stable Diffusion', 'Photoshop', 'After Effects'],
    packages: [
      { name: 'Logo Pack', price: '$300', duration: '3 days', features: ['3 Concepts', 'Vector Files', 'Brand Guidelines', 'Social Media Kit'], isPopular: false },
      { name: 'Visual Identity', price: '$900', duration: '2 weeks', features: ['Logo System', 'Typography', 'Merch Design', 'Web Assets', 'Presentation'], isPopular: true },
      { name: 'AI Generation', price: '$1,200', duration: '1 week', features: ['Custom Models', '1000+ Assets', 'Prompt Engineering', 'Commercial Rights'], isPopular: false },
    ],
    extraInfo: [
      { title: 'Formats', items: ['.SVG', '.PNG', '.AI', '.FIG'] },
      { title: 'Revisions', items: ['Unlimited during draft', '3 Final touches'] }
    ]
  }
];

const Services = () => {
  // const { language, t } = useLanguage(); 
  // const services = getServices(language);
  const services = mockServices; // Используем мок для демонстрации

  const [activeTab, setActiveTab] = useState(services[0].id);
  const [hoveredCard, setHoveredCard] = useState(null);
  const scrollContainerRef = useRef(null);

  const activeService = services.find(s => s.id === activeTab) || services[0];

  // Сброс скролла при переключении
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <section id="services" className="py-24 md:py-32 bg-[#020202] min-h-screen relative overflow-hidden">

      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none z-0"></div>
      <div className="absolute top-0 center w-full h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm"
          >
            <Zap size={14} className="fill-blue-400/20" />
            <span>Value Propositions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Transparent <span className="text-zinc-600">Pricing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 max-w-xl mx-auto text-base md:text-lg"
          >
            Choose the perfect plan for your ambitious goals. No hidden fees, just pure engineering excellence.
          </motion.p>
        </div>

        {/* --- LIQUID TABS --- */}
        <div className="sticky top-24 z-30 flex justify-center mb-12">
          <div className="p-1.5 rounded-full bg-[#111]/80 backdrop-blur-xl border border-white/10 flex items-center gap-1 shadow-2xl">
            {services.map((service) => {
              const Icon = service.icon || Layers;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2
                    ${activeTab === service.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
                  `}
                >
                  {activeTab === service.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-zinc-800 rounded-full border border-white/10 shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    {service.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <AnimatePresence mode='wait'>
          {activeService && (
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >

              {/* Stack Chips (Horizontal Scroll with Fade Mask) */}
              <div className="relative mb-12 group">
                <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none md:hidden"></div>
                <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none md:hidden"></div>

                <div className="flex overflow-x-auto md:justify-center gap-3 px-4 pb-4 no-scrollbar">
                  {activeService.stack && activeService.stack.map((tech, idx) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      key={tech}
                      className="whitespace-nowrap px-4 py-2 rounded-lg bg-[#0F0F0F] text-zinc-400 text-xs font-mono border border-white/5 flex-shrink-0"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* --- PRICING CARDS --- */}
              <div
                ref={scrollContainerRef}
                className="
                  flex md:grid md:grid-cols-3 gap-5 md:gap-8
                  overflow-x-auto md:overflow-visible 
                  snap-x snap-mandatory 
                  px-4 md:px-0 pb-12
                  no-scrollbar
                "
              >
                {activeService.packages.map((pkg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`
                      min-w-[300px] md:min-w-0 snap-center relative flex flex-col
                      ${pkg.isPopular ? 'md:-mt-4 md:mb-4' : ''}
                    `}
                  >
                    {/* Background Glow for Popular */}
                    {pkg.isPopular && (
                      <div className="absolute -inset-px bg-gradient-to-b from-blue-500/40 via-purple-500/20 to-transparent blur-xl opacity-50 rounded-[2rem]"></div>
                    )}

                    <div
                      className={`
                        relative h-full flex flex-col p-8 rounded-[2rem] border transition-all duration-300 group
                        ${pkg.isPopular
                          ? 'bg-[#0A0A0A] border-blue-500/30 shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]'
                          : 'bg-[#0A0A0A]/50 border-white/5 hover:border-white/10 hover:bg-[#0A0A0A]'
                        }
                      `}
                    >
                      {/* Popular Badge */}
                      {pkg.isPopular && (
                        <div className="absolute top-0 inset-x-0 flex justify-center -mt-3">
                          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-blue-500/20">
                            Most Popular
                          </span>
                        </div>
                      )}

                      <div className="mb-8">
                        <h3 className={`text-xl font-bold mb-2 ${pkg.isPopular ? 'text-white' : 'text-zinc-200'}`}>
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-zinc-500 min-h-[40px] leading-relaxed">
                          {pkg.description || "Perfect for starting out and validating your ideas."}
                        </p>
                      </div>

                      <div className="mb-8 pb-8 border-b border-white/5">
                        <div className="flex items-end gap-1 mb-2">
                          <span className="text-4xl font-bold text-white tracking-tighter">{pkg.price}</span>
                          {pkg.duration && <span className="text-zinc-500 text-sm mb-1">/ {pkg.duration}</span>}
                        </div>
                        <button className={`
                            w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-4
                            ${pkg.isPopular
                            ? 'bg-white text-black hover:bg-zinc-200'
                            : 'bg-white/5 text-white hover:bg-white/10 border border-white/5'
                          }
                         `}>
                          Choose Plan <ArrowRight size={16} />
                        </button>
                      </div>

                      <ul className="flex-1 space-y-4">
                        {pkg.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <Check size={18} className={`shrink-0 mt-0.5 ${pkg.isPopular ? 'text-blue-400' : 'text-zinc-600'}`} />
                            <span className="text-zinc-400 leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* --- EXTRAS BENTO GRID --- */}
              {activeService.extraInfo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {activeService.extraInfo.map((info, idx) => (
                    <div key={idx} className="bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-colors">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-blue-500 transition-colors"></div>
                          {info.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {info.items.map((item, i) => (
                            <span key={i} className="text-xs text-zinc-500 font-mono">
                              {item}{i < info.items.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                        <Check size={14} />
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Services;