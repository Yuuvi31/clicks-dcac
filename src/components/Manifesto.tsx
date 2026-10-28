'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Manifesto: React.FC = () => {
  const delhiLocations = [
    'OLD DELHI',
    'NIZAMUDDIN',
    'HAUZ KHAS',
    'ITO',
    'CHANDNI CHOWK',
    'MAJNU KA TILA',
    'LODHI ART DISTRICT',
    'YAMUNA GHAT',
    'BALLIMARAN',
    'CONNAUGHT PLACE',
    'CHAWRIC BAZAAR',
    'KASHMERE GATE',
  ];

  return (
    <section id="manifesto" className="relative w-full bg-[#050505] text-[#f4f1ea] py-28 overflow-hidden border-t border-b border-[#1a1a1a]">
      {/* Delhi Marquee Ticker */}
      <div className="w-full overflow-hidden border-b border-[#1c1c1c] py-3 bg-[#0a0a0a] select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {delhiLocations.concat(delhiLocations).map((loc, idx) => (
            <div key={idx} className="flex items-center space-x-6 mx-4 font-mono text-[11px] tracking-[0.25em] text-[#666]">
              <span className="hover:text-white transition-colors">{loc}</span>
              <span className="text-[#B3141B]">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Vertical Rail: Devanagari Micro-Labels & Issue Stamping */}
          <div className="lg:col-span-3 flex lg:flex-col justify-between items-start space-y-8 font-mono text-xs text-[#666] border-l border-[#222] pl-6">
            <div className="space-y-2">
              <span className="text-[#B3141B] font-bold tracking-widest text-[10px] block">MANIFESTO // घोषणा</span>
              <p className="font-editorial text-lg text-[#ccc] italic">दृश्य • क्षण • नज़र</p>
              <p className="text-[10px] tracking-wider text-[#555]">THE ART OF NOTICING</p>
            </div>

            <div className="space-y-1 text-[11px] text-[#555] hidden sm:block">
              <div>COLLEGE: <span className="text-[#999]">DCAC</span></div>
              <div>CIRCUIT: <span className="text-[#999]">SOUTH CAMPUS</span></div>
              <div>YEAR: <span className="text-[#999]">EST. 2011</span></div>
              <div>FORMAT: <span className="text-[#999]">35MM / DIGITAL RAW</span></div>
            </div>

            <div className="p-3 bg-[#0e0e0e] border border-[#222] text-[10px] tracking-widest text-[#777]">
              DELHI IS NOT A CITY.<br />
              IT IS AN EXPOSURE LATITUDE.
            </div>
          </div>

          {/* Right Editorial Columns: Large Screenplay / Magazine Manifesto */}
          <div className="lg:col-span-9 space-y-12">
            <div className="space-y-6">
              <motion.h3
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92]"
              >
                We don’t just <br />
                <span className="text-[#B3141B] underline decoration-1 underline-offset-8">take pictures.</span><br />
                We notice.
              </motion.h3>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#1e1e1e]"
              >
                <div className="font-editorial text-xl sm:text-2xl text-[#d0cbc2] leading-relaxed italic">
                  &ldquo;A city of twenty million people is constantly erasing itself. Every dawn over the Yamuna mist carries secrets that dissolve by noon. Our mission is to capture what the crowds trample across.&rdquo;
                </div>

                <div className="space-y-4 font-sans text-sm text-[#999] leading-relaxed">
                  <p>
                    Established in 2011 at Delhi College of Arts &amp; Commerce, CLICKS is an independent photographic collective. We operate not as a commercial service, but as street cartographers of North and South campus, the medieval bastis of Nizamuddin, and the tangled sky of Chandni Chowk.
                  </p>
                  <p>
                    From high-speed silver shutter clicks at 1/2000s to slow 15-second light trails along Barakhamba, we treat every frame as an archival document of Delhi’s living soul.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Technical Camera Cross-Grid Bar */}
            <div className="p-6 bg-[#0c0c0c] border border-[#202020] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
              <div className="border-r border-[#1e1e1e] pr-4">
                <span className="text-[10px] text-[#666] block tracking-widest">DECISIVE MOMENT</span>
                <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">1/500s</span>
              </div>
              <div className="sm:border-r border-[#1e1e1e] pr-4">
                <span className="text-[10px] text-[#666] block tracking-widest">DEPTH OF FIELD</span>
                <span className="text-xl sm:text-2xl font-bold text-[#B3141B] mt-1 block">ƒ/1.4</span>
              </div>
              <div className="border-r border-[#1e1e1e] pr-4">
                <span className="text-[10px] text-[#666] block tracking-widest">STREET EXPOSURE</span>
                <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">ISO 400</span>
              </div>
              <div>
                <span className="text-[10px] text-[#666] block tracking-widest">SOCIETY ROLL</span>
                <span className="text-xl sm:text-2xl font-bold text-white mt-1 block">36 / 36</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Manifesto;
