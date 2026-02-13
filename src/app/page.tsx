'use client';

import { useState, useEffect } from 'react';
import { Envelope } from '@/components/open-me/envelope';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    if (isAnimating) return;

    if (!isOpen) {
      setIsOpen(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200); // Open animation lock
    } else if (isOpen && !isRevealed) {
      setIsRevealed(true);
      setMessage("Remember to smile, you've got this!");
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1200); // Reveal animation lock
    }
  };

  useEffect(() => {
    if (isRevealed) {
      const buttonTimer = setTimeout(() => setShowButton(true), 1500);
      return () => clearTimeout(buttonTimer);
    }
  }, [isRevealed]);

  const handleReset = () => {
    setShowButton(false);
    setIsOpen(false);
    setIsRevealed(false);
    setTimeout(() => {
        setMessage('');
    }, 300)
  };

  return (
    <div className="bg-background min-h-screen w-full font-body overflow-hidden">
      <header className="absolute top-0 left-0 w-full p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-headline font-bold text-foreground">
          OpenMe
        </h1>
      </header>
      <main className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <Envelope
          isOpen={isOpen}
          isRevealed={isRevealed}
          onClick={handleClick}
          message={message}
        />
        <div className="mt-24 h-10">
          {showButton && !isAnimating && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="animate-in fade-in duration-500"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Another Message
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
