<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  file: File;
}>();

const emit = defineEmits<{
  (e: 'crop', base64: string): void;
  (e: 'close'): void;
}>();

const previewCanvas = ref<HTMLCanvasElement | null>(null);
const imageElement = ref<HTMLImageElement | null>(null);
const imageUrl = ref<string>('');
const errorMessage = ref<string>('');
const rendering = ref<boolean>(false);

// Crop adjustments state
const zoom = ref<number>(1.0);
const offsetX = ref<number>(0); // Percentage offset from center (-100 to 100)
const offsetY = ref<number>(0); // Percentage offset from center (-100 to 100)

const canvasWidth = 280;
const canvasHeight = 280;

// Watch adjustments to redraw
watch([zoom, offsetX, offsetY], () => {
  drawPreview();
});

// Load the selected file into an image element
const loadImage = () => {
  const reader = new FileReader();
  reader.onload = (event) => {
    imageUrl.value = event.target?.result as string;

    const img = new Image();
    img.src = imageUrl.value;
    img.onload = () => {
      imageElement.value = img;
      setTimeout(drawPreview, 50); // Small delay to ensure render context is ready
    };
  };
  reader.readAsDataURL(props.file);
};

const drawPreview = () => {
  const canvas = previewCanvas.value;
  const img = imageElement.value;
  if (!canvas || !img) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Crop square region based on zoom
  const sourceMinSize = Math.min(img.width, img.height);
  const cropSize = sourceMinSize / zoom.value;

  const maxOffsetX = (img.width - cropSize) / 2;
  const maxOffsetY = (img.height - cropSize) / 2;

  const centerX = (img.width - cropSize) / 2;
  const centerY = (img.height - cropSize) / 2;

  const actualOffsetX = centerX + (offsetX.value / 100) * maxOffsetX;
  const actualOffsetY = centerY + (offsetY.value / 100) * maxOffsetY;

  // Clip to circle for avatar preview
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2 - 4, 0, Math.PI * 2);
  ctx.clip();

  ctx.drawImage(
    img,
    Math.max(0, Math.min(actualOffsetX, img.width - cropSize)),
    Math.max(0, Math.min(actualOffsetY, img.height - cropSize)),
    cropSize,
    cropSize,
    0,
    0,
    canvasWidth,
    canvasHeight
  );

  ctx.restore();

  // Draw border circle
  ctx.strokeStyle = '#af413c'; // Accent color matching user's dashboard theme
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2 - 4, 0, Math.PI * 2);
  ctx.stroke();
};

const handleSaveCrop = () => {
  const img = imageElement.value;
  if (!img) return;

  rendering.value = true;
  errorMessage.value = '';

  try {
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = 1024;
    outputCanvas.height = 1024;
    const ctx = outputCanvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2d context');

    const sourceMinSize = Math.min(img.width, img.height);
    const cropSize = sourceMinSize / zoom.value;

    const maxOffsetX = (img.width - cropSize) / 2;
    const maxOffsetY = (img.height - cropSize) / 2;

    const centerX = (img.width - cropSize) / 2;
    const centerY = (img.height - cropSize) / 2;

    const actualOffsetX = centerX + (offsetX.value / 100) * maxOffsetX;
    const actualOffsetY = centerY + (offsetY.value / 100) * maxOffsetY;

    // Draw high quality 1024x1024 cropped output
    ctx.drawImage(
      img,
      Math.max(0, Math.min(actualOffsetX, img.width - cropSize)),
      Math.max(0, Math.min(actualOffsetY, img.height - cropSize)),
      cropSize,
      cropSize,
      0,
      0,
      1024,
      1024
    );

    const base64 = outputCanvas.toDataURL('image/jpeg', 0.90);
    emit('crop', base64);
  } catch (err: any) {
    console.error(err);
    errorMessage.value = 'Failed to generate cropped image.';
  } finally {
    rendering.value = false;
  }
};

// Initial load
loadImage();
</script>

<template>
  <div class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
    <div class="bg-[#151419] border border-white/[0.08] rounded-3xl w-full max-w-md p-6 shadow-2xl flex flex-col text-white max-h-[95vh] overflow-y-auto">
      
      <!-- Header -->
      <div class="flex justify-between items-center mb-5 pb-3 border-b border-white/[0.06]">
        <h3 class="text-sm font-bold uppercase tracking-wider text-white/80">Crop & Resize Avatar</h3>
        <button 
          @click="emit('close')" 
          class="text-white/40 hover:text-white p-1 hover:bg-white/[0.04] rounded-full transition-all duration-200"
          aria-label="Close cropper"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Preview Canvas -->
      <div class="flex flex-col items-center">
        <div class="border border-white/[0.06] p-1 rounded-3xl bg-black/40 mb-5 relative flex items-center justify-center">
          <canvas 
            ref="previewCanvas" 
            :width="canvasWidth" 
            :height="canvasHeight"
            class="rounded-2xl max-w-full"
          ></canvas>
        </div>

        <!-- Adjustment Controls -->
        <div class="w-full space-y-4 px-2 mb-6 text-xs text-white/50">
          <div class="space-y-1">
            <div class="flex justify-between font-bold uppercase tracking-wider">
              <span>Zoom</span>
              <span class="text-[#af413c]">{{ zoom.toFixed(1) }}x</span>
            </div>
            <input 
              type="range" 
              v-model.number="zoom" 
              min="1.0" 
              max="3.0" 
              step="0.1" 
              class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" 
            />
          </div>

          <div class="space-y-1">
            <div class="flex justify-between font-bold uppercase tracking-wider">
              <span>Horizontal Shift</span>
            </div>
            <input 
              type="range" 
              v-model.number="offsetX" 
              min="-100" 
              max="100" 
              step="1" 
              class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" 
            />
          </div>

          <div class="space-y-1">
            <div class="flex justify-between font-bold uppercase tracking-wider">
              <span>Vertical Shift</span>
            </div>
            <input 
              type="range" 
              v-model.number="offsetY" 
              min="-100" 
              max="100" 
              step="1" 
              class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" 
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 w-full border-t border-white/[0.06] pt-4">
          <button 
            @click="emit('close')" 
            class="flex-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all py-2.5"
          >
            Cancel
          </button>
          <button 
            @click="handleSaveCrop" 
            :disabled="rendering"
            class="flex-1 bg-[#af413c] hover:bg-[#c94b45] text-white rounded-xl text-xs font-bold transition-all py-2.5 active:scale-95 disabled:opacity-50"
          >
            Save Crop (1024x1024)
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom styled range slider inputs */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #af413c;
  cursor: pointer;
}
</style>
