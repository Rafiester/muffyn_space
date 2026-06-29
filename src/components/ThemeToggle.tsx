'use client';

import React from 'react';

type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export default function ThemeToggle({ currentTheme, onThemeChange }: ThemeToggleProps) {
  const themes: { id: Theme; label: string; icon: React.ReactNode }[] = [
    {
      id: 'minimalist',
      label: 'Minimal Light',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      )
    },
    {
      id: 'minimalist-dark',
      label: 'Minimal Dark',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      )
    },
    {
      id: 'retro',
      label: '90s Retro',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect width="20" height="12" x="2" y="6" rx="2"/>
          <path d="M6 12h.01M10 12h.01M14 12h4"/>
        </svg>
      )
    }
  ];

  const isRetro = currentTheme === 'retro';

  return (
    <div 
      className={`
        relative flex items-center p-1.5 gap-1.5 z-50
        ${isRetro 
          ? 'bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none' 
          : 'bg-[var(--bg-card)] border border-[var(--border-card)] shadow-sm rounded-full backdrop-blur-md'
        }
        transition-all duration-300
      `}
    >
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onThemeChange(t.id)}
            aria-label={`Switch to ${t.label}`}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200
              ${isActive 
                ? isRetro 
                  ? 'bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm'
                : isRetro
                  ? 'hover:bg-slate-100 text-black border-2 border-transparent font-medium'
                  : 'hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full'
              }
            `}
          >
            {t.icon}
            <span className={isRetro ? 'font-bold font-mono' : 'font-sans'}>{t.label.split(' ')[1] || t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
