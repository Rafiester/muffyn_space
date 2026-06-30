<script setup lang="ts">
type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized';

interface Settings {
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
}

defineProps<{
  settings: Settings;
}>();

const emit = defineEmits<{
  (e: 'change', key: keyof Settings, value: string): void;
}>();
</script>

<template>
  <div class="bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
    <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
      Experience Settings & SEO
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
</template>
