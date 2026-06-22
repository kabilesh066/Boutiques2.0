import { motion } from 'motion/react';
import { Calendar, Mail, Phone, User, MessageSquare, ArrowLeft, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { SectionHeading } from '../components/shared/SectionHeading';

const Input = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="space-y-3">
    <label className="font-label text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold flex items-center gap-2">
      {Icon && <Icon size={12} className="text-primary" />}
      {label}
    </label>
    <div className="relative group">
      <input 
        className={`w-full bg-surface-container-high/20 border border-white/5 focus:border-white focus:bg-white/5 transition-all p-5 text-on-surface outline-none ${error ? 'border-red-500' : ''}`} 
        {...props} 
      />
      {error && <span className="text-red-500 text-[10px] mt-1 block">{error}</span>}
    </div>
  </div>
);

export default function ConsultationPage() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    occasion: 'Wedding',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-8 pt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-surface-container p-12 rounded-3xl border border-secondary/30 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[80px]"></div>
          <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-8 neon-border-secondary">
            <CheckCircle2 className="text-secondary" size={40} />
          </div>
          <h2 className="font-headline font-bold text-3xl mb-4 text-on-surface">Request Received!</h2>
          <p className="text-on-surface-variant mb-10 leading-relaxed text-sm">
            Thank you for choosing CC Craftings. Our lead designer will review your details and reach out via email within 24 hours to confirm your private consultation session.
          </p>
          <Button variant="secondary" className="w-full" onClick={() => navigate('/')}>Return Home</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-8 min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        {/* Left Column: Info */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <Link to="/" className="flex items-center gap-4 text-primary hover:text-white transition-colors mb-16 font-label text-[10px] uppercase tracking-[0.5em] font-black group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
            Atelier Exit
          </Link>

          <div className="space-y-8">
            <div className="h-1 w-24 bg-primary" />
            <h1 className="font-headline font-black text-6xl lg:text-7xl uppercase tracking-tighter text-white leading-none">
              Secure Your <br/> <span className="text-white italic font-serif lowercase">Session</span>
            </h1>
            <p className="text-white/40 font-label text-[12px] uppercase tracking-[0.2em] font-bold max-w-sm leading-relaxed">
              Define your aesthetic, metrics, and design vision with our chief architects.
            </p>
          </div>

          <div className="space-y-12 mt-16 max-w-md">
            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <Calendar className="text-white" size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-headline font-bold text-xl uppercase text-white">Scheduling unit</h4>
                <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-wider">Choose a standard UTC slot. Available via Neo-Tokyo HQ or secure uplink.</p>
              </div>
            </div>

            <div className="flex gap-8 items-start group">
              <div className="w-16 h-16 border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                <Sparkles className="text-white" size={24} />
              </div>
              <div className="space-y-2">
                <h4 className="font-headline font-bold text-xl uppercase text-white">Couture Logic</h4>
                <p className="text-white/40 text-[11px] leading-relaxed uppercase tracking-wider">A 30-minute analytical session addressing lifestyle, anatomy, and vision.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <div className="bg-surface p-12 md:p-16 border border-white/10">
            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Full Name Spec" 
                  placeholder="EX: EVELYN THORNE" 
                  icon={User} 
                  required 
                  value={formData.name}
                  onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                  label="Digital Mail Unit" 
                  placeholder="name@unit.com" 
                  type="email" 
                  icon={Mail} 
                  required
                  value={formData.email}
                  onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Terminal Line" 
                  placeholder="+91 000 000 0000" 
                  type="tel" 
                  icon={Phone} 
                  required
                  value={formData.phone}
                  onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                />
                <Input 
                  label="Deployment Date" 
                  type="date" 
                  icon={Calendar} 
                  required
                  value={formData.date}
                  onChange={(e: any) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-4">
                <label className="font-label text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold">Category Spec</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
                  {['Wedding', 'Social', 'Editorial', 'Corporate'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, occasion: type})}
                      className={`py-4 font-label text-[10px] uppercase tracking-[0.2em] transition-all duration-500 border border-white/5 ${formData.occasion === type ? 'bg-white text-black font-black' : 'text-white/40 hover:bg-white/5'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-label text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold flex items-center gap-2">
                  <MessageSquare size={12} className="text-primary" />
                  Inspiration Directive
                </label>
                <textarea 
                  className="w-full bg-surface-container-high/10 border border-white/5 focus:border-white transition-all p-6 text-on-surface h-40 outline-none resize-none" 
                  placeholder="Detail your silhouettes, fabrics, and chromatic preferences..."
                  value={formData.details}
                  onChange={(e: any) => setFormData({...formData, details: e.target.value})}
                ></textarea>
              </div>

              <Button type="submit" className="w-full py-8 text-[11px] uppercase tracking-[0.4em] font-black" variant="primary">
                Confirm Deployment Order
              </Button>
              
              <p className="text-center text-white/10 text-[9px] uppercase tracking-[0.4em] font-mono">
                System Verified / CC_SEC_UNIT
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
