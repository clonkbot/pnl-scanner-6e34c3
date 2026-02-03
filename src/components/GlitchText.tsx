import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
}

export function GlitchText({ text }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);

      const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?0123456789';
      let iterations = 0;

      const scramble = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (index < iterations) return text[index];
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('')
        );

        iterations += 1;

        if (iterations > text.length) {
          clearInterval(scramble);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, 30);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <span className={`glitch-text ${isGlitching ? 'glitching' : ''}`} data-text={text}>
      {displayText}
    </span>
  );
}
