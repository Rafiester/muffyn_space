import React from 'react';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

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

interface ProfileEditorProps {
  profile: Profile;
  onChange: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
}

export default function ProfileEditor({ profile, onChange }: ProfileEditorProps) {
  return (
    <div className="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
      <h2 className="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
        Profile Details
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            value={profile.name}
            onChange={(e) => onChange('name', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Alex Rivera"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="display-title">Professional Title</label>
          <input
            id="display-title"
            type="text"
            value={profile.title}
            onChange={(e) => onChange('title', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Product Designer & Engineer"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="display-bio">Short Bio</label>
          <textarea
            id="display-bio"
            value={profile.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none"
            placeholder="Brief description about yourself..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="avatar-url">Avatar Image URL</label>
          <input
            id="avatar-url"
            type="text"
            value={profile.avatar}
            onChange={(e) => onChange('avatar', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>
    </div>
  );
}
