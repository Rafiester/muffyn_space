import React from 'react';

interface DashboardHeaderProps {
  saving: boolean;
  onSave: () => void;
  onLogout: () => void;
  onMenuToggle: () => void;
}

export default function DashboardHeader({ saving, onSave, onLogout, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="border-b border-white/[0.04] bg-[#1a1a24]/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Burger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/35 hover:text-white/70 hover:bg-white/[0.06] border border-white/[0.06] transition-all"
            title="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="hidden sm:flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] rounded-lg flex items-center justify-center shadow-sm shadow-[#af413c]/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div className="leading-none">
              <h1 className="text-[13px] font-semibold text-white/85 tracking-tight">Muffytreen CMS</h1>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.open('/', '_blank')}
            className="h-8 px-3 rounded-lg text-[11px] font-medium text-white/45 hover:text-white/75 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="h-8 px-4 rounded-lg text-[11px] font-semibold text-white bg-gradient-to-r from-[#c94a44] to-[#af413c] hover:from-[#d4534d] hover:to-[#b84842] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-[#af413c]/20"
          >
            {saving ? (
              <>
                <div className="w-3 h-3 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span>Publish</span>
              </>
            )}
          </button>

          <button
            onClick={onLogout}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/30 hover:text-[#e8736e] hover:bg-[#af413c]/10 border border-white/[0.06] transition-all"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
