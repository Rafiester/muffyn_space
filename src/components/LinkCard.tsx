'use client';

import React from 'react';

export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  accentColor?: string;
}

interface LinkCardProps {
  link: LinkItem;
  theme: 'minimalist' | 'minimalist-dark' | 'retro';
}

function getIcon(iconName: string) {
  const props = { className: "w-5 h-5", strokeWidth: 2, fill: "none", stroke: "currentColor" };
  switch (iconName.toLowerCase()) {
    case 'globe':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
    case 'youtube':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9" fill="currentColor" />
        </svg>
      );
    case 'figma':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z" />
          <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22h-.03a3.47 3.47 0 0 1-3.47-3.5z" />
        </svg>
      );
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case 'newsletter':
    case 'email':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="m10 15 5-3-5-3" />
        </svg>
      );
  }
}

export default function LinkCard({ link, theme }: LinkCardProps) {
  const isRetro = theme === 'retro';
  const isDark = theme === 'minimalist-dark';

  // Extract accent style for glowing effect in minimalist themes
  const customGlowStyle = !isRetro && link.accentColor
    ? {
        '--hover-glow': `${link.accentColor}1c`, // hex + 11% opacity
        '--hover-border': link.accentColor
      } as React.CSSProperties
    : {};

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      style={customGlowStyle}
      className={`
        group relative block w-full p-4 md:p-5 theme-card overflow-hidden
        ${isRetro 
          ? 'bg-white text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-yellow-50' 
          : 'hover:scale-[1.01]'
        }
        ${link.featured && isRetro ? 'bg-cyan-200 border-[3.5px]' : ''}
        ${link.featured && !isRetro ? 'ring-2 ring-indigo-500/20' : ''}
      `}
    >
      {/* Featured Accent Indicator */}
      {link.featured && (
        <div 
          className={`
            absolute top-0 left-0 w-2 h-full
            ${isRetro ? 'bg-black' : 'bg-indigo-600'}
          `}
        />
      )}

      <div className="flex items-center gap-4 relative z-10">
        {/* Icon Container */}
        <div 
          className={`
            flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shrink-0
            ${isRetro 
              ? 'bg-black text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : isDark
                ? 'bg-slate-900 text-slate-100 rounded-xl'
                : 'bg-slate-100 text-slate-800 rounded-xl'
            }
          `}
          style={!isRetro && link.accentColor ? { color: link.accentColor, backgroundColor: `${link.accentColor}12` } : {}}
        >
          {getIcon(link.icon)}
        </div>

        {/* Text Area */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <h3 
              className={`
                text-base font-bold truncate leading-tight
                ${isRetro ? 'font-mono uppercase font-black tracking-tight text-black' : 'font-sans text-[var(--text-title)]'}
              `}
            >
              {link.title}
            </h3>
            {link.featured && (
              <span 
                className={`
                  text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none
                  ${isRetro 
                    ? 'bg-black text-white rounded-none border border-black font-black' 
                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                  }
                `}
              >
                Featured
              </span>
            )}
          </div>
          <p 
            className={`
              text-xs mt-1 truncate
              ${isRetro ? 'font-mono text-black font-medium' : 'font-sans text-[var(--text-body)]'}
            `}
          >
            {link.description}
          </p>
        </div>

        {/* Arrow/Link Indicator */}
        <div 
          className={`
            transition-all duration-300 shrink-0
            ${isRetro 
              ? 'text-black group-hover:translate-x-1.5' 
              : 'text-[var(--text-body)] group-hover:text-[var(--text-title)] group-hover:translate-x-1'
            }
          `}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Modern Minimalist Soft Glow Overlay */}
      {!isRetro && link.accentColor && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 10% 20%, ${link.accentColor}0a 0%, transparent 50%)`
          }}
        />
      )}
    </a>
  );
}
