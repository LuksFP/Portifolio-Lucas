import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let current = 0;
    const fast = setInterval(() => {
      current += Math.random() * 18 + 8;
      if (current >= 100) {
        current = 100;
        clearInterval(fast);
        setProgress(100);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 700);
        }, 300);
      }
      setProgress(Math.min(current, 100));
    }, 60);
    return () => clearInterval(fast);
  }, [onDone]);

  return (
    <div className={`loader${leaving ? ' loader--out' : ''}`} aria-hidden="true">
      <div className="loader-name">LK</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-count">{Math.round(progress)}</div>
    </div>
  );
};

export default Loader;
