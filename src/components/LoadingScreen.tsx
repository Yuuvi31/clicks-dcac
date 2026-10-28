'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { playMechanicalClick, playShutterSnap, toggleSound } from '@/lib/sound';
import { Volume2, VolumeX, Disc } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  // Morph stages: 0=init, 1=red-square, 2=morph-aperture, 3=draw-camera, 4=morph-letters, 5=logo-lockup, 6=glide-to-nav, 7=shutter-reveal
  const [morphStage, setMorphStage] = useState<number>(0);
  const [frameTick, setFrameTick] = useState<number>(1);
  const [isFlash, setIsFlash] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isGlidingToNav, setIsGlidingToNav] = useState<boolean>(false);

  useEffect(() => {
    const isRepeat = typeof window !== 'undefined' && sessionStorage.getItem('clicks_seen_intro');
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 200);
      return;
    }

    const speed = isRepeat ? 0.5 : 1.0;

    // Stage 1: The Iconic Red Square prints
    const t1 = setTimeout(() => {
      setMorphStage(1);
      setFrameTick(5);
      playMechanicalClick();
    }, 150 * speed);

    // Stage 2: Square morphs into spinning mechanical aperture blades
    const t2 = setTimeout(() => {
      setMorphStage(2);
      setFrameTick(12);
      playMechanicalClick();
    }, 550 * speed);

    // Stage 3: Camera wireframe and tripod legs draw outward
    const t3 = setTimeout(() => {
      setMorphStage(3);
      setFrameTick(20);
    }, 950 * speed);

    // Stage 4: Letters C, L, I, C, K, S morph into lockup with chromatic bloom
    const t4 = setTimeout(() => {
      setMorphStage(4);
      setFrameTick(28);
      playMechanicalClick();
    }, 1350 * speed);

    // Stage 5: Official logo lockup coalesces into pristine high-def
    const t5 = setTimeout(() => {
      setMorphStage(5);
      setFrameTick(36);
    }, 1700 * speed);

    // Stage 6: The Signature Morph Glide to Nav & Shutter Flash
    const t6 = setTimeout(() => {
      setIsGlidingToNav(true);
      setMorphStage(6);
      setTimeout(() => {
        setIsFlash(true);
        playShutterSnap();
        setTimeout(() => setIsFlash(false), 90);
      }, 300);
    }, 2050 * speed);

    // Stage 7: Reveal completion
    const tFinal = setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('clicks_seen_intro', 'true');
      }
      onComplete();
    }, 2600 * speed);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(tFinal);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFlash(true);
    playShutterSnap();
    setTimeout(() => {
      setIsFlash(false);
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('clicks_seen_intro', 'true');
      }
      onComplete();
    }, 80);
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nowMuted = toggleSound();
    setMuted(nowMuted);
  };

  if (!isVisible) return null;

  const frameStr = String(frameTick).padStart(3, '0');

  return (
    <AnimatePresence>
      <motion.div
        key="morph-loader-arena"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          clipPath: 'circle(150% at 50% 50%)',
          transition: { duration: 0.7, ease: [0.85, 0, 0.15, 1] }
        }}
        className="fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
        onClick={handleSkip}
      >
        {/* Instant Shutter Flash */}
        {isFlash && (
          <div className="absolute inset-0 bg-white z-[100000] pointer-events-none" />
        )}

        {/* Ambient Darkroom Red Vignette Glow */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B3141B]/12 via-transparent to-transparent opacity-80" />

        {/* Top Control Rail */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center text-xs font-mono text-[#666] z-50">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 bg-[#B3141B] animate-pulse" />
            <span className="tracking-[0.25em] text-[#999] uppercase text-[10px]">
              CALIBRATING OPTICAL AXIS // {morphStage >= 5 ? 'LOCKED' : 'MORPHING'}
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <button
              onClick={handleToggleSound}
              className="flex items-center space-x-1.5 text-[#888] hover:text-white transition-colors px-2.5 py-1 border border-[#222] bg-[#0c0c0c]"
              title="Toggle Mechanical Audio"
            >
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} className="text-[#B3141B]" />}
              <span className="text-[9px] uppercase tracking-wider">{muted ? 'MUTED' : 'AUDIO ON'}</span>
            </button>
            <span className="text-[10px] text-[#555] hidden sm:inline tracking-wider">
              [ESC / CLICK TO SKIP]
            </span>
          </div>
        </div>

        {/* ============================================================
         * CENTER ARENA: THE ANIMATED LOGO MORPH SEQUENCE
         * ============================================================ */}
        <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
          {/* STAGE 1: Morphing Red Square Indicator */}
          {morphStage === 1 && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: [0, 1.4, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-8 h-7 bg-[#B3141B] shadow-[0_0_35px_rgba(179,20,27,0.8)]"
            />
          )}

          {/* STAGE 2: Red Square morphs into an 8-Blade Rotating Iris Aperture */}
          {morphStage === 2 && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-36 h-36 flex items-center justify-center"
            >
              {/* Outer aperture ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#B3141B]/70 animate-[spin_8s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-white/20" />
              
              {/* 8 Interlocking aperture blades */}
              <motion.div
                animate={{ rotate: 180, scale: [1, 1.15, 0.95] }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="relative w-20 h-20 flex items-center justify-center text-[#B3141B]"
              >
                <Disc size={64} className="opacity-90 animate-pulse" />
              </motion.div>

              <span className="absolute -bottom-6 font-mono text-[9px] text-[#B3141B] tracking-[0.3em]">
                ƒ/1.4 DIAPHRAGM
              </span>
            </motion.div>
          )}

          {/* STAGE 3: Laser Drawing of the Camera Body & Extending Tripod */}
          {morphStage === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-64 h-64 flex items-center justify-center"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#f4f1ea] fill-none">
                {/* Red square above */}
                <rect x="94" y="22" width="12" height="10" fill="#B3141B" stroke="#B3141B" />
                
                {/* Camera body outer rectangle with path drawing animation */}
                <motion.rect
                  x="40"
                  y="40"
                  width="120"
                  height="75"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                />

                {/* Inner lens circle */}
                <motion.circle
                  cx="100"
                  cy="77"
                  r="24"
                  stroke="#f70012"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />

                {/* Tripod plate and extending legs */}
                <motion.line
                  x1="60"
                  y1="115"
                  x2="140"
                  y2="115"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.line
                  x1="75"
                  y1="120"
                  x2="55"
                  y2="175"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />
                <motion.line
                  x1="100"
                  y1="120"
                  x2="100"
                  y2="180"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />
                <motion.line
                  x1="125"
                  y1="120"
                  x2="145"
                  y2="175"
                  strokeWidth="2.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                />
              </svg>
            </motion.div>
          )}

          {/* STAGE 4: Typography Morph (C, L, I, C, K, S slide & print) */}
          {morphStage === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="relative w-full max-w-[380px] aspect-square flex items-center justify-center p-6"
            >
              {/* RGB Split Chromatic Bloom overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-60 mix-blend-screen filter blur-[1px]">
                <Image
                  src="/clicks-logo.png"
                  alt="CLICKS Morph"
                  width={340}
                  height={340}
                  className="object-contain filter hue-rotate-90 scale-105"
                />
              </div>

              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/clicks-logo.png"
                  alt="CLICKS Logo Form"
                  width={340}
                  height={340}
                  priority
                  className="object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                />
              </div>

              {/* Laser crosshair scan line */}
              <motion.div
                initial={{ top: '10%' }}
                animate={{ top: '90%' }}
                transition={{ duration: 0.4, repeat: 1, repeatType: 'reverse' }}
                className="absolute left-6 right-6 h-[1.5px] bg-[#f70012] shadow-[0_0_10px_#f70012]"
              />
            </motion.div>
          )}

          {/* STAGE 5 & 6: The Full Logo Lockup & Morph Glide to Nav Position */}
          {morphStage >= 5 && (
            <motion.div
              animate={
                isGlidingToNav
                  ? {
                      scale: 0.22,
                      x: '-38vw',
                      y: '-44vh',
                      opacity: 0,
                    }
                  : {
                      scale: 1,
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }
              }
              transition={{
                duration: 0.65,
                ease: [0.85, 0, 0.15, 1],
              }}
              className="relative w-full max-w-[390px] aspect-square flex items-center justify-center p-4 z-40"
            >
              <Image
                src="/clicks-logo.png"
                alt="CLICKS — Photography Society of DCAC"
                width={380}
                height={380}
                priority
                className="object-contain filter drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]"
              />

              {/* Luminous Red Square Highlight */}
              <div className="absolute top-3 w-5 h-4 bg-[#B3141B] shadow-[0_0_25px_rgba(179,20,27,0.9)] pointer-events-none" />
            </motion.div>
          )}
        </div>

        {/* Bottom Technical Frame Metadata */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end font-mono text-xs text-[#555] z-50">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] tracking-widest text-[#999]">
              DELHI COLLEGE OF ARTS &amp; COMMERCE
            </span>
            <span className="text-[9px] text-[#444] tracking-wider">
              28.6139° N / 77.2090° E • UNIVERSITY OF DELHI
            </span>
          </div>

          {/* Film Frame Counter */}
          <div className="flex items-center space-x-3 text-right">
            <div>
              <span className="text-[9px] tracking-[0.25em] text-[#888] block">EXPOSURE</span>
              <span className="text-sm font-bold text-white tracking-widest">
                FRAME {frameStr}<span className="text-[#555]">/036</span>
              </span>
            </div>
            <div className="w-1.5 h-6 bg-[#B3141B]" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
export default LoadingScreen;
