'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
  message: string;
  isLoading: boolean;
}

export function Envelope({
  isOpen,
  onClick,
  message,
  isLoading,
}: EnvelopeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative w-[300px] h-[200px] md:w-[450px] md:h-[300px] cursor-pointer transition-transform duration-500 ease-out',
        !isOpen && 'hover:scale-105',
        'font-headline'
      )}
      style={{ perspective: '2000px' }}
    >
      {/* Back panel */}
      <div className="absolute inset-0 rounded-lg shadow-xl bg-secondary"></div>

      {/* Letter */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-[98%] bg-card rounded-lg shadow-inner mx-auto w-[96%] transition-transform duration-700 ease-out flex items-center justify-center p-8 text-center',
          isOpen ? 'translate-y-0' : '-translate-y-[110%]'
        )}
      >
        <div
          className={cn(
            'transition-opacity duration-500 text-foreground text-lg md:text-xl',
            isLoading || !isOpen ? 'opacity-0' : 'opacity-100 delay-700'
          )}
        >
          {message}
        </div>
        {isLoading && (
          <div className="absolute space-y-3 w-4/5">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-4/5 mx-auto bg-muted rounded animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Envelope body - Front */}
      <div
        className="absolute inset-0 w-full h-full bg-primary"
        style={{
          clipPath:
            'polygon(0% 100%, 0% 45%, 50% 65%, 100% 45%, 100% 100%)',
        }}
      ></div>

      {/* Envelope flap */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 transition-transform duration-700 ease-in-out"
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
