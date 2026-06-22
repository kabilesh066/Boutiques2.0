import React, { useState, useMemo, useEffect, useRef } from 'react';
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

const SidebarOption = ({ label, active, onClick, icon: Icon, index }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex flex-col items-start gap-4 p-6 transition-all duration-500 group relative border-b border-white/5 ${active ? 'bg-primary/5 text-primary' : 'hover:bg-white/[0.02] text-on-surface-variant'}`}
  >
    <div className={`text-[10px] font-label font-bold uppercase tracking-[0.4em] mb-2 ${active ? 'text-primary' : 'text-white/20'}`}>Step 0{index + 1}</div>
    <div className="flex items-center gap-4">
      <Icon size={18} className={active ? 'text-primary' : 'text-white/40'} />
      <span className="font-headline text-[13px] uppercase tracking-[0.2em] font-bold text-left">{label}</span>
    </div>
    {active && <motion.div layoutId="activeTag" className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}
  </button>
);

const RadioCard = ({ label, value, active, onClick, icon: Icon, trend }: any) => (
  <button
    onClick={() => onClick(value)}
    className={`relative p-8 border transition-all duration-500 text-left flex flex-col gap-6 group overflow-hidden ${active ? 'bg-white text-black border-white' : 'bg-surface border-white/10 hover:border-primary/50'}`}
  >
    {trend && (
      <div className="absolute top-4 right-4 bg-primary text-white font-label text-[8px] px-3 py-1 font-black tracking-widest uppercase">
        Trend
      </div>
    )}
    <div className={`w-10 h-10 flex items-center justify-center transition-all duration-500 ${active ? 'bg-black text-white' : 'bg-white/5 text-on-surface-variant group-hover:text-primary'}`}>
      {Icon ? <Icon size={18} /> : <div className="w-1.5 h-1.5 bg-current" />}
    </div>
    <div className="space-y-1">
      <span className={`font-headline font-bold text-sm tracking-tight block ${active ? 'text-black' : 'text-white'}`}>{label}</span>
      <span className={`font-label text-[8px] uppercase tracking-widest font-black block opacity-50 ${active ? 'text-black' : 'text-on-surface-variant'}`}>atelier .spec</span>
    </div>
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

const RealisticPreview = ({ outfitType, color, style, fabric }: any) => {
  const colors: any = {
    Pastels: { main: "#fce4ec", dark: "#f8bbd0", accent: "#f48fb1" },
    DarkLuxury: { main: "#0a0a0b", dark: "#000000", accent: "#1a237e" },
    Neutrals: { main: "#efebe9", dark: "#d7ccc8", accent: "#bcaaa4" },
    Vibrant: { main: "#ff007b", dark: "#c4005e", accent: "#ff5ca7" },
    Monochrome: { main: "#212121", dark: "#000000", accent: "#424242" }
  };

  const palette = colors[color] || { main: "#ff2d78", dark: "#c41c5a", accent: "#ff5c9d" };

  const getFabricFilter = () => {
    if (fabric === 'Silk' || fabric === 'Satin') return 'url(#satinGlow)';
    if (fabric === 'Velvet') return 'url(#velvetDeep)';
    return '';
  };

  return (
    <div className="relative w-full aspect-[3/4] bg-background flex items-center justify-center p-12 group border border-white/5">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.svg 
        viewBox="0 0 200 400" 
        className="w-full h-full max-h-[85%] z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        initial={false}
      >
        <defs>
          <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.accent} />
            <stop offset="50%" stopColor={palette.main} />
            <stop offset="100%" stopColor={palette.dark} />
          </linearGradient>
          <filter id="satinGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting surfaceScale="3" specularConstant="0.5" specularExponent="15" lightingColor="white" in="blur" result="spec">
              <fePointLight x="-50" y="-50" z="200" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceAlpha" operator="in" />
            <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
          </filter>
        </defs>

        <path 
          d="M100,50 C110,50 115,60 115,75 L115,85 C115,100 110,110 100,110 C90,110 85,100 85,85 L85,75 C85,60 90,50 100,50 Z M100,115 C120,115 140,130 140,160 L140,220 C140,250 130,280 120,320 L120,380 L80,380 L80,320 C70,280 60,250 60,220 L60,160 C60,130 80,115 100,115"
          fill="white"
          fillOpacity="0.02"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.1"
        />

        <AnimatePresence mode="wait">
          <motion.g
            key={outfitType}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <motion.path 
              d="M70,120 Q100,110 130,120 L145,210 L155,380 L45,380 L55,210 Z"
              fill="url(#mainGrad)"
              filter={getFabricFilter()}
              stroke="white"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </motion.g>
        </AnimatePresence>
      </motion.svg>

      <div className="absolute top-12 left-12">
        <h5 className="font-headline font-bold text-xs uppercase tracking-[0.4em] text-white">
          Silhouettes
        </h5>
        <div className="h-0.5 w-12 bg-primary mt-2" />
      </div>

      <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
        <div className="space-y-2">
           <div className="font-headline font-bold text-4xl text-white tracking-tighter">
             {outfitType}
           </div>
           <div className="font-serif italic text-lg text-primary lowercase tracking-tight">
             {fabric} x {style}
           </div>
        </div>
        <div className="font-mono text-[9px] text-white/20 uppercase text-right leading-relaxed">
           Atelier .24 <br />
           Verified / {color}
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [designState, setDesignState] = useState(() => {
    const saved = localStorage.getItem('cccraftings_design_state');
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
    localStorage.setItem('cccraftings_design_state', JSON.stringify(designState));

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
      // Save to master collections
      const collections = JSON.parse(localStorage.getItem('cccraftings_collections') || '[]');
      const newEntry = {
        id: `CC-${Math.floor(Math.random() * 90000) + 10000}`,
        timestamp: new Date().toISOString(),
        state: designState,
        submitted: true
      };
      localStorage.setItem('cccraftings_collections', JSON.stringify([...collections, newEntry]));
      
      onStatusUpdate('vision', true);
      onStatusUpdate('measurements', true);
      onStatusUpdate('craft', true);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => (file as File).name);
      setDesignState((prev: any) => ({
        ...prev,
        inspirationFiles: [...prev.inspirationFiles, ...newFiles as any]
      }));
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
                  index={i}
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
                    <div className="flex items-center justify-between">
                      <h3 className="font-headline font-black text-3xl tracking-tight">Atelier <span className="text-primary neon-text-primary">Silhouettes</span></h3>
                      <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black opacity-40">Section 01/05</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4">
                      {[
                        { name: 'Dhoti Saree', trend: true },
                        { name: 'Corset Lehenga', trend: true },
                        { name: 'Cape Set', trend: true },
                        { name: 'Modern Saree', trend: false },
                        { name: 'Anarkali Gown', trend: false },
                        { name: 'Sharara Set', trend: true },
                        { name: 'Indo-Western', trend: true },
                        { name: 'Sharp Suit', trend: false },
                        { name: 'Western Gown', trend: false },
                        { name: 'Co-ord Concept', trend: true },
                        { name: 'Bridal Couture', trend: false },
                        { name: 'Digital Fusion', trend: true }
                      ].map(item => (
                        <RadioCard 
                          key={item.name}
                          label={item.name}
                          trend={item.trend}
                          active={designState.outfitType === item.name}
                          onClick={() => setDesignState({...designState, outfitType: item.name})}
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
                    <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
                        <div className="space-y-1">
                          <h3 className="font-headline font-black text-3xl uppercase tracking-tighter">Precision <span className="text-primary italic font-serif lowercase">Scaling</span></h3>
                          <p className="text-white/40 font-label text-[10px] uppercase tracking-widest font-bold">Local Sizing Standards</p>
                        </div>
                        <RegionSelector 
                          activeRegion={designState.region} 
                          onSelect={(r: any) => setDesignState({...designState, region: r.id, units: r.units})} 
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.keys(designState.measurements).map(key => (
                          <div key={key} className="p-6 border border-white/10 bg-surface/30">
                            <MeasurementInput 
                              label={key.replace(/([A-Z])/g, ' $1')} 
                              units={designState.units}
                              value={(designState.measurements as any)[key]}
                              onChange={(val: string) => setDesignState({
                                ...designState, 
                                measurements: { ...designState.measurements, [key]: val }
                              })}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Color & Fabric */}
                {activeStep === 3 && (
                  <div className="space-y-12">
                    <div className="space-y-8">
                      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                        <h4 className="font-headline font-black text-2xl uppercase tracking-tighter">Chromatic <span className="text-primary neon-text-primary">DNA</span></h4>
                        <span className="font-mono text-[9px] text-on-surface-variant font-bold">HEX SPECIFIED SYSTEM</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {[
                          { name: 'Pastels', colors: ['#fce4ec', '#f8bbd0', '#f48fb1'], tag: 'Soft' },
                          { name: 'Royal Gold', colors: ['#ffd700', '#daa520', '#b8860b'], tag: 'Majestic' },
                          { name: 'Kohl Black', colors: ['#0a0a0b', '#1a1a1a', '#333333'], tag: 'Elite' },
                          { name: 'Gulabi Pink', colors: ['#ff007b', '#ff4d94', '#ff80ae'], tag: 'Iconic' },
                          { name: 'Emerald', colors: ['#004d40', '#00695c', '#00796b'], tag: 'Rich' }
                        ].map(c => (
                          <button
                            key={c.name}
                            onClick={() => setDesignState({...designState, color: c.name.replace(/\s/g, '') as any})}
                            className={`group relative p-4 rounded-[2rem] border-2 transition-all duration-500 overflow-hidden ${designState.color === c.name.replace(/\s/g, '') ? 'bg-primary border-primary shadow-[0_0_30px_rgba(255,45,120,0.2)]' : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50'}`}
                          >
                            <div className="flex gap-1 mb-4">
                               {c.colors.map(col => <div key={col} className="w-full h-8 rounded-full" style={{ backgroundColor: col }} />)}
                            </div>
                            <div className={`font-label text-[10px] uppercase tracking-widest font-black leading-none ${designState.color === c.name.replace(/\s/g, '') ? 'text-white' : 'text-on-surface'}`}>{c.name}</div>
                            <div className={`font-label text-[8px] uppercase tracking-widest mt-1 opacity-50 ${designState.color === c.name.replace(/\s/g, '') ? 'text-white' : 'text-on-surface-variant'}`}>{c.tag}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-8">
                       <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                        <h4 className="font-headline font-black text-2xl uppercase tracking-tighter">Atelier <span className="text-secondary neon-text-secondary">Fabrics</span></h4>
                        <span className="font-mono text-[9px] text-on-surface-variant font-bold">TACTILE RESPONSE UNIT</span>
                      </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10">
                        {[
                          { name: 'Banarasi Silk', type: 'Rich' },
                          { name: 'Organza Silk', type: 'Light' },
                          { name: 'Russian Velvet', type: 'Heavy' },
                          { name: 'French Satin', type: 'Glossy' },
                          { name: 'Pure Georgette', type: 'Flowy' },
                          { name: 'Net & Tulle', type: 'Sheer' },
                          { name: 'Cotton Linen', type: 'Breathable' },
                          { name: 'Premium Blend', type: 'Mixed' }
                        ].map(f => (
                          <button
                            key={f.name}
                            onClick={() => setDesignState({...designState, fabric: f.name})}
                            className={`group p-8 transition-all duration-500 text-left ${designState.fabric === f.name ? 'bg-white text-black' : 'bg-surface hover:bg-white/[0.02]'}`}
                          >
                             <div className={`w-8 h-8 mb-4 border transition-transform ${designState.fabric === f.name ? 'bg-black border-black/10' : 'bg-white/5 border-white/10'}`} />
                             <div className={`font-headline text-[11px] uppercase tracking-[0.2em] font-bold ${designState.fabric === f.name ? 'text-black' : 'text-white'}`}>{f.name}</div>
                             <div className={`font-label text-[8px] uppercase tracking-widest mt-1 opacity-50 ${designState.fabric === f.name ? 'text-black' : 'text-on-surface-variant'}`}>{f.type}</div>
                          </button>
                        ))}
                     </div>
                    </div>

                    <div className="space-y-8">
                       <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                        <h4 className="font-headline font-black text-2xl uppercase tracking-tighter">Pattern <span className="text-tertiary">DNA</span></h4>
                        <span className="font-mono text-[9px] text-on-surface-variant font-bold">EMBROIDERY & TEXTURE</span>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { name: 'Banarasi', type: 'Heritage' },
                          { name: 'Zardosi', type: 'Embroidery' },
                          { name: 'Phulkari', type: 'Floral' },
                          { name: 'Bandhani', type: 'Tie-Dye' }
                        ].map(p => (
                          <button
                            key={p.name}
                            className="bg-surface-container-highest border-2 border-outline-variant/20 hover:border-primary/40 p-4 rounded-2xl flex flex-col gap-2 group transition-all"
                          >
                             <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 opacity-50 group-hover:opacity-100 transition-opacity" />
                             <span className="font-label text-[10px] uppercase tracking-widest font-black text-on-surface">{p.name}</span>
                             <span className="font-label text-[8px] uppercase tracking-widest text-on-surface-variant font-bold opacity-60">{p.type}</span>
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
                       <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-white font-bold">Matching Accessories</h4>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border border-white/10">
                          {['Earrings', 'Neckpiece', 'Hair Accessories', 'Handbag', 'Waist Belt', 'Customized Add-ons'].map(acc => (
                            <button
                              key={acc}
                              onClick={() => {
                                const newAccs = designState.accessories.includes(acc as never)
                                  ? designState.accessories.filter(a => a !== acc)
                                  : [...designState.accessories, acc];
                                setDesignState({...designState, accessories: newAccs as any});
                              }}
                              className={`p-6 border-px border-white/5 flex items-center justify-between transition-all ${designState.accessories.includes(acc as never) ? 'bg-white text-black' : 'bg-surface text-on-surface-variant hover:bg-white/[0.02]'}`}
                            >
                               <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold">{acc}</span>
                               {designState.accessories.includes(acc as never) && <CheckCircle2 size={14} />}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-6">
                       <h4 className="font-label text-[10px] uppercase tracking-[0.4em] text-white font-bold">Fit Archetype</h4>
                       <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-white/10">
                          {['Slim Fit', 'Relaxed Fit', 'Body Contour Fit', 'Lightweight Comfort', 'Heavy Premium Look'].map(fit => (
                             <button
                               key={fit}
                               onClick={() => setDesignState({...designState, fit: fit})}
                               className={`p-6 transition-all border-px border-white/5 ${designState.fit === fit ? 'bg-primary text-white' : 'bg-surface hover:bg-white/[0.02]'}`}
                             >
                                <span className="font-headline text-[10px] uppercase tracking-[0.2em] font-bold">{fit}</span>
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
                         <input 
                           type="file" 
                           ref={fileInputRef} 
                           onChange={handleFileChange} 
                           className="hidden" 
                           multiple
                           accept="image/*"
                         />
                         <button 
                           onClick={() => fileInputRef.current?.click()}
                           className={`flex items-center justify-center gap-2 px-8 py-3 border border-dashed rounded-xl transition-colors text-on-surface-variant ${designState.inspirationFiles.length > 0 ? 'border-primary text-primary' : 'border-outline-variant hover:border-primary'}`}
                         >
                            <Upload size={18} />
                            <span className="font-label text-xs uppercase tracking-widest font-bold">
                              {designState.inspirationFiles.length > 0 ? `${designState.inspirationFiles.length} File(s) Added` : 'Upload Refs'}
                            </span>
                         </button>
                         {designState.inspirationFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                               {designState.inspirationFiles.map((name: string, i: number) => (
                                 <div key={i} className="px-2 py-1 bg-primary/10 text-primary text-[8px] font-bold rounded uppercase flex items-center gap-1">
                                    {name}
                                 </div>
                               ))}
                            </div>
                         )}
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
              <RealisticPreview 
                outfitType={designState.outfitType}
                color={designState.color}
                style={designState.style}
                fabric={designState.fabric}
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
