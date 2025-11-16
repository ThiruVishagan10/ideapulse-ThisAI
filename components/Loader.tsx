'use client';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        {/* Navy glowing orb */}
        <motion.div
          className="w-16 h-16 bg-blue-900 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 20px #1e3a8a",
              "0 0 40px #1e3a8a, 0 0 60px #1e3a8a",
              "0 0 20px #1e3a8a"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Loading text */}
        <motion.p
          className="text-white text-sm mt-4 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}