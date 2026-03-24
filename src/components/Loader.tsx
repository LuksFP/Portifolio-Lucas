import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [scramble, setScramble] = useState('LK');

  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const TARGET = 'LK';

  useEffect(() => {
    let iteration = 0;
    const scrambleTimer = setInterval(() => {
      setScramble(
        TARGET.split('')
          .map((c, i) => {
            if (i < iteration) return TARGET[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(''),
      );
      iteration += 0.15;
      if (iteration >= TARGET.length + 1) {
        clearInterval(scrambleTimer);
        setScramble(TARGET);
      }
    }, 40);
    return () => clearInterval(scrambleTimer);
  }, []);

  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += Math.random() * 18 + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 700);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, 60);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className={`loader${leaving ? ' loader--out' : ''}`} aria-hidden="true">
      <div className="loader-name">{scramble}</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-count">{Math.round(progress)}</div>
    </div>
  );
};

export default Loader;
