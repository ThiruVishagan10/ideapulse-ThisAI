'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        className="bg-gray-900 p-8 rounded-lg border border-cyan-500/30 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Sign In to IdeaPulse</h1>
        
        {/* Google Sign In */}
        {providers?.google && (
          <motion.button
            onClick={() => signIn('google')}
            className="w-full mb-4 px-4 py-3 bg-white text-black rounded-md font-medium hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue with Google
          </motion.button>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-900 text-gray-400">Or</span>
          </div>
        </div>

        {/* Email Sign In */}
        <form onSubmit={(e) => {
          e.preventDefault();
          signIn('email', { email });
        }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-gray-800 text-white rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none"
            required
          />
          <motion.button
            type="submit"
            className="w-full px-4 py-3 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign in with Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}