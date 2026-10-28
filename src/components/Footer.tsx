'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUp, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { SITE_META } from '@/data/clicks-data';
import { playMechanicalClick } from '@/lib/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playMechanicalClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050505] text-[#f4f1ea] pt-28 pb-12 overflow-hidden border-t border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Masthead & Return to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#222] pb-10 gap-6">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#B3141B]" />
            <span className="font-mono text-xs tracking-[0.25em] text-[#bbb] uppercase font-bold">
              CLICKS PHOTOGRAPHY SOCIETY
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 font-mono text-xs tracking-widest text-[#888] hover:text-white transition-colors"
          >
            <span>REWIND TO FRAME 001</span>
            <div className="w-8 h-8 rounded-full border border-[#333] group-hover:border-[#B3141B] flex items-center justify-center transition-all group-hover:-translate-y-1">
              <ArrowUp size={13} className="text-[#f70012]" />
            </div>
          </button>
        </div>

        {/* Central Lockup & Clear Space Arena */}
        <div className="py-20 flex flex-col items-center justify-center text-center relative">
          {/* Logo Lockup with generous clear space */}
          <div className="relative w-36 sm:w-44 aspect-square mb-8 transition-transform hover:scale-105 duration-300">
            <Image
              src="/clicks-logo.png"
              alt="CLICKS Logo Lockup"
              fill
              className="object-contain"
            />
          </div>

          {/* Giant Rising Typography */}
          <div className="w-full overflow-hidden select-none">
            <h2 className="font-display text-[20vw] leading-none text-[#181818] tracking-tighter hover:text-[#B3141B]/20 transition-colors duration-500">
              CLICKS
            </h2>
          </div>

          <div className="max-w-lg mt-[-2vw] z-10 space-y-2">
            <p className="font-editorial text-xl sm:text-2xl text-[#ccc] italic">
              &ldquo;{SITE_META.manifestoLine}&rdquo;
            </p>
            <p className="font-mono text-xs text-[#777]">
              {SITE_META.collegeName} • {SITE_META.university}
            </p>
          </div>
        </div>

        {/* Technical Directory Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-12 border-y border-[#1c1c1c] font-mono text-xs text-[#888]">
          <div className="space-y-3">
            <span className="text-[#B3141B] tracking-widest uppercase font-bold block">
              HEADQUARTERS
            </span>
            <p className="text-[#aaa] leading-relaxed">
              Delhi College of Arts &amp; Commerce<br />
              Netaji Nagar, New Delhi 110023<br />
              {SITE_META.coordinates}
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[#B3141B] tracking-widest uppercase font-bold block">
              NAVIGATE
            </span>
            <ul className="space-y-1.5 text-[#aaa]">
              <li><a href="#work" className="hover:text-white transition-colors">01 Selected Work</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">02 Manifesto</a></li>
              <li><a href="#achievements" className="hover:text-white transition-colors">03 On Record</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">04 Expeditions</a></li>
              <li><a href="#council" className="hover:text-white transition-colors">05 Council</a></li>
              <li><a href="#archive" className="hover:text-white transition-colors">06 Full Archive</a></li>
              <li><a href="#join" className="hover:text-white transition-colors">07 Join CLICKS</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#B3141B] tracking-widest uppercase font-bold block">
              TRANSMISSIONS
            </span>
            <ul className="space-y-2 text-[#aaa]">
              <li>
                <a
                  href={SITE_META.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <InstagramIcon size={14} className="text-[#B3141B]" />
                  <span>Instagram {SITE_META.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_META.contactEmail}`}
                  className="flex items-center space-x-2 hover:text-white transition-colors"
                >
                  <Mail size={14} className="text-[#B3141B]" />
                  <span className="truncate max-w-[180px]">{SITE_META.contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="text-[#B3141B] tracking-widest uppercase font-bold block">
              COLOPHON
            </span>
            <p className="text-[#777] leading-relaxed text-[11px]">
              Set in Bebas Neue, Newsreader &amp; Space Mono. Built with Next.js, Tailwind &amp; Framer Motion. Zero stock assets.
            </p>
          </div>
        </div>

        {/* Sub-Footer Copyright & Frame Counter */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[10px] text-[#555] gap-4">
          <div>
            © {new Date().getFullYear()} CLICKS DCAC. ALL RIGHTS RESERVED. FOUNDED 2011.
          </div>
          <div className="flex items-center space-x-4">
            <span>DELHI UNIVERSITY CIRCUIT</span>
            <span>•</span>
            <span className="text-[#888]">36 EXPOSURES COMPLETE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
