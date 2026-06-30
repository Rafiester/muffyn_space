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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
        </svg>
      )
    },
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'About me',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 11.054.02l-.095.02L11.25 11.25ZM12 18.75c-3.728 0-6.75-3.022-6.75-6.75S8.272 5.25 12 5.25s6.75 3.022 6.75 6.75-3.022 6.75-6.75 6.75Z" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay — only visible when sidebar is open on small screens */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Navigation — Persistent drawer, NOT auto-hidden on tab select */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#111116] border-r border-slate-900/60 z-50
          flex flex-col justify-between transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col pt-6 px-4 space-y-8">
          {/* Brand/Logo Block */}
          <div className="flex flex-col items-start px-2">
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white mb-4 self-start transition-colors"
              title="Close Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="p-2.5 bg-[#af413c] text-white rounded-xl mb-3 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Content Management System
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabSelect(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all
                    ${isActive 
                      ? 'bg-[#af413c]/10 text-[#af413c] border-l-2 border-[#af413c] rounded-l-none' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }
                  `}
                >
                  <span className={`${isActive ? 'text-[#af413c]' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="border-t border-slate-900/60 my-4 pt-4" />

            <button
              onClick={() => onTabSelect('settings')}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all
                ${activeTab === 'settings'
                  ? 'bg-[#af413c]/10 text-[#af413c] border-l-2 border-[#af413c] rounded-l-none' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile block */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#af413c] flex items-center justify-center font-bold text-white text-sm select-none">
              A
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">Administrator</div>
              <div className="text-[10px] text-slate-500 font-medium">Super User</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="p-1 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
