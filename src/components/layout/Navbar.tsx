import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../shared/Button';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Collections', 'Bespoke', 'Atelier', 'Showroom', 'Archive'];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled || pathname !== '/' ? 'bg-surface/80 backdrop-blur-xl py-4 border-primary/20 shadow-lg' : 'bg-transparent py-6 border-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="font-headline font-bold text-2xl tracking-tighter text-primary neon-text-primary">
          AURELLE COUTURE
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="font-label uppercase tracking-widest text-xs text-on-surface-variant hover:text-secondary transition-colors duration-300">Home</Link>
          <Link to="/design" className="font-label uppercase tracking-widest text-xs text-on-surface-variant hover:text-secondary transition-colors duration-300">Bespoke</Link>
          <a href="#collections" className="font-label uppercase tracking-widest text-xs text-on-surface-variant hover:text-secondary transition-colors duration-300">Collections</a>
          <a href="#atelier" className="font-label uppercase tracking-widest text-xs text-on-surface-variant hover:text-secondary transition-colors duration-300">Atelier</a>
          <a href="#archive" className="font-label uppercase tracking-widest text-xs text-on-surface-variant hover:text-secondary transition-colors duration-300">Archive</a>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/consultation">
            <Button variant="outline" className="hidden md:block">Book Appointment</Button>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth" className="flex items-center justify-center p-1">
              <User className="w-5 h-5 cursor-pointer hover:text-primary transition-colors duration-300" />
            </Link>
            <button 
              className="flex items-center justify-center lg:hidden p-1"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-surface z-50 p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="font-headline font-bold text-xl text-primary">AURELLE</div>
              <X className="w-8 h-8 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
            </div>
            <div className="flex flex-col gap-8">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-headline font-bold hover:text-primary transition-colors">Home</Link>
              <Link to="/design" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-headline font-bold hover:text-primary transition-colors">Bespoke Design</Link>
              <a href="#collections" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-headline font-bold hover:text-primary transition-colors">Collections</a>
              <Link to="/consultation" onClick={() => setMobileMenuOpen(false)}>
                <Button className="mt-8 w-full">Book Appointment</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
