import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Menu, X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../shared/Button';

export const Navbar = ({ onNewOrder, onHomeClick }: { onNewOrder?: () => void, onHomeClick?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || pathname !== '/' ? 'bg-surface/90 backdrop-blur-3xl py-4 border-b border-white/5' : 'bg-transparent py-8 border-b border-transparent'}`}>
      <nav className="max-w-[1400px] mx-auto px-12 flex justify-between items-center">
        <Link 
          to="/" 
          onClick={(e) => {
            if (pathname === '/' && onHomeClick) {
              e.preventDefault();
              onHomeClick();
            }
          }}
          className="group flex flex-col items-start"
        >
          <span className="font-headline font-bold text-3xl tracking-[-0.08em] leading-none text-white relative overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">CRAFTINGS</span>
            <span className="absolute left-0 top-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-primary">CRAFTINGS</span>
          </span>
          <span className="font-serif italic text-sm text-on-surface-variant lowercase tracking-tight mt-1">digital atelier</span>
        </Link>

        <div className="hidden lg:flex items-center gap-12 font-headline text-[13px] font-bold uppercase tracking-[0.3em]">
          <Link to="/design" className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Bespoke</span>
            <span className="absolute left-0 top-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Bespoke</span>
          </Link>
          <Link to="/collections" className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full text-secondary">Collections</span>
            <span className="absolute left-0 top-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-secondary">Collections</span>
          </Link>
          <Link to="/consultation" className="relative group overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Consultation</span>
            <span className="absolute left-0 top-0 inline-block transition-transform duration-500 translate-y-full group-hover:translate-y-0">Consultation</span>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/auth" className="font-headline text-[12px] font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors">Sign In</Link>
            <div className="w-px h-4 bg-white/20" />
            <Button 
              className="bg-white text-black hover:bg-primary hover:text-white transition-all duration-500 rounded-none px-8 py-2 text-[11px] font-bold uppercase tracking-widest"
              onClick={onNewOrder}
            >
              Order Now
            </Button>
          </div>
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-surface/90 backdrop-blur-3xl z-50 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <span className="font-headline font-black text-2xl text-primary bg-primary/20 px-3 py-1 rounded-xl leading-none border border-primary/30">CC</span>
                <span className="font-serif italic text-3xl lowercase text-white glass-text-vibrant tracking-tight">craftings</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-headline font-black hover:text-primary transition-all duration-300 glass-text-vibrant hover:tracking-widest">Home</Link>
              <Link to="/design" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-headline font-black hover:text-primary transition-all duration-300 glass-text hover:tracking-widest flex items-center gap-2">
                Bespoke <span className="font-serif italic lowercase text-secondary">design</span>
              </Link>
              <Link to="/collections" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-headline font-black hover:text-primary transition-all duration-300 glass-text hover:tracking-widest">Collections</Link>
              <Link to="/consultation" onClick={() => setMobileMenuOpen(false)}>
                <Button className="mt-12 w-full py-6 text-sm font-black">Book Appointment</Button>
              </Link>
            </div>
            
            <div className="mt-auto pt-12 border-t border-white/10 text-center">
              <p className="font-label text-[10px] uppercase tracking-[0.5em] text-white/30">Mastered in the Digital Atelier</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
