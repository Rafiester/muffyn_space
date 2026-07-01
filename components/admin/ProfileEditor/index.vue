<script setup lang="ts">
import { ref } from 'vue';
import AvatarUploader from '../AvatarUploader/index.vue';

type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  active_theme: Theme;
  socials: {
    github: string;
    twitter: string;
    linkedin: string;
    email: string;
  };
}

defineProps<{
  profile: Profile;
}>();

const emit = defineEmits<{
  (e: 'change', key: keyof Profile, value: any): void;
}>();

const selectedFile = ref<File | null>(null);
const showCropper = ref(false);

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  // Validation: PNG/JPG support only
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    alert("Invalid format! Only PNG and JPG/JPEG files are supported.");
    target.value = '';
    return;
  }

  // Validation: Max limit 1MB
  const maxLimit = 1 * 1024 * 1024; // 1MB
  if (file.size > maxLimit) {
    alert("File is too large! Maximum allowed size is 1MB.");
    target.value = '';
    return;
  }

  selectedFile.value = file;
  showCropper.value = true;
  target.value = ''; // Reset input to allow selecting same file again
};

const handleCropSuccess = (base64: string) => {
  emit('change', 'avatar', base64);
  showCropper.value = false;
};

const showPreview = ref(false);
const showRemoveConfirm = ref(false);

const confirmRemoveAvatar = () => {
  emit('change', 'avatar', '');
  showRemoveConfirm.value = false;
};
</script>

<template>
  <div class="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm">
    <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
      Profile Details
    </h2>

    <div class="space-y-5">
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2">Avatar Profile Image</label>
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <!-- Avatar Preview -->
          <div class="w-20 h-20 rounded-full overflow-hidden bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
            <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar Preview" class="w-full h-full object-cover" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white/20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>

          <!-- Upload actions and description -->
          <div class="flex-1 w-full space-y-2 text-center sm:text-left">
            <div class="flex flex-col sm:flex-row items-center gap-2 w-full">
              <label class="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center sm:shrink-0 w-full sm:w-auto h-10">
                <span>Upload Profile Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileInput"
                />
              </label>

              <button
                v-if="profile.avatar"
                type="button"
                @click="showRemoveConfirm = true"
                class="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-all h-10 w-full sm:w-auto flex items-center justify-center"
              >
                Remove Image
              </button>

              <button
                v-if="profile.avatar"
                type="button"
                @click="showPreview = true"
                class="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/60 hover:text-white rounded-xl text-xs font-bold transition-all h-10 flex items-center justify-center gap-1.5 w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                View
              </button>
            </div>
            <span class="text-[10px] text-white/20 block">
              Max size: 1MB. PNG/JPG formats supported. Crop size: 1024x1024.
            </span>
          </div>
        </div>
      </div>

      <!-- Avatar Preview Modal -->
      <Teleport to="body">
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div 
            v-if="showPreview && profile.avatar" 
            class="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            @click.self="showPreview = false"
          >
            <div class="relative max-w-sm w-full">
              <img :src="profile.avatar" alt="Avatar Full Preview" class="w-full rounded-2xl shadow-2xl border border-white/10" />
              <button 
                @click="showPreview = false" 
                class="absolute -top-3 -right-3 w-8 h-8 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-zinc-800 transition-all shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Remove Avatar Confirmation Modal -->
      <Teleport to="body">
        <div v-if="showRemoveConfirm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Fluent backdrop -->
          <div 
            class="fixed inset-0 bg-[#090a0f]/80 backdrop-blur-sm transition-opacity duration-300"
            @click="showRemoveConfirm = false"
          />

          <!-- Modal Dialog Card -->
          <div class="bg-[#1e1d23] border border-white/[0.04] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-fadeIn text-center">
            <div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
              </svg>
            </div>
            <h3 class="text-base font-bold text-white mb-2">Remove Profile Photo?</h3>
            <p class="text-xs text-white/40 mb-6 px-2 leading-relaxed">
              Your profile photo will be permanently removed. This action cannot be undone.
            </p>
            <div class="flex items-center justify-center gap-3">
              <button
                @click="showRemoveConfirm = false"
                class="px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all min-w-[80px]"
              >
                Cancel
              </button>
              <button
                @click="confirmRemoveAvatar"
                class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/20 transition-all min-w-[80px]"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-name">Display Name</label>
        <input
          id="display-name"
          type="text"
          :value="profile.name"
          @input="(e) => emit('change', 'name', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="Alex Rivera"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-title">Professional Title</label>
        <input
          id="display-title"
          type="text"
          :value="profile.title"
          @input="(e) => emit('change', 'title', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="Product Designer & Engineer"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-bio">Short Bio</label>
        <textarea
          id="display-bio"
          :value="profile.bio"
          @input="(e) => emit('change', 'bio', (e.target as HTMLTextAreaElement).value)"
          rows="3"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none"
          placeholder="Brief description about yourself..."
        />
      </div>
    </div>

    <!-- Interactive Canvas Cropper Modal -->
    <AvatarUploader 
      v-if="showCropper" 
      :file="selectedFile!" 
      @crop="handleCropSuccess" 
      @close="showCropper = false" 
    />
  </div>
</template>
