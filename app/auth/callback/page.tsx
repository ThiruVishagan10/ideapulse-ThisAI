'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/auth';

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const code = searchParams.get('code');

    if (token) {
      authService.setToken(token);
      window.location.href = '/dashboard';
    } else if (code) {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://idea-pulse-backend.vercel.app';

      fetch(`${API_URL}/auth/google/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            authService.setToken(data.access_token);
            window.location.href = '/dashboard';
          } else {
            router.push('/auth/login');
          }
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          router.push('/auth/login');
        });
    } else {
      router.push('/auth/login');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p>Completing sign in...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p>Completing sign in...</p>
        </div>
      </div>
    }>
      <CallbackInner />
    </Suspense>
  );
}
