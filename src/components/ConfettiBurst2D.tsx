import React from 'react';
import { motion } from 'motion/react';

interface ConfettiBurst2DProps {
  active: boolean;
}

const PARTICLES = [
  { x: -110, y: -85, rotate: -35, color: '#22C55E', shape: 'circle' },
  { x: -75, y: -120, rotate: 20, color: '#FACC15', shape: 'rect' },
  { x: -30, y: -135, rotate: 45, color: '#38BDF8', shape: 'circle' },
  { x: 25, y: -130, rotate: -25, color: '#F97316', shape: 'rect' },
  { x: 75, y: -115, rotate: 35, color: '#22C55E', shape: 'rect' },
  { x: 115, y: -80, rotate: -40, color: '#EC4899', shape: 'circle' },
  { x: -95, y: -35, rotate: 60, color: '#F59E0B', shape: 'rect' },
  { x: 95, y: -35, rotate: -60, color: '#10B981', shape: 'circle' },
];

export const ConfettiBurst2D: React.FC<ConfettiBurst2DProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-20"
      aria-hidden="true"
    >
      {PARTICLES.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y,
            scale: [0.5, 1.25, 0.9],
            rotate: p.rotate,
          }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="absolute"
          style={{
            width: p.shape === 'circle' ? 14 : 16,
            height: p.shape === 'circle' ? 14 : 10,
            borderRadius: p.shape === 'circle' ? 999 : 3,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
};
