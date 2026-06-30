<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized' | 'electric';

interface Settings {
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
  electricAccentColor?: string;
}

const props = defineProps<{
  settings: Settings;
}>();

const emit = defineEmits<{
  (e: 'change', key: keyof Settings, value: string): void;
}>();

const showPicker = ref(false);
const pickerRef = ref<HTMLElement | null>(null);
const currentHue = ref(240);

const presetColors = [
  '#10b981', // Emerald
  '#6366f1', // Indigo
  '#f43f5e', // Rose
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#eab308', // Yellow
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#14b8a6', // Teal
  '#ef4444', // Red
  '#84cc16'  // Lime
];

const togglePicker = () => {
  showPicker.value = !showPicker.value;
};

const closePicker = () => {
  showPicker.value = false;
};

const handleOutsideClick = (e: MouseEvent) => {
  if (pickerRef.value && !pickerRef.value.contains(e.target as Node)) {
    closePicker();
  }
};

const handleHueSlider = (e: Event) => {
  const hue = parseInt((e.target as HTMLInputElement).value);
  currentHue.value = hue;
  const hex = hslToHex(hue, 85, 55);
  emit('change', 'electricAccentColor', hex);
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick);
  // Guess initial hue from hex if possible
  if (props.settings.electricAccentColor && props.settings.electricAccentColor.startsWith('#')) {
    const hex = props.settings.electricAccentColor;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0;
    if (max !== min) {
      const d = max - min;
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    currentHue.value = Math.round(h * 360);
  }
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleOutsideClick);
});
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
          
          <div class="flex items-center gap-3 relative" ref="pickerRef">
            <!-- Visual Color Picker Trigger Box -->
            <button
              type="button"
              @click="togglePicker"
              class="relative w-11 h-11 rounded-xl border border-white/10 shrink-0 bg-white/[0.03] hover:border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
              :style="{ backgroundColor: settings.electricAccentColor || '#6366f1' }"
              title="Open Color Palette"
            >
              <div class="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors rounded-xl" />
            </button>

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

            <!-- Custom Fluent Dropdown Color Picker -->
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0 scale-100"
              leave-to-class="opacity-0 translate-y-2 scale-95"
            >
              <div 
                v-if="showPicker"
                class="absolute left-0 top-13 z-[100] w-64 bg-zinc-950/95 border border-white/10 rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              >
                <div class="space-y-4">
                  <div class="text-[9px] font-bold uppercase tracking-wider text-white/40 select-none">Presets</div>
                  <!-- Presets Grid -->
                  <div class="grid grid-cols-6 gap-2">
                    <button
                      v-for="color in presetColors"
                      :key="color"
                      type="button"
                      @click="emit('change', 'electricAccentColor', color)"
                      class="w-7 h-7 rounded-lg border transition-all duration-150 relative flex items-center justify-center shrink-0 hover:scale-110 active:scale-95"
                      :style="{ backgroundColor: color, borderColor: (settings.electricAccentColor || '#6366f1') === color ? '#ffffff' : 'rgba(255,255,255,0.05)' }"
                      :title="color"
                    >
                      <div 
                        v-if="(settings.electricAccentColor || '#6366f1') === color" 
                        class="w-1.5 h-1.5 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  </div>

                  <div class="h-px bg-white/5" />

                  <!-- Custom Spectrum / Slider -->
                  <div class="space-y-3">
                    <div class="text-[9px] font-bold uppercase tracking-wider text-white/40 select-none">Custom Hue</div>
                    <!-- Hue Slider -->
                    <div class="space-y-1.5">
                      <input 
                        type="range" 
                        min="0" 
                        max="360" 
                        :value="currentHue"
                        @input="handleHueSlider"
                        class="w-full hue-slider rounded-full h-2.5 outline-none appearance-none cursor-pointer border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
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

<style scoped>
.hue-slider {
  background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
}
.hue-slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: white;
  border: 1.5px solid rgba(0,0,0,0.3);
  box-shadow: 0 1px 4px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: transform 0.1s ease;
}
.hue-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
</style>
