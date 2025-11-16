'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
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

  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
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

      <div className="text-center z-10 px-6">
        {/* Hero Title */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-black tracking-widest relative z-10 drop-shadow-2xl text-white">
              IDEAPULSE
            </h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ignite ideas. Shape innovation. Build the future.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-3 bg-[#2f2f32] rounded-md text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #7f7f7f" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/auth/signin')}>
              Start Exploring →
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500/20"></div>
    </section>
  );
}