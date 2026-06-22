import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  ShieldCheck, 
  Calendar, 
  User, 
  QrCode,
  Ruler,
  Palette,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';

const TechLine = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between border-b border-white/5 py-4 group">
    <span className="font-label text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold group-hover:text-primary transition-colors">{label}</span>
    <span className="font-headline font-bold text-sm text-white tracking-widest">{value || 'UNSPECIFIED'}</span>
  </div>
);

const MeasurementGrid = ({ measurements, units }: { measurements: any, units: string }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
    {Object.entries(measurements).map(([key, value]) => (
      <div key={key} className="bg-surface/50 p-8 border border-white/5 text-left">
        <div className="font-label text-[9px] uppercase tracking-[0.3em] text-white/20 font-black mb-4">
          {key.replace(/([A-Z])/g, ' $1')}
        </div>
        <div className="font-headline font-black text-2xl text-white tracking-tighter">
          {value || '00'}<span className="text-[10px] ml-2 opacity-50 uppercase font-mono">{units}</span>
        </div>
      </div>
    ))}
  </div>
);

export default function BlueprintPage({ onNewOrder }: { onNewOrder?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  
  const designData = location.state?.designState || {
    outfitType: 'Gown',
    style: 'Elegant Minimal',
    region: 'IN',
    units: 'cm',
    measurements: {},
    color: 'Pastels',
    fabric: 'Silk',
    accessories: [],
    fit: 'Body Contour Fit'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Top Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[10px] uppercase tracking-widest font-bold mb-2"
          >
            <ArrowLeft size={14} /> Back to Atelier
          </button>
          <h1 className="font-headline font-bold text-3xl">Design <span className="text-secondary neon-text-secondary">Blueprint</span></h1>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={onNewOrder}>
             Start New Order
          </Button>
          <Button variant="outline" className="flex items-center gap-2" onClick={handlePrint}>
            <Printer size={16} /> Print Master Copy
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={handlePrint}>
            <Download size={16} /> Download PDF
          </Button>
        </div>
      </div>

      {/* The Printable Container */}
      <motion.div 
        ref={printRef}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-surface p-12 md:p-20 border border-white/10 relative overflow-hidden print:p-0 print:border-none print:bg-white"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
          <h2 className="text-[20rem] font-headline font-black tracking-tighter">ATELIER</h2>
        </div>

        <div className="flex justify-between items-start mb-24 relative z-10">
          <div className="space-y-4">
            <div className="bg-primary text-white font-label text-[10px] uppercase tracking-[0.5em] font-black px-6 py-2 inline-block">
              Master Specification .24
            </div>
            <div className="space-y-1">
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">DOC_ID / #AUR-{Math.floor(Math.random() * 90000) + 10000}</div>
              <div className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">TIMESTAMP / {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}</div>
            </div>
          </div>
          <div className="p-4 bg-white border border-white/10">
             <QrCode size={64} className="text-black" />
          </div>
        </div>

        {/* Section 1: Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-secondary">
              <User size={18} />
              <h3 className="font-label text-[12px] uppercase tracking-widest font-black">Digital Identity</h3>
            </div>
            <div className="space-y-4">
               <TechLine label="Blueprint Owner" value="Secured Profile" />
               <TechLine label="Consultation Status" value="Awaiting Designer Review" />
               <TechLine label="Priority" value="High Couture" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <ShieldCheck size={18} />
              <h3 className="font-label text-[12px] uppercase tracking-widest font-black">Atelier Ethics</h3>
            </div>
            <p className="text-on-surface-variant text-[11px] leading-relaxed uppercase tracking-wider font-medium">
              This technical specification is proprietary to CC Atelier. All designs are handcrafted per these digital metrics. Re-evaluation occurs during the first fitting session.
            </p>
          </div>
        </div>

        {/* Section 2: Technical Specifications */}
        <div className="mb-16 space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-tertiary">
            <Layers size={18} />
            <h3 className="font-label text-[12px] uppercase tracking-widest font-black">Silhouettes & Material DNA</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-2">
            <TechLine label="Outfit Archetype" value={designData.outfitType} />
            <TechLine label="Aesthetic DNA" value={designData.style} />
            <TechLine label="Fabric Base" value={designData.fabric} />
            <TechLine label="Fit Architecture" value={designData.fit} />
            <TechLine label="Primary Palette" value={designData.color} />
            <TechLine label="Region Standard" value={designData.region} />
          </div>
        </div>

        {/* Section 3: Measurements Grid */}
        <div className="mb-16 space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-primary">
            <Ruler size={18} />
            <h3 className="font-label text-[12px] uppercase tracking-widest font-black">Anatomical Metrics ({designData.units})</h3>
          </div>
          <MeasurementGrid measurements={designData.measurements} units={designData.units} />
        </div>

        {/* Section 4: Finishing & Accessories */}
        <div className="mb-16 space-y-8 relative z-10">
          <div className="flex items-center gap-3 text-secondary">
            <ShoppingBag size={18} />
            <h3 className="font-label text-[12px] uppercase tracking-widest font-black">Curated Finishing</h3>
          </div>
          <div className="flex flex-wrap gap-4">
             {designData.accessories?.length > 0 ? designData.accessories.map((acc: string) => (
               <div key={acc} className="px-5 py-2.5 rounded-full bg-surface-container-highest border border-outline-variant font-label text-[10px] uppercase tracking-widest font-bold">
                 {acc}
               </div>
             )) : (
               <span className="text-on-surface-variant text-[11px] uppercase tracking-widest font-bold italic opacity-50">No additional accessories selected</span>
             )}
          </div>
        </div>

        <div className="pt-24 border-t border-white/10 mt-32 flex flex-col md:flex-row justify-between items-end gap-12 relative z-10">
          <div className="text-left">
            <div className="font-serif italic text-4xl mb-4 text-white">CC Atelier</div>
            <div className="text-[10px] uppercase tracking-[0.6em] text-white/20 font-black">Official Couture Certification</div>
          </div>
          
          <div className="space-y-8 flex flex-col items-end">
            <div className="w-80 h-px bg-white/10 relative">
               <div className="absolute -top-6 right-0 text-[9px] uppercase tracking-[0.3em] font-serif italic text-primary">Chief Designer Signature</div>
            </div>
            <div className="flex items-center gap-4">
               <Calendar size={14} className="text-primary" />
               <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">VALID_PERIOD / 60_DAYS</span>
            </div>
          </div>
        </div>

        {/* Print only footer */}
        <div className="hidden print:block mt-12 text-center text-[8px] text-gray-400 uppercase tracking-widest">
          © 2024 CC Craftings. Digitally Generated at CC Atelier.
        </div>
      </motion.div>
    </div>
  );
}
