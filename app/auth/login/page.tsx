  'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlowingOrb from '@/components/GlowingOrb';

export default function SupabaseAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Check your email for verification link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { 
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    });
    if (error) alert(error.message);
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

        <form onSubmit={handleAuth}>
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