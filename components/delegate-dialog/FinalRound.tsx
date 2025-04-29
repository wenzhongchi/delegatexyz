'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const FinalRound = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    myConfetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="relative py-12 px-6 text-center mt-6">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="relative z-10">
        <h1 className="text-3xl font-semibold mb-4">🎉 You're all set!</h1>
        <p className="text-muted-foreground mb-8">Your delegation has been successfully created.</p>
      </div>
    </div>
  );
};
