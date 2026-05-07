import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Ruler, 
  Palette, 
  Sparkles, 
  Upload, 
  Link as LinkIcon, 
  ShoppingBag, 
  Activity,
  Layers,
  Star,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { SectionHeading } from '../components/shared/SectionHeading';

// --- Styled Components ---

const SidebarOption = ({ label, active, onClick, icon: Icon }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${active ? 'bg-primary/10 border border-primary/30 text-primary shadow-[0_0_15px_rgba(255,45,120,0.1)]' : 'hover:bg-surface-container-high border border-transparent text-on-surface-variant'}`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-primary text-white' : 'bg-surface-container-high'}`}>
      <Icon size={18} />
    </div>
    <span className="font-label text-xs uppercase tracking-widest font-bold text-left">{label}</span>
  </button>
);

const RadioCard = ({ label, value, active, onClick, icon: Icon }: any) => (
  <button
    onClick={() => onClick(value)}
    className={`p-6 rounded-2xl border transition-all duration-300 text-left flex flex-col gap-4 group ${active ? 'bg-primary/5 border-primary shadow-[0_0_20px_rgba(255,45,120,0.1)]' : 'bg-surface-container-high border-outline-variant hover:border-primary/50'}`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-primary text-white' : 'bg-surface-container-lowest text-on-surface-variant group-hover:text-primary'}`}>
      {Icon ? <Icon size={20} /> : <div className="w-2 h-2 rounded-full bg-current" />}
    </div>
    <span className={`font-headline font-bold text-sm ${active ? 'text-primary' : 'text-on-surface'}`}>{label}</span>
  </button>
);

const MeasurementInput = ({ label, units, value, onChange }: any) => (
  <div className="space-y-2">
    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">{label}</label>
    <div className="relative">
      <input 
        type="number" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary p-3 rounded-xl outline-none text-on-surface font-mono"
        placeholder="00"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[10px] font-bold uppercase">{units}</span>
    </div>
  </div>
);

const RegionSelector = ({ activeRegion, onSelect }: any) => {
  const regions = [
    { id: 'IN', label: 'India', units: 'cm' },
    { id: 'US', label: 'USA', units: 'in' },
    { id: 'UK', label: 'UK', units: 'in' },
    { id: 'EU', label: 'Europe', units: 'cm' }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {regions.map(r => (
        <button
          key={r.id}
          onClick={() => onSelect(r)}
          className={`px-4 py-2 rounded-lg border font-label text-[10px] uppercase tracking-widest transition-all ${activeRegion === r.id ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}
        >
          {r.label} ({r.units})
        </button>
      ))}
    </div>
  );
};

// --- Dress Visualizer Component ---

const DressVisualizer = ({ outfitType, color, style }: any) => {
  // Simple SVG paths for different types
  const paths: any = {
    Saree: "M50,10 C70,10 90,30 90,70 L90,200 L10,200 L10,60 C10,30 30,10 50,10 Z", // Placeholder
    Lehenga: "M50,10 L80,30 L80,60 L20,60 L20,30 Z M10,70 L90,70 L100,200 L0,200 Z",
    Gown: "M40,10 L60,10 L70,40 L95,200 L5,200 L30,40 Z",
    IndoWestern: "M35,10 L65,10 L75,50 L85,200 L15,200 L25,50 Z",
    Coord: "M30,10 L70,10 L75,45 L25,45 Z M25,55 L75,55 L80,200 L20,200 Z",
    Traditional: "M40,10 L60,10 L75,60 L90,200 L10,200 L25,60 Z",
    Western: "M35,10 L65,10 L70,70 L85,200 L15,200 L30,70 Z"
  };

  const colors: any = {
    Pastels: "#fce4ec",
    DarkLuxury: "#1a237e",
    Neutral: "#efebe9",
    BrightVibrant: "#ff5252",
    Monochrome: "#212121"
  };

  const selectedColor = colors[color] || "#ff2d78";

  return (
    <div className="relative w-full aspect-[3/4] bg-surface-container-high rounded-3xl overflow-hidden border border-outline-variant flex items-center justify-center p-12">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary blur-[120px]" />
      </div>

      <motion.svg 
        viewBox="0 0 100 210" 
        className="w-full h-full max-h-[80%] drop-shadow-2xl"
        initial={false}
      >
        <defs>
          <linearGradient id="dressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={selectedColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={selectedColor} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <motion.path
          key={outfitType}
          initial={{ d: paths[Object.keys(paths)[0]], opacity: 0, scale: 0.8 }}
          animate={{ d: paths[outfitType] || paths.Gown, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          fill="url(#dressGradient)"
          stroke={selectedColor}
          strokeWidth="0.5"
          filter={style === "Luxury Glam" ? "url(#glow)" : ""}
        />

        {/* Style Accents */}
        {style === "Luxury Glam" && (
          <motion.circle 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            cx="50" cy="50" r="1" fill="#fff" 
          />
        )}
      </motion.svg>

      <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-2">
        <div className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">Concept Visualizer</div>
        <div className="font-headline font-bold text-lg text-white">
          {outfitType} <span className="opacity-50 mx-2">|</span> {style}
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---

export default function DesignPage({ onStatusUpdate, journeyStatus }: { 
  onStatusUpdate: (key: string, status: boolean) => void,
  journeyStatus: any 
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [designState, setDesignState] = useState(() => {
    const saved = localStorage.getItem('aurelle_design_state');
    return saved ? JSON.parse(saved) : {
      outfitType: 'Gown',
      style: 'Elegant Minimal',
      region: 'IN',
      units: 'cm',
      measurements: {
        height: '',
        shoulder: '',
        bust: '',
        waist: '',
        hip: '',
        arm: '',
        neck: '',
        outfitLength: ''
      },
      color: 'Pastels',
      fabric: 'Silk',
      referenceLinks: '',
      inspirationFiles: [],
      accessories: [],
      fit: 'Body Contour Fit'
    };
  });

  // Check and update status in real-time and persist data
  useEffect(() => {
    localStorage.setItem('aurelle_design_state', JSON.stringify(designState));

    // 1. Vision Status: Outfit Type + Style + (Optional Reference Links/Files)
    const hasVision = designState.outfitType !== '' && designState.style !== '' && (designState.referenceLinks !== '' || designState.inspirationFiles.length > 0);
    onStatusUpdate('vision', hasVision);

    // 2. Measurements Status: Check if all measurement fields have values
    const hasMeasurements = Object.values(designState.measurements).every(v => v !== '');
    onStatusUpdate('measurements', hasMeasurements);

    // 3. Design & Craft Status: Fabric + Color selection
    const hasCraft = designState.fabric !== '' && designState.color !== '';
    onStatusUpdate('craft', hasCraft);
  }, [designState, onStatusUpdate]);

  useEffect(() => {
    if (location.state) {
      const { outfitType, style, fabric, step } = location.state;
      setDesignState(prev => ({
        ...prev,
        ...(outfitType && { outfitType }),
        ...(style && { style }),
        ...(fabric && { fabric }),
      }));
      if (step !== undefined) {
        setActiveStep(step);
      }
    }
  }, [location.state]);

  const steps = [
    { title: "Outfit Base", icon: Layers },
    { title: "Style DNA", icon: Sparkles },
    { title: "Fit & Measurements", icon: Ruler },
    { title: "Color & Fabric", icon: Palette },
    { title: "Accessories & Finishing", icon: ShoppingBag },
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
    else {
      setIsSubmitted(true);
      // Final submission update if needed
      onStatusUpdate('vision', true);
      onStatusUpdate('measurements', true);
      onStatusUpdate('craft', true);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-32 px-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-surface-container p-12 rounded-3xl border border-primary/30 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8 neon-border-primary">
            <CheckCircle2 className="text-primary" size={32} />
          </div>
          <h2 className="font-headline font-bold text-4xl mb-4">Design Locked!</h2>
          <p className="text-on-surface-variant mb-10 leading-relaxed text-lg">
            Your custom outfit design has been sent to our atelier. Our designers will review the technical specifications and contact you to finalize the blueprint.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button variant="primary" className="px-12" onClick={() => navigate('/')}>Return Home</Button>
            <Button 
              variant="secondary" 
              className="px-12"
              onClick={() => navigate('/blueprint', { state: { designState } })}
            >
              Download Blueprint
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Section: Controls (60%) */}
        <div className="lg:w-[60%] space-y-12">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8 font-label text-[10px] uppercase tracking-widest font-bold">
              <ArrowLeft size={14} /> Back to Atelier
            </Link>
            <SectionHeading align="left" subtitle="Specify every detail of your dream piece.">
              Design My <span className="text-primary neon-text-primary">Outfit</span>
            </SectionHeading>
          </div>

          {/* Stepper Sidebar/Top */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
             {steps.map((step, i) => (
                <SidebarOption 
                  key={step.title}
                  label={step.title}
                  icon={step.icon}
                  active={activeStep === i}
                  onClick={() => setActiveStep(i)}
                />
             ))}
          </div>

          {/* Current Step Content */}
          <div className="bg-surface-container p-8 md:p-12 rounded-3xl border border-outline-variant/30 min-h-[500px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-10"
              >
                {/* Step 0: Outfit Type */}
                {activeStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="font-headline font-bold text-2xl">What silhouette do you envision?</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Saree', 'Lehenga', 'Gown', 'Indo-Western', 'Co-ord Set', 'Traditional Wear', 'Western Outfit', 'Custom Influencer Styling'].map(type => (
                        <RadioCard 
                          key={type}
                          label={type}
                          active={designState.outfitType === type}
                          onClick={() => setDesignState({...designState, outfitType: type})}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: StyleDNA */}
                {activeStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="font-headline font-bold text-2xl">Refine your aesthetic</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Elegant Minimal', 'Luxury Glam', 'Bold Statement', 'Soft Feminine', 'Royal Traditional', 'Modern Chic', 'Vintage Inspired', 'Contemporary Ethnic', 'Luxury Party Wear', 'Minimal Elegant'].map(style => (
                        <RadioCard 
                          key={style}
                          label={style}
                          active={designState.style === style}
                          onClick={() => setDesignState({...designState, style: style})}
                          icon={style === 'Luxury Glam' || style === 'Luxury Party Wear' ? Sparkles : Star}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Measurements */}
                {activeStep === 2 && (
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
                      <div className="space-y-1">
                        <h3 className="font-headline font-bold text-2xl">Precision Scaling</h3>
                        <p className="text-on-surface-variant text-sm tracking-wide">Select your region for local sizing standards.</p>
                      </div>
                      <RegionSelector 
                        activeRegion={designState.region} 
                        onSelect={(r: any) => setDesignState({...designState, region: r.id, units: r.units})} 
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {Object.keys(designState.measurements).map(key => (
                        <MeasurementInput 
                          key={key} 
                          label={key.replace(/([A-Z])/g, ' $1')} 
                          units={designState.units}
                          value={(designState.measurements as any)[key]}
                          onChange={(val: string) => setDesignState({
                            ...designState, 
                            measurements: { ...designState.measurements, [key]: val }
                          })}
                        />
                      ))}
                    </div>
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4 text-primary">
                       <Ruler size={24} />
                       <p className="text-sm font-medium">Need help with measurements? Book a session for guided assistance.</p>
                    </div>
                  </div>
                )}

                {/* Step 3: Color & Fabric */}
                {activeStep === 3 && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                      <h4 className="font-label text-xs uppercase tracking-widest text-primary font-bold">Palette Selection</h4>
                      <div className="flex flex-wrap gap-4">
                        {['Pastels', 'Dark Luxury Tones', 'Neutral Shades', 'Bright Vibrant Colors', 'Monochrome'].map(c => (
                          <button
                            key={c}
                            onClick={() => setDesignState({...designState, color: c.replace(/\s/g, '') as any})}
                            className={`px-6 py-3 rounded-full border transition-all ${designState.color === c.replace(/\s/g, '') ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-surface-container-lowest border-outline-variant hover:border-primary/50'}`}
                          >
                            <span className="font-label text-[10px] uppercase tracking-[0.2em]">{c}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="font-label text-xs uppercase tracking-widest text-secondary font-bold">Material Choice</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {['Silk', 'Satin', 'Organza', 'Velvet', 'Georgette', 'Linen', 'Cotton Blend', 'Satin & Organza', 'Silk & Velvet', 'Georgette & Linen', 'Premium Blends'].map(f => (
                           <button
                             key={f}
                             onClick={() => setDesignState({...designState, fabric: f})}
                             className={`p-4 rounded-xl border text-center transition-all ${designState.fabric === f ? 'bg-secondary text-white border-secondary' : 'bg-surface-container-lowest border-outline-variant'}`}
                           >
                              <span className="font-label text-[10px] uppercase tracking-widest font-bold">{f}</span>
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Accessories & Fit */}
                {activeStep === 4 && (
                  <div className="space-y-10">
                    <div className="space-y-6">
                       <h4 className="font-label text-xs uppercase tracking-widest text-tertiary font-bold">Matching Accessories</h4>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {['Earrings', 'Neckpiece', 'Hair Accessories', 'Handbag', 'Waist Belt', 'Customized Add-ons'].map(acc => (
                            <button
                              key={acc}
                              onClick={() => {
                                const newAccs = designState.accessories.includes(acc as never)
                                  ? designState.accessories.filter(a => a !== acc)
                                  : [...designState.accessories, acc];
                                setDesignState({...designState, accessories: newAccs as any});
                              }}
                              className={`p-4 rounded-xl border flex items-center justify-between transition-all ${designState.accessories.includes(acc as never) ? 'bg-tertiary/10 border-tertiary text-tertiary' : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant'}`}
                            >
                               <span className="font-label text-[10px] uppercase tracking-widest font-bold">{acc}</span>
                               {designState.accessories.includes(acc as never) && <CheckCircle2 size={14} />}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="font-label text-xs uppercase tracking-widest text-primary font-bold">Fit Archetype</h4>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Slim Fit', 'Relaxed Fit', 'Body Contour Fit', 'Lightweight Comfort', 'Heavy Premium Look'].map(fit => (
                             <button
                               key={fit}
                               onClick={() => setDesignState({...designState, fit: fit})}
                               className={`p-4 rounded-xl border text-center transition-all ${designState.fit === fit ? 'bg-primary text-white border-primary' : 'bg-surface-container-lowest border-outline-variant'}`}
                             >
                                <span className="font-label text-[10px] uppercase tracking-widest font-bold">{fit}</span>
                             </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-6 border-t border-outline-variant/30 flex flex-col md:flex-row gap-6">
                       <div className="flex-1 space-y-2">
                          <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                            <LinkIcon size={14} /> Design References
                          </label>
                          <input 
                            value={designState.referenceLinks}
                            onChange={(e) => setDesignState({...designState, referenceLinks: e.target.value})}
                            className={`w-full bg-surface-container-lowest border p-3 rounded-xl outline-none transition-all ${!designState.referenceLinks && designState.inspirationFiles.length === 0 ? 'border-primary/50' : 'border-outline-variant focus:border-primary'}`} 
                            placeholder="Pinterest or Instagram Link..." 
                          />
                          {!designState.referenceLinks && designState.inspirationFiles.length === 0 && (
                            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">References required for "Share Your Vision" step.</p>
                          )}
                       </div>
                       <div className="space-y-2">
                         <button 
                           onClick={() => setDesignState({...designState, inspirationFiles: [...designState.inspirationFiles, 'ref' as never]})}
                           className={`flex items-center justify-center gap-2 px-8 py-3 border border-dashed rounded-xl transition-colors text-on-surface-variant ${designState.inspirationFiles.length > 0 ? 'border-primary text-primary' : 'border-outline-variant hover:border-primary'}`}
                         >
                            <Upload size={18} />
                            <span className="font-label text-xs uppercase tracking-widest font-bold">
                              {designState.inspirationFiles.length > 0 ? `${designState.inspirationFiles.length} File Added` : 'Upload Refs'}
                            </span>
                         </button>
                       </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-20 flex justify-between items-center">
               <button 
                onClick={handlePrev}
                disabled={activeStep === 0}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-label text-xs uppercase tracking-widest font-bold"
               >
                 <ChevronLeft size={20} /> Previous
               </button>
               <Button 
                onClick={handleNext}
                variant="primary" 
                className="px-12 flex items-center gap-2"
               >
                 {activeStep === steps.length - 1 ? 'Finalize Design' : 'Continue Design'}
                 <ChevronRight size={16} />
               </Button>
            </div>
          </div>
        </div>

        {/* Right Section: Visualizer (40%) */}
        <div className="lg:w-[40%] space-y-8">
           <div className="sticky top-32">
              <DressVisualizer 
                outfitType={designState.outfitType}
                color={designState.color}
                style={designState.style}
              />

              <div className="mt-8 p-8 bg-surface-container rounded-3xl border border-outline-variant/30">
                 <h4 className="font-headline font-bold text-xl mb-6">Current Specification</h4>
                 <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                    <SpecItem label="Base" value={designState.outfitType} />
                    <SpecItem label="Style" value={designState.style} />
                    <SpecItem label="Fabric" value={designState.fabric} />
                    <SpecItem label="Fit" value={designState.fit} />
                    <SpecItem label="Acc" value={`${designState.accessories.length} Items`} />
                    <SpecItem label="Status" value="Drafting..." color="primary" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const SpecItem = ({ label, value, color = 'on-surface-variant' }: any) => (
  <div className="flex flex-col gap-1">
    <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">{label}</span>
    <span className={`font-label text-xs tracking-wide font-bold ${color === 'primary' ? 'text-primary' : 'text-on-surface'}`}>{value}</span>
  </div>
);
