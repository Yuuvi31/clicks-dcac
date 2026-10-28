'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { EVENTS } from '@/data/clicks-data';

export const Events: React.FC = () => {
  const [activeEventId, setActiveEventId] = useState<string>(EVENTS[0]?.id || '');
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="events"
      onMouseMove={handleMouseMove}
      className="relative w-full bg-[#080808] text-[#f4f1ea] py-28 border-b border-[#1c1c1c]"
    >
      {/* Floating Photo Preview */}
      {hoveredImage && (
        <div
          className="fixed pointer-events-none z-50 w-64 h-40 bg-[#141414] border border-[#B3141B] shadow-2xl overflow-hidden -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{
            left: `${mousePos.x + 150}px`,
            top: `${mousePos.y}px`,
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={hoveredImage}
              alt="Event Cover Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#222] pb-6 mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
              <Calendar size={13} />
              <span>FIELD DISPATCHES // ANNUAL CALENDAR</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
              Expeditions
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888] text-right">
            <span>PHOTOWALKS • WORKSHOPS • EXHIBITIONS</span>
            <span className="block text-[10px] text-[#555] mt-1">CLICK ROW TO EXPAND ARCHIVE DOSSIER</span>
          </div>
        </div>

        {/* Expanding Rows */}
        <div className="divide-y divide-[#202020] border-y border-[#202020]">
          {EVENTS.map((event, index) => {
            const isOpen = activeEventId === event.id;
            const numStr = String(index + 1).padStart(2, '0');

            return (
              <div
                key={event.id}
                onMouseEnter={() => setHoveredImage(event.coverPhoto)}
                onMouseLeave={() => setHoveredImage(null)}
                className="group transition-colors duration-200"
              >
                {/* Header Row */}
                <button
                  onClick={() => setActiveEventId(isOpen ? '' : event.id)}
                  className="w-full py-8 flex flex-col md:flex-row justify-between items-start md:items-center text-left focus:outline-none gap-4"
                >
                  <div className="flex items-baseline space-x-6">
                    <span className="font-mono text-xs text-[#555] group-hover:text-[#B3141B] transition-colors">
                      [{numStr}]
                    </span>
                    <div>
                      <span className="font-mono text-[9px] tracking-widest uppercase text-[#B3141B] block mb-1">
                        {event.category.toUpperCase()}
                      </span>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-white group-hover:text-[#B3141B] transition-colors">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8 font-mono text-xs text-[#777] self-end md:self-auto">
                    <div className="flex items-center space-x-2">
                      <MapPin size={12} className="text-[#555]" />
                      <span className="text-[#aaa]">{event.location}</span>
                    </div>
                    <span className="hidden lg:inline text-[#555]">{event.date}</span>
                    <div className="w-8 h-8 rounded-full border border-[#333] group-hover:border-[#B3141B] flex items-center justify-center text-white transition-all">
                      <ArrowRight size={13} className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </button>

                {/* Expanded Dossier Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                        <div className="md:col-span-4 relative aspect-[16/10] bg-[#141414] border border-[#2a2a2a] overflow-hidden">
                          <Image
                            src={event.coverPhoto}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="md:col-span-8 space-y-4">
                          <p className="font-sans text-sm text-[#ccc] leading-relaxed">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                            <span className="px-3 py-1 bg-[#141414] border border-[#2e2e2e] text-[#f70012]">
                              {event.highlight}
                            </span>
                            <span className="text-[#777]">
                              {event.galleryCount} PHOTOGRAPHS RECORDED
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Events;
