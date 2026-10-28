'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Camera } from 'lucide-react';
import { SITE_META } from '@/data/clicks-data';
import { playShutterSnap, playMechanicalClick } from '@/lib/sound';

export const JoinClicks: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    cameraGear: '',
    genre: 'street',
    portfolioUrl: '',
    statement: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playMechanicalClick();
    setIsSubmitting(true);

    setTimeout(() => {
      playShutterSnap();
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <section id="join" className="relative w-full bg-[#080808] text-[#f4f1ea] py-32 border-b border-[#1c1c1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Giant "36 FRAMES" Counter & Manifesto */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.3em] text-[#B3141B] uppercase">
                <Camera size={13} />
                <span>ANNUAL RECRUITMENT CALL</span>
              </div>
              <h2 className="font-display text-6xl sm:text-8xl text-white uppercase tracking-tight leading-none">
                36 Frames
              </h2>
              <p className="font-editorial text-2xl text-[#c7c2b6] italic">
                One Roll. Countless Angles. Join CLICKS DCAC.
              </p>
            </div>

            <div className="font-sans text-sm text-[#999] leading-relaxed space-y-4">
              <p>
                We do not ask for expensive DSLR lenses or studio gear. We look for the eye that stops when others walk past. Whether you shoot with a 35mm film body, a mirrorless camera, or a smartphone camera with manual exposure, the darkroom welcomes you.
              </p>
              <p>
                Selected members participate in our weekly Sunday photowalks across Old Delhi, inter-college competition contingents, and annual print showcase.
              </p>
            </div>

            <div className="p-6 bg-[#0e0e0e] border border-[#222] font-mono text-xs space-y-2 text-[#777]">
              <div>STATUS: <span className="text-[#f70012] font-bold">RECRUITMENT ACTIVE</span></div>
              <div>COLLEGE: <span className="text-white">Delhi College of Arts &amp; Commerce</span></div>
              <div>DEADLINE: <span className="text-[#ccc]">{SITE_META.applicationDeadline}</span></div>
              <div className="pt-2 text-[10px] text-[#555]">
                DIRECT FORM: <a href={SITE_META.joinFormUrl} className="text-[#B3141B] underline">GOOGLE FORM DESTINATION ↗</a>
              </div>
            </div>
          </div>

          {/* Right Column: Recruitment Form with Animated Underlines */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#242424] p-8 sm:p-12 shadow-2xl relative">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#B3141B]/15 border border-[#B3141B] flex items-center justify-center text-[#f70012]">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h3 className="font-display text-4xl text-white uppercase tracking-tight">
                    Frame Recorded // Shutter Confirmed
                  </h3>
                  <p className="font-editorial text-lg text-[#aaa] italic mt-2">
                    Your portfolio application has been logged into the CLICKS DCAC archive.
                  </p>
                </div>
                <div className="font-mono text-xs text-[#777] max-w-md mx-auto">
                  Our council will review your submission and reach out via WhatsApp/Email for the portfolio walk.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#141414] border border-[#333] hover:border-[#B3141B] font-mono text-xs text-white uppercase tracking-widest transition-colors"
                >
                  SUBMIT ANOTHER FRAME
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-[#222] pb-4 flex justify-between items-baseline font-mono text-xs">
                  <span className="text-[#B3141B] tracking-widest uppercase font-bold">
                    CANDIDATE DOSSIER
                  </span>
                  <span className="text-[#666]">SESSION 2026-27</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name field */}
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kabir Sen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@dcac.du.ac.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                      WhatsApp Contact *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                    />
                  </div>

                  {/* College Department / Year */}
                  <div className="relative group">
                    <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                      Course &amp; Year *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="B.A. Journalism / 1st Year"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                    />
                  </div>
                </div>

                {/* Genre Selector */}
                <div>
                  <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-2">
                    Primary Photographic Genre
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['street', 'portrait', 'documentary', 'experimental'].map((g) => (
                      <button
                        type="button"
                        key={g}
                        onClick={() => {
                          playMechanicalClick();
                          setFormData({ ...formData, genre: g });
                        }}
                        className={`py-2 px-3 font-mono text-xs uppercase border text-center transition-all ${
                          formData.genre === g
                            ? 'bg-[#B3141B] text-white border-[#B3141B]'
                            : 'bg-[#121212] text-[#888] border-[#242424] hover:border-[#444]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera Gear / Kit */}
                <div className="relative group">
                  <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                    Camera Equipment / Smartphone Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fujifilm X-T30 or iPhone 15 Pro or Canon 200D"
                    value={formData.cameraGear}
                    onChange={(e) => setFormData({ ...formData, cameraGear: e.target.value })}
                    className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                  />
                </div>

                {/* Portfolio URL / Drive link */}
                <div className="relative group">
                  <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                    Instagram Handle or Portfolio Drive Link *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="@handle or Google Drive folder link"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444]"
                  />
                </div>

                {/* One line statement */}
                <div className="relative group">
                  <label className="block font-mono text-[10px] text-[#777] uppercase tracking-wider mb-1">
                    What does &ldquo;Noticing&rdquo; mean to you? *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe a moment in Delhi you noticed that stayed with you..."
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#B3141B] text-white py-2 font-mono text-sm focus:outline-none transition-colors placeholder-[#444] resize-none"
                  />
                </div>

                {/* Submit button with mechanical click */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#B3141B] hover:bg-[#c91820] text-white font-mono text-xs tracking-[0.25em] uppercase font-bold transition-all flex items-center justify-center space-x-3 shadow-xl"
                >
                  <Camera size={16} />
                  <span>{isSubmitting ? 'EXPOSING FRAME...' : 'FIRE SHUTTER // SUBMIT APPLICATION'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default JoinClicks;
