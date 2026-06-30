<script setup lang="ts">
import { ref, onMounted } from 'vue';
import profileData from '../../../data/mockData.json';
import ThemeToggle from '../../ui/ThemeToggle/index.vue';
import LinkCard from '../../profile/LinkCard/index.vue';
import ProfileHeader from '../../profile/ProfileHeader/index.vue';
import ProfileFooter from '../../profile/ProfileFooter/index.vue';
import { supabase, hasSupabaseConfig } from '../../../lib/supabase';

type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized' | 'electric';

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  socials: Record<string, string>;
}

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  accentColor?: string;
}

interface DbLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name: string;
  is_active: boolean;
  sort_order: number;
  featured?: boolean;
  accent_color?: string;
  accentColor?: string;
}

const theme = ref<Theme>('clean-light');
const mounted = ref(false);
const profile = ref<Profile | null>(null);
const links = ref<LinkItem[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const isRetro = computed(() => theme.value === 'retro');



const handleThemeChange = (newTheme: Theme) => {
  theme.value = newTheme;
  localStorage.setItem('user-theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);
};

onMounted(async () => {
  const allowedThemes: Theme[] = ['clean-light', 'pitch-dark', 'retro', 'fluent', 'solarized', 'electric'];

  async function loadData() {
    if (!hasSupabaseConfig || !supabase) {
      console.log("Supabase credentials not configured. Using local/localStorage mock data.");
      const localProfile = localStorage.getItem('cms-profile');
      const localLinks = localStorage.getItem('cms-links');
      
      const loadedProfile = localProfile ? JSON.parse(localProfile) : profileData.profile;
      profile.value = loadedProfile;
      links.value = localLinks ? JSON.parse(localLinks) : profileData.links;
      
      const activeTheme = loadedProfile.active_theme || loadedProfile.activeTheme;
      const savedTheme = localStorage.getItem('user-theme') as Theme;
      const initialTheme = (savedTheme && allowedThemes.includes(savedTheme))
        ? savedTheme
        : (activeTheme && allowedThemes.includes(activeTheme))
          ? activeTheme
          : 'clean-light';
      theme.value = initialTheme;
      document.documentElement.setAttribute('data-theme', initialTheme);
      
      loading.value = false;
      mounted.value = true;
      return;
    }

    try {
      loading.value = true;
      // Fetch the active profile
      const { data: profileDataDb, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)
        .single();

      if (profileError) throw profileError;

      if (profileDataDb) {
        const mappedProfile: Profile = {
          name: profileDataDb.display_name,
          title: profileDataDb.title || 'Creative Technologist',
          bio: profileDataDb.bio,
          avatar: profileDataDb.avatar_url,
          socials: profileDataDb.socials || profileData.profile.socials,
        };
        profile.value = mappedProfile;

        // Apply active theme
        const activeTheme = profileDataDb.active_theme as Theme;
        let targetTheme: Theme = 'clean-light';
        const savedTheme = localStorage.getItem('user-theme') as Theme;
        
        if (savedTheme && allowedThemes.includes(savedTheme)) {
          targetTheme = savedTheme;
        } else if (activeTheme && allowedThemes.includes(activeTheme)) {
          targetTheme = activeTheme;
        }
        
        theme.value = targetTheme;
        document.documentElement.setAttribute('data-theme', targetTheme);

        // Fetch active links
        const { data: linksDataDb, error: linksError } = await supabase
          .from('links')
          .select('*')
          .eq('profile_id', profileDataDb.id)
          .eq('is_active', true)
          .order('sort_order', { ascending: true });

        if (linksError) throw linksError;

        if (linksDataDb) {
          const mappedLinks = (linksDataDb as DbLink[]).map((link: DbLink) => ({
            id: link.id,
            title: link.title,
            description: link.description || '',
            url: link.url,
            icon: link.icon_name,
            featured: link.featured || false,
            accentColor: link.accent_color || link.accentColor || undefined
          }));
          links.value = mappedLinks;
        }
      }
    } catch (err: any) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error("Error loading data from Supabase:", errMsg);
      error.value = errMsg;
      // Fallback
      profile.value = profileData.profile;
      links.value = profileData.links;
      
      const savedTheme = localStorage.getItem('user-theme') as Theme;
      const initialTheme = (savedTheme && allowedThemes.includes(savedTheme)) ? savedTheme : 'clean-light';
      theme.value = initialTheme;
      document.documentElement.setAttribute('data-theme', initialTheme);
    } finally {
      loading.value = false;
      mounted.value = true;
    }
  }

  loadData();
});
</script>

<template>
  <div v-if="!mounted || loading" class="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
    <div class="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    <p class="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">Loading Experience...</p>
  </div>
  
  <div v-else :class="['min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300', isRetro ? 'retro-grid' : '']">
    <!-- Floating Theme Switcher (bottom-right FAB) -->
    <ThemeToggle :currentTheme="theme" @theme-change="handleThemeChange" />

    <!-- Main Link-in-Bio Container -->
    <main class="w-full max-w-xl px-4 flex-1 flex flex-col items-center">
      <!-- Dynamic Profile Header -->
      <ProfileHeader v-if="profile" :profile="profile" :theme="theme" />

      <!-- Dynamic Link List -->
      <section :class="['w-full flex flex-col mb-12 mt-4', theme === 'electric' ? 'gap-0 electric-list' : 'gap-4']">
        <LinkCard v-for="link in links" :key="link.id" :link="link" :theme="theme" />
      </section>
    </main>

    <!-- Dynamic Profile Footer -->
    <ProfileFooter v-if="profile" :name="profile.name" :isRetro="isRetro" />
  </div>
</template>

<style scoped src="~/assets/css/pages/index.css"></style>
