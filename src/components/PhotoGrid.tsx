'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Maximize2, Crosshair } from 'lucide-react';
import { PHOTO_ARCHIVE } from '@/data/clicks-data';

interface PhotoGridProps {
  onSelectPhoto: (id: string) => void;
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({ onSelectPhoto }) => {
  return (
    <section className="relative w-full bg-[#080808] text-[#f4f1ea] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Subheading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#222] pb-6 mb-16 gap-4">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#B3141B] block mb-1">
              FIELD ARCHIVE // 12-COLUMN EDITORIAL
            </span>
            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-tight">
              Curated Plates
            </h2>
          </div>
          <div className="font-mono text-xs text-[#777]">
            <span>AUTOFOCUS RETICLES ACTIVE</span>
            <span className="mx-2 text-[#444]">•</span>
            <span className="text-[#aaa]">CLICK FRAME TO EXPAND</span>
          </div>
        </div>

        {/* 12-Column Asymmetric Magazine Grid with intentional breaks & overlap */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-8 items-start">
          {/* Plate 1: Large Dominant Feature (Col 1-8) */}
          {PHOTO_ARCHIVE[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => onSelectPhoto(PHOTO_ARCHIVE[0].id)}
              data-cursor="view"
              className="md:col-span-8 group relative bg-[#101010] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={PHOTO_ARCHIVE[0].file}
                  alt={PHOTO_ARCHIVE[0].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Snapping Autofocus Reticle Brackets */}
                <div className="absolute inset-4 pointer-events-none transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <div className="w-full h-full border border-white/20 relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f70012]" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f70012]" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f70012]" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f70012]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f70012]">
                      <Crosshair size={28} className="animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 p-1.5 bg-black/80 text-white font-mono text-[9px] flex items-center space-x-1">
                  <Maximize2 size={11} />
                  <span>EXPAND</span>
                </div>
              </div>

              <div className="mt-3 flex justify-between items-baseline">
                <div>
                  <h3 className="font-editorial text-2xl text-white group-hover:text-[#B3141B] transition-colors">
                    {PHOTO_ARCHIVE[0].title}
                  </h3>
                  <p className="font-mono text-xs text-[#888]">{PHOTO_ARCHIVE[0].location}</p>
                </div>
                <div className="font-mono text-xs text-right text-[#666]">
                  <span>{PHOTO_ARCHIVE[0].shutter} • {PHOTO_ARCHIVE[0].aperture}</span>
                  <span className="block text-[10px] text-[#444]">{PHOTO_ARCHIVE[0].coordinates}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Plate 2: Editorial Annotation & Side Plate (Col 9-12) */}
          {PHOTO_ARCHIVE[1] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              onClick={() => onSelectPhoto(PHOTO_ARCHIVE[1].id)}
              data-cursor="view"
              className="md:col-span-4 group relative bg-[#101010] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors md:mt-12"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <Image
                  src={PHOTO_ARCHIVE[1].file}
                  alt={PHOTO_ARCHIVE[1].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-3 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-3">
                <span className="font-mono text-[9px] text-[#B3141B] tracking-widest block">PLATE // 02</span>
                <h3 className="font-editorial text-xl text-white group-hover:text-[#B3141B] transition-colors">
                  {PHOTO_ARCHIVE[1].title}
                </h3>
                <p className="font-mono text-[11px] text-[#777] mt-1">{PHOTO_ARCHIVE[1].location}</p>
              </div>
            </motion.div>
          )}

          {/* Plate 3: Tall Architecture Pillar (Col 1-5) */}
          {PHOTO_ARCHIVE[2] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => onSelectPhoto(PHOTO_ARCHIVE[2].id)}
              data-cursor="view"
              className="md:col-span-5 group relative bg-[#101010] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                <Image
                  src={PHOTO_ARCHIVE[2].file}
                  alt={PHOTO_ARCHIVE[2].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 41vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-3">
                <span className="font-mono text-[9px] text-[#B3141B] tracking-widest block">PLATE // 03</span>
                <h3 className="font-editorial text-xl text-white group-hover:text-[#B3141B] transition-colors">
                  {PHOTO_ARCHIVE[2].title}
                </h3>
                <p className="font-mono text-[11px] text-[#777]">{PHOTO_ARCHIVE[2].location}</p>
              </div>
            </motion.div>
          )}

          {/* Plate 4 & 5: Horizontal Diptych (Col 6-12) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PHOTO_ARCHIVE[3] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                onClick={() => onSelectPhoto(PHOTO_ARCHIVE[3].id)}
                data-cursor="view"
                className="group relative bg-[#101010] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black">
                  <Image
                    src={PHOTO_ARCHIVE[3].file}
                    alt={PHOTO_ARCHIVE[3].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-editorial text-lg text-white group-hover:text-[#B3141B] transition-colors">
                    {PHOTO_ARCHIVE[3].title}
                  </h4>
                  <p className="font-mono text-[10px] text-[#777]">{PHOTO_ARCHIVE[3].category.toUpperCase()}</p>
                </div>
              </motion.div>
            )}

            {PHOTO_ARCHIVE[4] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                onClick={() => onSelectPhoto(PHOTO_ARCHIVE[4].id)}
                data-cursor="view"
                className="group relative bg-[#101010] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black">
                  <Image
                    src={PHOTO_ARCHIVE[4].file}
                    alt={PHOTO_ARCHIVE[4].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-2">
                  <h4 className="font-editorial text-lg text-white group-hover:text-[#B3141B] transition-colors">
                    {PHOTO_ARCHIVE[4].title}
                  </h4>
                  <p className="font-mono text-[10px] text-[#777]">{PHOTO_ARCHIVE[4].category.toUpperCase()}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PhotoGrid;
