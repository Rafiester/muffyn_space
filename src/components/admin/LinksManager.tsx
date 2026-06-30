import React, { useState } from 'react';
import LinkEditorItem from './LinkEditorItem';

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

interface LinksManagerProps {
  links: LinkItem[];
  onAddLink: () => void;
  onLinkChange: <K extends keyof LinkItem>(index: number, key: K, value: LinkItem[K]) => void;
  onDeleteLink: (index: number) => void;
  onReorderAll?: (reorderedLinks: LinkItem[]) => void;
  onSaveAll?: () => Promise<void>;
  saving?: boolean;
}

export default function LinksManager({
  links,
  onAddLink,
  onLinkChange,
  onDeleteLink,
  onReorderAll,
  onSaveAll,
  saving = false
}: LinksManagerProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);
  const [hasReordered, setHasReordered] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (!isDragActive) {
      e.preventDefault();
      return;
    }
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!isDragActive || draggedIdx === null || draggedIdx === index) return;
    setDragOverIdx(index);
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!isDragActive || draggedIdx === null || draggedIdx === targetIndex) {
      cleanupDrag();
      return;
    }

    const reordered = [...links];
    const [draggedItem] = reordered.splice(draggedIdx, 1);
    reordered.splice(targetIndex, 0, draggedItem);

    if (onReorderAll) {
      onReorderAll(reordered);
      setHasReordered(true);
    }
    cleanupDrag();
  };

  const cleanupDrag = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleSaveClick = async () => {
    if (onSaveAll) {
      await onSaveAll();
      setHasReordered(false);
    }
  };

  return (
    <div className="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-white/30 flex items-center gap-2">
          Manage Links ({links.length})
        </h2>
        <button
          onClick={onAddLink}
          className="px-3 py-1.5 bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 hover:border-[#af413c]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Link</span>
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-white/[0.04] rounded-xl text-white/20 text-xs">
          No links created yet. Click &quot;Add Link&quot; to get started!
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link, idx) => {
            const isDragging = draggedIdx === idx;
            const isDragOver = dragOverIdx === idx;

            return (
              <div
                key={link.id}
                draggable={isDragActive}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={cleanupDrag}
                className={`transition-all duration-200 ${
                  isDragging ? 'opacity-30 scale-[0.98]' : 'opacity-100'
                } ${
                  isDragOver ? 'border-t-2 border-[#af413c]/60 pt-4' : ''
                }`}
              >
                <LinkEditorItem
                  link={link}
                  idx={idx}
                  onLinkChange={onLinkChange}
                  onDeleteLink={onDeleteLink}
                  isDragActive={isDragActive}
                  onDragActiveToggle={() => setIsDragActive(!isDragActive)}
                  hasReordered={hasReordered}
                  onSave={handleSaveClick}
                  saving={saving}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
