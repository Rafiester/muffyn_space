<script setup lang="ts">
type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized';

interface Settings {
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
  electricAccentColor?: string;
}

defineProps<{
  settings: Settings;
}>();

const emit = defineEmits<{
  (e: 'change', key: keyof Settings, value: string): void;
}>();
</script>

<template>
  <div class="space-y-6">
    <!-- Theme Settings Card -->
    <div class="bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
      <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
        Experience Settings
      </h2>

      <div class="space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="experience-theme">Active Experience Theme</label>
          <select
            id="experience-theme"
            :value="settings.active_theme"
            @change="(e) => emit('change', 'active_theme', (e.target as HTMLSelectElement).value)"
            class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          >
            <option value="clean-light" class="bg-slate-900 text-white">Clean Light (Default)</option>
            <option value="pitch-dark" class="bg-slate-900 text-white">Pitch Dark</option>
            <option value="retro" class="bg-slate-900 text-white">90s Retro</option>
            <option value="fluent" class="bg-slate-900 text-white">Fluent Design (Glassmorphism)</option>
            <option value="solarized" class="bg-slate-900 text-white">Solarized Dark</option>
            <option value="electric" class="bg-slate-900 text-white">Electric Border</option>
          </select>
        </div>
        <div v-if="settings.active_theme === 'electric'" class="space-y-3">
          <label class="block text-xs font-bold uppercase tracking-wider text-white/25" for="electric-accent">Electric Theme Accent Color</label>
          
          <div class="flex items-center gap-3">
            <!-- Visual Color Picker Box -->
            <div class="relative w-11 h-11 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/[0.03] hover:border-white/20 transition-colors">
              <input
                type="color"
                :value="settings.electricAccentColor || '#6366f1'"
                @input="(e) => emit('change', 'electricAccentColor', (e.target as HTMLInputElement).value)"
                class="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0 z-10"
              />
              <div 
                class="w-full h-full" 
                :style="{ backgroundColor: settings.electricAccentColor || '#6366f1' }"
              />
            </div>

            <!-- HEX Input -->
            <div class="relative flex-1">
              <input
                id="electric-accent"
                type="text"
                :value="settings.electricAccentColor || ''"
                @input="(e) => emit('change', 'electricAccentColor', (e.target as HTMLInputElement).value)"
                class="w-full pl-4 pr-12 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
                placeholder="#6366f1"
              />
              <span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30 font-mono select-none">HEX</span>
            </div>
          </div>

          <!-- Color Palette Presets -->
          <div class="flex flex-wrap gap-2 pt-1">
            <button
              v-for="color in ['#10b981', '#6366f1', '#f43f5e', '#06b6d4', '#f97316', '#eab308']"
              :key="color"
              type="button"
              @click="emit('change', 'electricAccentColor', color)"
              class="w-6 h-6 rounded-full border transition-all duration-150 relative flex items-center justify-center shrink-0 hover:scale-110 active:scale-95"
              :style="{ backgroundColor: color, borderColor: (settings.electricAccentColor || '#6366f1') === color ? '#ffffff' : 'rgba(255,255,255,0.1)' }"
              :title="color"
            >
              <div 
                v-if="(settings.electricAccentColor || '#6366f1') === color" 
                class="w-1.5 h-1.5 rounded-full bg-white shadow-sm"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Meta Card -->
    <div class="bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
      <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
        Search Engine Optimization (SEO)
      </h2>

      <div class="space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="meta-title">SEO Meta Title</label>
          <input
            id="meta-title"
            type="text"
            :value="settings.meta_title || ''"
            @input="(e) => emit('change', 'meta_title', (e.target as HTMLInputElement).value)"
            class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="Alex Rivera | Portfolio"
          />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="meta-description">SEO Meta Description</label>
          <textarea
            id="meta-description"
            :value="settings.meta_description || ''"
            @input="(e) => emit('change', 'meta_description', (e.target as HTMLTextAreaElement).value)"
            rows="4"
            class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none"
            placeholder="Alex Rivera's links, portfolio, and newsletters..."
          />
        </div>
      </div>
    </div>
  </div>
</template>
