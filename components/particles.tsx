'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  duration: number;
  left: number;
  top: number;
}

export default function Particles() {
  const particles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      x: (i * 37) % 200 - 100,
      y: (i * 23) % 200 - 100,
      duration: 4 + (i % 4),
      left: (i * 7) % 100,
      top: (i * 11) % 100
    })), []
  );

  return (
    <>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>
      {/* Animated particles */}
      {particles.map((particle: Particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: particle.left + '%',
            top: particle.top + '%'
          }}
        />
      ))}
    </>
  );
}