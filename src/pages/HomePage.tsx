import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Ruler, PenTool, ShieldCheck, Star, Sparkles, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { SectionHeading } from '../components/shared/SectionHeading';

const Hero = ({ onNewOrder }: { onNewOrder?: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-8 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80"
          alt="Editorial Fashion" 
          className="w-full h-full object-cover grayscale opacity-40 brightness-75 transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,123,0.05),transparent_60%)]" />
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto w-full px-12 grid grid-cols-12 gap-12 items-center">
        <div className="col-span-12 lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="mb-10 flex items-center gap-6">
              <div className="h-px w-16 bg-primary" />
              <span className="font-label text-xs uppercase tracking-[0.5em] text-primary font-bold">digital-first atelier / est. 24</span>
            </div>
            
            <h1 className="font-headline font-bold text-7xl md:text-[11rem] tracking-[-0.08em] leading-[0.8] text-white mb-16">
              THE <br />
              <span className="font-serif italic font-normal text-primary lowercase tracking-tight">atelier.</span>
            </h1>
            
            <p className="max-w-2xl text-on-surface-variant text-lg md:text-2xl mb-16 leading-relaxed font-body">
              Synthesis of Parisian craftsmanship and computational design. Every stitch is a digital signature of excellence.
            </p>
            
            <div className="flex flex-wrap gap-12 items-center">
              <Button 
                onClick={onNewOrder}
                className="bg-primary text-white hover:bg-white hover:text-black transition-all duration-700 rounded-none px-16 py-8 text-sm font-bold uppercase tracking-widest shadow-2xl shadow-primary/20"
              >
                Commence Tailoring
              </Button>
              <Link to="/collections" className="group flex items-center gap-6 font-headline text-sm font-bold uppercase tracking-[0.3em] text-white">
                View Archive
                <div className="relative w-16 h-px bg-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="hidden lg:block lg:col-span-4 relative mt-24">
           <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, ease: [0.19, 1, 0.22, 1], delay: 0.5 }}
              className="relative aspect-[3/4] bg-surface-container overflow-hidden p-8 border border-white/5"
           >
              <img 
                src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80" 
                className="w-full h-full object-cover filter grayscale contrast-125 mb-8"
                alt="Detail"
              />
              <div className="absolute bottom-8 left-8 right-8 text-black bg-white p-6">
                 <span className="font-serif italic text-3xl">ss/24 edition</span>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, icon, description, bgImage }: any) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="group relative h-[450px] overflow-hidden bg-surface flex flex-col items-start justify-end p-10 border border-white/5"
  >
    <div className="absolute inset-0 z-0">
      <img src={bgImage} className="w-full h-full object-cover filter grayscale sepia-[0.1] contrast-125 opacity-30 group-hover:opacity-60 transition-all duration-1000 scale-110 group-hover:scale-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
    </div>
    
    <div className="relative z-10 w-full mb-6">
       <div className="w-12 h-12 flex items-center justify-center bg-white mb-8 group-hover:bg-primary transition-colors duration-500">
          <div className="text-black group-hover:text-white transition-colors">{icon}</div>
       </div>
       <h3 className="font-headline font-bold text-3xl text-white mb-4 tracking-tighter transition-transform duration-500 group-hover:-translate-y-2">{title}</h3>
       <p className="text-on-surface-variant text-sm font-body leading-relaxed max-w-[240px] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
         {description}
       </p>
    </div>
    
    <div className="absolute top-8 right-8">
       <span className="font-label text-[11px] text-white/20 uppercase tracking-[0.4em]">.crafted</span>
    </div>
  </motion.div>
);

