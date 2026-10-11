import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  startDelay?: number;
}

interface UseTypewriterResult {
  displayed: string;
  done: boolean;
}

export const useTypewriter = (
  text: string,
  { speed = 38, startDelay = 600 }: UseTypewriterOptions = {}
): UseTypewriterResult => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayed(text.slice(0, index));
          index++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);

  return { displayed, done };
};
