<script setup lang="ts">
type Theme = 'minimalist' | 'minimalist-dark' | 'retro';

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

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  if (file.size > 204800) {
    alert("File is too large! Maximum allowed size is 200KB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      emit('change', 'avatar', reader.result);
    }
  };
  reader.readAsDataURL(file);
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
        <div class="flex items-center gap-4">
          <!-- Avatar Preview -->
          <div class="w-20 h-20 rounded-full overflow-hidden bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
            <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar Preview" class="w-full h-full object-cover" />
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white/20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>

          <!-- Upload actions and description -->
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2">
              <label class="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 h-10">
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
                @click="emit('change', 'avatar', '')"
                class="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-all h-10"
              >
                Remove Image
              </button>
            </div>
            <span class="text-[10px] text-white/20 block">
              Max size: 200KB. Square ratio (PNG/JPG/SVG) recommended. Only file uploads accepted.
            </span>
          </div>
        </div>
      </div>

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
  </div>
</template>
