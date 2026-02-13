'use client';

import { useState } from 'react';
import { Envelope } from '@/components/open-me/envelope';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    if (!isOpen) {
      setIsOpen(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Flap animation lock
    } else if (isOpen && !isRevealed) {
      setIsRevealed(true);
      setMessage(
        'Halo bb, i miss u so much i lobeuuuu <3'
      );
      setMessage(
        'can u be my valentine <3 ???'
      );
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Reveal animation lock
    }
  };

  return (
    <div className="bg-background min-h-screen w-full font-body">
      <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <Envelope
          isOpen={isOpen}
          isRevealed={isRevealed}
          onClick={handleClick}
          message={message}
        />
        <div className="mt-24 h-10" />
      </main>
    </div>
  );
}
