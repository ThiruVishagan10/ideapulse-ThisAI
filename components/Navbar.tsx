'use client';

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-cyan-400 text-2xl font-black tracking-wider"
            whileHover={{ textShadow: "0 0 20px #00ffff" }}
          >
            IDEAPULSE
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'Features', 'Plugins', 'Team', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="px-4 py-2 text-cyan-300 font-semibold hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.button 
              className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold hover:from-cyan-400 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px #00ffff" }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}