<script setup lang="ts">
import { computed } from 'vue';
import ElectricBorder from '../ui/ElectricBorder.vue';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: Record<string, string>;
}

const props = defineProps<{
  profile: Profile;
  theme: 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'saas' | 'solarized' | 'electric';
}>();

const isRetro = computed(() => props.theme === 'retro');
const isDark = computed(() => ['pitch-dark', 'solarized', 'fluent', 'electric'].includes(props.theme));
</script>

<template>
  <!-- Outer spacer gives the canvas its 60px bottom bleed room without inflating containerRef -->
  <div :class="theme === 'electric' ? 'w-full pb-[60px]' : 'w-full'">
    <component
      :is="theme === 'electric' ? ElectricBorder : 'div'"
      v-bind="theme === 'electric' ? { color: '#10b981', borderRadius: 24, chaos: 0.12, style: { borderRadius: '24px' } } : {}"
      class="w-full"
    >
      <section 
        :class="[
          'w-full flex flex-col items-center text-center p-6 md:p-8 theme-card',
          theme === 'electric' ? 'bg-zinc-900/90 text-white rounded-3xl border-0' : '',
          isRetro ? 'bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none' : ''
        ]"
      >
        <!-- Avatar Container -->
        <div class="relative group mb-5">
          <div 
            v-if="!isRetro" 
            class="absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" 
            style="background-image: var(--accent-gradient)" 
          />
          <img
            :src="profile.avatar"
            :alt="`${profile.name}'s Avatar`"
            :class="[
              'w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105',
              isRetro 
                ? 'border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200' 
                : 'border-2 border-white dark:border-slate-800 rounded-full shadow-inner'
            ]"
          />
        </div>

        <!-- Profile Name & Title -->
        <h1 
          :class="[
            'text-2xl md:text-3xl leading-tight mb-2',
            isRetro ? 'font-mono font-black uppercase text-black' : 'font-sans text-[var(--text-title)] tracking-tight'
          ]"
        >
          {{ profile.name }}
        </h1>
        <p 
          :class="[
            'text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block',
            isRetro 
              ? 'bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black' 
              : 'rounded-full font-sans'
          ]"
          :style="!isRetro ? { backgroundColor: 'var(--accent-bg)', color: 'var(--accent-text)' } : {}"
        >
          {{ profile.title }}
        </p>

        <!-- Bio -->
        <p 
          :class="[
            'text-sm leading-relaxed max-w-sm mb-6',
            isRetro ? 'font-mono text-black font-semibold' : 'font-sans text-[var(--text-body)]'
          ]"
        >
          {{ profile.bio }}
        </p>

        <!-- Social Icons Row -->
        <div class="flex gap-4 items-center justify-center">
          <template v-if="profile.socials">
            <a
              v-for="[platform, url] in Object.entries(profile.socials)"
              :key="platform"
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${profile.name}'s ${platform}`"
              :class="[
                'p-2.5 transition-all duration-300',
                isRetro 
                  ? 'bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110'
              ]"
            >
              <!-- GitHub -->
              <svg v-if="platform === 'github'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              </svg>
              
              <!-- Twitter -->
              <svg v-else-if="platform === 'twitter'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>

              <!-- LinkedIn -->
              <svg v-else-if="platform === 'linkedin'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>

              <!-- Email / Contact -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </template>
        </div>
      </section>
    </component>
  </div>
</template>
