import React, { useState, useEffect, useRef } from 'react';
import { Send, Copy, Check, ArrowUpRight, Github, Linkedin, Instagram, Twitter, Clock, Globe2, BatteryCharging } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
// import { useLanguage } from '../LanguageContext'; // Раскомментируйте при наличии

// --- 1. UTILS: TIME & DATE ---
const TimeDisplay = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Настраиваем под часовой пояс Узбекистана (UTC+5)
      const options = {
        timeZone: 'Asia/Tashkent',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono">
      <Clock size={12} className="text-blue-500" />
      <span>{time} (GMT+5)</span>
    </div>
  );
};

// --- 2. PHYSICS BUTTON (MAGNETIC) ---
const MagneticButton = ({ children, onClick, href, className = "", variant = "outline" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Плавная физика пружины
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Дистанция магнита (чем больше делитель, тем слабее магнит)
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  const baseStyles = "relative flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden group w-full md:w-auto";
  const variants = {
    primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]",
    outline: "bg-[#111] text-white border border-white/10 hover:border-white/30"
  };

  return (
    <Component
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>

      {/* Shimmer Effect for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
      )}
    </Component>
  );
};

// --- 3. MAIN COMPONENT ---
const Contact = () => {
  // const { t } = useLanguage(); 
  const [copied, setCopied] = useState(false);
  const containerRef = useRef(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]); // Обратный наклон по Y
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);  // Обратный наклон по X

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("contact@muslim.dev"); // Замените на вашу почту
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-[#020202] relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">

      {/* Background Ambience */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-700/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-700/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

      <div className="max-w-6xl w-full px-4 md:px-6 relative z-10">

        {/* --- 3D INTERACTIVE CARD --- */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { x.set(0); y.set(0); }}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden group perspective-1000 shadow-2xl shadow-black/50"
        >
          {/* Grid Pattern inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)] pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10 transform-style-3d">

            {/* Left Content */}
            <div className="w-full max-w-2xl">
              {/* Status Indicators */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400 font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Open for Work
                </div>
                <TimeDisplay />
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400 font-mono">
                  <BatteryCharging size={12} className="text-yellow-500" />
                  <span>High Capacity</span>
                </div>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter mb-6 leading-[0.9]">
                Let's create <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500 animate-gradient-x">
                  something epic.
                </span>
              </h2>

              <p className="text-zinc-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
                Got a high-load project or a crazy idea? I help founders and businesses scale through intelligent engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton href="https://t.me/Musim_Ostanov" variant="primary">
                  <Send size={20} className="-ml-1" />
                  <span>Contact via Telegram</span>
                </MagneticButton>

                <MagneticButton onClick={handleCopy} variant="outline">
                  {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  <span>{copied ? "Email Copied!" : "Copy Email"}</span>
                </MagneticButton>
              </div>
            </div>

            {/* Right Decoration (Interactive Circle) */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-6 mt-10 lg:mt-0">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-64 h-64 bg-gradient-to-br from-[#1a1a1a] to-black rounded-full border border-white/5 shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)] flex items-center justify-center relative"
              >
                <div className="absolute inset-0 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite] opacity-50"></div>
                <div className="absolute inset-4 rounded-full border border-white/5 border-dotted animate-[spin_15s_linear_infinite_reverse] opacity-30"></div>

                {/* Central Avatar or Icon */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 relative group cursor-pointer">
                  <img
                    src="https://i.ibb.co/TDXSzVkW/gemini-3-pro-image-preview-nano-banana-pro-a-A-highly-stylized-po.png"
                    alt="Me"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
              <p className="text-xs text-zinc-600 font-mono uppercase tracking-widest text-center">
                Average Response Time: <span className="text-zinc-400">~2 Hours</span>
              </p>
            </div>

          </div>
        </motion.div>

        {/* --- FOOTER SECTION --- */}
        <div className="mt-20 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Muslim.dev</h3>
            <p className="text-zinc-600 text-sm">© 2026. Built with React & Motion.</p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: Github, href: "https://github.com" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Instagram, href: "https://instagram.com" },
            ].map((social, i) => (
              <MagneticButton key={i} href={social.href} className="!w-12 !h-12 !p-0 !rounded-full !px-0" variant="outline">
                <social.icon size={18} className="text-zinc-400" />
              </MagneticButton>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;