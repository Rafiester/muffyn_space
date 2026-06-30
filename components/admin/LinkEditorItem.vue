<script setup lang="ts">
interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  accentColor?: string;
  is_active?: boolean;
}

const props = defineProps<{
  link: LinkItem;
  idx: number;
  isDragActive?: boolean;
}>();

const emit = defineEmits<{
  (e: 'linkChange', index: number, key: keyof LinkItem, value: any): void;
  (e: 'deleteLink', index: number): void;
}>();

const isCustomIcon = computed(() => {
  const icon = props.link.icon;
  return icon.startsWith('data:image/') || icon.startsWith('http');
});

const onFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  if (file.size > 102400) {
    alert("File is too large! Maximum allowed size is 100KB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      emit('linkChange', props.idx, 'icon', reader.result);
    }
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div 
    :class="[
      'p-4 border rounded-xl transition-all space-y-4 relative',
      isDragActive 
        ? 'bg-white/[0.03] border-[#af413c]/30 cursor-grab active:cursor-grabbing hover:border-[#af413c]/50'
        : 'bg-white/[0.01] border-white/[0.03] hover:border-white/[0.06]'
    ]"
  >
    <!-- Header bar of link panel -->
    <div class="flex items-center justify-between pb-3 border-b border-white/[0.04] gap-4">
      <div class="flex items-center gap-2 flex-1">
        <!-- Drag handle graphic indicator only when reordering is toggled -->
        <svg v-if="isDragActive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-[#e8736e]">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
        <span class="text-[10px] font-bold text-white/20">#{{ idx + 1 }}</span>
        <input
          type="text"
          :value="link.title"
          @input="(e) => emit('linkChange', idx, 'title', (e.target as HTMLInputElement).value)"
          className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#af413c]/50 text-sm font-bold !text-white outline-none pb-0.5 flex-1 w-full"
          placeholder="Link Title"
          :disabled="isDragActive"
        />
      </div>
      
      <!-- Active state and Delete buttons -->
      <div class="flex items-center gap-1.5">
        <!-- Active toggle -->
        <button
          @click="emit('linkChange', idx, 'is_active', !(link.is_active ?? true))"
          :class="[
            'px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all flex items-center gap-1',
            (link.is_active ?? true)
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : 'bg-white/[0.04] border-white/[0.06] text-white/30'
          ]"
          :disabled="isDragActive"
        >
          <template v-if="link.is_active ?? true">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Published</span>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-2.5 h-2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            <span>Unpublished</span>
          </template>
        </button>

        <!-- Delete link -->
        <button
          @click="emit('deleteLink', idx)"
          class="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 text-rose-400 transition-all flex items-center gap-1"
          title="Delete Link"
          :disabled="isDragActive"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-2.5 h-2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>

    <!-- Inputs panel -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Description</label>
        <input
          type="text"
          :value="link.description"
          @input="(e) => emit('linkChange', idx, 'description', (e.target as HTMLInputElement).value)"
          class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="Subtitle text"
          :disabled="isDragActive"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Destination URL</label>
        <input
          type="text"
          :value="link.url"
          @input="(e) => emit('linkChange', idx, 'url', (e.target as HTMLInputElement).value)"
          class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="https://..."
          :disabled="isDragActive"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Link Icon</label>
        <div class="flex items-center gap-3">
          <!-- Inline Preview box -->
          <div class="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0">
            <img v-if="isCustomIcon" :src="link.icon" alt="" class="w-6 h-6 object-contain rounded" />
            <div v-else class="text-white/40">
              <svg v-if="link.icon === 'youtube'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-rose-500">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z" />
                <polygon points="9.545 8.568 15.818 12 9.545 15.432" fill="white" />
              </svg>
              <svg v-else-if="link.icon === 'github'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <svg v-else-if="link.icon === 'figma'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-orange-500">
                <path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12zm-3.5 7A3.5 3.5 0 1 1 5 5.5 3.5 3.5 0 0 1 8.5 2H12v7zm0 0a3.5 3.5 0 1 1-3.5 3.5V9zm7 3.5a3.5 3.5 0 1 1-3.5 3.5V12.5zM8.5 15H12v3.5A3.5 3.5 0 1 1 8.5 15z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
          </div>

          <!-- File upload trigger -->
          <label :class="['flex-1 px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 h-10', isDragActive ? 'opacity-50 pointer-events-none' : '']">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            <span>Upload Custom Icon</span>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              :disabled="isDragActive"
              @change="onFileInput"
            />
          </label>
        </div>
        <!-- File description text -->
        <span class="text-[10px] text-white/20 mt-1.5 block">
          Max size: 100KB. Recommended dimensions: 64x64 pixels (PNG/JPG/SVG).
        </span>
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div class="col-span-2">
          <label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Accent HEX Color</label>
          <input
            type="text"
            :value="link.accentColor || ''"
            @input="(e) => emit('linkChange', idx, 'accentColor', (e.target as HTMLInputElement).value)"
            class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
            placeholder="#6366f1"
            :disabled="isDragActive"
          />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1 text-center">Featured</label>
          <div class="flex justify-center pt-2">
            <input
              type="checkbox"
              :checked="link.featured"
              @change="(e) => emit('linkChange', idx, 'featured', (e.target as HTMLInputElement).checked)"
              class="w-4 h-4 rounded bg-white/[0.02] border-white/[0.06] accent-[#af413c] cursor-pointer"
              :disabled="isDragActive"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