const Features = () => {
  const navigate = useNavigate();
  const styles = ['Indo-Western', 'Contemporary Ethnic', 'Luxury Party Wear', 'Minimal Elegant'];
  const fabrics = ['Satin & Organza', 'Silk & Velvet', 'Georgette & Linen', 'Premium Blends'];

  const handleStyleClick = (style: string) => {
    if (style === 'Indo-Western') {
      navigate('/design', { state: { outfitType: 'Indo-Western', step: 0 } });
    } else {
      navigate('/design', { state: { style, step: 1 } });
    }
  };

  const handleFabricClick = (fabric: string) => {
    navigate('/design', { state: { fabric, step: 3 } });
  };

  return (
    <section className="py-48 px-12 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-12 gap-12 items-start mb-32">
        <div className="col-span-12 md:col-span-6">
           <h2 className="font-headline font-bold text-6xl md:text-8xl tracking-tight text-white mb-8">CAPABILITIES</h2>
           <p className="text-on-surface-variant text-xl italic font-serif leading-relaxed max-w-lg mb-12">
             An architectural approach to garment construction. We define silhouettes through the lens of digital geometry and traditional handcraft.
           </p>
           <Link to="/consultation" className="inline-flex items-center gap-6 group">
             <span className="font-headline font-bold uppercase tracking-widest text-sm underline decoration-primary decoration-2 underline-offset-8 group-hover:text-primary transition-colors">Learn More</span>
           </Link>
        </div>
        <div className="col-span-12 md:col-span-6 md:text-right">
           <span className="font-label text-9xl text-white/[0.02] font-black uppercase leading-none select-none">Atelier</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureCard 
          title="Bespoke Fit" 
          icon={<Ruler size={24}/>} 
          description="Parametric measurements for an uncompromising silhouette." 
          bgImage="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80"
        />
        <FeatureCard 
          title="Artistry" 
          icon={<PenTool size={24}/>} 
          description="High-definition hand embroidery textures for modern women." 
          bgImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80"
        />
        <FeatureCard 
          title="Consultation" 
          icon={<ShieldCheck size={24}/>} 
          description="Private styling sessions in a virtual atelier atmosphere." 
          bgImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80"
        />
        <FeatureCard 
          title="Accessories" 
          icon={<ShoppingBag size={24}/>} 
          description="Sculptural handcrafted details to elevate every creation." 
          bgImage="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80"
        />
      </div>

      <div className="mt-48 grid grid-cols-12 gap-12 items-center">
         <div className="col-span-12 lg:col-span-6">
            <h2 className="font-headline font-bold text-5xl md:text-8xl tracking-[-0.08em] leading-[0.9] text-white transition-all duration-700">
              DIGITAL <br />
              <span className="font-serif italic text-secondary lowercase tracking-tight">synthesis.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
               <div>
                  <h4 className="font-label text-[11px] uppercase tracking-[0.5em] text-primary font-bold mb-10">Styles</h4>
                  <div className="space-y-6">
                    {styles.map(s => (
                      <button key={s} onClick={() => handleStyleClick(s)} className="block font-headline text-lg text-on-surface-variant hover:text-white transition-all hover:translate-x-2">
                        {s}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <h4 className="font-label text-[11px] uppercase tracking-[0.5em] text-secondary font-bold mb-10">Materials</h4>
                  <div className="space-y-6">
                    {fabrics.map(f => (
                      <button key={f} onClick={() => handleFabricClick(f)} className="block font-headline text-lg text-on-surface-variant hover:text-white transition-all hover:translate-x-2">
                        {f}
                      </button>
                    ))}
                  </div>
               </div>
            </div>
         </div>
         <div className="col-span-12 lg:col-span-6">
            <div className="relative aspect-[4/5] bg-white/[0.02] border border-white/10 overflow-hidden group">
               <img 
                 src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80" 
                 className="w-full h-full object-cover grayscale opacity-20 transition-transform duration-1000 group-hover:scale-110"
                 alt="Process"
               />
               <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-background/40 backdrop-blur-sm">
                  <h3 className="font-serif italic text-6xl text-white mb-6">the process</h3>
                  <p className="font-label text-xs uppercase tracking-[0.4em] text-primary">measure . iterate . craft</p>
                  <Button className="mt-12 bg-white text-black hover:bg-primary hover:text-white transition-all rounded-none px-10 py-4 uppercase font-bold tracking-widest text-[10px]">Learn Our Philosophy</Button>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};

const Journey = ({ status }: { status: any }) => {
  const steps = [
    { num: '01', title: 'Share Vision', desc: 'Inspired by your mood boards and event aesthetics.', completed: status.vision },
    { num: '02', title: 'Morphology', desc: 'Digital measurement session for precise geometry.', completed: status.measurements },
    { num: '03', title: 'Synthesis', desc: 'Computational design meets traditional craftsmanship.', completed: status.craft },
    { num: '04', title: 'Delivery', desc: 'Securely packaged and delivered to your doorstep.', completed: status.delivery }
  ];

  return (
    <section className="py-48 bg-surface overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="mb-32">
           <h2 className="font-headline font-bold text-6xl md:text-8xl tracking-tight text-white mb-8">THE LOGIC</h2>
           <p className="text-on-surface-variant text-xl italic font-serif opacity-60">Linear progression from concept to physical reality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative flex flex-col items-start group"
            >
              <div className="font-label text-6xl text-white/5 font-black mb-8 transition-colors group-hover:text-primary/20">{step.num}</div>
              <h3 className="font-headline font-bold text-2xl text-white mb-4 tracking-tighter group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-on-surface-variant text-base leading-relaxed font-body opacity-80">{step.desc}</p>
              <div className="mt-8 w-12 h-px bg-white/10 group-hover:w-full group-hover:bg-primary transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: 'Chloe V.', text: '“The architectural integrity of the silhouette is unmatched. A digital miracle.”' },
    { name: 'Sarah J.', text: '“I don’t just wear it; I exist in it. The measurements are mathematically perfect.”' },
    { name: 'Elena R.', text: '“A seamless transition from my mood board to my wardrobe. Pure excellence.”' }
  ];

  return (
    <section className="py-48 bg-background px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32 flex flex-col md:flex-row justify-between items-end">
           <h2 className="font-headline font-bold text-6xl md:text-8xl tracking-tight text-white uppercase">Voices</h2>
           <span className="font-serif italic text-2xl text-primary lowercase">the collective consensus</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="flex flex-col items-start gap-8"
            >
              <div className="w-8 h-px bg-primary" />
              <p className="text-white text-2xl font-serif italic leading-relaxed opacity-90">{r.text}</p>
              <div className="font-label text-[11px] uppercase tracking-[0.4em] text-on-surface-variant mt-4">
                — {r.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ question, answer, isOpen, onClick }: any) => {
  return (
    <div className={`bg-surface-container border border-outline-variant rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-primary/30 shadow-lg shadow-primary/5' : ''}`}>
      <button 
        onClick={onClick}
        className="w-full flex justify-between items-center p-6 text-left hover:text-primary transition-colors focus:outline-none"
      >
        <span className="font-headline font-bold text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-on-surface-variant leading-relaxed border-t border-outline-variant/30 font-body text-sm">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    { q: 'Do you create completely custom designs?', a: 'Yes, every design is created from scratch based on your vision, preferences, and body type. We start with a mood board and refine it until it reflects your aesthetic perfectly.' },
    { q: 'How long does it take?', a: 'Typical timelines range from 7 to 21 working days, depending on the complexity of the design and embroidery. Express options are available for event emergencies.' },
    { q: 'Do you offer virtual consultations?', a: 'Absolutely. We can connect via video call to discuss your style, take guided measurements, and even show you fabric swatches in real-time under different lighting.' },
    { q: 'What if my measurements change?', a: 'We include generous margins (2-3 inches) in all our custom pieces to allow for minor alterations. We also offer one complimentary fitting adjustment session within 30 days of delivery.' }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-8">
      <SectionHeading>Frequently Asked <span className="text-tertiary">Questions</span></SectionHeading>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem 
            key={i} 
            question={faq.q} 
            answer={faq.a} 
            isOpen={activeIndex === i}
            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default function HomePage({ journeyStatus, onNewOrder }: { journeyStatus: any, onNewOrder?: () => void }) {
  return (
    <>
      <Hero onNewOrder={onNewOrder} />
      <Features />
      <Journey status={journeyStatus} />
      <Reviews />
      <FAQ />
    </>
  );
}
