import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  ChevronRight, 
  Edit3, 
  Trash2, 
  ArrowLeft, 
  Search,
  Filter,
  BarChart3,
  Package,
  Calendar,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';

export default function CollectionsPage() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cccraftings_collections');
    if (saved) {
      setCollections(JSON.parse(saved));
    }
  }, []);

  const deleteOrder = (id: string) => {
    const updated = collections.filter(item => item.id !== id);
    setCollections(updated);
    localStorage.setItem('cccraftings_collections', JSON.stringify(updated));
  };

  const editOrder = (order: any) => {
    // Load this order into current design state and journey status
    localStorage.setItem('cccraftings_design_state', JSON.stringify(order.state));
    // Re-verify journey status (simplified for this demo, usually you'd re-verify logic)
    localStorage.setItem('cccraftings_journey_status', JSON.stringify({
      vision: true,
      measurements: true,
      craft: true,
      delivery: false,
      started: true
    }));
    navigate('/design');
  };

  const filteredCollections = collections.filter(item => 
    item.state.outfitType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.includes(searchTerm)
  );

  const stats = {
    total: collections.length,
    inProgress: collections.filter(c => !c.submitted).length,
    completed: collections.filter(c => c.submitted).length,
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[10px] uppercase tracking-widest font-black mb-4"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          <h1 className="font-headline font-black text-4xl lg:text-5xl tracking-tighter">My <span className="text-secondary neon-text-secondary">Collections</span></h1>
        </div>

        <div className="grid grid-cols-3 gap-0 border border-white/10 w-full lg:w-auto overflow-hidden">
          {[
            { label: 'Total Designs', val: stats.total, icon: Package, color: 'primary' },
            { label: 'Blueprints', val: stats.completed, icon: Layers, color: 'secondary' },
            { label: 'Atelier Queue', val: stats.inProgress, icon: BarChart3, color: 'tertiary' }
          ].map(stat => (
            <div key={stat.label} className="bg-surface p-10 border border-white/5 flex flex-col items-center justify-center text-center">
               <stat.icon size={18} className={`text-${stat.color} mb-4`} />
               <div className="font-headline font-black text-3xl tracking-tighter text-white">{stat.val}</div>
               <div className="font-label text-[8px] uppercase tracking-[0.3em] font-black text-white/20 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-0 border border-white/10 mb-12">
        <div className="relative flex-1 group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search ensemble units or serial IDs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-highest/20 border-r border-white/10 hover:bg-white/5 focus:bg-white/5 px-20 py-8 font-label text-[10px] uppercase tracking-[0.2em] font-bold transition-all focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-4 px-12 py-8 bg-surface hover:bg-white/5 font-label text-[10px] uppercase tracking-[0.4em] font-black text-white/40 transition-colors">
           <Filter size={16} /> Filters
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCollections.length > 0 ? filteredCollections.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-surface border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-700"
            >
              {/* Card Header (Meta) */}
              <div className="p-10 pb-6 flex justify-between items-start border-b border-white/5">
                <div className="space-y-1">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase tracking-[0.4em]">SPEC_{order.id}</div>
                  <div className="flex items-center gap-2 text-white/20 text-[9px] font-bold uppercase tracking-widest font-mono">
                    <Calendar size={12} /> {new Date(order.timestamp).toLocaleDateString('en-GB').replace(/\//g, '.')}
                  </div>
                </div>
                <div className={`text-[8px] uppercase tracking-[0.3em] font-black ${order.submitted ? 'text-primary' : 'text-white/20'}`}>
                  {order.submitted ? 'Verified Blueprint' : 'Drafting Stage'}
                </div>
              </div>

              {/* Visualization Style Mini Preview */}
              <div className="px-10 py-12 flex items-center justify-center bg-white/[0.02]">
                 <div className="relative group/mini">
                    <div className="font-headline font-black text-white/5 text-6xl tracking-tighter uppercase select-none">{order.state.outfitType}</div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                       <div className="w-16 h-16 bg-white flex items-center justify-center text-black">
                         <ShoppingBag size={24} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Details Section */}
              <div className="p-10 space-y-8">
                <div className="space-y-2">
                   <h3 className="font-headline font-black text-2xl tracking-tighter uppercase text-white group-hover:text-primary transition-colors">{order.state.outfitType}</h3>
                   <div className="h-0.5 w-12 bg-white/10 group-hover:bg-primary transition-colors" />
                   <div className="flex gap-4">
                     <p className="text-white/40 font-label text-[9px] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">{order.state.fabric}</p>
                     <p className="text-white/20 font-label text-[9px] uppercase tracking-[0.2em] font-bold">///</p>
                     <p className="text-white/40 font-label text-[9px] uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">{order.state.style}</p>
                   </div>
                </div>

                <div className="flex gap-2">
                   <button 
                    onClick={() => editOrder(order)}
                    className="flex-1 py-4 bg-white/5 hover:bg-white text-white hover:text-black font-label text-[9px] uppercase tracking-[0.4em] font-black transition-all border border-white/5"
                   >
                     RE-SPEC
                   </button>
                   <button 
                    onClick={() => deleteOrder(order.id)}
                    className="px-6 py-4 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white font-label text-[9px] uppercase tracking-[0.4em] font-black transition-all border border-white/5"
                   >
                     DEL
                   </button>
                   <button 
                    onClick={() => navigate('/blueprint', { state: { designState: order.state } })}
                    className="px-6 py-4 bg-primary text-white font-label text-[9px] uppercase tracking-[0.4em] font-black transition-all"
                   >
                     VIEW
                   </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-outline-variant/30 rounded-[4rem]">
               <Package className="mx-auto mb-6 opacity-20" size={64} />
               <h3 className="font-headline font-bold text-2xl text-on-surface-variant mb-2">No master designs found</h3>
               <p className="text-on-surface-variant/60 font-label text-xs tracking-widest mb-8">Ready to architect your next ensemble?</p>
               <Button variant="primary" onClick={() => navigate('/design')}>Craft Your First Outfit</Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
