'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDownRight, Compass } from 'lucide-react';
import { SITE_META, PHOTO_ARCHIVE } from '@/data/clicks-data';

interface HeroProps {
  onSelectPhoto?: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectPhoto }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll Progress with High-Fidelity Physics Springs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 3D Split Character Scroll Transforms
  const letterY = useTransform(smoothProgress, [0, 1], [0, 240]);
  const letterRotateX = useTransform(smoothProgress, [0, 1], [0, 45]);
  const letterSpacing = useTransform(smoothProgress, [0, 1], ['0em', '0.18em']);
  const letterBlur = useTransform(smoothProgress, [0, 0.8], ['blur(0px)', 'blur(8px)']);
  const heroOpacity = useTransform(smoothProgress, [0, 0.75], [1, 0.05]);

  // Floating Photo Parallax Transforms
  const photoParallax1 = useTransform(smoothProgress, [0, 1], [0, -220]);
  const photoParallax2 = useTransform(smoothProgress, [0, 1], [0, -320]);
  const photoRotate1 = useTransform(smoothProgress, [0, 1], [0, 12]);
  const photoRotate2 = useTransform(smoothProgress, [0, 1], [0, -14]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fetch the real photographs for hero floating layers
  const heroPhotos = PHOTO_ARCHIVE.slice(0, 3);
  const letters = ['C', 'L', 'I', 'C', 'K', 'S'];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[115vh] w-full bg-[#080808] text-[#f4f1ea] pt-24 pb-20 overflow-hidden flex flex-col justify-between"
      style={{ perspective: 1200 }}
    >
      {/* Background Optical Rulers & Viewfinder Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex justify-between px-6 sm:px-16">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Top Editorial Journal Masthead */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#222]/80 gap-3 z-10"
      >
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#B3141B]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#999] uppercase">
              DELHI STREET PHOTOGRAPHY JOURNAL // 35MM &amp; DIGITAL RAW
            </span>
          </div>
          <span className="font-editorial text-sm sm:text-base text-[#bbb] italic mt-0.5">
            Delhi College of Arts &amp; Commerce • University of Delhi
          </span>
        </div>

        <div className="flex items-center space-x-6 font-mono text-[10px] text-[#777]">
          <span className="hidden sm:inline">COORDINATES: {SITE_META.coordinates}</span>
          <span className="text-[#444]">|</span>
          <span className="text-[#999] font-bold">ESTABLISHED {SITE_META.established}</span>
          <span className="text-[#B3141B] font-bold">FOLIO // VOL. XII</span>
        </div>
      </motion.div>

      {/* Main Hero Arena: 3D Typography + Layered Floating Photographs */}
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto py-12 flex flex-col justify-center">
        
        {/* Floating Photo 1 (Top-Right: Jama Masjid Illuminated Night) */}
        {heroPhotos[0] && (
          <motion.div
            style={{
              y: photoParallax1,
              rotate: photoRotate1,
              x: mousePos.x * 16,
            }}
            onClick={() => onSelectPhoto && onSelectPhoto(heroPhotos[0].id)}
            data-cursor="view"
            className="absolute -top-10 right-2 sm:right-10 w-48 sm:w-72 md:w-88 aspect-[16/10] bg-[#121212] border border-[#2e2e2e] p-2.5 shadow-2xl z-20 cursor-pointer group transition-all hover:border-[#B3141B] hover:shadow-[0_0_30px_rgba(179,20,27,0.3)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src={heroPhotos[0].file}
                alt={heroPhotos[0].title}
                fill
                sizes="(max-width: 768px) 192px, 352px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/85 font-mono text-[8px] text-white flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-[#f70012]" />
                <span>EXP // 01A</span>
              </div>
            </div>
            <div className="mt-1.5 flex justify-between items-center font-mono text-[8px] text-[#888]">
              <span className="truncate max-w-[180px]">{heroPhotos[0].title}</span>
              <span className="text-[#f70012] font-bold">[VIEW +]</span>
            </div>
          </motion.div>
        )}

        {/* Floating Photo 2 (Bottom-Left: Smiles of Sadar / Children portrait) */}
        {heroPhotos[1] && (
          <motion.div
            style={{
              y: photoParallax2,
              rotate: photoRotate2,
              x: mousePos.x * -14,
            }}
            onClick={() => onSelectPhoto && onSelectPhoto(heroPhotos[1].id)}
            data-cursor="view"
            className="absolute -bottom-14 left-2 sm:left-8 w-40 sm:w-60 md:w-72 aspect-[4/3] bg-[#121212] border border-[#2e2e2e] p-2.5 shadow-2xl z-20 cursor-pointer group transition-all hover:border-[#B3141B] hover:shadow-[0_0_30px_rgba(179,20,27,0.3)]"
          >
            <div className="relative w-full h-full overflow-hidden bg-black">
              <Image
                src={heroPhotos[1].file}
                alt={heroPhotos[1].title}
                fill
                sizes="(max-width: 768px) 160px, 288px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/85 font-mono text-[8px] text-white flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-[#f70012]" />
                <span>EXP // 02B</span>
              </div>
            </div>
            <div className="mt-1.5 flex justify-between items-center font-mono text-[8px] text-[#888]">
              <span className="truncate max-w-[150px]">{heroPhotos[1].title}</span>
              <span className="text-[#f70012] font-bold">[VIEW +]</span>
            </div>
          </motion.div>
        )}

        {/* Giant Split-Character Typography with 3D Scroll Physics */}
        <motion.div
          style={{
            y: letterY,
            rotateX: letterRotateX,
            filter: letterBlur,
            letterSpacing: letterSpacing,
            opacity: heroOpacity,
          }}
          className="relative z-10 flex justify-between items-center select-none py-8 sm:py-16 transform-gpu"
        >
          {letters.map((char, index) => {
            const charOffsetX = mousePos.x * (index - 2.5) * 7;
            const charOffsetY = mousePos.y * 10;

            return (
              <motion.span
                key={index}
                animate={{
                  x: charOffsetX,
                  y: charOffsetY,
                }}
                transition={{ type: 'spring', damping: 22, stiffness: 150 }}
                className="font-display text-[22vw] leading-none font-black tracking-tighter text-[#f4f1ea] hover:text-[#B3141B] transition-colors duration-200"
                style={{
                  textShadow: '0 12px 50px rgba(0,0,0,0.9)',
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </motion.div>

        {/* Floating Manifesto Anchor Label */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-25 max-w-xl mx-auto text-center mt-[-2vw] px-4"
        >
          <div className="inline-block px-3 py-1 bg-[#0e0e0e]/95 border border-[#333] mb-3 backdrop-blur-sm">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#B3141B] font-bold">
              DELHI STREET PHOTOGRAPHY COLLECTIVE
            </span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-white font-normal italic tracking-tight">
            &ldquo;{SITE_META.heroLine}&rdquo;
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#888] mt-2 tracking-wide">
            {SITE_META.manifestoLine}
          </p>
        </motion.div>
      </div>

      {/* Bottom Hero Status Rail */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 flex flex-col sm:flex-row justify-between items-center border-t border-[#222]/80 gap-4 z-10"
      >
        <div className="flex items-center space-x-3 text-xs font-mono text-[#888]">
          <Compass size={14} className="text-[#B3141B] animate-spin" style={{ animationDuration: '12s' }} />
          <span>CURATED FIELD ARCHIVE // READY TO EXPOSE</span>
        </div>

        <a
          href="#work"
          className="group flex items-center space-x-3 font-mono text-xs tracking-[0.2em] text-white hover:text-[#B3141B] transition-colors"
        >
          <span>ENTER THE DARKROOM</span>
          <div className="w-8 h-8 rounded-full border border-white/30 group-hover:border-[#B3141B] flex items-center justify-center transition-all group-hover:translate-y-1">
            <ArrowDownRight size={14} />
          </div>
        </a>

        <div className="hidden sm:flex items-center space-x-4 font-mono text-[10px] text-[#555]">
          <span>KODAK TRI-X 400</span>
          <span>•</span>
          <span>ISO 400</span>
          <span>•</span>
          <span className="text-[#999]">36 EXPOSURES COMPLETE</span>
        </div>
      </motion.div>
    </section>
  );
};
export default Hero;
