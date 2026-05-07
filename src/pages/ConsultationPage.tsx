import { motion } from 'motion/react';
import { Calendar, Mail, Phone, User, MessageSquare, ArrowLeft, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';
import { SectionHeading } from '../components/shared/SectionHeading';

const Input = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="space-y-2">
    <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
      {Icon && <Icon size={14} className="text-secondary" />}
      {label}
    </label>
    <div className="relative group">
      <input 
        className={`w-full bg-surface-container-high/50 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all p-4 text-on-surface outline-none rounded-xl group-hover:border-primary/50 ${error ? 'border-error' : ''}`} 
        {...props} 
      />
      {error && <span className="text-error text-[10px] mt-1 block">{error}</span>}
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
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-12 font-label text-xs uppercase tracking-widest font-bold group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <SectionHeading align="left" subtitle="A personalized session to define your aesthetic, measurements, and design vision.">
            Book Your <br/> <span className="text-primary neon-text-primary">Consultation</span>
          </SectionHeading>

          <div className="space-y-8 mt-4">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                <Calendar className="text-primary" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg mb-1">Flexible Scheduling</h4>
                <p className="text-on-surface-variant text-sm">Choose a time that works for you. We offer sessions in our Neo-Tokyo studio or via secure video link.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                <Sparkles className="text-secondary" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg mb-1">Tailored Experience</h4>
                <p className="text-on-surface-variant text-sm">Every woman is unique. We spend the first 30 minutes understanding your lifestyle and body type.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center shrink-0">
                <ShieldCheck className="text-tertiary" />
              </div>
              <div>
                <h4 className="font-headline font-bold text-lg mb-1">Zero Obligation</h4>
                <p className="text-on-surface-variant text-sm">The consultation fee is fully redeemable against your first custom outfit order.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <div className="bg-surface-container p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-2xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Full Name" 
                  placeholder="Evelyn Thorne" 
                  icon={User} 
                  required 
                  value={formData.name}
                  onChange={(e: any) => setFormData({...formData, name: e.target.value})}
                />
                <Input 
                  label="Email Address" 
                  placeholder="hello@example.com" 
                  type="email" 
                  icon={Mail} 
                  required
                  value={formData.email}
                  onChange={(e: any) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input 
                  label="Phone Number" 
                  placeholder="+91 000 000 0000" 
                  type="tel" 
                  icon={Phone} 
                  required
                  value={formData.phone}
                  onChange={(e: any) => setFormData({...formData, phone: e.target.value})}
                />
                <Input 
                  label="Preferred Date" 
                  type="date" 
                  icon={Calendar} 
                  required
                  value={formData.date}
                  onChange={(e: any) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold">Occasion Category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Wedding', 'Social', 'Editorial', 'Corporate'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({...formData, occasion: type})}
                      className={`py-3 rounded-xl font-label text-[10px] uppercase tracking-widest border transition-all duration-300 ${formData.occasion === type ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(255,45,120,0.4)]' : 'border-outline-variant text-on-surface-variant hover:border-primary/50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2">
                  <MessageSquare size={14} className="text-secondary" />
                  Design Inspiration & Preferences
                </label>
                <textarea 
                  className="w-full bg-surface-container-high/50 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all p-4 text-on-surface h-32 outline-none resize-none rounded-xl group-hover:border-primary/50" 
                  placeholder="Tell us about the colors, fabrics, and silhouettes you love..."
                  value={formData.details}
                  onChange={(e: any) => setFormData({...formData, details: e.target.value})}
                ></textarea>
              </div>

              <Button type="submit" className="w-full py-5 text-sm" variant="primary">
                Confirm Consultation Request
              </Button>
              
              <p className="text-center text-on-surface-variant text-[10px] uppercase tracking-[0.2em] opacity-50">
                Secured by CC Identity Systems
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
