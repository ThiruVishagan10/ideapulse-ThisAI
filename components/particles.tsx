'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

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
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [particle.x, particle.x + 50, particle.x],
            y: [particle.y, particle.y - 30, particle.y]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.id * 0.2
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`
          }}
        />
      ))}
    </>
  );
}