'use client';

import { useState, useEffect } from 'react';
import { Envelope } from '@/components/open-me/envelope';
import { generateUpliftingMessage } from '@/ai/flows/generate-uplifting-message';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Prevent spamming clicks while animating
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1200); // Animation duration
      const buttonTimer = setTimeout(() => setShowButton(true), 1500);
      return () => {
        clearTimeout(timer);
        clearTimeout(buttonTimer);
      };
    }
  }, [isOpen]);

  const handleOpen = async () => {
    if (isOpen || isAnimating) return;

    setIsOpen(true);
    setIsLoading(true);

    try {
      const result = await generateUpliftingMessage({});
      setMessage(result.message);
    } catch (error) {
      console.error(error);
      setMessage("Remember to smile, you've got this!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setShowButton(false);
    setIsOpen(false);
    // A small delay to allow the close animation to start before clearing the message
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
          onClick={handleOpen}
          message={message}
          isLoading={isLoading}
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
