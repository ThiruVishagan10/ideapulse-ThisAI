'use client';

import { motion } from 'framer-motion';

export default function GlowingOrb() {
  return (
    <>
      <motion.div
        className="absolute w-[800px] h-[800px] bg-blue-500/30 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-[1200px] h-[1200px] bg-cyan-400/10 rounded-full blur-[150px]"
        animate={{
          scale: [1.2, 0.8, 1.2],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
}