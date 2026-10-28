'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Aperture } from 'lucide-react';
import { FEATURED_PHOTOGRAPHERS } from '@/data/clicks-data';

export const People: React.FC = () => {
  const [hoveredPhotog, setHoveredPhotog] = useState<string | null>(null);

  return (
    <section id="people" className="relative w-full bg-[#080808] text-[#f4f1ea] py-28 border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#222] pb-6 mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
              <Camera size={13} />
              <span>THE EYE BEHIND THE VIEWFINDER</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
              Featured Eyes
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888] text-right">
            <span>STREET CHRONICLERS &amp; VISUAL AUTHORS</span>
            <span className="block text-[10px] text-[#555] mt-1">HOVER CARD TO REVEAL DARKROOM WIPE</span>
          </div>
        </div>

        {/* 4 Featured Photographers Grid with Darkroom Wipe Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PHOTOGRAPHERS.map((person, index) => {
            const isHovered = hoveredPhotog === person.id;

            return (
              <div
                key={person.id}
                onMouseEnter={() => setHoveredPhotog(person.id)}
                onMouseLeave={() => setHoveredPhotog(null)}
                className="group relative h-[420px] bg-[#101010] border border-[#242424] p-6 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-[#B3141B] transition-colors"
              >
                {/* Background Photo Revealed on Hover via Wipe */}
                <div
                  className={`absolute inset-0 z-0 transition-all duration-700 ease-out ${
                    isHovered ? 'opacity-35 scale-105' : 'opacity-0 scale-100'
                  }`}
                >
                  <Image
                    src={person.portrait}
                    alt={person.name}
                    fill
                    className="object-cover filter grayscale contrast-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />
                </div>

                {/* Top Card Metadata */}
                <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#B3141B] uppercase font-bold">
                    LENS № 0{index + 1}
                  </span>
                  <div className="p-1 border border-[#333] text-[#777] group-hover:text-white group-hover:border-[#B3141B] transition-colors">
                    <Aperture size={14} />
                  </div>
                </div>

                {/* Center Quote */}
                <div className="relative z-10 my-auto py-4">
                  <p className="font-editorial text-sm sm:text-base text-[#ccc] italic leading-relaxed">
                    &ldquo;{person.quote}&rdquo;
                  </p>
                </div>

                {/* Bottom Profile Details */}
                <div className="relative z-10 pt-4 border-t border-[#222]">
                  <h3 className="font-display text-2xl text-white group-hover:text-[#B3141B] transition-colors uppercase">
                    {person.name}
                  </h3>
                  <div className="mt-2 space-y-1 font-mono text-[10px] text-[#888]">
                    <div>GENRE: <span className="text-[#ccc]">{person.favouriteGenre}</span></div>
                    <div>KIT: <span className="text-[#ccc]">{person.camera}</span></div>
                    <div>OPTIC: <span className="text-[#ccc]">{person.focalLength}</span></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default People;
