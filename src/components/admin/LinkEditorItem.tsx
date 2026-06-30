import React from 'react';

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

interface LinkEditorItemProps {
  link: LinkItem;
  idx: number;
  totalLinks: number;
  onLinkChange: <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => void;
  onMoveLink: (index: number, direction: 'up' | 'down') => void;
  onDeleteLink: (index: number) => void;
}

export default function LinkEditorItem({
  link,
  idx,
  totalLinks,
  onLinkChange,
  onMoveLink,
  onDeleteLink
}: LinkEditorItemProps) {
  return (
    <div className="p-4 bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.06] rounded-xl transition-all space-y-4">
      {/* Header bar of link panel */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/20">#{idx + 1}</span>
          <input
            type="text"
            value={link.title}
            onChange={(e) => onLinkChange(idx, 'title', e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#af413c]/50 text-sm font-bold text-white outline-none pb-0.5"
            placeholder="Link Title"
          />
        </div>
        
        {/* Sorting, Active state, and Delete buttons */}
        <div className="flex items-center gap-1.5">
          {/* Sort buttons */}
          <button
            onClick={() => onMoveLink(idx, 'up')}
            disabled={idx === 0}
            className="p-1 hover:bg-white/[0.04] rounded-lg text-white/30 hover:text-white disabled:opacity-20 transition-colors"
            title="Move Up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
          <button
            onClick={() => onMoveLink(idx, 'down')}
            disabled={idx === totalLinks - 1}
            className="p-1 hover:bg-white/[0.04] rounded-lg text-white/30 hover:text-white disabled:opacity-20 transition-colors"
            title="Move Down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          
          {/* Active toggle */}
          <button
            onClick={() => onLinkChange(idx, 'is_active', !(link.is_active ?? true))}
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
              (link.is_active ?? true)
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-white/[0.04] border-white/[0.06] text-white/30'
            }`}
          >
            {(link.is_active ?? true) ? 'Active' : 'Hidden'}
          </button>

          {/* Delete link */}
          <button
            onClick={() => onDeleteLink(idx)}
            className="p-1 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-white/30 hover:text-rose-400 rounded-lg transition-all ml-1"
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
          <label className="block text-[10px] font-bold uppercase tracking-wide text-white/20 mb-1">Description</label>
          <input
            type="text"
            value={link.description}
            onChange={(e) => onLinkChange(idx, 'description', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-xs transition-all"
            placeholder="Subtitle text"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wide text-white/20 mb-1">Destination URL</label>
          <input
            type="text"
            value={link.url}
            onChange={(e) => onLinkChange(idx, 'url', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-xs transition-all"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wide text-white/20 mb-1">Icon Category</label>
          <select
            value={link.icon}
            onChange={(e) => onLinkChange(idx, 'icon', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-xs transition-all"
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
            <label className="block text-[10px] font-bold uppercase tracking-wide text-white/20 mb-1">Accent HEX Color</label>
            <input
              type="text"
              value={link.accentColor || ''}
              onChange={(e) => onLinkChange(idx, 'accentColor', e.target.value)}
              className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-xs transition-all"
              placeholder="#6366f1"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wide text-white/20 mb-1 text-center">Featured</label>
            <div className="flex justify-center pt-2">
              <input
                type="checkbox"
                checked={link.featured}
                onChange={(e) => onLinkChange(idx, 'featured', e.target.checked)}
                className="w-4 h-4 rounded bg-white/[0.02] border-white/[0.06] accent-[#af413c] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
