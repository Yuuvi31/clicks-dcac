'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Film } from 'lucide-react';
import { PHOTO_ARCHIVE } from '@/data/clicks-data';

interface SelectedWorkProps {
  onSelectPhoto: (id: string) => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectPhoto }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featuredWorks = PHOTO_ARCHIVE.filter((p) => p.featuredInSelectedWork);

  return (
    <section id="work" className="relative w-full bg-[#080808] text-[#f4f1ea] py-24 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-2">
            <Film size={13} />
            <span>EXPOSURE STRIP // CONTACT SHEET</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white tracking-tight uppercase leading-none">
            Selected Work
          </h2>
        </div>

        <div className="flex items-center space-x-6 font-mono text-xs text-[#888]">
          <span className="hidden sm:inline">HORIZONTAL FILM STRIP</span>
          <span className="text-[#B3141B]">✦</span>
          <span>DRAG OR SCROLL TO DEVELOP FRAMES</span>
        </div>
      </div>

      {/* Pinned / Scrollable 35mm Film Strip with Sprocket Holes */}
      <div className="relative w-full bg-[#0e0e0e] border-y border-[#262626] py-6 shadow-2xl">
        {/* Top Sprocket Rail */}
        <div className="w-full flex items-center justify-between px-4 pb-4 overflow-hidden border-b border-[#1c1c1c] opacity-80">
          <div className="flex space-x-6">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-6 rounded-sm bg-[#050505] border border-[#2b2b2b] shrink-0"
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#555] shrink-0 hidden md:block">
            KODAK SAFETY FILM 5063 • TRI-X PAN 400
          </span>
        </div>

        {/* Horizontal Scroll Arena */}
        <div
          ref={scrollRef}
          data-cursor="drag"
          className="flex space-x-8 px-6 sm:px-12 py-8 overflow-x-auto scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredWorks.map((photo, index) => {
            const frameNum = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => onSelectPhoto(photo.id)}
                data-cursor="view"
                className="group relative flex-none w-[290px] sm:w-[380px] md:w-[440px] bg-[#121212] border border-[#242424] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
              >
                {/* Frame Metadata Header */}
                <div className="flex justify-between items-center font-mono text-[9px] text-[#777] mb-2 px-1">
                  <span className="tracking-widest text-[#B3141B]">FRAME {frameNum}A</span>
                  <span>{photo.shutter} • {photo.aperture}</span>
                  <span className="text-white group-hover:text-[#B3141B] transition-colors">
                    <ArrowUpRight size={12} />
                  </span>
                </div>

                {/* Developing Film Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <Image
                    src={photo.file}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 290px, 440px"
                    className="object-cover transition-all duration-700 filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105"
                  />

                  {/* Corner Reticle Brackets (Camera Viewfinder effect) */}
                  <div className="absolute inset-0 pointer-events-none p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-full border border-[#f70012]/60 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-[#f70012]/80" />
                    </div>
                  </div>

                  {/* Developing Bath Badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/85 backdrop-blur-sm font-mono text-[8px] text-[#aaa]">
                    {photo.category.toUpperCase()}
                  </div>
                </div>

                {/* Frame Footer Caption */}
                <div className="mt-3 px-1">
                  <h3 className="font-editorial text-lg text-white group-hover:text-[#B3141B] transition-colors leading-tight">
                    {photo.title}
                  </h3>
                  <div className="flex justify-between items-center font-mono text-[10px] text-[#888] mt-1">
                    <span className="truncate max-w-[200px]">{photo.location}</span>
                    <span className="text-[#555]">{photo.timeDate.split(',')[0]}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Sprocket Rail */}
        <div className="w-full flex items-center justify-between px-4 pt-4 overflow-hidden border-t border-[#1c1c1c] opacity-80">
          <div className="flex space-x-6">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-6 rounded-sm bg-[#050505] border border-[#2b2b2b] shrink-0"
              />
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-[#555] shrink-0 hidden md:block">
            CLICKS SOCIETY ARCHIVE // SOUTH CAMPUS
          </span>
        </div>
      </div>
    </section>
  );
};
export default SelectedWork;
