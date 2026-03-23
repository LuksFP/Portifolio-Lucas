import { useEffect } from 'react';

/** Atualiza as CSS vars --mouse-x / --mouse-y no <html> para o efeito spotlight. */
const Spotlight: React.FC = () => {
  useEffect(() => {
    const update = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', update, { passive: true });
    return () => window.removeEventListener('mousemove', update);
  }, []);

  return null;
};

export default Spotlight;
