'use client';

import React, { useState, useEffect } from 'react';
import profileData from '../data/mockData.json';
import ThemeToggle from '../components/ThemeToggle';
import LinkCard, { LinkItem } from '../components/LinkCard';
import { supabase, hasSupabaseConfig } from '../lib/supabase';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: Record<string, string>;
}

interface DbLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  featured?: boolean;
  accent_color?: string;
  accentColor?: string;
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>('minimalist');
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize data and theme on mount
  useEffect(() => {
    const allowedThemes: Theme[] = ['minimalist', 'minimalist-dark', 'retro'];

    async function loadData() {
      if (!hasSupabaseConfig || !supabase) {
        console.log("Supabase credentials not configured. Using local/localStorage mock data.");
        const localProfile = localStorage.getItem('cms-profile');
        const localLinks = localStorage.getItem('cms-links');
        
        const loadedProfile = localProfile ? JSON.parse(localProfile) : profileData.profile;
        setProfile(loadedProfile);
        setLinks(localLinks ? JSON.parse(localLinks) : profileData.links);
        
        const activeTheme = loadedProfile.active_theme || loadedProfile.activeTheme;
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        const initialTheme = (savedTheme && allowedThemes.includes(savedTheme))
          ? savedTheme
          : (activeTheme && allowedThemes.includes(activeTheme))
            ? activeTheme
            : 'minimalist';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
        
        setLoading(false);
        setMounted(true);
        return;
      }

      try {
        setLoading(true);
        // 1. Fetch the active profile (first row in profiles table)
        const { data: profileDataDb, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileError) throw profileError;

        if (profileDataDb) {
          // Map database columns: id, display_name, bio, avatar_url, active_theme, title, socials
          const mappedProfile: Profile = {
            name: profileDataDb.display_name,
            title: profileDataDb.title || 'Creative Technologist',
            bio: profileDataDb.bio,
            avatar: profileDataDb.avatar_url,
            socials: profileDataDb.socials || profileData.profile.socials,
          };
          setProfile(mappedProfile);

          // Apply active theme
          const activeTheme = profileDataDb.active_theme as Theme;
          let targetTheme: Theme = 'minimalist';
          const savedTheme = localStorage.getItem('user-theme') as Theme;
          
          if (savedTheme && allowedThemes.includes(savedTheme)) {
            targetTheme = savedTheme;
          } else if (activeTheme && allowedThemes.includes(activeTheme)) {
            targetTheme = activeTheme;
          }
          
          setTheme(targetTheme);
          document.documentElement.setAttribute('data-theme', targetTheme);

          // 2. Fetch active links for the profile
          const { data: linksDataDb, error: linksError } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', profileDataDb.id)
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

          if (linksError) throw linksError;

          if (linksDataDb) {
            const mappedLinks = (linksDataDb as DbLink[]).map((link: DbLink) => ({
              id: link.id,
              title: link.title,
              description: link.description || '',
              url: link.url,
              icon: link.icon_name,
              featured: link.featured || false,
              accentColor: link.accent_color || link.accentColor || undefined
            }));
            setLinks(mappedLinks);
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("Error loading data from Supabase:", errMsg);
        setError(errMsg);
        // Fallback on database failure
        setProfile(profileData.profile);
        setLinks(profileData.links);
        
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        const initialTheme = (savedTheme && allowedThemes.includes(savedTheme)) ? savedTheme : 'minimalist';
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    loadData();
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('user-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">Loading Experience...</p>
      </div>
    );
  }

  const isRetro = theme === 'retro';

  return (
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300 ${isRetro ? 'retro-grid' : ''}`}>
      {/* Top Floating Theme Switcher & Status Indicator */}
      <header className="w-full max-w-xl px-4 flex justify-between items-center mb-8 relative z-50">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${hasSupabaseConfig && !error ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className={`text-[9px] uppercase font-bold tracking-wider select-none ${isRetro ? 'font-mono text-black font-black bg-white px-2 py-0.5 border-[2px] border-black' : 'text-[var(--text-body)] opacity-70'}`}>
            {hasSupabaseConfig && !error ? 'Supabase Live' : 'Mock CMS Mode'}
          </span>
        </div>
        <ThemeToggle currentTheme={theme} onThemeChange={handleThemeChange} />
      </header>

      {/* Main Link-in-Bio Container */}
      <main className="w-full max-w-xl px-4 flex-1 flex flex-col items-center">
        {/* Profile Card Header */}
        <section 
          className={`
            w-full flex flex-col items-center text-center p-6 md:p-8 mb-8 theme-card
            ${isRetro 
              ? 'bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none' 
              : ''
            }
          `}
        >
          {/* Avatar Container */}
          <div className="relative group mb-5">
            {/* Avatar Glow Ring for Minimalist / Modern Themes */}
            {!isRetro && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
            )}
            {/* Avatar Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile?.avatar}
              alt={`${profile?.name}'s Avatar`}
              className={`
                w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105
                ${isRetro 
                  ? 'border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200' 
                  : 'border-2 border-white dark:border-slate-800 rounded-full shadow-inner'
                }
              `}
            />
          </div>

          {/* Profile Name & Title */}
          <h1 
            className={`
              text-2xl md:text-3xl leading-tight mb-2
              ${isRetro ? 'font-mono font-black uppercase text-black' : 'font-sans text-[var(--text-title)] tracking-tight'}
            `}
          >
            {profile?.name}
          </h1>
          <p 
            className={`
              text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block
              ${isRetro 
                ? 'bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black' 
                : 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 dark:bg-indigo-500/15 rounded-full font-sans'
              }
            `}
          >
            {profile?.title}
          </p>

          {/* Bio */}
          <p 
            className={`
              text-sm leading-relaxed max-w-sm mb-6
              ${isRetro ? 'font-mono text-black font-semibold' : 'font-sans text-[var(--text-body)]'}
            `}
          >
            {profile?.bio}
          </p>

          {/* Social Icons Row */}
          <div className="flex gap-4 items-center justify-center">
            {profile?.socials && Object.entries(profile.socials).map(([platform, url]) => {
              const props = { className: "w-5 h-5", strokeWidth: 2, fill: "none", stroke: "currentColor" };
              let icon: React.ReactNode;
              if (platform === 'github') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  </svg>
                );
              } else if (platform === 'twitter') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                );
              } else if (platform === 'linkedin') {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                );
              } else {
                icon = (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                );
              }

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile?.name}'s ${platform}`}
                  className={`
                    p-2.5 transition-all duration-300
                    ${isRetro 
                      ? 'bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110'
                    }
                  `}
                >
                  {icon}
                </a>
              );
            })}
          </div>
        </section>

        {/* Dynamic Link List */}
        <section className="w-full flex flex-col gap-4 mb-12">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} theme={theme} />
          ))}
        </section>
      </main>

      {/* Footer Details */}
      <footer className="text-center mt-auto px-4 z-10 relative">
        <p 
          className={`
            text-[11px] uppercase tracking-widest opacity-60
            ${isRetro ? 'font-mono text-black font-bold' : 'font-sans text-[var(--text-body)]'}
          `}
        >
          &copy; {new Date().getFullYear()} {profile?.name} &bull; Supabase CMS Integration
        </p>
      </footer>
    </div>
  );
}
