'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  isTriggered?: boolean;
  onFinished?: () => void;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ isTriggered, onFinished }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setActive(true);
      const timer = setTimeout(() => {
        setActive(false);
        if (onFinished) onFinished();
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [isTriggered, onFinished]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] flex items-center justify-center overflow-hidden">
      {/* 6-Blade Mechanical Iris Wipe */}
      <motion.div
        initial={{ scale: 0, opacity: 0.9 }}
        animate={{ scale: 2.8, opacity: 1 }}
        exit={{ scale: 3, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.85, 0, 0.15, 1] }}
        className="w-[120vw] h-[120vw] rounded-full border-[100px] border-[#080808] bg-transparent flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-full border border-[#B3141B] animate-spin" />
      </motion.div>
    </div>
  );
};
export default PageTransition;
