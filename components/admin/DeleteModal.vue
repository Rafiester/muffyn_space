<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  itemName: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Fluent backdrop -->
    <div 
      class="fixed inset-0 bg-[#090a0f]/80 backdrop-blur-sm transition-opacity duration-300"
      @click="emit('close')"
    />

    <!-- Modal Dialog Card -->
    <div class="bg-[#1e1d23] border border-white/[0.04] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-fadeIn text-center">
      <div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
        </svg>
      </div>
      <h3 class="text-base font-bold text-white mb-2">Delete "{{ itemName || 'this item' }}"?</h3>
      <p class="text-xs text-white/40 mb-6 px-2 leading-relaxed">
        This item will be permanently removed from your experience portfolio. This action cannot be undone.
      </p>
      <div class="flex items-center justify-center gap-3">
        <button
          @click="emit('close')"
          class="px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all min-w-[80px]"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/20 transition-all min-w-[80px]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
