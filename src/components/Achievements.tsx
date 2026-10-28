'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/clicks-data';

export const Achievements: React.FC = () => {
  const [hoveredProof, setHoveredProof] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="achievements"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#050505] text-[#f4f1ea] py-28 border-b border-[#1c1c1c]"
    >
      {/* Floating Proof Image Following Cursor */}
      {hoveredProof && (
        <div
          className="fixed pointer-events-none z-50 w-72 h-48 bg-[#121212] border border-[#B3141B] shadow-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{
            left: `${cursorPos.x + 160}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={hoveredProof}
              alt="Achievement Proof Document"
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/90 font-mono text-[9px] text-white">
              VERIFIED ARCHIVE RECORD
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#222] pb-6 mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
              <Trophy size={13} />
              <span>RECORD OF EXCELLENCE // INTER-COLLEGE CIRCUIT</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
              On Record
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888] text-right">
            <span>DELHI UNIVERSITY &amp; NATIONAL RECOGNITIONS</span>
            <span className="block text-[10px] text-[#555] mt-1">HOVER ROW TO INSPECT CITATION</span>
          </div>
        </div>

        {/* Stacked Documents / Sticky Desk Pile */}
        <div className="space-y-6">
          {ACHIEVEMENTS.map((item, index) => {
            const numStr = String(index + 1).padStart(2, '0');
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onMouseEnter={() => setHoveredProof(item.proofImage)}
                onMouseLeave={() => setHoveredProof(null)}
                className="group relative bg-[#0e0e0e] border border-[#222] p-6 sm:p-8 hover:border-[#B3141B] transition-all duration-300 hover:bg-[#141414] cursor-pointer"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Left: Giant Outlined Number Filling Red */}
                  <div className="flex items-baseline space-x-6">
                    <span
                      className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-transparent transition-colors duration-300 group-hover:text-[#B3141B]"
                      style={{
                        WebkitTextStroke: '1.5px #444',
                      }}
                    >
                      {numStr}
                    </span>

                    <div>
                      {/* Rank Tag */}
                      <span className="inline-block px-2.5 py-0.5 bg-[#B3141B]/20 text-[#f70012] border border-[#B3141B]/40 font-mono text-[10px] tracking-widest font-bold uppercase mb-1">
                        {item.rank}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-white group-hover:text-white transition-colors">
                        {item.competition}
                      </h3>
                      <p className="font-mono text-xs text-[#888] mt-1">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  {/* Right: Year, Photographer & Proof Preview Trigger */}
                  <div className="flex md:flex-col items-start md:items-end justify-between w-full md:w-auto border-t md:border-t-0 border-[#222] pt-4 md:pt-0 font-mono text-xs text-[#777]">
                    <div className="text-right">
                      <span className="text-white font-bold block">{item.year}</span>
                      <span className="text-[11px] text-[#aaa]">{item.winningPhotoTitle}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-[#999] group-hover:text-[#B3141B] transition-colors mt-2">
                      <span className="text-[10px] tracking-widest">INSPECT CITATION</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Story Micro-Line */}
                <div className="mt-4 pt-4 border-t border-[#1c1c1c] text-xs font-sans text-[#888] italic">
                  &ldquo;{item.story}&rdquo;
                </div>
              </motion.div>
            );
          })}

          {/* Animated Counter Finish: ∞ AND MANY MORE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="p-8 border border-dashed border-[#333] text-center flex flex-col items-center justify-center space-y-2 bg-[#0a0a0a]"
          >
            <span className="font-display text-4xl sm:text-5xl text-[#B3141B] tracking-wider">
              ∞ AND MANY MORE.
            </span>
            <p className="font-mono text-xs text-[#777] tracking-widest uppercase">
              14 YEARS OF ON-THE-SPOT WINS, CERTIFICATES &amp; FEST ARCHIVES
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Achievements;
