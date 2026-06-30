<script setup lang="ts">
import { ref } from 'vue';
import LinkEditorItem from './LinkEditorItem.vue';

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
  links: LinkItem[];
  saving?: boolean;
}>();

const emit = defineEmits<{
  (e: 'addLink'): void;
  (e: 'linkChange', index: number, key: keyof LinkItem, value: any): void;
  (e: 'deleteLink', index: number): void;
  (e: 'reorderAll', reorderedLinks: LinkItem[]): void;
  (e: 'saveAll'): void;
}>();

const draggedIdx = ref<number | null>(null);
const dragOverIdx = ref<number | null>(null);
const isDragActive = ref<boolean>(false);
const hasReordered = ref<boolean>(false);

const handleDragStart = (e: DragEvent, index: number) => {
  if (!isDragActive.value) {
    e.preventDefault();
    return;
  }
  draggedIdx.value = index;
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  }
};

const handleDragOver = (e: DragEvent, index: number) => {
  e.preventDefault();
  if (!isDragActive.value || draggedIdx.value === null || draggedIdx.value === index) return;
  dragOverIdx.value = index;
};

const handleDrop = (e: DragEvent, targetIndex: number) => {
  e.preventDefault();
  if (!isDragActive.value || draggedIdx.value === null || draggedIdx.value === targetIndex) {
    cleanupDrag();
    return;
  }

  const reordered = [...props.links];
  const [draggedItem] = reordered.splice(draggedIdx.value, 1);
  reordered.splice(targetIndex, 0, draggedItem);

  emit('reorderAll', reordered);
  hasReordered.value = true;
  cleanupDrag();
};

const cleanupDrag = () => {
  draggedIdx.value = null;
  dragOverIdx.value = null;
};

const handleSaveClick = async () => {
  emit('saveAll');
  hasReordered.value = false;
};
</script>

<template>
  <div class="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 flex items-center gap-2">
        Manage Links ({{ links.length }})
      </h2>
      <div class="flex items-center gap-2 shrink-0">
        <!-- Unified single Reorder toggle button on the left of + Add link -->
        <button
          @click="isDragActive = !isDragActive"
          :class="[
            'px-3 py-1.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5',
            isDragActive
              ? 'bg-[#af413c] border-[#af413c] text-white shadow-md shadow-[#af413c]/15'
              : 'bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 hover:border-[#af413c]/30'
          ]"
          title="Enable card drag and drop reordering"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
          <span>{{ isDragActive ? 'Reordering' : 'Reorder' }}</span>
        </button>

        <!-- Save Order option button rendered right next to it if order changed -->
        <button
          v-if="hasReordered && isDragActive"
          @click="handleSaveClick"
          :disabled="saving"
          class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white border border-emerald-500/20 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-md shadow-emerald-600/10"
        >
          {{ saving ? 'Saving...' : 'Save Order' }}
        </button>

        <button
          @click="emit('addLink')"
          class="px-3 py-1.5 bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 hover:border-[#af413c]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Link</span>
        </button>
      </div>
    </div>

    <div v-if="links.length === 0" class="text-center py-12 border border-dashed border-white/[0.04] rounded-xl text-white/20 text-xs">
      No links created yet. Click "Add Link" to get started!
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="(link, idx) in links"
        :key="link.id"
        :draggable="isDragActive"
        @dragstart="(e) => handleDragStart(e, idx)"
        @dragover="(e) => handleDragOver(e, idx)"
        @drop="(e) => handleDrop(e, idx)"
        @dragend="cleanupDrag"
        :class="[
          'transition-all duration-200',
          draggedIdx === idx ? 'opacity-30 scale-[0.98]' : 'opacity-100',
          dragOverIdx === idx ? 'border-t-2 border-[#af413c]/60 pt-4' : ''
        ]"
      >
        <LinkEditorItem
          :link="link"
          :idx="idx"
          :is-drag-active="isDragActive"
          @link-change="(index, key, val) => emit('linkChange', index, key, val)"
          @delete-link="(index) => emit('deleteLink', index)"
        />
      </div>
    </div>
  </div>
</template>
