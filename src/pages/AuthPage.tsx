import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Phone, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';

const Input = ({ label, icon: Icon, type = "text", ...props }: any) => (
  <div className="space-y-3">
    <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{label}</label>
    <div className="relative group">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors">
        <Icon size={16} />
      </div>
      <input 
        type={type}
        className="w-full bg-surface-container-high/20 border border-white/5 focus:border-white focus:bg-white/5 transition-all pl-14 pr-6 py-5 text-on-surface outline-none"
        {...props}
      />
    </div>
  </div>
);

type AuthMode = 'login' | 'signup' | 'forgot';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-surface p-12 md:p-16 border border-white/10 relative z-10"
      >
        <div className="absolute top-0 right-0 p-8">
          <div className="text-[10px] font-mono text-white/10 uppercase tracking-[0.5em] [writing-mode:vertical-lr] items-center gap-4 hidden md:flex">
             Digital Atelier Access / {mode.toUpperCase()}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-left space-y-4">
                <div className="h-1 w-12 bg-primary" />
                <h2 className="font-headline font-black text-4xl uppercase tracking-tighter">Welcome <span className="text-white italic font-serif lowercase">Back</span></h2>
                <p className="text-white/40 font-label text-[10px] uppercase tracking-[0.2em] font-bold">Secure Access to Boutique Dashboard</p>
              </div>

              <div className="flex bg-white/5 p-px border border-white/10">
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 font-label text-[10px] uppercase tracking-widest transition-all ${loginMethod === 'email' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                >
                  Email Spec
                </button>
                <button 
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-3 font-label text-[10px] uppercase tracking-widest transition-all ${loginMethod === 'phone' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                >
                  Mobile Unit
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {loginMethod === 'email' ? (
                  <Input label="Email Address" icon={Mail} placeholder="name@example.com" type="email" required />
                ) : (
                  <Input label="Mobile Number" icon={Phone} placeholder="+91 000 000 0000" type="tel" required />
                )}
                
                <div className="space-y-1">
                  <Input label="Password" icon={Lock} type="password" placeholder="••••••••" required />
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-primary hover:text-secondary transition-colors text-[10px] font-bold uppercase tracking-widest float-right"
                  >
                    Forgot Password?
                  </button>
                </div>

                <Button type="submit" className="w-full py-4 mt-8 flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={16} />
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-on-surface-variant text-xs">
                  Don't have an account? {' '}
                  <button 
                    onClick={() => setMode('signup')}
                    className="text-primary font-bold hover:underline"
                  >
                    Join CC Craftings
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {mode === 'signup' && (
            <motion.div 
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-left space-y-4">
                <div className="h-1 w-12 bg-primary" />
                <h2 className="font-headline font-black text-4xl uppercase tracking-tighter">Create <span className="text-white italic font-serif lowercase">Identity</span></h2>
                <p className="text-white/40 font-label text-[10px] uppercase tracking-[0.2em] font-bold">Join the High-Fashion Digital Frontier</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Full Name" icon={User} placeholder="Evelyn Thorne" required />
                <Input label="Email Address" icon={Mail} placeholder="name@example.com" type="email" required />
                <Input label="Mobile Number" icon={Phone} placeholder="+91 000 000 0000" type="tel" required />
                <Input label="Password" icon={Lock} type="password" placeholder="Min. 8 characters" required />

                <Button type="submit" className="w-full py-4 mt-8">
                  Create Account
                </Button>
              </form>

              <div className="text-center pt-4">
                <p className="text-on-surface-variant text-xs">
                  Already have an account? {' '}
                  <button 
                    onClick={() => setMode('login')}
                    className="text-primary font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {mode === 'forgot' && (
            <motion.div 
              key="forgot"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setMode('login')}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label text-[10px] uppercase tracking-widest font-bold mb-6"
              >
                <ArrowLeft size={14} /> Back to Login
              </button>

              <div className="text-center">
                <h2 className="font-headline font-bold text-3xl mb-2">Recover Access</h2>
                <p className="text-on-surface-variant text-sm">We'll send you a link to reset your password.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Email Address" icon={Mail} placeholder="name@example.com" type="email" required />
                <Button type="submit" className="w-full py-4 mt-4">
                  Send Reset Link
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
