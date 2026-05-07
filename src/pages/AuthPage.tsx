import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Phone, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/shared/Button';

const Input = ({ label, icon: Icon, type = "text", ...props }: any) => (
  <div className="space-y-2">
    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
        <Icon size={16} />
      </div>
      <input 
        type={type}
        className="w-full bg-surface-container-high/50 border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all pl-12 pr-4 py-4 text-on-surface outline-none rounded-xl"
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
        className="max-w-md w-full bg-surface-container p-8 md:p-12 rounded-3xl border border-outline-variant/30 shadow-2xl relative z-10"
      >
        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div 
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="font-headline font-bold text-3xl mb-2">Welcome Back</h2>
                <p className="text-on-surface-variant text-sm">Access your bespoke design atelier.</p>
              </div>

              <div className="flex bg-surface-container-lowest p-1 rounded-xl border border-outline-variant">
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 rounded-lg font-label text-[10px] uppercase tracking-widest transition-all ${loginMethod === 'email' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant'}`}
                >
                  Email
                </button>
                <button 
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 rounded-lg font-label text-[10px] uppercase tracking-widest transition-all ${loginMethod === 'phone' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant'}`}
                >
                  Mobile
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
              <div className="text-center">
                <h2 className="font-headline font-bold text-3xl mb-2">Create Identity</h2>
                <p className="text-on-surface-variant text-sm">Join our world of custom couture.</p>
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
