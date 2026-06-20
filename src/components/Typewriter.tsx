import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 35,
  delay = 0,
  onComplete,
  className = '',
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');
    
    let timerId: number;
    let index = 0;

    const runTyping = () => {
      timerId = window.setInterval(() => {
        if (index < text.length) {
          // Use charAt to handle empty indexes safely
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(timerId);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    const startTimeout = window.setTimeout(runTyping, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timerId) clearInterval(timerId);
    };
  }, [text, speed, delay, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-1.5 h-4 ml-0.5 bg-purple-500 animate-pulse" />
    </span>
  );
};
