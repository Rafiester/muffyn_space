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
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2">Avatar Profile Image</label>
          <div className="flex items-center gap-4">
            {/* Avatar Preview */}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white/20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              )}
            </div>

            {/* Upload actions and description */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <label className="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 h-10">
                  <span>Upload Profile Avatar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Check size limit: 200KB
                      if (file.size > 204800) {
                        alert("File is too large! Maximum allowed size is 200KB.");
                        return;
                      }

                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          onChange('avatar', reader.result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>

                {profile.avatar && (
                  <button
                    type="button"
                    onClick={() => onChange('avatar', '')}
                    className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-all h-10"
                  >
                    Remove Image
                  </button>
                )}
              </div>
              <span className="text-[10px] text-white/20 block">
                Max size: 200KB. Square ratio (PNG/JPG/SVG) recommended. Only file uploads accepted.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
