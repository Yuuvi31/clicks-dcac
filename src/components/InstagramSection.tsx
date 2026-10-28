'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { INSTAGRAM_POSTS, SITE_META } from '@/data/clicks-data';

export const InstagramSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full bg-[#050505] text-[#f4f1ea] py-28 border-b border-[#1c1c1c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
            <InstagramIcon size={13} />
            <span>LIVE FEED // DIGITAL DARKROOM</span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
            @clicks.dcac
          </h2>
        </div>

        <a
          href={SITE_META.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-2 font-mono text-xs tracking-wider text-[#aaa] hover:text-white transition-colors"
        >
          <span>FOLLOW ON INSTAGRAM</span>
          <ArrowUpRight size={14} className="text-[#B3141B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Draggable Carousel with Inertia */}
      <div className="w-full relative px-4 sm:px-8" data-cursor="drag">
        <motion.div
          ref={containerRef}
          drag="x"
          dragConstraints={{ right: 0, left: -900 }}
          dragElastic={0.12}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          className="flex space-x-6 cursor-grab active:cursor-grabbing select-none"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-none w-[260px] sm:w-[320px] bg-[#101010] border border-[#222] p-3 group hover:border-[#B3141B] transition-colors"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-black">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 260px, 320px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white font-mono text-xs">
                  <div className="flex items-center space-x-1.5">
                    <Heart size={14} className="text-[#f70012] fill-[#f70012]" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[#aaa]">
                    <InstagramIcon size={14} />
                    <span>VIEW ↗</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 px-1">
                <div className="flex justify-between items-center font-mono text-[9px] text-[#666]">
                  <span>{post.date}</span>
                  <span className="text-[#f70012]">#clicksdcac</span>
                </div>
                <p className="font-sans text-xs text-[#bbb] mt-1.5 line-clamp-2 leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>

      <div className="text-center font-mono text-[10px] text-[#555] tracking-widest mt-8 uppercase">
        ← DRAG HORIZONTALLY TO EXPLORE LIVE RECENT SHOTS →
      </div>
    </section>
  );
};
export default InstagramSection;
