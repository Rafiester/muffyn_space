import React from 'react';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface Settings {
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
}

interface SettingsEditorProps {
  settings: Settings;
  onChange: (key: keyof Settings, value: string) => void;
}

export default function SettingsEditor({ settings, onChange }: SettingsEditorProps) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/30 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#af413c]" />
        Experience Settings & SEO
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="experience-theme">Active Experience Theme</label>
          <select
            id="experience-theme"
            value={settings.active_theme}
            onChange={(e) => onChange('active_theme', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          >
            <option value="minimalist">Minimal Light</option>
            <option value="minimalist-dark">Minimal Dark</option>
            <option value="retro">90s Retro</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="meta-title">SEO Meta Title</label>
          <input
            id="meta-title"
            type="text"
            value={settings.meta_title || ''}
            onChange={(e) => onChange('meta_title', e.target.value)}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Alex Rivera | Portfolio"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-white/25 mb-2" htmlFor="meta-description">SEO Meta Description</label>
          <textarea
            id="meta-description"
            value={settings.meta_description || ''}
            onChange={(e) => onChange('meta_description', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none"
            placeholder="Alex Rivera's links, portfolio, and newsletters..."
          />
        </div>
      </div>
    </div>
  );
}
