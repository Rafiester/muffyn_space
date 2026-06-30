<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

export type TabType = 'dashboard' | 'home' | 'about' | 'settings';

defineProps<{
  activeTab: TabType;
}>();

const emit = defineEmits<{
  (e: 'tabSelect', tab: TabType): void;
  (e: 'logout'): void;
}>();

const dropdownOpen = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <aside 
    class="fixed top-0 left-0 h-full w-[260px] z-50 bg-[#1e1d23] border-r border-white/[0.04] flex flex-col justify-between"
  >
    <!-- Top Section -->
    <div class="flex flex-col">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 pt-5 pb-2">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#af413c]/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <div class="leading-none">
            <div class="text-[14px] font-bold text-white/90 tracking-wide">Muffytreen</div>
            <div class="text-[11px] text-white/30 font-medium tracking-wider uppercase mt-0.5">CMS Panel</div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="mx-5 my-3 h-px bg-white/[0.04]" />

      <!-- Navigation -->
      <nav class="px-3 space-y-0.5">
        <div class="px-2 pb-2">
          <span class="text-[11px] font-bold text-white/20 uppercase tracking-[0.15em]">Navigation</span>
        </div>

        <!-- Dashboard -->
        <button
          @click="emit('tabSelect', 'dashboard')"
          :class="[
            'group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative',
            activeTab === 'dashboard'
              ? 'bg-[#af413c]/12 text-[#e8736e]' 
              : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
          ]"
        >
          <div :class="['absolute left-0 w-[3px] rounded-r-full transition-all duration-200', activeTab === 'dashboard' ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent']" />
          <span :class="['transition-colors', activeTab === 'dashboard' ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
          </span>
          <span>Dashboard</span>
        </button>

        <!-- About me -->
        <button
          @click="emit('tabSelect', 'about')"
          :class="[
            'group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative',
            activeTab === 'about'
              ? 'bg-[#af413c]/12 text-[#e8736e]' 
              : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
          ]"
        >
          <div :class="['absolute left-0 w-[3px] rounded-r-full transition-all duration-200', activeTab === 'about' ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent']" />
          <span :class="['transition-colors', activeTab === 'about' ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </span>
          <span>About me</span>
        </button>

        <!-- Items -->
        <button
          @click="emit('tabSelect', 'home')"
          :class="[
            'group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative',
            activeTab === 'home'
              ? 'bg-[#af413c]/12 text-[#e8736e]' 
              : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
          ]"
        >
          <div :class="['absolute left-0 w-[3px] rounded-r-full transition-all duration-200', activeTab === 'home' ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent']" />
          <span :class="['transition-colors', activeTab === 'home' ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </span>
          <span>Items</span>
        </button>

        <!-- Settings separator -->
        <div class="pt-3 pb-2 px-2">
          <span class="text-[11px] font-bold text-white/20 uppercase tracking-[0.15em]">System</span>
        </div>

        <button
          @click="emit('tabSelect', 'settings')"
          :class="[
            'group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative',
            activeTab === 'settings'
              ? 'bg-[#af413c]/12 text-[#e8736e]' 
              : 'text-white/45 hover:text-white/75 hover:bg-white/[0.04]'
          ]"
        >
          <div :class="['absolute left-0 w-[3px] rounded-r-full transition-all duration-200', activeTab === 'settings' ? 'h-4 bg-[#af413c]' : 'h-0 bg-transparent']" />
          <span :class="['transition-colors', activeTab === 'settings' ? 'text-[#e8736e]' : 'text-white/30 group-hover:text-white/50']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
          </span>
          <span>Settings</span>
        </button>
      </nav>
    </div>

    <!-- Bottom Profile Block with Dropdown Menu -->
    <div class="relative m-3" ref="dropdownRef">
      <!-- Dropdown Box -->
      <div v-if="dropdownOpen" class="absolute bottom-[calc(100%+6px)] left-0 w-full bg-[#1a1a24] border border-white/[0.06] rounded-xl p-1.5 shadow-xl animate-fadeIn z-50">
        <button
          @click="() => { dropdownOpen = false; emit('logout'); }"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-left"
        >
          <span>Sign Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12" />
          </svg>
        </button>
      </div>

      <!-- Administrator clickable Card -->
      <button
        @click="dropdownOpen = !dropdownOpen"
        class="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] flex items-center justify-between text-left transition-all"
      >
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] flex items-center justify-center font-bold text-white text-xs select-none shadow-md shadow-[#af413c]/15">
            A
          </div>
          <div>
            <div class="text-xs font-semibold text-white/80 leading-tight">Administrator</div>
            <div class="text-[11px] text-white/25 font-medium">Super User</div>
          </div>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          :class="['w-4 h-4 text-white/20 transition-transform duration-200', dropdownOpen ? 'rotate-180' : '']"
        >
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </aside>
</template>
