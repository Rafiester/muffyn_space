<script setup lang="ts">
import { computed } from 'vue';
import ElectricBorder from '../../ui/ElectricBorder/index.vue';

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
}

const props = defineProps<{
  link: LinkItem;
  theme: 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized' | 'electric';
  electricAccentColor?: string;
}>();

const isRetro = computed(() => props.theme === 'retro');
const isDark = computed(() => ['pitch-dark', 'solarized', 'fluent', 'electric'].includes(props.theme));

const activeAccentColor = computed(() => props.theme === 'electric' ? props.electricAccentColor : undefined);

const customGlowStyle = computed(() => {
  if (activeAccentColor.value) {
    return {
      '--hover-glow': `${activeAccentColor.value}1c`, // hex + 11% opacity
      '--hover-border': activeAccentColor.value
    } as Record<string, string>;
  }
  return {};
});

const isCustomIcon = computed(() => {
  const icon = props.link.icon;
  return icon.startsWith('data:image/') || icon.startsWith('http://') || icon.startsWith('https://');
});
</script>

<template>
  <!-- Outer spacer gives the canvas its 60px bleed room without inflating containerRef -->
  <div :class="theme === 'electric' ? 'w-full py-[60px]' : 'w-full'">
    <component
      :is="theme === 'electric' ? ElectricBorder : 'div'"
      v-bind="theme === 'electric' ? { color: activeAccentColor || '#10b981', borderRadius: 16, chaos: 0.12, style: { borderRadius: '16px' } } : {}"
      class="w-full"
    >
    <a
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :style="customGlowStyle"
      :class="[
        'group relative block w-full p-4 md:p-5 overflow-hidden transition-all duration-300',
        theme === 'electric'
          ? 'bg-zinc-900/90 text-white rounded-2xl border-0'
          : 'theme-card',
        isRetro 
          ? 'bg-white text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-yellow-50' 
          : 'hover:scale-[1.01]',
        link.featured && isRetro ? 'bg-cyan-200 border-[3.5px]' : '',
        link.featured && !isRetro && theme !== 'electric' ? 'ring-2 ring-indigo-500/20' : '',
        link.featured && theme === 'electric' ? 'ring-2 ring-emerald-500/20' : ''
      ]"
    >
      <!-- Featured Accent Indicator -->
      <div 
        v-if="link.featured"
        :class="[
          'absolute top-0 left-0 w-2 h-full',
          isRetro ? 'bg-black' : theme === 'electric' ? 'bg-emerald-400' : 'bg-indigo-600'
        ]"
      />

      <div class="flex items-center gap-4 relative z-10">
        <!-- Icon Container -->
        <div 
          :class="[
            'flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shrink-0',
            isRetro 
              ? 'bg-black text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
              : isDark
                ? 'bg-slate-950 text-slate-100 rounded-xl'
                : 'bg-slate-100 text-slate-800 rounded-xl'
          ]"
          :style="activeAccentColor ? { color: activeAccentColor, backgroundColor: `${activeAccentColor}12` } : {}"
        >
          <!-- Custom uploaded icon rendering -->
          <img v-if="isCustomIcon" :src="link.icon" alt="" class="w-5 h-5 object-contain rounded" />

          <!-- Preset SVG Icons -->
          <template v-else>
            <!-- Globe -->
            <svg v-if="link.icon.toLowerCase() === 'globe'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>

            <!-- YouTube -->
            <svg v-else-if="link.icon.toLowerCase() === 'youtube'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
              <polygon points="10 15 15 12 10 9" fill="currentColor" />
            </svg>

            <!-- Figma -->
            <svg v-else-if="link.icon.toLowerCase() === 'figma'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
              <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
              <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
              <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z" />
              <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22h-.03a3.47 3.47 0 0 1-3.47-3.5z" />
            </svg>

            <!-- GitHub -->
            <svg v-else-if="link.icon.toLowerCase() === 'github'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>

            <!-- Newsletter / Email -->
            <svg v-else-if="link.icon.toLowerCase() === 'newsletter' || link.icon.toLowerCase() === 'email'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>

            <!-- Fallback globe -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" />
              <path d="m10 15 5-3-5-3" />
            </svg>
          </template>
        </div>

        <!-- Text Area -->
        <div class="flex-1 text-left min-w-0">
          <div class="flex items-center gap-2">
            <h3 
              :class="[
                'text-base font-bold truncate leading-tight',
                isRetro 
                  ? 'font-mono uppercase font-black tracking-tight text-black' 
                  : theme === 'electric'
                    ? 'font-sans text-zinc-100'
                    : 'font-sans text-[var(--text-title)]'
              ]"
            >
              {{ link.title }}
            </h3>
            <span 
              v-if="link.featured"
              :class="[
                'text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none',
                isRetro 
                  ? 'bg-black text-white rounded-none border border-black font-black' 
                  : theme === 'electric'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
              ]"
            >
              Featured
            </span>
          </div>
          <p 
            :class="[
              'text-xs mt-1 truncate',
              isRetro 
                ? 'font-mono text-black font-medium' 
                : theme === 'electric'
                  ? 'font-sans text-zinc-400'
                  : 'font-sans text-[var(--text-body)]'
            ]"
          >
            {{ link.description }}
          </p>
        </div>

        <!-- Arrow/Link Indicator -->
        <div 
          :class="[
            'transition-all duration-300 shrink-0',
            isRetro 
              ? 'text-black group-hover:translate-x-1.5' 
              : theme === 'electric'
                ? 'text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1'
                : 'text-[var(--text-body)] group-hover:text-[var(--text-title)] group-hover:translate-x-1'
          ]"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="w-5 h-5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Modern Minimalist Soft Glow Overlay -->
      <div 
        v-if="activeAccentColor"
        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        :style="{
          background: `radial-gradient(circle at 10% 20%, ${activeAccentColor}0a 0%, transparent 50%)`
        }"
      />
    </a>
    </component>
  </div>
</template>
