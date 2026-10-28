'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Layers, Maximize2 } from 'lucide-react';
import { PHOTO_ARCHIVE } from '@/data/clicks-data';
import { playMechanicalClick } from '@/lib/sound';

interface ArchiveProps {
  onSelectPhoto: (id: string) => void;
}

export const Archive: React.FC<ArchiveProps> = ({ onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL PLATES' },
    { id: 'street', label: 'STREET' },
    { id: 'portrait', label: 'PORTRAIT' },
    { id: 'documentary', label: 'DOCUMENTARY' },
    { id: 'architecture', label: 'ARCHITECTURE' },
    { id: 'culture', label: 'CULTURE' },
    { id: 'experimental', label: 'EXPERIMENTAL' },
  ];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'all') return PHOTO_ARCHIVE;
    return PHOTO_ARCHIVE.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="archive" className="relative w-full bg-[#050505] text-[#f4f1ea] py-28 border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#222] pb-6 mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
              <Layers size={13} />
              <span>THE REPOSITORY // COMPLETE CATALOGUE</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
              Full Archive
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888] text-right">
            <span>INDEXED NEGATIVES &amp; DIGITAL EXPOSURES</span>
            <span className="block text-[10px] text-[#555] mt-1">
              SHOWING {filteredPhotos.length} OF {PHOTO_ARCHIVE.length} PLATES
            </span>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-6 scrollbar-none mb-12 border-b border-[#1f1f1f]">
          <span className="font-mono text-[10px] text-[#555] tracking-widest mr-2 uppercase shrink-0 flex items-center space-x-1">
            <Filter size={11} />
            <span>FILTER:</span>
          </span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playMechanicalClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 font-mono text-[11px] tracking-wider transition-all uppercase shrink-0 border ${
                  isActive
                    ? 'bg-[#B3141B] text-white border-[#B3141B]'
                    : 'bg-[#0f0f0f] text-[#888] border-[#222] hover:border-[#444] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Reflowing Contact Sheet Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => {
              const frameNum = String(index + 1).padStart(3, '0');

              return (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => onSelectPhoto(photo.id)}
                  data-cursor="view"
                  className="group relative bg-[#0e0e0e] border border-[#222] p-3 cursor-pointer hover:border-[#B3141B] transition-colors"
                >
                  {/* Sprocket-style frame header */}
                  <div className="flex justify-between items-center font-mono text-[9px] text-[#666] mb-2 px-1">
                    <span className="text-[#B3141B]">FRAME {frameNum}</span>
                    <span>{photo.cameraLens.split('•')[0]}</span>
                    <Maximize2 size={11} className="group-hover:text-white transition-colors" />
                  </div>

                  {/* Frame Image with developing hover */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <Image
                      src={photo.file}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-all duration-500 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
                    />

                    {/* Viewfinder crosshairs */}
                    <div className="absolute inset-2 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Frame Caption */}
                  <div className="mt-3 px-1">
                    <h3 className="font-editorial text-xl text-white group-hover:text-[#B3141B] transition-colors leading-tight">
                      {photo.title}
                    </h3>
                    <div className="flex justify-between items-baseline font-mono text-[10px] text-[#777] mt-1">
                      <span className="truncate max-w-[180px]">{photo.location}</span>
                      <span className="text-[#555]">{photo.shutter}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
export default Archive;
