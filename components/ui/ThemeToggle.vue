<script setup lang="ts">
import { ref } from 'vue';

type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized' | 'electric';

defineProps<{
  currentTheme: Theme;
}>();

const emit = defineEmits<{
  (e: 'themeChange', theme: Theme): void;
}>();

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (t: Theme) => {
  emit('themeChange', t);
  isOpen.value = false;
};

const themeOptions: { value: Theme; label: string; iconPath: string; viewBox?: string }[] = [
  {
    value: 'clean-light',
    label: 'Clean Light',
    iconPath: 'M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41'
  },
  {
    value: 'pitch-dark',
    label: 'Pitch Dark',
    iconPath: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'
  },
  {
    value: 'retro',
    label: '90s Retro',
    iconPath: 'M2 6h20v12H2z M6 12h.01 M10 12h.01 M14 12h4'
  },
  {
    value: 'fluent',
    label: 'Fluent Glass',
    iconPath: 'M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9zm0-16a7 7 0 1 1-7 7 7 7 0 0 1 7-7z M12 9v6 M9 12h6'
  },

  {
    value: 'solarized',
    label: 'Solarized Dark',
    iconPath: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5'
  },
  {
    value: 'electric',
    label: 'Electric Border',
    iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z'
  }
];
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
    
    <!-- Expanded panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div 
        v-if="isOpen"
        :class="[
          'flex flex-col gap-1 p-2 min-w-[170px] transition-all duration-300',
          currentTheme === 'retro'
            ? 'bg-[#c0c0c0] border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            : currentTheme === 'fluent'
              ? 'bg-white/10 border border-white/12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl backdrop-blur-xl'
              : currentTheme === 'pitch-dark'
                ? 'bg-[#0a0a0a] border border-[#222222] shadow-[0_4px_20px_rgba(255,255,255,0.05)] rounded-2xl'
                : currentTheme === 'solarized'
                  ? 'bg-[#073642] border border-[#586e75] shadow-lg rounded-lg'
                  : currentTheme === 'electric'
                    ? 'bg-zinc-950 border border-emerald-500 shadow-[0_0_15px_rgba(40,255,133,0.15)] rounded-2xl'
                    : 'bg-white/95 border border-slate-200 shadow-2xl rounded-2xl backdrop-blur-xl'
        ]"
      >
        <span 
          :class="[
            'text-[9px] font-bold uppercase tracking-widest px-2.5 pt-1.5 pb-1 select-none',
            currentTheme === 'retro' ? 'font-mono text-black' : 'text-slate-400 opacity-80'
          ]"
        >
          Select Palette
        </span>

        <button
          v-for="opt in themeOptions"
          :key="opt.value"
          @click="selectTheme(opt.value)"
          :class="[
            'flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-150 w-full text-left',
            currentTheme === opt.value
              ? (currentTheme === 'retro'
                  ? 'bg-blue-800 text-white font-bold border-t border-l border-blue-900 shadow-inner'
                  : currentTheme === 'fluent'
                    ? 'bg-white/20 text-white rounded-xl'
                    : currentTheme === 'solarized'
                      ? 'bg-[#2aa198]/20 text-[#2aa198] rounded-md'
                      : currentTheme === 'electric'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl'
                        : 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl')
              : (currentTheme === 'retro'
                  ? 'hover:bg-white/10 text-black font-medium'
                  : currentTheme === 'fluent'
                    ? 'hover:bg-white/10 text-white/70 hover:text-white rounded-xl'
                    : currentTheme === 'solarized'
                      ? 'hover:bg-white/5 text-[#839496] hover:text-[#93a1a1] rounded-md'
                      : currentTheme === 'electric'
                        ? 'hover:bg-emerald-500/10 text-emerald-400 rounded-xl'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white rounded-xl')
          ]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="w-4 h-4 flex-shrink-0"
          >
            <path :d="opt.iconPath" />
          </svg>
          <span :class="currentTheme === 'retro' ? 'font-bold font-mono' : 'font-sans'">{{ opt.label }}</span>
        </button>
      </div>
    </Transition>

    <!-- Trigger Button -->
    <button
      @click="toggleOpen"
      aria-label="Toggle theme selector panel"
      :class="[
        'w-12 h-12 flex items-center justify-center transition-all duration-300 group',
        currentTheme === 'retro'
          ? 'bg-[#c0c0c0] border-[3px] border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
          : currentTheme === 'fluent'
            ? 'bg-white/10 border border-white/12 text-white backdrop-blur-md rounded-full shadow-lg hover:scale-105'
            : currentTheme === 'solarized'
              ? 'bg-[#073642] border border-[#586e75] text-[#2aa198] rounded-md hover:bg-[#0b4554]'
              : currentTheme === 'electric'
                ? 'bg-zinc-950 border border-emerald-500 text-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-110 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-full shadow-lg hover:scale-110'
      ]"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        :class="[
          'transition-transform duration-300',
          currentTheme === 'retro' ? 'text-black' : '',
          isOpen ? 'rotate-[-30deg]' : 'rotate-0'
        ]"
      >
        <path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/>
        <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/>
        <path d="M14.5 17.5 4.5 15"/>
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-[9998]" 
      @click="isOpen = false"
    />
  </Teleport>
</template>
