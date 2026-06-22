import { motion } from 'motion/react';

export const SectionHeading = ({ children, subtitle, align = 'center' }: any) => (
  <div className={`mb-24 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <div className={`h-1 w-16 bg-primary mb-8 ${align === 'center' ? 'mx-auto' : ''}`} />
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-headline font-black text-5xl md:text-7xl mb-6 tracking-tighter uppercase text-white leading-[0.9]"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/40 font-label text-[10px] uppercase tracking-[0.3em] font-black max-w-xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);
