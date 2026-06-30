import React from 'react';

interface Socials {
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
}

interface SocialsEditorProps {
  socials: Socials;
  onChange: (key: keyof Socials, value: string) => void;
}

export default function SocialsEditor({ socials, onChange }: SocialsEditorProps) {
  return (
    <div className="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm mt-6">
      <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white/30 mb-6">
        Social Accounts
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="social-github">GitHub URL</label>
          <input
            id="social-github"
            type="text"
            value={socials.github}
            onChange={(e) => onChange('github', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="social-twitter">Twitter URL</label>
          <input
            id="social-twitter"
            type="text"
            value={socials.twitter}
            onChange={(e) => onChange('twitter', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://twitter.com/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="social-linkedin">LinkedIn URL</label>
          <input
            id="social-linkedin"
            type="text"
            value={socials.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="social-email">Email Address</label>
          <input
            id="social-email"
            type="email"
            value={socials.email}
            onChange={(e) => onChange('email', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="hello@example.com"
          />
        </div>
      </div>
    </div>
  );
}
