'use client';

import React, { useEffect, useState, useRef } from 'react';

export type CursorMode = 'default' | 'view' | 'drag' | 'pointer' | 'hidden';

export const CustomCursor: React.FC = () => {
  const [mode, setMode] = useState<CursorMode>('default');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check what element is hovered
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const photoElement = target.closest('[data-cursor="view"]');
      const dragElement = target.closest('[data-cursor="drag"]');
      const interactive = target.closest('a, button, [role="button"], input, select, textarea');

      if (photoElement) {
        setMode('view');
      } else if (dragElement) {
        setMode('drag');
      } else if (interactive) {
        setMode('pointer');
      } else {
        setMode('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.22);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.22);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9990] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 hidden md:block"
      style={{ willChange: 'transform' }}
    >
      {/* Default Center Dot */}
      {mode === 'default' && (
        <div className="relative flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#B3141B] rounded-none rotate-45 transform" />
          <div className="absolute w-8 h-8 rounded-full border border-white/20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse" />
        </div>
      )}

      {/* Pointer Hover Mode */}
      {mode === 'pointer' && (
        <div className="w-9 h-9 rounded-full border border-[#B3141B] bg-[#B3141B]/15 backdrop-blur-[1px] flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
          <div className="w-1.5 h-1.5 bg-white" />
        </div>
      )}

      {/* View Over Photos Mode */}
      {mode === 'view' && (
        <div className="w-16 h-16 rounded-full bg-[#080808]/90 border border-[#B3141B] text-white flex flex-col items-center justify-center shadow-2xl -translate-x-1/2 -translate-y-1/2">
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#B3141B] font-bold">VIEW</span>
          <span className="font-mono text-[7px] text-[#888] tracking-widest mt-0.5">[+]</span>
        </div>
      )}

      {/* Drag Over Film Strip Mode */}
      {mode === 'drag' && (
        <div className="px-4 py-2 rounded-full bg-[#080808]/90 border border-white/40 text-white flex items-center space-x-1.5 shadow-2xl -translate-x-1/2 -translate-y-1/2">
          <span className="w-1.5 h-1.5 bg-[#B3141B]" />
          <span className="font-mono text-[10px] tracking-widest uppercase font-bold">DRAG ↔</span>
        </div>
      )}
    </div>
  );
};
export default CustomCursor;
