'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  width?: 'fit-content' | '100%';
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  width = 'fit-content',
  direction = 'up',
  delay = 0,
  className = ""
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getVariants = () => {
    if (shouldReduceMotion) {
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
    switch (direction) {
      case 'up':
        return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
      case 'left':
        return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
      case 'right':
        return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
      case 'none':
        return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
      default:
        return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
    }
  };

  return (
    <div style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
      <motion.div
        variants={getVariants()}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={
          shouldReduceMotion
            ? { duration: 0.01 }
            : { duration: 0.6, delay, ease: "easeOut" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
