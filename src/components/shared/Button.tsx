import { motion } from 'motion/react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "px-6 py-3 font-label uppercase tracking-widest text-xs transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-center inline-block";
  const variants: any = {
    primary: "bg-primary text-white neon-glow-primary rounded-lg font-bold",
    secondary: "border border-secondary text-secondary hover:bg-secondary/10 rounded-lg font-bold",
    outline: "border border-primary text-primary hover:bg-primary/10 rounded-lg",
    ghost: "text-on-surface-variant hover:text-secondary",
    link: "text-primary hover:underline p-0 h-auto"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
