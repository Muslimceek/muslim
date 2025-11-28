import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Globe, ChevronDown, Terminal } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);
  
  const { language, setLanguage, t } = useLanguage();

  // Отслеживаем скролл для уменьшения паддингов/прозрачности
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100; // Компенсация высоты хедера
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const menuItems = [
    { key: 'about', label: t.nav.about },
    { key: 'services', label: t.nav.services },
    { key: 'work', label: t.nav.work },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Russian' },
    { code: 'uz', label: 'Uzbek' },
    { code: 'en', label: 'English' },
    { code: 'tj', label: 'Tajik' }
  ];

  return (
    <>
      {/* Desktop Floating Island Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
      >
        <div className={`
            relative flex items-center justify-between
            backdrop-blur-xl border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-500 ease-out
            ${scrolled ? 'bg-[#0A0A0A]/80 py-2 pl-4 pr-2 rounded-2xl w-auto gap-8' : 'bg-[#0A0A0A]/60 py-3 pl-6 pr-3 rounded-full w-full max-w-5xl'}
        `}>
          
          {/* Logo Area */}
          <div 
            className="group flex items-center gap-2 cursor-pointer select-none" 
            onClick={() => scrollTo('hero')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:rotate-12 transition-transform">
                <Terminal size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-white tracking-tight text-lg hidden sm:block">
              Muslim<span className="text-blue-500">.</span>
            </span>
          </div>

          {/* Desktop Menu with "Sliding Pill" Hover Effect */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.key)}
                onMouseEnter={() => setHoveredTab(item.key)}
                onMouseLeave={() => setHoveredTab(null)}
                className="relative px-5 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
              >
                {hoveredTab === item.key && (
                  <motion.div
                    layoutId="nav-pill"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-white/10 rounded-full"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
             
             {/* Language Switcher */}
             <div className="relative">
                <button 
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
                >
                  <Globe size={14} />
                  <span>{language}</span>
                  <ChevronDown size={12} className={`transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                 <AnimatePresence>
                  {langOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-40 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLanguage(l.code);
                            setLangOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between transition-all hover:bg-white/5 ${
                            language === l.code ? 'text-blue-400 bg-blue-500/5' : 'text-gray-400'
                          }`}
                        >
                          {l.label}
                          {language === l.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_currentColor]"></div>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                 </AnimatePresence>
             </div>

             {/* CTA Button (Primary) */}
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo('contact')} 
                className="hidden md:flex h-10 px-6 rounded-full bg-white text-black text-sm font-bold items-center gap-2 hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
             >
                {t.nav.contact} 
                <ArrowRight size={14} />
             </motion.button>

             {/* Mobile Toggle */}
             <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/5 active:bg-white/20 transition-all"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu (Modern & Dark) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col"
          >
            {/* Background Noise & Gradient */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col h-full relative z-10 pt-32 px-6 pb-10">
              <div className="flex flex-col gap-6">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.key}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.5, type: "spring" }}
                    onClick={() => scrollTo(item.key)}
                    className="group flex items-center gap-4 text-4xl font-bold text-gray-400 hover:text-white text-left transition-colors"
                  >
                    <span className="text-sm font-mono text-blue-500 opacity-50 group-hover:opacity-100">0{i + 1}</span>
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.button
                   initial={{ x: -50, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   onClick={() => scrollTo('contact')}
                   className="text-4xl font-bold text-white text-left flex items-center gap-4 mt-4"
                >
                    <span className="text-sm font-mono text-blue-500 opacity-100">04</span>
                    {t.nav.contact}
                </motion.button>
              </div>

              {/* Mobile Footer Info */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-auto border-t border-white/10 pt-8"
              >
                  <p className="text-gray-500 text-sm mb-4">Connect with me</p>
                  <div className="flex gap-4">
                     {/* Social placeholders could go here */}
                     <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">𝕏</div>
                     <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">in</div>
                     <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">Gh</div>
                  </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
