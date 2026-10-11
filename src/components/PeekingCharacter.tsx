import React, { useEffect, useRef, useState } from 'react';

interface PeekingCharacterProps {
  className?: string;
  position?: 'top-right' | 'top-left' | 'screen-top-right' | 'screen-top-left';
}

export const PeekingCharacter: React.FC<PeekingCharacterProps> = ({
  className = '',
  position = 'top-right',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffsets, setEyeOffsets] = useState({
    left: { x: 0, y: 0 },
    right: { x: 0, y: 0 },
  });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  // Periodic natural blinking
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      const delay = Math.random() * 4000 + 2500;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 160);
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Track cursor position and compute eye angles
  useEffect(() => {
    let rafId: number;

    const handlePointerMove = (e: MouseEvent | Touch) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Eye center locations in 432x229 image:
      // Left eye: 32.18% width, 84.28% height
      // Right eye: 46.06% width, 84.28% height
      const leftEyeX = rect.left + rect.width * 0.3218;
      const leftEyeY = rect.top + rect.height * 0.8428;

      const rightEyeX = rect.left + rect.width * 0.4606;
      const rightEyeY = rect.top + rect.height * 0.8428;

      // Mouse distance & angle
      const dxL = e.clientX - leftEyeX;
      const dyL = e.clientY - leftEyeY;
      const distL = Math.sqrt(dxL * dxL + dyL * dyL);
      const angleL = Math.atan2(dyL, dxL);

      const dxR = e.clientX - rightEyeX;
      const dyR = e.clientY - rightEyeY;
      const distR = Math.sqrt(dxR * dxR + dyR * dyR);
      const angleR = Math.atan2(dyR, dxR);

      // Max eye travel in pixels relative to container width (base is 432px):
      const scale = rect.width / 432;
      const maxRadiusX = 5.2 * scale;
      const maxRadiusY = 3.6 * scale;

      // Smooth intensity based on distance (clamp at 220px)
      const factorL = Math.min(1, Math.max(0.1, distL / 220));
      const factorR = Math.min(1, Math.max(0.1, distR / 220));

      const newOffsets = {
        left: {
          x: Math.cos(angleL) * maxRadiusX * factorL,
          y: Math.sin(angleL) * maxRadiusY * factorL,
        },
        right: {
          x: Math.cos(angleR) * maxRadiusX * factorR,
          y: Math.sin(angleR) * maxRadiusY * factorR,
        },
      };

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setEyeOffsets(newOffsets);
      });
    };

    const onMouseMove = (e: MouseEvent) => handlePointerMove(e);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) handlePointerMove(e.touches[0]);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const handleClick = () => {
    setIsBlinking(true);
    setHasClicked(true);
    setTimeout(() => setIsBlinking(false), 240);
    setTimeout(() => setHasClicked(false), 2500);
  };

  // Base positioning classes: overlap hands slightly onto the card edge so there is zero gap
  let positionClass = '';
  switch (position) {
    case 'top-left':
      positionClass = 'absolute left-4 sm:left-8 md:left-12 top-0 -translate-y-[88%]';
      break;
    case 'screen-top-right':
      positionClass = 'fixed top-2 right-4 sm:right-8 z-50';
      break;
    case 'screen-top-left':
      positionClass = 'fixed top-2 left-4 sm:left-8 z-50';
      break;
    case 'top-right':
    default:
      positionClass = 'absolute right-4 sm:right-8 md:right-12 top-0 -translate-y-[88%]';
      break;
  }

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`absolute ${positionClass} w-[130px] sm:w-[180px] md:w-[220px] aspect-[432/229] z-20 pointer-events-auto cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      title="Click me!"
      aria-label="Interactive Peeking Character"
    >
      {/* Speech bubble / Tooltip on hover or click */}
      <div
        className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-white text-black font-mono text-[11px] font-medium shadow-lg border border-black/10 transition-all duration-300 pointer-events-none ${
          isHovered || hasClicked
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        {hasClicked ? '✨ Thanks for stopping by!' : '👋 I see you!'}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-black/10" />
      </div>

      {/* Layer 1: Base Character with Eye Sockets (clean transparent background, white sclera inside glasses, NO shadow) */}
      <img
        src="/peeking-character-base.png"
        alt="Peeking Character"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />

      {/* Layer 2: Moving Eyes (Pupils) - hidden during blink */}
      <div
        className={`absolute inset-0 transition-opacity duration-75 ${
          isBlinking ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Left Pupil */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '32.18%',
            top: '84.28%',
            width: '5.1%',
            height: '12%',
            transform: `translate(-50%, -50%) translate3d(${eyeOffsets.left.x}px, ${eyeOffsets.left.y}px, 0)`,
            transition: 'transform 0.04s ease-out',
          }}
        >
          <img
            src="/peeking-pupil-left.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>

        {/* Right Pupil */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '46.06%',
            top: '84.28%',
            width: '5.1%',
            height: '12%',
            transform: `translate(-50%, -50%) translate3d(${eyeOffsets.right.x}px, ${eyeOffsets.right.y}px, 0)`,
            transition: 'transform 0.04s ease-out',
          }}
        >
          <img
            src="/peeking-pupil-right.png"
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* Layer 3: Blinking closed-eye line indicator (renders when blinking) */}
      {isBlinking && (
        <div className="absolute inset-0 pointer-events-none">
          <span
            className="absolute h-[2px] bg-black rounded-full"
            style={{
              left: '30%',
              top: '84.3%',
              width: '5%',
            }}
          />
          <span
            className="absolute h-[2px] bg-black rounded-full"
            style={{
              left: '44%',
              top: '84.3%',
              width: '5%',
            }}
          />
        </div>
      )}

      {/* Layer 4: Front Overlay (Round Glasses Rims & Overlapping Hair Bangs) */}
      <img
        src="/peeking-overlay.png"
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
    </div>
  );
};
