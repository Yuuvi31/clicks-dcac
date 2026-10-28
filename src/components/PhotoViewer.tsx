'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';
import { PHOTO_ARCHIVE } from '@/data/clicks-data';
import { playMechanicalClick } from '@/lib/sound';

interface PhotoViewerProps {
  photoId: string | null;
  onClose: () => void;
  onNavigate: (newId: string) => void;
}

export const PhotoViewer: React.FC<PhotoViewerProps> = ({ photoId, onClose, onNavigate }) => {
  const currentIndex = PHOTO_ARCHIVE.findIndex((p) => p.id === photoId);
  const photo = PHOTO_ARCHIVE[currentIndex];

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      playMechanicalClick();
      onNavigate(PHOTO_ARCHIVE[currentIndex - 1].id);
    } else {
      playMechanicalClick();
      onNavigate(PHOTO_ARCHIVE[PHOTO_ARCHIVE.length - 1].id);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < PHOTO_ARCHIVE.length - 1) {
      playMechanicalClick();
      onNavigate(PHOTO_ARCHIVE[currentIndex + 1].id);
    } else {
      playMechanicalClick();
      onNavigate(PHOTO_ARCHIVE[0].id);
    }
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photoId) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photoId, onClose, handlePrev, handleNext]);

  if (!photoId || !photo) return null;

  const frameStr = String(currentIndex + 1).padStart(3, '0');
  const totalStr = String(PHOTO_ARCHIVE.length).padStart(3, '0');

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9999] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer: ${photo.title}`}
      >
        {/* Top Control Bar */}
        <div className="flex justify-between items-center w-full z-10 border-b border-[#222] pb-4">
          <div className="flex items-center space-x-3 font-mono text-xs text-[#888]">
            <span className="w-2 h-2 bg-[#B3141B]" />
            <span className="text-white font-bold tracking-widest">
              FRAME {frameStr} / {totalStr}
            </span>
            <span className="hidden sm:inline text-[#555]">|</span>
            <span className="hidden sm:inline text-[#aaa]">{photo.category.toUpperCase()}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-[10px] text-[#555] hidden md:inline">
              [← / →] TO BROWSE • [ESC] TO CLOSE
            </span>
            <button
              onClick={() => {
                playMechanicalClick();
                onClose();
              }}
              className="p-2 border border-[#333] hover:border-[#B3141B] text-white hover:text-[#B3141B] transition-colors"
              aria-label="Close photo viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Stage: Full Bleed Photo with Prev/Next Controls */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 p-3 bg-black/60 hover:bg-[#B3141B] text-white transition-colors border border-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Main Photo Frame */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="relative max-w-5xl max-h-[70vh] w-full h-full flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <Image
                src={photo.file}
                alt={photo.title}
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 p-3 bg-black/60 hover:bg-[#B3141B] text-white transition-colors border border-white/20"
            aria-label="Next photo"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom Technical Metadata & Story Drawer */}
        <div className="w-full max-w-5xl mx-auto border-t border-[#222] pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start font-mono text-xs text-[#888]">
          <div className="md:col-span-5">
            <h2 className="font-editorial text-2xl text-white italic">{photo.title}</h2>
            <div className="flex items-center space-x-2 text-[11px] text-[#aaa] mt-1">
              <MapPin size={12} className="text-[#B3141B]" />
              <span>{photo.location}</span>
              <span className="text-[#555]">({photo.coordinates})</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-1 text-[11px]">
            <div className="flex items-center space-x-2 text-white">
              <Camera size={12} className="text-[#B3141B]" />
              <span>{photo.cameraLens}</span>
            </div>
            <div className="text-[#777]">
              EXIF: {photo.shutter} • {photo.aperture} • {photo.iso}
            </div>
          </div>

          <div className="md:col-span-3 text-right">
            <span className="text-[10px] text-[#555] block">PHOTOGRAPHER</span>
            <span className="text-white font-bold">{photo.photographer}</span>
            <span className="block text-[#777] text-[10px]">{photo.photographerHandle}</span>
          </div>

          {photo.story && (
            <div className="md:col-span-12 pt-2 text-[#999] font-sans text-xs italic border-t border-[#1a1a1a]">
              &ldquo;{photo.story}&rdquo;
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
export default PhotoViewer;
