import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function HeroSection() {
  const [lang, setLang] = useState<'en'|'mr'>('en');

  return (
    <section id="home" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Restaurant Ambience" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-background"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full mb-8 shadow-lg">
            <span className="flex items-center gap-1 text-primary font-bold text-sm">
              4.1 <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </span>
            <div className="w-[1px] h-4 bg-white/20"></div>
            <span className="text-white/90 text-sm tracking-wide">3960+ Happy Reviews</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 drop-shadow-2xl font-bold leading-tight transition-all duration-500">
            {lang === 'en' ? "Saiemaa's Family Dining And Bar" : "साईमा फैमिली डायनिंग आणि बार"}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 tracking-wide max-w-3xl mx-auto drop-shadow-lg transition-all duration-500">
            {lang === 'en' ? "Good Food. Great Vibes. Perfect Family Time." : "उत्तम खाद्य. उत्तम वातावरण. परिपूर्ण कौटुंबिक वेळ."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-[#b38f2b] text-primary-foreground text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] border-0"
              onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Reserve a Table
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 hover:text-white text-lg px-10 py-7 rounded-full backdrop-blur-md transition-all hover:scale-105"
              onClick={() => window.open('https://wa.me/918108259655', '_blank')}
            >
              Order on WhatsApp
            </Button>
          </div>

          <div className="mt-16 relative inline-block">
            <button 
              onClick={() => setLang(lang === 'en' ? 'mr' : 'en')} 
              className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-[0.2em] border-b border-white/20 pb-1"
            >
              {lang === 'en' ? "Read in मराठी" : "Read in English"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
    </section>
  )
}
