'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Particles from './particles';

export default function HeroSection() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = () => {
      router.push('/dashboard');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router]);

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

      <Particles />

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
          <motion.div
            className="px-8 py-3 underline rounded-md text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #7f7f7f" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => router.push('/dashboard')}>
              Press Any Key to Continue →
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500/20"></div>
    </section>
  );
}