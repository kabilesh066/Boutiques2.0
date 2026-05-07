import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Ruler, PenTool, ShieldCheck, Star, Sparkles, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { SectionHeading } from '../components/shared/SectionHeading';

const Hero = ({ onNewOrder }: { onNewOrder?: () => void }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcaQcXtKS6_UNe64frO6wChSfBFvElbfga5BZPkxrZdBzCzWfb1WbKaFfjwp3Tc8xthlRsitsRsHDNPJgqdHWeyzfyavfMOHX08qYOGlhYngQjCqNEXdOQjeIPltUN-92fnLOFz-BpMnHNUDVihSSy1vxWW0C40pR_Qew6E8KfA1gVlx-TKpIDTuM1Gj6NNgx3e1gBfTWxy5M4b-IZUPRi5mH6sU3khZwjwVp0FbDOeUZIH8mSx8Ar1lKnpe7QJhzwEyX9E9uS6puU"
          alt="Aurelle Couture Hero" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-headline font-extrabold text-5xl md:text-8xl tracking-tight leading-none mb-6"
        >
          Designed Around <span className="text-primary neon-text-primary">You.</span><br />
          Styled To Be <span className="text-secondary neon-text-secondary">Remembered.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl mb-10 leading-relaxed"
        >
          From custom-designed dresses to statement accessories, we create pieces that fit your body, your personality, and your aesthetic perfectly.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
        >
          <Link to="/consultation" className="w-full md:w-auto">
            <Button variant="primary" className="px-10 py-5 w-full">Book a Custom Consultation</Button>
          </Link>
          <Button 
            variant="secondary" 
            className="px-10 py-5 w-full md:w-auto"
            onClick={onNewOrder}
          >
            Design My Outfit
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-6"
        >
          {['Custom Measurements', 'Influencer Styling', 'Handcrafted Accessories', 'Premium Fabrics'].map((feature, i) => (
            <span key={feature} className={`font-label text-[10px] md:text-xs tracking-widest uppercase border px-4 py-2 rounded-full bg-surface-container/50 ${i === 0 ? 'border-primary/30 text-primary' : i === 1 ? 'border-secondary/30 text-secondary' : i === 2 ? 'border-tertiary/30 text-tertiary' : 'border-outline-variant text-on-surface-variant'}`}>
              {feature}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ title, icon, description, glow }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`p-8 bg-surface-container-high rounded-xl border border-outline-variant group transition-all duration-300 ${glow === 'primary' ? 'neon-border-primary' : glow === 'secondary' ? 'neon-border-secondary' : ''}`}
  >
    <div className="mb-4">{icon}</div>
    <h3 className="font-headline font-bold text-xl mb-2 group-hover:text-on-surface transition-colors">{title}</h3>
    <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
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
    <section className="py-24 px-8 max-w-7xl mx-auto border-t border-outline-variant/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
        >
          <h2 className="font-headline font-bold text-4xl md:text-6xl mb-6 leading-tight">Create Your Outfit, <br/><span className="text-secondary">Your Way</span></h2>
          <p className="text-on-surface-variant text-lg mb-12 leading-relaxed">
            Every outfit is tailored with precision and designed exclusively for you. Share your preferences, measurements, inspiration, and styling needs — and we’ll handle the rest.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-label uppercase text-xs tracking-widest text-primary font-bold mb-6">Styles</h4>
              <ul className="space-y-4">
                {styles.map(s => (
                  <li 
                    key={s} 
                    onClick={() => handleStyleClick(s)}
                    className="flex items-center gap-3 text-on-surface group cursor-pointer hover:text-primary transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform"></span>
                    <span className="font-label text-sm tracking-wide">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-label uppercase text-xs tracking-widest text-secondary font-bold mb-6">Fabrics</h4>
              <ul className="space-y-4">
                {fabrics.map(f => (
                  <li 
                    key={f} 
                    onClick={() => handleFabricClick(f)}
                    className="flex items-center gap-3 text-on-surface group cursor-pointer hover:text-secondary transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full group-hover:scale-150 transition-transform"></span>
                    <span className="font-label text-sm tracking-wide">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          <div className="space-y-6">
            <FeatureCard title="Precision Fit" icon={<span className="text-primary"><Ruler size={24}/></span>} description="Bespoke measurements for a flawless silhouette." glow="primary" />
            <FeatureCard title="Accessories" icon={<span className="text-secondary"><ShoppingBag size={24}/></span>} description="Bags, belts, and jewelry handcrafted to match." />
          </div>
          <div className="space-y-6 md:mt-12">
            <FeatureCard title="Original Art" icon={<span className="text-tertiary"><PenTool size={24}/></span>} description="Unique patterns and hand-embroidered details." />
            <FeatureCard title="VIP Service" icon={<span className="text-secondary"><ShieldCheck size={24}/></span>} description="Dedicated styling support for every event." glow="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Journey = ({ status }: { status: any }) => {
  const steps = [
    { num: '1', title: 'Share Your Vision', desc: 'References, Pinterest inspirations, or event details.', color: 'primary', completed: status.vision },
    { num: '2', title: 'Measurements', desc: 'Guided sizing and digital styling session.', color: 'secondary', completed: status.measurements },
    { num: '3', title: 'Design & Craft', desc: 'Handcrafted with premium tailoring and detailing.', color: 'primary', completed: status.craft },
    { num: '4', title: 'Final Delivery', desc: 'Perfectly tailored outfit delivered to your door.', color: 'secondary', completed: status.delivery }
  ];

  return (
    <section className="py-24 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading subtitle="Your dream outfit, from concept to creation.">
          The Aurelle <span className="text-primary">Journey</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          <div className="hidden md:block absolute top-[30px] left-0 w-full h-[1px] bg-outline-variant z-0"></div>
          {steps.map((step, i) => {
            // "Resolve" only shows if the journey has started but this specific step is incomplete
            const isMissing = status.started && !step.completed && i < 3; 
            
            return (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-full bg-surface-container-high border-2 flex items-center justify-center font-headline font-bold text-xl mb-6 transition-all duration-500 group-hover:scale-110 
                  ${step.completed 
                    ? 'border-secondary text-secondary shadow-[0_0_20px_rgba(0,255,204,0.3)]' 
                    : isMissing 
                      ? 'border-primary/50 text-primary animate-pulse' 
                      : 'border-secondary text-secondary group-hover:shadow-[0_0_20px_rgba(0,255,204,0.3)]'}`}
                >
                  {step.completed ? <CheckCircle2 className="w-8 h-8" /> : isMissing ? <XCircle className="w-8 h-8 opacity-60" /> : step.num}
                </div>
                <h3 className={`font-headline font-bold text-lg mb-2 ${isMissing ? 'text-primary' : 'text-on-surface'}`}>{step.title}</h3>
                <p className="text-on-surface-variant text-sm px-4 leading-relaxed">{step.desc}</p>
                {isMissing && (
                  <Link 
                    to="/design" 
                    state={{ step: i === 0 ? 4 : i + 1 }} // Step 1 -> index 4 (Vision), Step 2 -> index 2 (Meas), Step 3 -> index 3 (Craft)
                    className="mt-4 font-label text-[10px] uppercase tracking-widest text-primary font-bold hover:underline"
                  >
                    Resolve Requirement
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    { name: 'Fashion Influencer', color: 'primary', text: '“I wanted something unique for my brand collaboration shoot, and they designed exactly what I imagined — maybe even better.”' },
    { name: 'Content Creator', color: 'secondary', text: '“The fitting was absolutely perfect. I’ve never worn a custom outfit that felt this comfortable and luxurious.”', offset: true },
    { name: 'Bride-to-be', color: 'primary', text: '“The attention to detail, fabric quality, and finishing were incredible. My wedding dress was a masterpiece.”' },
    { name: 'Lifestyle Blogger', color: 'secondary', text: '“They don’t just stitch outfits — they understand your personality and create designs that truly represent you.”', offset: true }
  ];

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <SectionHeading>Loved By <span className="text-secondary neon-text-secondary">Influencers</span></SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className={`bg-surface p-8 rounded-2xl border border-outline-variant hover:border-${r.color} transition-all duration-500 flex flex-col justify-between ${r.offset ? 'lg:translate-y-8' : ''}`}
            >
              <div>
                <div className="flex text-tertiary mb-6 gap-0.5">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-tertiary" />)}
                </div>
                <p className="text-on-surface italic mb-8 leading-relaxed font-body text-sm opacity-90">{r.text}</p>
              </div>
              <div className={`font-label text-[10px] md:text-xs uppercase tracking-widest font-bold ${r.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
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
