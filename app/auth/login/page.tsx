'use client';

import { useState } from 'react';
import { authService } from '@/lib/auth';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlowingOrb from '@/components/GlowingOrb';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Form submitted, attempting auth...');

    try {
      if (isSignUp) {
        console.log('Calling register...');
        const data = await authService.register(email, password, name);
        console.log('Register response:', data);
        authService.setToken(data.access_token);
        window.location.href = '/dashboard';
      } else {
        console.log('Calling login...');
        const data = await authService.login(email, password);
        console.log('Login response:', data);
        authService.setToken(data.access_token);
        window.location.href = '/dashboard';
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <GlowingOrb />
      <motion.div
        className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 w-full max-w-md shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'} to IdeaPulse
        </h1>

        <motion.button
          onClick={handleGoogleAuth}
          className="w-full mb-4 px-4 py-3 bg-[#011e3e] text-white rounded-md font-medium hover:bg-gray-100 hover:text-black transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Continue with Google
        </motion.button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2  text-gray-300"></span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-3 bg-white text-black rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-white text-black rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 bg-white text-black rounded-md border border-gray-600 focus:border-cyan-500 focus:outline-none"
            required
          />
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-[#011e3e] text-white rounded-md font-medium hover:bg-cyan-700 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#6e9dda] hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}