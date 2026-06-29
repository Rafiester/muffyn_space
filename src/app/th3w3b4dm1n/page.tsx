'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import profileData from '../../data/mockData.json';
import { supabase, hasSupabaseConfig } from '../../lib/supabase';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro' | 'fluent' | 'saas-modern' | 'solarized-dark';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  active_theme: Theme;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  accentColor?: string;
  is_active?: boolean;
}

interface DbLinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name?: string;
  featured?: boolean;
  accent_color?: string;
  is_active?: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Profile State
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    bio: '',
    avatar: '',
    active_theme: 'minimalist',
    socials: { github: '', twitter: '', linkedin: '', email: '' }
  });

  // Links State
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);

  // Utility to show toasts
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Authentication & Initial Load
  useEffect(() => {
    const isAuthed = localStorage.getItem('admin-session') === 'true';
    if (!isAuthed) {
      router.push('/th3w3b4dm1n/login');
      return;
    }

    async function loadCMSData() {
      if (!hasSupabaseConfig || !supabase) {
        console.log("Supabase credentials not configured. Loading editable local state.");
        const localProfile = localStorage.getItem('cms-profile');
        const localLinks = localStorage.getItem('cms-links');

        if (localProfile) {
          const parsed = JSON.parse(localProfile);
          setProfile({
            name: parsed.name || '',
            title: parsed.title || '',
            bio: parsed.bio || '',
            avatar: parsed.avatar || '',
            active_theme: parsed.active_theme || parsed.activeTheme || 'minimalist',
            socials: parsed.socials || { github: '', twitter: '', linkedin: '', email: '' }
          });
        } else {
          setProfile({
            ...profileData.profile,
            active_theme: 'minimalist',
            socials: {
              github: profileData.profile.socials.github || '',
              twitter: profileData.profile.socials.twitter || '',
              linkedin: profileData.profile.socials.linkedin || '',
              email: profileData.profile.socials.email || ''
            }
          });
        }

        if (localLinks) {
          setLinks(JSON.parse(localLinks));
        } else {
          setLinks(profileData.links.map(l => ({ ...l, is_active: true })));
        }

        setLoading(false);
        setMounted(true);
        return;
      }

      try {
        setLoading(true);
        // Load Profile from DB
        const { data: dbProfile, error: profileErr } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (profileErr) throw profileErr;

        if (dbProfile) {
          setProfileId(dbProfile.id);
          setProfile({
            name: dbProfile.display_name || '',
            title: dbProfile.title || '',
            bio: dbProfile.bio || '',
            avatar: dbProfile.avatar_url || '',
            active_theme: (dbProfile.active_theme as Theme) || 'minimalist',
            socials: dbProfile.socials || { github: '', twitter: '', linkedin: '', email: '' }
          });

          // Load Links from DB
          const { data: dbLinks, error: linksErr } = await supabase
            .from('links')
            .select('*')
            .eq('profile_id', dbProfile.id)
            .order('sort_order', { ascending: true });

          if (linksErr) throw linksErr;

          if (dbLinks) {
            setLinks(
              (dbLinks as DbLinkItem[]).map((l: DbLinkItem) => ({
                id: l.id,
                title: l.title || '',
                description: l.description || '',
                url: l.url || '',
                icon: l.icon_name || 'globe',
                featured: l.featured || false,
                accentColor: l.accent_color || undefined,
                is_active: l.is_active ?? true
              }))
            );
          }
        }
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error("Error loading CMS data from Supabase:", errMsg);
        showToast("Error loading from Supabase. Falling back to local data.", "error");
      } finally {
        setLoading(false);
        setMounted(true);
      }
    }

    loadCMSData();
  }, [router]);

  // Logout action
  const handleLogout = () => {
    localStorage.removeItem('admin-session');
    router.push('/th3w3b4dm1n/login');
  };

  // Save changes
  const handleSaveAll = async () => {
    setSaving(true);

    if (!hasSupabaseConfig || !supabase) {
      // Mock Local Saving
      localStorage.setItem('cms-profile', JSON.stringify(profile));
      localStorage.setItem('cms-links', JSON.stringify(links));
      setTimeout(() => {
        setSaving(false);
        showToast("Dashboard changes saved locally!", "success");
      }, 500);
      return;
    }

    try {
      if (!profileId) {
        throw new Error("No active profile ID to update.");
      }

      // 1. Update Profile in DB
      const { error: profileUpdateErr } = await supabase
        .from('profiles')
        .update({
          display_name: profile.name,
          title: profile.title,
          bio: profile.bio,
          avatar_url: profile.avatar,
          active_theme: profile.active_theme,
          socials: profile.socials
        })
        .eq('id', profileId);

      if (profileUpdateErr) throw profileUpdateErr;

      // 2. Update/Save Links in DB
      // We will perform a delete-and-insert refresh of the links to easily handle reordering/deletions.
      const { error: linksDeleteErr } = await supabase
        .from('links')
        .delete()
        .eq('profile_id', profileId);

      if (linksDeleteErr) throw linksDeleteErr;

      const linksToInsert = links.map((link, idx) => ({
        profile_id: profileId,
        title: link.title,
        description: link.description,
        url: link.url,
        icon_name: link.icon,
        featured: link.featured,
        accent_color: link.accentColor || null,
        is_active: link.is_active ?? true,
        sort_order: idx + 1
      }));

      if (linksToInsert.length > 0) {
        const { error: linksInsertErr } = await supabase
          .from('links')
          .insert(linksToInsert);

        if (linksInsertErr) throw linksInsertErr;
      }

      showToast("CMS values updated successfully in Supabase!", "success");
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Error saving CMS data:", errMsg);
      showToast(`Save failed: ${errMsg}`, "error");
    } finally {
      setSaving(false);
    }
  };

  // Profile Change Handlers
  const handleProfileChange = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  // Links List Operations
  const handleLinkChange = <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => {
    setLinks(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Math.random().toString(36).substring(2, 11),
      title: 'New Link',
      description: 'Link description text',
      url: 'https://',
      icon: 'globe',
      featured: false,
      accentColor: '#6366f1',
      is_active: true
    };
    setLinks(prev => [...prev, newLink]);
  };

  const deleteLink = (index: number) => {
    setLinks(prev => prev.filter((_, idx) => idx !== index));
  };

  const moveLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === links.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    setLinks(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIdx];
      updated[targetIdx] = temp;
      return updated;
    });
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#090b11] text-slate-400 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Entering Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 font-sans pb-16">
      {/* Top Banner / Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-950/80 border-rose-500/30 text-rose-400'
        }`}>
          <span className="text-sm font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Main CMS Header */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight leading-none mb-1">Muffytreen CMS</h1>
              <p className="text-[10px] text-slate-500">Live content builder dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open('/', '_blank')}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span>Preview Profile</span>
            </button>

            <button
              onClick={handleSaveAll}
              disabled={saving}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-600/10"
            >
              {saving ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span>Publish Changes</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-rose-400 text-slate-400 rounded-xl transition-all"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Profile Setup (5 Columns) */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Profile Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Display Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
                  placeholder="Alex Rivera"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Title / Profession</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => handleProfileChange('title', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
                  placeholder="Creative Technologist"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Bio / Description</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all resize-none"
                  placeholder="Brief description about yourself..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Avatar Image URL</label>
                <input
                  type="text"
                  value={profile.avatar}
                  onChange={(e) => handleProfileChange('avatar', e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">Active Experience Theme</label>
                <select
                  value={profile.active_theme}
                  onChange={(e) => handleProfileChange('active_theme', e.target.value as Theme)}
                  className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-sm transition-all"
                >
                  <option value="minimalist">Minimal Light</option>
                  <option value="minimalist-dark">Minimal Dark</option>
                  <option value="retro">90s Retro</option>
                  <option value="fluent">Fluent Glassmorphism</option>
                  <option value="saas-modern">SaaS Modern (Premium)</option>
                  <option value="solarized-dark">Solarized Dark</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Social Accounts
            </h2>

            <div className="space-y-4">
              {Object.keys(profile.socials).map((platform) => (
                <div key={platform}>
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5 capitalize">{platform}</label>
                  <input
                    type="text"
                    value={profile.socials[platform as keyof typeof profile.socials] || ''}
                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                    className="w-full px-4 py-2 bg-slate-900/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
                    placeholder={`Link to ${platform}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Side: Links Manager (7 Columns) */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950/40 border border-slate-900/60 p-6 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Manage Links ({links.length})
              </h2>
              <button
                onClick={addLink}
                className="px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Add Link</span>
              </button>
            </div>

            {links.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-850 rounded-2xl text-slate-500 text-sm">
                No links created yet. Click &quot;Add Link&quot; to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {links.map((link, idx) => (
                  <div key={link.id} className="p-4 bg-slate-900/40 border border-slate-800/80 hover:border-slate-800 rounded-2xl transition-all space-y-4">
                    {/* Header bar of link panel */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleLinkChange(idx, 'title', e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 text-sm font-bold text-white outline-none pb-0.5"
                        />
                      </div>
                      
                      {/* Sorting, Active state, and Delete buttons */}
                      <div className="flex items-center gap-1.5">
                        {/* Sort buttons */}
                        <button
                          onClick={() => moveLink(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Up"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                          </svg>
                        </button>
                        <button
                          onClick={() => moveLink(idx, 'down')}
                          disabled={idx === links.length - 1}
                          className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white disabled:opacity-20"
                          title="Move Down"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        
                        {/* Active toggle */}
                        <button
                          onClick={() => handleLinkChange(idx, 'is_active', !(link.is_active ?? true))}
                          className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
                            (link.is_active ?? true)
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : 'bg-slate-800 border-slate-700 text-slate-500'
                          }`}
                        >
                          {(link.is_active ?? true) ? 'Active' : 'Hidden'}
                        </button>

                        {/* Delete link */}
                        <button
                          onClick={() => deleteLink(idx)}
                          className="p-1 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all ml-1"
                          title="Delete Link"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Inputs panel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">Description</label>
                        <input
                          type="text"
                          value={link.description}
                          onChange={(e) => handleLinkChange(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
                          placeholder="Subtitle text"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">Destination URL</label>
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) => handleLinkChange(idx, 'url', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
                          placeholder="https://..."
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">Icon Category</label>
                        <select
                          value={link.icon}
                          onChange={(e) => handleLinkChange(idx, 'icon', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
                        >
                          <option value="globe">Globe (Website)</option>
                          <option value="youtube">YouTube</option>
                          <option value="figma">Figma</option>
                          <option value="github">GitHub</option>
                          <option value="newsletter">Newsletter/Email</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1">Accent HEX Color</label>
                          <input
                            type="text"
                            value={link.accentColor || ''}
                            onChange={(e) => handleLinkChange(idx, 'accentColor', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950/60 border border-slate-800 focus:border-indigo-500/80 rounded-xl outline-none text-white text-xs transition-all"
                            placeholder="#6366f1"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wide text-slate-500 mb-1 text-center">Featured</label>
                          <div className="flex justify-center pt-2">
                            <input
                              type="checkbox"
                              checked={link.featured}
                              onChange={(e) => handleLinkChange(idx, 'featured', e.target.checked)}
                              className="w-4 h-4 rounded bg-slate-950/60 border-slate-800 accent-indigo-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
