'use client';

import React, { useState } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import SelectedWork from '@/components/SelectedWork';
import PhotoGrid from '@/components/PhotoGrid';
import Achievements from '@/components/Achievements';
import Events from '@/components/Events';
import Council from '@/components/Council';
import People from '@/components/People';
import Archive from '@/components/Archive';
import JoinClicks from '@/components/JoinClicks';
import InstagramSection from '@/components/InstagramSection';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import GrainOverlay from '@/components/GrainOverlay';
import PhotoViewer from '@/components/PhotoViewer';
import PageTransition from '@/components/PageTransition';

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const [transitionTrigger, setTransitionTrigger] = useState(false);

  const handleShutterTrigger = () => {
    setTransitionTrigger(true);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#080808] text-[#f4f1ea] overflow-x-hidden selection:bg-[#B3141B] selection:text-white">
        {/* 1. Signature Animated Morph Loading Screen */}
        {!loadingDone && (
          <LoadingScreen onComplete={() => setLoadingDone(true)} />
        )}

        {/* 2. Custom Magnetic & Interactive Cursor */}
        <CustomCursor />

        {/* 3. Analog Film Grain, Edge Rulers & Margin Counter */}
        <GrainOverlay onShutterTrigger={handleShutterTrigger} />

        {/* 4. Shutter / Iris Transition Effect */}
        <PageTransition
          isTriggered={transitionTrigger}
          onFinished={() => setTransitionTrigger(false)}
        />

        {/* 5. Navigation Bar with uncropped logo mark & live coordinates */}
        <Navigation onShutterTrigger={handleShutterTrigger} />

        {/* 6. Hero Arena with 3D Split Character Scroll transforms */}
        <Hero onSelectPhoto={(id) => setSelectedPhotoId(id)} />

        {/* 7. Manifesto with masked reveals & location marquee */}
        <Manifesto />

        {/* 8. Selected Work: Pinned 35mm film strip with sprocket holes */}
        <SelectedWork onSelectPhoto={(id) => setSelectedPhotoId(id)} />

        {/* 9. Photo Grid: 12-column editorial layout with autofocus brackets */}
        <PhotoGrid onSelectPhoto={(id) => setSelectedPhotoId(id)} />

        {/* 10. Achievements: On Record stacked documents & filling numbers */}
        <Achievements />

        {/* 11. Events: Expanding hover rows with floating preview */}
        <Events />

        {/* 12. Council: Large editorial portraits with overlapping type */}
        <Council />

        {/* 13. People: Featured photographers with darkroom wipe hover */}
        <People />

        {/* 14. Archive: Complete catalogue with animated category filter chips */}
        <Archive onSelectPhoto={(id) => setSelectedPhotoId(id)} />

        {/* 15. Join CLICKS: 36 frames counter & recruitment form */}
        <JoinClicks />

        {/* 16. Instagram Feed: Draggable carousel with inertia */}
        <InstagramSection />

        {/* 17. Footer: Rising typography, logo lockup, and colophon */}
        <Footer />

        {/* Full-Screen Accessible Photo Viewer Dialog */}
        <PhotoViewer
          photoId={selectedPhotoId}
          onClose={() => setSelectedPhotoId(null)}
          onNavigate={(newId) => setSelectedPhotoId(newId)}
        />
      </main>
    </SmoothScroll>
  );
}
