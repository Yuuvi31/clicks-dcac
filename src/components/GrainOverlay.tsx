'use client';

import React, { useEffect, useState } from 'react';
import { playShutterSnap } from '@/lib/sound';

interface GrainOverlayProps {
  onShutterTrigger?: () => void;
}

export const GrainOverlay: React.FC<GrainOverlayProps> = ({ onShutterTrigger }) => {
  const [scrollProgress, setScrollProgress] = useState(1);
  const [totalFrames] = useState(36);
  const [delhiTime, setDelhiTime] = useState('');
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    // Update live Delhi time (UTC+5:30)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setDelhiTime(now.toLocaleTimeString('en-GB', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Track frame counter by scroll percentage
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
        const frameNum = Math.floor(progress * (totalFrames - 1)) + 1;
        setScrollProgress(frameNum);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Keyboard shortcut Easter egg: 'c' or 'C' for shutter flash
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key.toLowerCase() === 'c') {
        playShutterSnap();
        setIsFlashing(true);
        if (onShutterTrigger) onShutterTrigger();
        setTimeout(() => setIsFlashing(false), 120);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [totalFrames, onShutterTrigger]);

  const frameStr = String(scrollProgress).padStart(3, '0');
  const maxFrameStr = String(totalFrames).padStart(3, '0');

  return (
    <>
      {/* 80ms Shutter Flash Overlay for Easter Egg 'C' */}
      {isFlashing && (
        <div className="fixed inset-0 z-[9999] bg-white pointer-events-none animate-shutter-flash transition-opacity" />
      )}

      {/* Film Grain Subtle Canvas / Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.035] film-grain-bg"
        aria-hidden="true"
      />

      {/* Magazine Registration Marks — 4 Viewport Corners */}
      <div className="fixed top-3 left-3 pointer-events-none z-30 font-mono text-[9px] text-[#555] tracking-widest hidden md:block select-none">
        ┌ 28.6139° N / 77.2090° E
      </div>
      <div className="fixed top-3 right-3 pointer-events-none z-30 font-mono text-[9px] text-[#555] tracking-widest hidden md:block select-none text-right">
        DELHI // {delhiTime} ┐
      </div>
      <div className="fixed bottom-3 left-3 pointer-events-none z-30 font-mono text-[9px] text-[#555] tracking-widest hidden md:block select-none">
        └ DCAC • CLICKS PHOTOGRAPHY SOCIETY
      </div>

      {/* Right Margin Film Frame Progress Counter */}
      <div className="fixed right-3 bottom-3 pointer-events-none z-30 flex items-center space-x-2 font-mono text-[10px] tracking-widest select-none bg-[#0a0a0a]/80 backdrop-blur-sm px-2.5 py-1 border border-[#222]">
        <span className="w-1.5 h-1.5 rounded-none bg-[#B3141B] animate-pulse" />
        <span className="text-[#888]">EXP</span>
        <span className="text-white font-bold">{frameStr}</span>
        <span className="text-[#555]">/</span>
        <span className="text-[#555]">{maxFrameStr}</span>
        <span className="text-[#555]">┘</span>
      </div>

      {/* Easter Egg Hint Bar (Bottom Center subtle micro-tag) */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-30 hidden lg:block opacity-30 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[8px] text-[#777] tracking-[0.2em] uppercase">
          PRESS [C] FOR SHUTTER SNAP • SCROLL TO EXPOSE
        </span>
      </div>
    </>
  );
};
export default GrainOverlay;
