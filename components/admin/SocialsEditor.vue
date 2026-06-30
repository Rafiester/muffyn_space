<script setup lang="ts">
interface Socials {
  github: string;
  twitter: string;
  linkedin: string;
  email: string;
}

defineProps<{
  socials: Socials;
}>();

const emit = defineEmits<{
  (e: 'change', key: keyof Socials, value: string): void;
}>();
</script>

<template>
  <div class="bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm mt-6">
    <h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6">
      Social Accounts
    </h2>

    <div class="space-y-4">
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-github">GitHub URL</label>
        <input
          id="social-github"
          type="text"
          :value="socials.github"
          @input="(e) => emit('change', 'github', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="https://github.com/username"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-twitter">Twitter URL</label>
        <input
          id="social-twitter"
          type="text"
          :value="socials.twitter"
          @input="(e) => emit('change', 'twitter', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="https://twitter.com/username"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-linkedin">LinkedIn URL</label>
        <input
          id="social-linkedin"
          type="text"
          :value="socials.linkedin"
          @input="(e) => emit('change', 'linkedin', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-email">Email Address</label>
        <input
          id="social-email"
          type="email"
          :value="socials.email"
          @input="(e) => emit('change', 'email', (e.target as HTMLInputElement).value)"
          class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"
          placeholder="hello@example.com"
        />
      </div>
    </div>
  </div>
</template>
