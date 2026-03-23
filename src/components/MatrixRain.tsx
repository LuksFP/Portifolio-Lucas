import { useEffect, useRef } from 'react';

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

interface Props {
  className?: string;
  opacity?: number;
  color?: string;
}

const MatrixRain: React.FC<Props> = ({
  className = '',
  opacity = 0.13,
  color = '#BCFF00',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = 14;
    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(12,12,14,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = drops[i]! * fontSize;

        // Leading char is brighter white/acid
        if (Math.random() > 0.93) {
          ctx.fillStyle = '#FFFFFF';
        } else {
          ctx.fillStyle = color;
        }

        ctx.fillText(char, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]! += 0.5 + Math.random() * 0.5;
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ opacity, display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
