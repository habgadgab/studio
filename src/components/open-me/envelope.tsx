'use client';

import { cn } from '@/lib/utils';
import { Heart, MousePointerClick } from 'lucide-react';

interface EnvelopeProps {
  isOpen: boolean;
  isRevealed: boolean;
  onClick: () => void;
  message: string;
}

export function Envelope({
  isOpen,
  isRevealed,
  onClick,
  message,
}: EnvelopeProps) {
  return (
    <div
      onClick={!isRevealed ? onClick : undefined}
      className={cn(
        'group relative w-[300px] h-[200px] md:w-[450px] md:h-[300px] transition-transform duration-500 ease-out',
        !isOpen && !isRevealed && 'hover:scale-105',
        isRevealed ? 'cursor-default' : 'cursor-pointer',
        'font-headline'
      )}
      style={{ perspective: '2000px' }}
    >
      {/* Back panel */}
      <div className={cn("absolute inset-0 rounded-lg shadow-xl bg-secondary transition-opacity duration-1000", isRevealed && "opacity-30")}></div>

      {/* Letter */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[98%] bg-card rounded-lg shadow-inner mx-auto w-[96%] transition-all duration-1000 ease-in-out flex items-center justify-center p-8 text-center z-10',
          {
            'transform -translate-y-[110%]': !isOpen,
            'transform -translate-y-[60%]': isOpen && !isRevealed,
            'transform -translate-y-[110%] md:-translate-y-[120%] scale-150 md:scale-175': isRevealed,
          }
        )}
      >
        <div className={cn('absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300', isOpen && !isRevealed ? "opacity-100" : "opacity-0 pointer-events-none")}>
            <MousePointerClick className="w-12 h-12 text-muted-foreground" />
            <p className="mt-2 text-lg font-semibold text-muted-foreground">Click to read</p>
        </div>
        <div
          className={cn(
            'transition-opacity duration-500 delay-1000 text-foreground text-lg md:text-xl',
            isRevealed ? 'opacity-100' : 'opacity-0'
          )}
        >
          {message}
        </div>
      </div>

      {/* Envelope body - Front */}
      <div
        className={cn("absolute inset-0 w-full h-full bg-primary transition-opacity duration-1000", isRevealed && "opacity-30")}
        style={{
          clipPath:
            'polygon(0% 100%, 0% 45%, 50% 65%, 100% 45%, 100% 100%)',
        }}
      ></div>

      {/* Envelope flap */}
      <div
        className={cn(
            "absolute top-0 left-0 w-full h-1/2 transition-transform duration-1000 ease-in-out",
            isRevealed && "opacity-30"
        )}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'bottom',
          transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
        }}
      >
        <div
          className="absolute inset-0 bg-accent"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            backfaceVisibility: 'hidden',
          }}
        ></div>
        {/* Back of the flap */}
        <div
          className="absolute inset-0 bg-accent brightness-95"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transform: 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
          }}
        ></div>
      </div>

      {/* "Open Me" prompt */}
      {!isOpen && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Heart className="w-12 h-12 fill-current" />
          <p className="mt-2 text-lg font-semibold">Open Me</p>
        </div>
      )}
    </div>
  );
}
