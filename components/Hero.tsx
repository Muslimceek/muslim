import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Globe, Terminal, Code2, Zap, Layout, Send, Database, Cpu } from 'lucide-react';
// Если у вас есть контекст языка, раскомментируйте. Если нет - удалите строку ниже.
// import { useLanguage } from '../LanguageContext'; 

// --- 1. UTILS & UI COMPONENTS ---

// Эффект подсветки курсора (Spotlight Effect)
const BentoCard = ({ children, className = "", delay = 0, noHover = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      className={`relative bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors ${className}`}
      onMouseMove={handleMouseMove}
    >
      {!noHover && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.1),
                transparent 80%
              )
            `,
          }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
};

// Магнитная кнопка
const MagneticButton = ({ children, onClick, variant = "primary", className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { mass: 0.1, stiffness: 150, damping: 20 });
  const ySpring = useSpring(y, { mass: 0.1, stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) / 2); // Сила магнита
    y.set((e.clientY - (top + height / 2)) / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative px-6 py-3.5 md:px-8 md:py-4 font-bold rounded-xl md:rounded-full flex items-center justify-center gap-2 text-sm md:text-base transition-all duration-300";
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10 backdrop-blur-sm"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

// Технологический стек
const TechBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 text-xs font-mono hover:bg-white/10 hover:text-white transition-colors cursor-default">
    <Icon size={12} />
    <span>{label}</span>
  </div>
);

// --- 2. MAIN HERO SECTION ---

const Hero = () => {
  // const { t } = useLanguage(); // Используйте, если есть контекст

  return (
    <section id="hero" className="relative min-h-screen bg-[#020202] text-white pt-24 pb-20 px-4 md:px-6 flex flex-col items-center justify-center overflow-hidden">

      {/* Background Elements */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0 mix-blend-overlay"></div>
      <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 md:grid-rows-[auto_auto_auto] gap-4 relative z-10">

        {/* 1. Main Title Card (Big Left) */}
        <BentoCard className="md:col-span-8 md:row-span-2 p-8 md:p-12 flex flex-col justify-center min-h-[400px] md:min-h-[500px]">
          {/* Status Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Available for New Projects</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Digital Scale.</span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
            Senior Fullstack Engineer. I build high-load <span className="text-blue-400 font-medium">Telegram Bots</span>, scalable <span className="text-purple-400 font-medium">Marketplaces</span>, and design systems that convert users into customers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto">
            <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView()} variant="primary">
              Start Project <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton onClick={() => document.getElementById('work')?.scrollIntoView()} variant="secondary">
              View Case Studies
            </MagneticButton>
          </div>
        </BentoCard>

        {/* 2. Photo Card (Top Right) */}
        <BentoCard className="md:col-span-4 md:row-span-2 h-[400px] md:h-auto relative group" delay={0.2} noHover>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10"></div>
          <img
            src="https://i.ibb.co/TDXSzVkW/gemini-3-pro-image-preview-nano-banana-pro-a-A-highly-stylized-po.png"
            alt="Profile"
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute bottom-6 left-6 right-6 z-20">
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 p-4 rounded-2xl">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[10px] uppercase text-blue-300 font-bold mb-1 tracking-wider">Lead Developer</div>
                  <div className="text-white font-medium text-sm">Muslim</div>
                </div>
                <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center">
                  <Code2 size={16} />
                </div>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 3. Infinite Tech Marquee (Middle Bar) */}
        <BentoCard className="md:col-span-12 py-6 px-4 flex items-center overflow-hidden bg-[#0A0A0A]/80 backdrop-blur-md" delay={0.3}>
          <div className="flex gap-8 items-center animate-marquee whitespace-nowrap">
            {/* Duplicated strictly for marquee effect */}
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-xl md:text-2xl font-bold text-gray-700/50 uppercase select-none">React</span>
                <span className="text-xl md:text-2xl font-bold text-white select-none">TypeScript</span>
                <span className="text-xl md:text-2xl font-bold text-gray-700/50 uppercase select-none">Python</span>
                <span className="text-xl md:text-2xl font-bold text-white select-none">Telegram API</span>
                <span className="text-xl md:text-2xl font-bold text-gray-700/50 uppercase select-none">Next.js</span>
                <span className="text-xl md:text-2xl font-bold text-white select-none">Node.js</span>
                <span className="text-xl md:text-2xl font-bold text-gray-700/50 uppercase select-none">Docker</span>
              </React.Fragment>
            ))}
          </div>
        </BentoCard>

        {/* 4. Stats & Social (Bottom Left) */}
        <BentoCard className="md:col-span-4 p-6 flex flex-col justify-between min-h-[180px]" delay={0.4}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 inline-block">
              <Globe size={20} />
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-1">5+</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-mono">Years Experience</div>
            <p className="text-xs text-gray-500 mt-2">Delivering pixel-perfect code from Andijan to the World.</p>
          </div>
        </BentoCard>

        {/* 5. Service: Telegram Bots (Bottom Middle) */}
        <BentoCard className="md:col-span-4 p-6 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-[#0088cc]/10 to-transparent" delay={0.5}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#0088cc]/20 rounded-lg text-[#0088cc] inline-block">
              <Send size={20} />
            </div>
            <ArrowRight className="text-gray-600 -rotate-45" size={16} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Telegram Ecosystems</h3>
            <p className="text-sm text-gray-400 leading-snug">
              Advanced Mini-Apps (TWA), payment bots, and automated funnels.
            </p>
          </div>
        </BentoCard>

        {/* 6. Service: Marketplaces (Bottom Right) */}
        <BentoCard className="md:col-span-4 p-6 flex flex-col justify-between min-h-[180px] bg-gradient-to-br from-purple-900/10 to-transparent" delay={0.6}>
          <div className="flex justify-between items-start">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 inline-block">
              <Layout size={20} />
            </div>
            <ArrowRight className="text-gray-600 -rotate-45" size={16} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Custom Marketplaces</h3>
            <p className="text-sm text-gray-400 leading-snug">
              Scalable multi-vendor platforms with complex logic and high load.
            </p>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};

export default Hero;