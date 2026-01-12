import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Github, Linkedin, Instagram, Code2, Terminal, ExternalLink, Cpu, Palette } from 'lucide-react';
// import { useLanguage } from '../LanguageContext'; // Раскомментируйте при наличии

// --- КОМПОНЕНТЫ ---

// 1. Bento Card Wrapper (Стеклянная карта с шумом)
const BentoCard = ({ children, className = "", noHover = false }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.95, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 }
    }}
    className={`relative overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-6 flex flex-col justify-between ${className} ${!noHover ? 'group hover:border-white/10 transition-all duration-500' : ''}`}
  >
    {/* Noise Texture (Текстура шума для премиум вида) */}
    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

    {/* Hover Glow Effect */}
    {!noHover && (
      <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]" />
    )}

    <div className="relative z-10 w-full h-full flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

// 2. Tech Tag (Маленькие чипсы технологий)
const TechTag = ({ name, color = "bg-blue-500" }) => (
  <div className="px-3 py-1.5 rounded-md bg-[#111] border border-white/5 text-[10px] md:text-xs font-mono text-zinc-400 whitespace-nowrap flex items-center gap-2 hover:bg-white/5 hover:text-white transition-colors cursor-default">
    <span className={`w-1.5 h-1.5 rounded-full ${color}`}></span>
    {name}
  </div>
);

// 3. Marquee (Бегущая строка)
const Marquee = ({ items, reverse = false, color }) => (
  <div className="flex overflow-hidden w-full select-none py-2 mask-linear-fade">
    <motion.div
      initial={{ x: reverse ? "-100%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-100%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="flex gap-2 md:gap-3 pr-2 md:pr-3"
    >
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <TechTag key={i} name={item} color={color} />
      ))}
    </motion.div>
  </div>
);

const About = () => {
  // const { t } = useLanguage();

  // Стек технологий: Разделил на Код и Дизайн/AI, так как это ваши сильные стороны
  const devStack = ["React", "TypeScript", "Telegram Bot API", "Python", "Node.js", "PostgreSQL", "Docker"];
  const designStack = ["Midjourney", "Stable Diffusion", "Figma", "UI/UX", "Adobe PS", "Prompt Engineering"];

  // Генерация фейкового графика активности (зеленые квадратики)
  const weeks = Array.from({ length: 16 });
  const days = Array.from({ length: 5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-[#020202] relative overflow-hidden">

      {/* Background Grid Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">

        {/* --- HEADER --- */}
        <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-blue-500 font-mono text-xs md:text-sm uppercase tracking-widest mb-2"
            >
              Profile Info
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
              Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Code.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-500 text-sm md:text-base max-w-md leading-relaxed"
          >
            I bridge the gap between complex backend logic and stunning visual interfaces. Specialized in automated systems and AI integration.
          </motion.p>
        </div>

        {/* --- BENTO GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]"
        >

          {/* 1. MAIN BIO & ACTIVITY (Large Block) */}
          <BentoCard className="col-span-2 md:col-span-2 md:row-span-2 min-h-[300px]">
            <div className="absolute top-0 right-0 p-32 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div>
              <div className="flex gap-2 mb-6">
                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Available for hire
                </div>
              </div>

              <h3 className="text-xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Fullstack Developer & <br /> AI Integrator
              </h3>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm mb-6">
                Creating intelligent bots and web apps. My goal is to automate your routine and scale your business using modern tech.
              </p>
            </div>

            {/* Github Graph Simulation */}
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <Github size={12} /> Contributions
                </span>
                <span className="text-[10px] text-zinc-600">Last Year</span>
              </div>
              {/* Scrollable container for mobile */}
              <div className="flex gap-1 overflow-hidden mask-gradient-right opacity-70">
                {weeks.map((_, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {days.map((_, j) => {
                      // Random logic to simulate activity
                      const intensity = Math.random();
                      let bg = 'bg-zinc-800'; // empty
                      if (intensity > 0.85) bg = 'bg-emerald-500'; // high
                      else if (intensity > 0.6) bg = 'bg-emerald-500/60'; // medium
                      else if (intensity > 0.4) bg = 'bg-emerald-500/30'; // low

                      return <div key={j} className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-[2px] ${bg}`} />
                    })}
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 2. EXPERIENCE (Gradient Block) */}
          <BentoCard className="col-span-1 bg-gradient-to-b from-[#111] to-blue-900/10 group">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20 group-hover:scale-110 transition-transform">
              <Briefcase size={20} />
            </div>
            <div>
              <h4 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-1">
                5<span className="text-blue-500">+</span>
              </h4>
              <p className="text-zinc-400 font-medium text-xs uppercase tracking-wide">Years Experience</p>
            </div>
          </BentoCard>

          {/* 3. LOCATION */}
          <BentoCard className="col-span-1">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/69.2401,41.2995,11,0/400x400?access_token=YOUR_TOKEN')] bg-cover opacity-20 grayscale group-hover:opacity-30 transition-opacity mix-blend-luminosity"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <MapPin size={18} className="text-white" />
              </div>

              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Based in</div>
                <div className="font-bold text-white text-lg">Uzbekistan</div>
                <div className="text-zinc-500 text-xs">Serving Clients Globally</div>
              </div>
            </div>
          </BentoCard>

          {/* 4. TECH ARSENAL (Wide Block) */}
          <BentoCard className="col-span-2 lg:col-span-2 flex flex-col justify-center gap-6 bg-[#0B0B0B]" noHover>
            <div className="flex flex-col gap-4">
              {/* Code Marquee */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 text-zinc-500 text-xs font-mono uppercase">
                  <Terminal size={12} /> Backend & Core
                </div>
                <Marquee items={devStack} color="bg-blue-500" />
              </div>

              {/* Design/AI Marquee */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1 text-zinc-500 text-xs font-mono uppercase">
                  <Cpu size={12} /> AI & Design
                </div>
                <Marquee items={designStack} reverse color="bg-purple-500" />
              </div>
            </div>
          </BentoCard>

          {/* 5. EDUCATION */}
          <BentoCard className="col-span-1 md:col-span-1">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-400 mb-auto">
              <GraduationCap size={20} />
            </div>
            <div className="mt-4">
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-1">Education</div>
              <div className="font-bold text-white text-base leading-tight">Computer Science</div>
              <div className="text-xs text-zinc-500 mt-1">Bachelor's Degree</div>
            </div>
          </BentoCard>

          {/* 6. SOCIAL CONNECT */}
          <BentoCard className="col-span-1 md:col-span-1 bg-[#0A0A0A]">
            <div className="h-full flex flex-col">
              <div className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-4">Let's Connect</div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {[
                  { Icon: Github, href: "https://github.com", label: "Git" },
                  { Icon: Linkedin, href: "#", label: "In" },
                  { Icon: Instagram, href: "#", label: "Ig" },
                  { Icon: ExternalLink, href: "#contact", label: "Mail" }
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group/icon"
                  >
                    <item.Icon size={18} className="mb-1 group-hover/icon:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </BentoCard>

        </motion.div>
      </div>
    </section>
  );
};

export default About;