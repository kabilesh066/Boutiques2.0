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
  <div className="flex justify-between border-b border-outline-variant/30 py-3 group">
    <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold group-hover:text-primary transition-colors">{label}</span>
    <span className="font-headline font-bold text-sm text-on-surface">{value || 'Not Specified'}</span>
  </div>
);

const MeasurementGrid = ({ measurements, units }: { measurements: any, units: string }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Object.entries(measurements).map(([key, value]) => (
      <div key={key} className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/30 text-center">
        <div className="font-label text-[9px] uppercase tracking-tighter text-on-surface-variant font-bold mb-1 opacity-60">
          {key.replace(/([A-Z])/g, ' $1')}
        </div>
        <div className="font-headline font-bold text-xl text-primary">
          {value || '--'}<span className="text-[10px] ml-1 opacity-50 uppercase">{units}</span>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container p-8 md:p-16 rounded-[40px] border border-outline-variant/30 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-white"
      >
        {/* Background Watermark/Decor */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
          <h2 className="text-[15rem] font-headline font-black rotate-12">AURELLE</h2>
        </div>

        {/* Master Copy Label */}
        <div className="flex justify-between items-start mb-16 relative z-10">
          <div className="space-y-1">
            <div className="bg-secondary text-background font-label text-[10px] uppercase tracking-[0.3em] font-black px-4 py-1.5 rounded-full inline-block mb-4">
              Master Blueprint Copy
            </div>
            <div className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Document ID: #AUR-{Math.floor(Math.random() * 90000) + 10000}</div>
            <div className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold">Issued: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
          <div className="p-3 bg-white rounded-xl shadow-lg border border-outline-variant/10">
             <QrCode size={48} className="text-background" />
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
              This technical specification is proprietary to Aurelle Atelier. All designs are handcrafted per these digital metrics. Re-evaluation occurs during the first fitting session.
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

        {/* Footer Signature Area */}
        <div className="pt-16 border-t-2 border-dashed border-outline-variant mt-32 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left relative z-10">
          <div>
            <div className="font-headline italic text-2xl mb-2 logo-glow">Aurelle Atelier</div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-black">Official Couture Certification</div>
          </div>
          <div className="w-48 h-[1px] bg-outline-variant hidden md:block"></div>
          <div className="space-y-4">
            <div className="w-64 h-16 border-b-2 border-outline-variant relative">
              <span className="absolute bottom-1 right-0 text-[8px] uppercase tracking-widest text-on-surface-variant font-bold">Designer Signature</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
               <Calendar size={12} className="text-primary" />
               <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Validity: 60 Days from issue</span>
            </div>
          </div>
        </div>

        {/* Print only footer */}
        <div className="hidden print:block mt-12 text-center text-[8px] text-gray-400 uppercase tracking-widest">
          © 2024 Aurelle Couture. Digitally Generated at Aurelle AI Atelier.
        </div>
      </motion.div>
    </div>
  );
}
