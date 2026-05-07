import { Instagram, Youtube, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-20 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 space-y-6">
            <div className="font-headline font-bold text-2xl text-primary uppercase tracking-tighter neon-text-primary">AURELLE COUTURE</div>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-md">
              Custom-crafted fashion designed to make every woman feel confident, elegant, and unforgettable. Handcrafted in our Neo-Tokyo inspired atelier, where heritage meets the future.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram size={18} />} />
              <SocialIcon icon={<Youtube size={18} />} />
              <SocialIcon icon={<Share2 size={18} />} />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="font-label text-xs uppercase tracking-widest text-white font-bold">Explore</h4>
            <ul className="space-y-3">
              <FooterLink>Home</FooterLink>
              <FooterLink>Custom Designs</FooterLink>
              <FooterLink>Accessories</FooterLink>
              <FooterLink>Reviews</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="font-label text-xs uppercase tracking-widest text-white font-bold">Support</h4>
            <ul className="space-y-3">
              <FooterLink>FAQs</FooterLink>
              <FooterLink>Contact</FooterLink>
              <FooterLink>Sustainability</FooterLink>
              <FooterLink>Legal</FooterLink>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h4 className="font-label text-xs uppercase tracking-widest text-white font-bold">The Final Touch</h4>
            <p className="font-body text-sm text-on-surface-variant">Ready to wear something made just for you?</p>
            <Link to="/consultation">
              <Button variant="outline" className="w-full py-4 text-[10px]">Book Your Consultation Today</Button>
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-label text-[10px] tracking-widest text-on-surface-variant uppercase">© 2026 AURELLE COUTURE. HANDCRAFTED IN NEO-TOKYO.</p>
          <div className="flex gap-8">
            <FooterLink className="text-[10px]">Privacy</FooterLink>
            <FooterLink className="text-[10px]">Boutiques</FooterLink>
            <FooterLink className="text-[10px]">Press</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }: any) => (
  <a href="#" className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ children, className = '' }: any) => (
  <li>
    <a href="#" className={`font-body text-sm text-on-surface-variant hover:text-primary hover:translate-x-1 transition-all duration-300 block uppercase tracking-wider ${className}`}>
      {children}
    </a>
  </li>
);
