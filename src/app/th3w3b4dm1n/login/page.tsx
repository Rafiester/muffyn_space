'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isAuthed = localStorage.getItem('admin-session') === 'true';
    if (isAuthed) {
      router.push('/th3w3b4dm1n');
    } else {
      setTimeout(() => {
        setMounted(true);
      }, 0);
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('admin-session', 'true');
        router.push('/th3w3b4dm1n');
      } else {
        setError('Invalid username or password. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1e1d23] text-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#af413c]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#af413c]/5 blur-[100px] pointer-events-none" />

      {/* Login Box */}
      <div className="w-full max-w-md px-6 py-10 bg-[#1a1a24]/90 border border-white/[0.04] rounded-2xl shadow-2xl backdrop-blur-xl relative z-10 mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#af413c]/10 border border-[#af413c]/20 text-[#e8736e] mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Web Admin Portal</h1>
          <p className="text-sm text-white/40">Sign in to manage profile & links</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white text-sm transition-all placeholder-white/20"
              placeholder="e.g. admin"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white text-sm transition-all placeholder-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#c94a44] to-[#af413c] hover:from-[#d4534d] hover:to-[#b84842] disabled:opacity-50 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-[#af413c]/15 transition-all outline-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Note info */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-[10px] text-white/30">
          Tip: Use <code className="text-[#e8736e] bg-[#af413c]/10 px-1.5 py-0.5 rounded">admin</code> / <code className="text-[#e8736e] bg-[#af413c]/10 px-1.5 py-0.5 rounded">admin</code> for testing
        </div>
      </div>
    </div>
  );
}
