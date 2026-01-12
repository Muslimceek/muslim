import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import MobileNav from './components/MobileNav';
import { LanguageProvider } from './LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <main className="bg-black min-h-screen text-white selection:bg-blue-500/30">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Contact />
        <MobileNav />
      </main>
    </LanguageProvider>
  );
}

export default App;