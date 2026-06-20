import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;
      setIsPlaying(true);

      // Frequencies for C major Happy Birthday notes
      const C4 = 261.63;
      const D4 = 293.66;
      const E4 = 329.63;
      const F4 = 349.23;
      const G4 = 392.00;
      const A4 = 440.00;
      const Bb4 = 466.16;
      const C5 = 523.25;

      // [freq, duration in beats]
      const melody = [
        [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [F4, 1.0], [E4, 2.0],
        [C4, 0.75], [C4, 0.25], [D4, 1.0], [C4, 1.0], [G4, 1.0], [F4, 2.0],
        [C4, 0.75], [C4, 0.25], [C5, 1.0], [A4, 1.0], [F4, 1.0], [E4, 1.0], [D4, 2.0],
        [Bb4, 0.75], [Bb4, 0.25], [A4, 1.0], [F4, 1.0], [G4, 1.0], [F4, 2.0]
      ];

      let currentNoteIndex = 0;
      let nextNoteTime = ctx.currentTime + 0.1;

      const playNote = (freq: number, startTime: number, duration: number) => {
        if (!audioContextRef.current) return;
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        
        // Triangle wave gives a soft chiptune music-box feel
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        
        // Music box envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.08, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.95);
        
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const scheduler = () => {
        if (!audioContextRef.current) return;
        
        // Keep scheduling notes ahead
        while (nextNoteTime < audioContextRef.current.currentTime + 0.2) {
          const [freq, beats] = melody[currentNoteIndex];
          const duration = beats * 0.5; // Tempo: 120 bpm (1 beat = 0.5s)
          playNote(freq, nextNoteTime, duration);
          
          nextNoteTime += duration + 0.05; // tiny rest
          currentNoteIndex = (currentNoteIndex + 1) % melody.length;
        }
        
        timerRef.current = window.setTimeout(scheduler, 50);
      };

      scheduler();
    } catch (error) {
      console.error("Failed to initialize Web Audio API:", error);
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current) {
      if (audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      audioContextRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={togglePlay}
      className={`fixed top-4 right-4 z-50 flex items-center justify-center p-3 rounded-full border transition-all duration-300 ${
        isPlaying
          ? 'bg-purple-600/30 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200'
      } backdrop-blur-md cursor-pointer`}
      title={isPlaying ? "Mute Background Music" : "Play Birthday Music"}
      aria-label="Toggle background music"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 className="w-5 h-5 absolute" />
            <Music className="w-3 h-3 absolute -top-1 -right-1 text-rose-400 animate-bounce" />
          </>
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </div>
      <span className="sr-only">{isPlaying ? 'Mute' : 'Play'}</span>
    </button>
  );
};
