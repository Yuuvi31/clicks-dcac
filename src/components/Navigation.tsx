'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Volume2, VolumeX, Menu, X, Camera, ShieldCheck } from 'lucide-react';
import { toggleSound, isSoundMuted, playMechanicalClick, playShutterSnap } from '@/lib/sound';
import { SITE_META } from '@/data/clicks-data';

interface NavigationProps {
  onShutterTrigger?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onShutterTrigger }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    setIsMuted(isSoundMuted());
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const muted = toggleSound();
    setIsMuted(muted);
  };

  const handleLogoClick = () => {
    playMechanicalClick();
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);
    if (newCount === 5) {
      // 5th click Easter egg: darkroom shutter flash!
      playShutterSnap();
      if (onShutterTrigger) onShutterTrigger();
      setLogoClicks(0);
    }
  };

  const navLinks = [
    { label: 'SELECTED WORK', href: '#work', number: '01' },
    { label: 'MANIFESTO', href: '#manifesto', number: '02' },
    { label: 'ON RECORD', href: '#achievements', number: '03' },
    { label: 'EXPEDITIONS', href: '#events', number: '04' },
    { label: 'COUNCIL', href: '#council', number: '05' },
    { label: 'ARCHIVE', href: '#archive', number: '06' },
    { label: 'JOIN', href: '#join', number: '07' },
    { label: 'PORTAL', href: '/portal', number: '08' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#080808]/92 backdrop-blur-md border-b border-[#1c1c1c] py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Mark Top-Left with generous clear space */}
          <div className="flex items-center space-x-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogoClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative flex items-center p-2 rounded focus:outline-none focus:ring-1 focus:ring-[#B3141B]"
              title="CLICKS Photography Society (Click to scroll top)"
            >
              {/* Uncropped logo mark placed cleanly with clear space */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/clicks-logo.png"
                  alt="CLICKS Logo"
                  width={56}
                  height={56}
                  priority
                  className="object-contain"
                />
              </div>

              {/* Society Title lockup next to logo */}
              <div className="hidden sm:flex flex-col ml-1">
                <span className="font-mono text-[11px] tracking-[0.2em] font-bold text-white group-hover:text-[#B3141B] transition-colors">
                  CLICKS
                </span>
                <span className="font-mono text-[8px] tracking-[0.15em] text-[#777]">
                  DCAC • EST. 2011
                </span>
              </div>
            </a>
          </div>

          {/* Center Coordinates & Issue Stamp (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 text-[10px] font-mono text-[#666]">
            <span className="tracking-widest">
              DELHI // <span className="text-[#999]">{SITE_META.coordinates}</span>
            </span>
            <span className="text-[#333]">|</span>
            <span className="tracking-widest text-[#B3141B]">ISSUE № 14</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={playMechanicalClick}
                className="group relative font-mono text-[11px] tracking-[0.16em] text-[#a0a0a0] hover:text-white transition-colors py-1"
              >
                <span className="text-[8px] text-[#555] group-hover:text-[#B3141B] mr-1">
                  {link.number}
                </span>
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#B3141B] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Tools: Shutter Flash, Sound Toggle & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            {/* Council Portal Button */}
            <a
              href="/portal"
              className="flex items-center space-x-1.5 px-2.5 py-1.5 border border-[#2a2a2a] hover:border-[#B3141B] text-[#999] hover:text-white text-[10px] font-mono transition-colors"
              title="Council Member Dispatch Terminal"
            >
              <ShieldCheck size={12} className="text-[#B3141B]" />
              <span className="hidden sm:inline tracking-wider">PORTAL</span>
            </a>

            {/* Quick Shutter Button (Easter Egg) */}
            <button
              onClick={() => {
                playShutterSnap();
                if (onShutterTrigger) onShutterTrigger();
              }}
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 border border-[#2a2a2a] hover:border-[#B3141B] text-[#999] hover:text-white text-[10px] font-mono transition-colors"
              title="Manual Shutter Release [C]"
            >
              <Camera size={12} className="text-[#B3141B]" />
              <span className="hidden xl:inline tracking-wider">SHUTTER</span>
            </button>

            {/* Sound Toggle Button */}
            <button
              onClick={handleToggleSound}
              className="p-2 border border-[#2a2a2a] hover:border-[#B3141B] text-[#888] hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[#B3141B]" />}
            </button>

            {/* Mobile / Fullscreen Menu Button */}
            <button
              onClick={() => {
                playMechanicalClick();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-2 border border-[#2a2a2a] hover:border-white text-white transition-colors md:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Editorial Menu Overlay (Mobile & Tablet) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col justify-between p-8 pt-24 md:hidden">
          <div className="flex flex-col space-y-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#B3141B] border-b border-[#222] pb-3">
              INDEX // CLICKS DCAC MAGAZINE
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  playMechanicalClick();
                  setIsMenuOpen(false);
                }}
                className="group flex items-baseline justify-between py-2 border-b border-[#191919]"
              >
                <span className="font-display text-4xl text-white group-hover:text-[#B3141B] transition-colors tracking-wide">
                  {link.label}
                </span>
                <span className="font-mono text-xs text-[#555] group-hover:text-white">
                  [{link.number}]
                </span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-[#222] flex justify-between items-end font-mono text-[10px] text-[#666]">
            <div>
              <p className="text-white font-bold">{SITE_META.collegeName}</p>
              <p className="text-[#555]">{SITE_META.coordinates}</p>
            </div>
            <a
              href={SITE_META.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B3141B] underline tracking-widest"
            >
              INSTAGRAM ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
};
export default Navigation;
