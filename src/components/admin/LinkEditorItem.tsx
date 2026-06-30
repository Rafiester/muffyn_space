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
  onLinkChange: <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => void;
  onDeleteLink: (index: number) => void;
  isDragActive?: boolean;
}

export default function LinkEditorItem({
  link,
  idx,
  onLinkChange,
  onDeleteLink,
  isDragActive = false
}: LinkEditorItemProps) {
  return (
    <div className={`p-4 border rounded-xl transition-all space-y-4 ${
      isDragActive 
        ? 'bg-white/[0.03] border-[#af413c]/30 cursor-grab active:cursor-grabbing hover:border-[#af413c]/50'
        : 'bg-white/[0.01] border-white/[0.03] hover:border-white/[0.06]'
    }`}>
      {/* Header bar of link panel */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.04] gap-4">
        <div className="flex items-center gap-2 flex-1">
          {/* Drag handle graphic indicator only when reordering is toggled */}
          {isDragActive && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 text-[#e8736e]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
          <span className="text-[10px] font-bold text-white/20">#{idx + 1}</span>
          <input
            type="text"
            value={link.title}
            onChange={(e) => onLinkChange(idx, 'title', e.target.value)}
            className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#af413c]/50 text-sm font-bold text-white outline-none pb-0.5 flex-1 w-full"
            placeholder="Link Title"
            disabled={isDragActive}
          />
        </div>
        
        {/* Active state and Delete buttons */}
        <div className="flex items-center gap-1.5">
          {/* Active toggle */}
          <button
            onClick={() => onLinkChange(idx, 'is_active', !(link.is_active ?? true))}
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all ${
              (link.is_active ?? true)
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : 'bg-white/[0.04] border-white/[0.06] text-white/30'
            }`}
            disabled={isDragActive}
          >
            {(link.is_active ?? true) ? 'Active' : 'Hidden'}
          </button>

          {/* Delete link */}
          <button
            onClick={() => onDeleteLink(idx)}
            className="p-1 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 text-white/30 hover:text-rose-400 rounded-lg transition-all ml-1"
            title="Delete Link"
            disabled={isDragActive}
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
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Description</label>
          <input
            type="text"
            value={link.description}
            onChange={(e) => onLinkChange(idx, 'description', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Subtitle text"
            disabled={isDragActive}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Destination URL</label>
          <input
            type="text"
            value={link.url}
            onChange={(e) => onLinkChange(idx, 'url', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="https://..."
            disabled={isDragActive}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Icon Category</label>
          <select
            value={link.icon}
            onChange={(e) => onLinkChange(idx, 'icon', e.target.value)}
            className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            disabled={isDragActive}
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
            <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Accent HEX Color</label>
            <input
              type="text"
              value={link.accentColor || ''}
              onChange={(e) => onLinkChange(idx, 'accentColor', e.target.value)}
              className="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
              placeholder="#6366f1"
              disabled={isDragActive}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1 text-center">Featured</label>
            <div className="flex justify-center pt-2">
              <input
                type="checkbox"
                checked={link.featured}
                onChange={(e) => onLinkChange(idx, 'featured', e.target.checked)}
                className="w-4 h-4 rounded bg-white/[0.02] border-white/[0.06] accent-[#af413c] cursor-pointer"
                disabled={isDragActive}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
