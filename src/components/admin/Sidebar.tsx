import React from 'react';

export type TabType = 'dashboard' | 'home' | 'about' | 'settings';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onTabSelect: (tab: TabType) => void;
  onLogout: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  onTabSelect,
  onLogout
}: SidebarProps) {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
    },
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'About me',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Acrylic Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 lg:hidden"
        />
      )}

      {/* Fluent Sidebar Drawer */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-[260px] z-50
          bg-[#1a1a24]/95 backdrop-blur-xl
          border-r border-white/[0.04]
          flex flex-col justify-between
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ boxShadow: isOpen ? '4px 0 24px rgba(0,0,0,0.4)' : 'none' }}
      >
        {/* Top Section */}
        <div className="flex flex-col">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#af413c]/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-[11px] font-bold text-white/90 tracking-wide">Muffytreen</div>
                <div className="text-[9px] text-white/30 font-medium tracking-wider uppercase mt-0.5">CMS Panel</div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.06] transition-all"
              title="Close Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Divider */}
          <div className="mx-5 my-3 h-px bg-white/[0.04]" />

          {/* Navigation */}
          <nav className="px-3 space-y-0.5">
            <div className="px-2 pb-2">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.15em]">Navigation</span>
            </div>
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabSelect(item.id)}
                  className={`
                    group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[12px] font-medium transition-all duration-150
                    ${isActive 
                      ? 'bg-[#af413c]/12 text-[#e8736e]' 
                      : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  {/* Active indicator pill */}
                  <div className={`
                    absolute left-0 w-[3px] rounded-r-full transition-all duration-200
                    ${isActive ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent'}
                  `} />
                  <span className={`transition-colors ${isActive ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Settings separator */}
            <div className="pt-3 pb-2 px-2">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.15em]">System</span>
            </div>

            <button
              onClick={() => onTabSelect('settings')}
              className={`
                group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[12px] font-medium transition-all duration-150
                ${activeTab === 'settings'
                  ? 'bg-[#af413c]/12 text-[#e8736e]' 
                  : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
                }
              `}
            >
              <div className={`
                absolute left-0 w-[3px] rounded-r-full transition-all duration-200
                ${activeTab === 'settings' ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent'}
              `} />
              <span className={`transition-colors ${activeTab === 'settings' ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-[18px] h-[18px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </span>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile Block — Fluent acrylic card */}
        <div className="m-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] flex items-center justify-center font-bold text-white text-[11px] select-none shadow-md shadow-[#af413c]/15">
              A
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white/80 leading-tight">Administrator</div>
              <div className="text-[9px] text-white/25 font-medium">Super User</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-[#e8736e] hover:bg-[#af413c]/10 transition-all"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
