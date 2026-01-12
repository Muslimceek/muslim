import React, { useState, useEffect } from 'react';
import { Home, User, Briefcase, Mail, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useLanguage } from '../LanguageContext'; // Раскомментируйте, если используете

const MobileNav = () => {
    // const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('hero');

    const navItems = [
        { id: 'hero', icon: Home, label: 'Home' },
        { id: 'about', icon: User, label: 'About' },
        { id: 'services', icon: Layers, label: 'Stack' },
        { id: 'work', icon: Briefcase, label: 'Work' },
        { id: 'contact', icon: Mail, label: 'Contact' },
    ];

    // Логика плавного скролла с учетом отступа (Header height)
    const scrollTo = (id) => {
        setActiveTab(id);

        // Haptic feedback (вибрация) для мобильных устройств
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(5);
        }

        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Scroll Spy: Определяем, какая секция сейчас на экране
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 150; // +150px offset для более раннего срабатывания

            sections.forEach((section) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveTab(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none md:hidden px-4">
            {/* Container: Floating Island */}
            <div className="pointer-events-auto bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex items-center justify-between gap-2 max-w-[350px] w-full">

                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-colors"
                        >
                            {/* Active Background Animation (Glow) */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/10 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            {/* Active Dot Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeDot"
                                    className="absolute -top-1 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            )}

                            <div className="relative z-10 flex flex-col items-center gap-1">
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2.5 : 2}
                                    className={`transition-all duration-300 ${isActive ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                />
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNav;