'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-cyan-900/20 flex items-center justify-center z-50">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/space-horizon-moewalls-com.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image src="/idea-pulse-logo.png" alt="IdeaPulse" width={64} height={64} className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">IDEAPULSE</h1>
        </motion.div>

        {/* Pulsing orb */}
        <motion.div
          className="w-12 h-12 bg-cyan-500/30 rounded-full mx-auto mb-4 border border-cyan-500/50"
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 20px rgba(6, 182, 212, 0.5)",
              "0 0 40px rgba(6, 182, 212, 0.8)",
              "0 0 20px rgba(6, 182, 212, 0.5)"
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
          className="text-white text-sm drop-shadow-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Igniting ideas...
        </motion.p>
      </div>
    </div>
  );
}