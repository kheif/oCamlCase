import { useEffect, useRef } from 'react';
import './ConfettiBurst.css';

type Props = {
  origin: { x: number; y: number };
  onDone: () => void;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  size: number;
  color: string;
  shape: 'rect' | 'circle';
};

const COLORS = ['#e07024', '#2e7d32', '#2e6db4', '#c4a76a', '#8a6ac4', '#c46a6a'];
const PARTICLE_COUNT = 36;
const LIFE_MS = 900;
const GRAVITY = 1500;

export default function ConfettiBurst({ origin, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDoneRef.current();
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) {
      onDoneRef.current();
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      // Upward fan, slightly randomized around vertical
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 380 + Math.random() * 420;
      return {
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 12,
        size: 5 + Math.random() * 5,
        color: COLORS[i % COLORS.length],
        shape: Math.random() < 0.5 ? 'rect' : 'circle',
      };
    });

    let raf = 0;
    const start = performance.now();
    let last = start;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const elapsed = now - start;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const fade = 1 - Math.max(0, (elapsed - LIFE_MS * 0.6) / (LIFE_MS * 0.4));

      for (const p of particles) {
        p.vy += GRAVITY * dt;
        p.vx *= 1 - 1.6 * dt;
        p.vy *= 1 - 0.4 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, fade));
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < LIFE_MS) {
        raf = requestAnimationFrame(tick);
      } else {
        onDoneRef.current();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [origin.x, origin.y]);

  return <canvas ref={canvasRef} className="me-confetti" aria-hidden="true" />;
}
