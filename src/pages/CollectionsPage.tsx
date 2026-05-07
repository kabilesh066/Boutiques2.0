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
    const saved = localStorage.getItem('aurelle_collections');
    if (saved) {
      setCollections(JSON.parse(saved));
    }
  }, []);

  const deleteOrder = (id: string) => {
    const updated = collections.filter(item => item.id !== id);
    setCollections(updated);
    localStorage.setItem('aurelle_collections', JSON.stringify(updated));
  };

  const editOrder = (order: any) => {
    // Load this order into current design state and journey status
    localStorage.setItem('aurelle_design_state', JSON.stringify(order.state));
    // Re-verify journey status (simplified for this demo, usually you'd re-verify logic)
    localStorage.setItem('aurelle_journey_status', JSON.stringify({
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

        <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
          {[
            { label: 'Total Designs', val: stats.total, icon: Package, color: 'primary' },
            { label: 'Blueprints', val: stats.completed, icon: Layers, color: 'secondary' },
            { label: 'Atelier Queue', val: stats.inProgress, icon: BarChart3, color: 'tertiary' }
          ].map(stat => (
            <div key={stat.label} className="bg-surface-container-high p-4 rounded-3xl border border-outline-variant/30 flex flex-col items-center justify-center text-center">
               <stat.icon size={20} className={`text-${stat.color} mb-2`} />
               <div className="font-headline font-black text-2xl">{stat.val}</div>
               <div className="font-label text-[8px] uppercase tracking-widest font-black opacity-40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by ensemble type or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-container-highest border-2 border-outline-variant/30 hover:border-primary/30 focus:border-primary px-16 py-5 rounded-[2rem] font-label text-sm transition-all focus:outline-none"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 px-8">
           <Filter size={18} /> Filters
        </Button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredCollections.length > 0 ? filteredCollections.map((order, i) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-[#0a0a0b] rounded-[3rem] border border-outline-variant/30 overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              {/* Card Header (Meta) */}
              <div className="p-8 pb-4 flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">#{order.id}</div>
                  <div className="flex items-center gap-2 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                    <Calendar size={12} /> {new Date(order.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className={`px-4 py-1 rounded-full font-label text-[8px] uppercase tracking-widest font-black ${order.submitted ? 'bg-secondary/10 text-secondary' : 'bg-tertiary/10 text-tertiary'}`}>
                  {order.submitted ? 'Blueprint Ready' : 'In Progress'}
                </div>
              </div>

              {/* Visualization Style Mini Preview */}
              <div className="px-8 py-2">
                <div className="bg-surface-container-high rounded-2xl h-32 flex items-center justify-center overflow-hidden relative">
                   <div className="font-headline font-black text-white/5 text-4xl absolute rotate-12">{order.state.outfitType}</div>
                   <div className="relative z-10 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <ShoppingBag size={24} />
                   </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="p-8 pt-4 space-y-4">
                <div>
                   <h3 className="font-headline font-black text-2xl group-hover:text-primary transition-colors">{order.state.outfitType}</h3>
                   <p className="text-on-surface-variant text-[10px] uppercase tracking-widest font-bold opacity-60">{order.state.fabric} • {order.state.style}</p>
                </div>

                <div className="flex gap-2">
                   <Button 
                    variant="outline" 
                    className="flex-1 py-3 h-auto"
                    onClick={() => editOrder(order)}
                   >
                     <Edit3 size={14} className="mr-2" /> Edit
                   </Button>
                   <Button 
                    variant="outline" 
                    className="w-12 h-12 !p-0 border-red-500/20 text-red-500/60 hover:bg-red-500 hover:text-white transition-all rounded-2xl"
                    onClick={() => deleteOrder(order.id)}
                   >
                     <Trash2 size={16} />
                   </Button>
                   <Button 
                    variant="primary" 
                    className="w-12 h-12 !p-0 rounded-2xl"
                    onClick={() => navigate('/blueprint', { state: { designState: order.state } })}
                   >
                     <ChevronRight size={20} />
                   </Button>
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
