import { motion } from 'motion/react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
  const base = "px-10 py-5 font-label uppercase tracking-[0.4em] text-[10px] transition-all duration-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-center inline-block border";
  const variants: any = {
    primary: "bg-white text-black border-white hover:bg-black hover:text-white font-black",
    secondary: "bg-primary text-white border-primary hover:bg-white hover:text-black font-black",
    outline: "border-white/20 text-white hover:border-white hover:bg-white/5 font-bold",
    ghost: "border-transparent text-white/40 hover:text-white font-bold",
    link: "border-transparent text-primary hover:text-white p-0 h-auto underline underline-offset-8"
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
