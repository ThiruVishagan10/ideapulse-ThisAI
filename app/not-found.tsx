'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
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
        {/* 404 Title */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl md:text-9xl font-black tracking-widest text-white drop-shadow-2xl mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Page Not Found
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          The page you&apos;re looking for has drifted into the void of space.
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
            onClick={() => router.push('/dashboard')}
          >
            Return Home →
          </motion.button>
          <motion.button
            className="px-8 py-3 border border-cyan-500/30 rounded-md text-white font-medium hover:bg-cyan-500/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
          >
            Go Back
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cyan-500/20"></div>
    </div>
  );
}