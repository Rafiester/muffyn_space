<script setup lang="ts">
type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

defineProps<{
  currentTheme: Theme;
}>();

const emit = defineEmits<{
  (e: 'themeChange', theme: Theme): void;
}>();

const isRetro = computed(() => props.currentTheme === 'retro');
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div 
    :class="[
      'relative flex items-center p-1.5 gap-1.5 z-50 transition-all duration-300',
      currentTheme === 'retro'
        ? 'bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none' 
        : 'bg-[var(--bg-card)] border border-[var(--border-card)] shadow-sm rounded-full backdrop-blur-md'
    ]"
  >
    <!-- Minimalist Light -->
    <button
      @click="emit('themeChange', 'minimalist')"
      aria-label="Switch to Minimal Light"
      :class="[
        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200',
        currentTheme === 'minimalist'
          ? (currentTheme === 'retro'
              ? 'bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
              : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm')
          : (currentTheme === 'retro'
              ? 'hover:bg-slate-100 text-black border-2 border-transparent font-medium'
              : 'hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full')
      ]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
      <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Light</span>
    </button>

    <!-- Minimalist Dark -->
    <button
      @click="emit('themeChange', 'minimalist-dark')"
      aria-label="Switch to Minimal Dark"
      :class="[
        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200',
        currentTheme === 'minimalist-dark'
          ? (currentTheme === 'retro'
              ? 'bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
              : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm')
          : (currentTheme === 'retro'
              ? 'hover:bg-slate-100 text-black border-2 border-transparent font-medium'
              : 'hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full')
      ]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
      <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Dark</span>
    </button>

    <!-- Retro -->
    <button
      @click="emit('themeChange', 'retro')"
      aria-label="Switch to 90s Retro"
      :class="[
        'flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200',
        currentTheme === 'retro'
          ? (currentTheme === 'retro'
              ? 'bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
              : 'bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm')
          : (currentTheme === 'retro'
              ? 'hover:bg-slate-100 text-black border-2 border-transparent font-medium'
              : 'hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full')
      ]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
        <rect width="20" height="12" x="2" y="6" rx="2"/>
        <path d="M6 12h.01M10 12h.01M14 12h4"/>
      </svg>
      <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">Retro</span>
    </button>
  </div>
</template>
