'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { COUNCIL_MEMBERS } from '@/data/clicks-data';

export const Council: React.FC = () => {
  return (
    <section id="council" className="relative w-full bg-[#050505] text-[#f4f1ea] py-32 overflow-hidden border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#222] pb-6 mb-24 gap-6">
          <div>
            <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.25em] text-[#B3141B] uppercase mb-1">
              <Users size={13} />
              <span>LEADERSHIP DOSSIER // EXECUTIVE COUNCIL</span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl text-white uppercase tracking-tight">
              The Council
            </h2>
          </div>

          <div className="font-mono text-xs text-[#888] text-right">
            <span>DELHI COLLEGE OF ARTS &amp; COMMERCE</span>
            <span className="block text-[10px] text-[#555] mt-1">CURATORS &amp; FIELD EXPEDITION DIRECTORS</span>
          </div>
        </div>

        {/* Alternating Editorial Portrait Rows */}
        <div className="space-y-36">
          {COUNCIL_MEMBERS.map((member, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={member.id}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Large Editorial Portrait Container (Col 1-7 or 6-12) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`${
                    isEven ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-2'
                  } relative bg-[#121212] border border-[#2b2b2b] p-4 shadow-2xl group`}
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/11] w-full overflow-hidden bg-black">
                    <Image
                      src={member.portrait}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Analog Edge Registration Overlay */}
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/85 font-mono text-[9px] text-[#aaa]">
                      {member.year}
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center font-mono text-[10px] text-[#777]">
                    <span className="text-[#f70012] font-bold tracking-widest">{member.position.toUpperCase()}</span>
                    <span>{member.speciality}</span>
                  </div>
                </motion.div>

                {/* Overlapping Typography & Biography Details (Col 8-12 or 1-5) */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className={`${
                    isEven ? 'lg:col-span-5 lg:-ml-12' : 'lg:col-span-5 lg:order-1 lg:-mr-12'
                  } relative z-10 bg-[#0e0e0e]/95 backdrop-blur-md border border-[#282828] p-6 sm:p-10 shadow-2xl space-y-6`}
                >
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#B3141B] uppercase block">
                      OFFICER № 0{index + 1}
                    </span>
                    <h3 className="font-display text-4xl sm:text-5xl text-white tracking-tight uppercase leading-none mt-1">
                      {member.name}
                    </h3>
                    <p className="font-editorial text-lg text-[#ccc] italic mt-2">
                      {member.position}
                    </p>
                  </div>

                  <p className="font-sans text-sm text-[#999] leading-relaxed">
                    {member.description}
                  </p>

                  <div className="pt-4 border-t border-[#222] flex items-center justify-between font-mono text-xs">
                    <span className="text-[#666]">{member.speciality}</span>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1.5 text-white hover:text-[#B3141B] transition-colors"
                    >
                      <InstagramIcon size={13} />
                      <span>INSTAGRAM ↗</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Council;
