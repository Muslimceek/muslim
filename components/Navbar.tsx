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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'pt-2' : 'pt-4'}`}
      >
        <div className={`
            relative flex items-center justify-between
            backdrop-blur-xl border border-white/10
            shadow-[0_8px_32px_rgba(0,0,0,0.5)]
            transition-all duration-500 ease-out
            bg-[#0A0A0A]/80 rounded-2xl w-full max-w-5xl
            ${scrolled ? 'py-2 pl-4 pr-2' : 'py-3 pl-5 pr-3'}
        `}>

          <div
            className="group flex items-center gap-2 cursor-pointer select-none"
            onClick={() => scrollTo('hero')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:rotate-12 transition-transform">
              <Terminal size={16} strokeWidth={3} />
            </div>
            <span className="font-bold text-white tracking-tight text-lg">
              Muslim<span className="text-blue-500">.</span>
            </span>
          </div>

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

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Globe size={14} />
                <span className="hidden xs:inline">{language}</span>
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
                        className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between transition-all hover:bg-white/5 ${language === l.code ? 'text-blue-400 bg-blue-500/5' : 'text-gray-400'
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('contact')}
              className="hidden md:flex h-9 px-5 rounded-full bg-white text-black text-xs font-bold items-center gap-2 hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {t.nav.contact}
              <ArrowRight size={12} />
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
