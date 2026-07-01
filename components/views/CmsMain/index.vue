<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from '#app';
import profileData from '../../../data/mockData.json';
import { supabase, hasSupabaseConfig } from '../../../lib/supabase';

import ProfileEditor from '../../admin/ProfileEditor/index.vue';
import SocialsEditor from '../../admin/SocialsEditor/index.vue';
import LinksManager from '../../admin/LinksManager/index.vue';
import SettingsEditor from '../../admin/SettingsEditor/index.vue';
import Sidebar from '../../admin/Sidebar/index.vue';


type Theme = 'clean-light' | 'pitch-dark' | 'retro' | 'fluent' | 'solarized';
type TabType = 'dashboard' | 'home' | 'about' | 'settings';

interface SocialCard {
  url: string;
  icon: string;
}

interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  active_theme: Theme;
  meta_title?: string;
  meta_description?: string;
  electricAccentColor?: string;
  socials: Record<string, SocialCard | string> | any;
}

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  featured: boolean;
  is_active?: boolean;
}

interface DbLinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon_name?: string;
  featured?: boolean;
  is_active?: boolean;
}

const router = useRouter();
const mounted = ref(false);
const loading = ref(true);
const saving = ref(false);
const toast = ref<{ message: string; type: 'success' | 'error' } | null>(null);

useHead({
  title: 'CMS Space',
  htmlAttrs: {
    style: 'background-color: #1e1d23 !important;'
  },
  bodyAttrs: {
    style: 'background-color: #1e1d23 !important;'
  },
  meta: [
    {
      name: 'theme-color',
      content: '#1e1d23'
    }
  ]
});
// Tab State
const activeTab = ref<TabType>('dashboard');

const migrateSocials = (rawSocials: any) => {
  if (!rawSocials) return profileData.profile.socials;
  if (rawSocials.card1 || rawSocials.card2 || typeof rawSocials.github === 'undefined') {
    return rawSocials;
  }
  return {
    card1: { url: rawSocials.github || '', icon: 'github' },
    card2: { url: rawSocials.twitter || '', icon: 'twitter' },
    card3: { url: rawSocials.linkedin || '', icon: 'linkedin' },
    card4: { url: rawSocials.email || '', icon: 'email' },
    meta_title: rawSocials.meta_title,
    meta_description: rawSocials.meta_description
  };
};

// Profile State
const profile = ref<Profile>({
  name: '',
  title: '',
  bio: '',
  avatar: '',
  active_theme: 'clean-light',
  meta_title: '',
  meta_description: '',
  electricAccentColor: '',
  socials: migrateSocials(null)
});

// Links State
const links = ref<LinkItem[]>([]);
const profileId = ref<string | null>(null);

// Universal Delete Modal State
const deleteTargetIndex = ref<number | null>(null);

// Utility to show toasts
const showToast = (message: string, type: 'success' | 'error') => {
  toast.value = { message, type };
  setTimeout(() => {
    toast.value = null;
  }, 3000);
};

const getCookie = (name: string): string | null => {
  const cookie = useCookie(name);
  return cookie.value || null;
};

const deleteCookie = (name: string) => {
  const cookie = useCookie(name);
  cookie.value = null;
};

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payloadUrl = parts[1];
    const base64 = payloadUrl.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    if (decoded.exp) {
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    }
    return false;
  } catch (e) {
    return true;
  }
};

let expiryCheckInterval: any = null;

// Authentication & Initial Load
onMounted(async () => {
  const accessToken = getCookie('admin-access-token');
  const isAuthed = !!accessToken && !isTokenExpired(accessToken);
  if (!isAuthed) {
    handleLogout();
    return;
  }

  // Set up periodic interval check to detect token removal or expiration in real-time
  expiryCheckInterval = setInterval(() => {
    const currentToken = getCookie('admin-access-token');
    if (isTokenExpired(currentToken)) {
      showToast('Session expired. Redirecting to login...', 'error');
      setTimeout(() => {
        handleLogout();
      }, 1500);
    }
  }, 5000);

  if (hasSupabaseConfig && supabase) {
    const accessToken = getCookie('admin-access-token');
    const refreshToken = getCookie('admin-refresh-token');
    if (accessToken && refreshToken) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
    }
  }

  async function loadCMSData() {
    if (!hasSupabaseConfig || !supabase) {
      console.log("Supabase credentials not configured. Loading editable local state.");
      const localProfile = localStorage.getItem('cms-profile');
      const localLinks = localStorage.getItem('cms-links');

      if (localProfile) {
        const parsed = JSON.parse(localProfile);
        profile.value = {
          name: parsed.name || '',
          title: parsed.title || '',
          bio: parsed.bio || '',
          avatar: parsed.avatar || '',
          active_theme: parsed.active_theme || parsed.activeTheme || 'clean-light',
          meta_title: parsed.meta_title || '',
          meta_description: parsed.meta_description || '',
          electricAccentColor: parsed.electricAccentColor || undefined,
          socials: migrateSocials(parsed.socials)
        };
      } else {
        profile.value = {
          ...profileData.profile,
          active_theme: 'clean-light',
          meta_title: '',
          meta_description: '',
          electricAccentColor: profileData.settings?.electricAccentColor || undefined,
          socials: migrateSocials(profileData.profile.socials)
        } as Profile;
      }

      if (localLinks) {
        links.value = JSON.parse(localLinks);
      } else {
        links.value = profileData.links.map(l => ({ ...l, is_active: true }));
      }
      loading.value = false;
      mounted.value = true;
      return;
    }

    try {
      const { data: dbProfile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (profileErr) throw profileErr;

      if (dbProfile) {
        profileId.value = dbProfile.id;
        const rawSocials = dbProfile.socials || {};
        profile.value = {
          name: dbProfile.display_name || '',
          title: dbProfile.title || '',
          bio: dbProfile.bio || '',
          avatar: dbProfile.avatar_url || '',
          active_theme: dbProfile.active_theme || 'clean-light',
          meta_title: rawSocials.meta_title || '',
          meta_description: rawSocials.meta_description || '',
          electricAccentColor: dbProfile.electric_accent_color || profileData.settings?.electricAccentColor || undefined,
          socials: migrateSocials(rawSocials)
        };

        const { data: dbLinks, error: linksErr } = await supabase
          .from('links')
          .select('*')
          .eq('profile_id', dbProfile.id)
          .order('sort_order', { ascending: true });

        if (linksErr) throw linksErr;

        if (dbLinks) {
          links.value = (dbLinks as DbLinkItem[]).map(link => ({
            id: link.id,
            title: link.title || '',
            description: link.description || '',
            url: link.url || '',
            icon: link.icon_name || 'globe',
            featured: link.featured || false,
            is_active: link.is_active !== false
          }));
        }
      }
    } catch (err: any) {
      const errMsg = err instanceof Error ? err.message : String(err);
      showToast(`Failed loading Supabase data: ${errMsg}`, 'error');
      profile.value = {
        ...profileData.profile,
        active_theme: 'clean-light',
        meta_title: '',
        meta_description: '',
        electricAccentColor: profileData.settings?.electricAccentColor || undefined,
        socials: migrateSocials(profileData.profile.socials)
      } as Profile;
      links.value = profileData.links.map(l => ({ ...l, is_active: true }));
    } finally {
      loading.value = false;
      mounted.value = true;
    }
  }

  loadCMSData();
});

// Handle updates to profile fields
const handleProfileChange = (key: keyof Profile, value: any) => {
  profile.value = {
    ...profile.value,
    [key]: value
  };
};

// Handle updates to settings fields (theme & meta)
const handleSettingsChange = (
  key: 'active_theme' | 'meta_title' | 'meta_description' | 'electricAccentColor',
  value: string
) => {
  profile.value = {
    ...profile.value,
    [key]: value
  };
};

// Handle updates to socials
const handleSocialChange = (key: string, value: any) => {
  profile.value = {
    ...profile.value,
    socials: {
      ...profile.value.socials,
      [key]: value
    }
  };
};

// Handle changes to a specific link
const handleLinkChange = (index: number, key: keyof LinkItem, value: any) => {
  const updated = [...links.value];
  updated[index] = {
    ...updated[index],
    [key]: value
  };
  links.value = updated;
};

// Add a new link
const addLink = () => {
  const newLink: LinkItem = {
    id: `new-${Date.now()}`,
    title: 'New Link Title',
    description: '',
    url: 'https://',
    icon: 'globe',
    featured: false,
    is_active: true
  };
  links.value = [...links.value, newLink];
};

// Trigger Confirmation Delete
const triggerDeleteConfirm = (index: number) => {
  deleteTargetIndex.value = index;
};

// Confirm delete handler
const executeDeleteLink = () => {
  if (deleteTargetIndex.value !== null) {
    links.value = links.value.filter((_, i) => i !== deleteTargetIndex.value);
    deleteTargetIndex.value = null;
  }
};

// Save changes to database or local state
const saveAllChanges = async () => {
  saving.value = true;
  if (!hasSupabaseConfig || !supabase) {
    console.log("Supabase credentials not configured. Saving to localStorage.");
    localStorage.setItem('cms-profile', JSON.stringify(profile.value));
    localStorage.setItem('cms-links', JSON.stringify(links.value));
    showToast('Offline Changes Saved Successfully!', 'success');
    saving.value = false;
    return;
  }

  try {
    if (!profileId.value) throw new Error("No active profile ID loaded.");

    const updatedSocials = {
      ...profile.value.socials,
      meta_title: profile.value.meta_title || null,
      meta_description: profile.value.meta_description || null
    };

    const { error: profileUpdateErr } = await supabase
      .from('profiles')
      .update({
        display_name: profile.value.name,
        title: profile.value.title,
        bio: profile.value.bio,
        avatar_url: profile.value.avatar,
        active_theme: profile.value.active_theme,
        electric_accent_color: profile.value.electricAccentColor || null,
        socials: updatedSocials
      })
      .eq('id', profileId.value);

    if (profileUpdateErr) throw profileUpdateErr;

    const { data: dbLinks, error: fetchErr } = await supabase
      .from('links')
      .select('id')
      .eq('profile_id', profileId.value);

    if (fetchErr) throw fetchErr;

    const dbLinkIds = dbLinks?.map(l => l.id) || [];
    const currentLinkIds = links.value.map(l => l.id).filter(id => !id.startsWith('new-'));
    const idsToDelete = dbLinkIds.filter(id => !currentLinkIds.includes(id));

    if (idsToDelete.length > 0) {
      const { error: deleteErr } = await supabase
        .from('links')
        .delete()
        .in('id', idsToDelete);

      if (deleteErr) throw deleteErr;
    }

    for (let i = 0; i < links.value.length; i++) {
      const link = links.value[i];
      const payload = {
        profile_id: profileId.value,
        title: link.title,
        description: link.description || null,
        url: link.url,
        icon_name: link.icon,
        featured: link.featured,
        is_active: link.is_active !== false,
        sort_order: i
      };

      if (link.id.startsWith('new-')) {
        const { error: insertErr } = await supabase
          .from('links')
          .insert(payload);
        if (insertErr) throw insertErr;
      } else {
        const { error: updateErr } = await supabase
          .from('links')
          .update(payload)
          .eq('id', link.id);
        if (updateErr) throw updateErr;
      }
    }

    showToast('All CMS Changes Published Successfully!', 'success');

    const { data: refreshedLinks, error: refreshErr } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileId.value)
      .order('sort_order', { ascending: true });

    if (!refreshErr && refreshedLinks) {
      links.value = (refreshedLinks as DbLinkItem[]).map(link => ({
        id: link.id,
        title: link.title || '',
        description: link.description || '',
        url: link.url || '',
        icon: link.icon_name || 'globe',
        featured: link.featured || false,
        is_active: link.is_active !== false
      }));
    }
  } catch (err: any) {
    const errMsg = err instanceof Error ? err.message : String(err);
    showToast(`Failed to publish changes: ${errMsg}`, 'error');
  } finally {
    saving.value = false;
  }
};

const handleLogout = () => {
  if (expiryCheckInterval) {
    clearInterval(expiryCheckInterval);
  }
  localStorage.removeItem('admin-session');
  deleteCookie('admin-access-token');
  deleteCookie('admin-refresh-token');
  router.push('/th3w3b4dm1n/login');
};

onBeforeUnmount(() => {
  if (expiryCheckInterval) {
    clearInterval(expiryCheckInterval);
  }
});
</script>

<template>
  <div v-if="!mounted || loading" class="min-h-screen bg-[#1e1d23] flex flex-col items-center justify-center gap-4">
    <div class="w-10 h-10 border-4 border-[#af413c] border-t-transparent rounded-full animate-spin"></div>
    <p class="text-xs font-bold uppercase tracking-widest text-white/30 animate-pulse">Loading CMS Panel...</p>
  </div>

  <div v-else class="min-h-screen bg-[#1e1d23] text-slate-100 flex font-sans">
    <!-- Toast Alert -->
    <div v-if="toast" class="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
      <div :class="['px-5 py-3 rounded-xl border text-xs font-bold shadow-2xl flex items-center gap-2', toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400']">
        <span>{{ toast.message }}</span>
      </div>
    </div>

    <!-- Screen-Level Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="deleteTargetIndex !== null" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Fluent backdrop -->
        <div 
          class="fixed inset-0 bg-[#090a0f]/80 backdrop-blur-sm transition-opacity duration-300"
          @click="deleteTargetIndex = null"
        />

        <!-- Modal Dialog Card -->
        <div class="bg-[#1e1d23] border border-white/[0.04] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-fadeIn text-center">
          <div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-white mb-2">Delete "{{ deleteTargetIndex !== null ? (links[deleteTargetIndex]?.title || 'this item') : '' }}"?</h3>
          <p class="text-xs text-white/40 mb-6 px-2 leading-relaxed">
            This item will be permanently removed from your experience portfolio. This action cannot be undone.
          </p>
          <div class="flex items-center justify-center gap-3">
            <button
              @click="deleteTargetIndex = null"
              class="px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all min-w-[80px]"
            >
              Cancel
            </button>
            <button
              @click="executeDeleteLink"
              class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/20 transition-all min-w-[80px]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <Sidebar
      :activeTab="activeTab"
      @tabSelect="(tab) => activeTab = tab"
      @logout="handleLogout"
    />

    <!-- Main Workspace Frame — permanently offset by sidebar width (260px) -->
    <div class="flex-1 flex flex-col min-h-screen pl-[260px]">


      <!-- Content Container -->
      <main class="max-w-full w-full mx-auto px-6 py-10 flex-1 flex flex-col justify-start">
        <!-- Active Title Block -->
        <div class="mb-2">
          <div>
            <h2 class="text-2xl font-black !text-white tracking-tight">
              <span v-if="activeTab === 'dashboard'">Dashboard</span>
              <span v-else-if="activeTab === 'about'">About me</span>
              <span v-else-if="activeTab === 'home'">Items</span>
              <span v-else-if="activeTab === 'settings'">Settings</span>
            </h2>
            <p class="text-sm !text-slate-400 mt-1">
              <span v-if="activeTab === 'dashboard'">Welcome to the administration panel.</span>
              <span v-else-if="activeTab === 'about'">Configure your About me content.</span>
              <span v-else-if="activeTab === 'home'">Configure your Items content.</span>
              <span v-else-if="activeTab === 'settings'">Configure your Settings content.</span>
            </p>
          </div>
          <div class="border-b border-slate-900/60 my-3" />
        </div>

        <!-- Tab Panels -->
        <!-- Dashboard -->
        <div v-if="activeTab === 'dashboard'" class="flex-1 flex items-center justify-center py-20">
          <p class="text-xs text-slate-500 text-center max-w-sm leading-relaxed">
            Dashboard main view is currently empty. Navigate to other sections in the sidebar to configure content.
          </p>
        </div>

        <!-- About -->
        <div v-else-if="activeTab === 'about'" class="space-y-6 animate-fadeIn">
          <ProfileEditor 
            :profile="profile" 
            @change="handleProfileChange" 
          />
          <SocialsEditor 
            :socials="profile.socials" 
            @change="handleSocialChange" 
          />
        </div>

        <!-- Items -->
        <div v-else-if="activeTab === 'home'" class="animate-fadeIn">
          <LinksManager
            :links="links"
            :saving="saving"
            @addLink="addLink"
            @linkChange="handleLinkChange"
            @deleteLink="triggerDeleteConfirm"
            @reorderAll="(reordered) => links = reordered"
            @saveAll="saveAllChanges"
          />
        </div>

        <!-- Settings -->
        <div v-else-if="activeTab === 'settings'" class="animate-fadeIn">
          <SettingsEditor 
            :settings="{
              active_theme: profile.active_theme,
              meta_title: profile.meta_title,
              meta_description: profile.meta_description,
              electricAccentColor: profile.electricAccentColor
            }" 
            @change="handleSettingsChange" 
          />
        </div>

        <!-- Unified Bottom Save Changes Button -->
        <div v-if="activeTab !== 'dashboard'" class="mt-4 pt-4 border-t border-white/[0.04] flex justify-end pr-6">
          <button
            @click="saveAllChanges"
            :disabled="saving"
            class="px-6 py-2.5 bg-[#af413c] hover:bg-[#c94a44] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#af413c]/10 min-w-[140px]"
          >
            {{ saving ? 'Saving Changes...' : 'Save Changes' }}
          </button>
        </div>
      </main>
    </div>
  </div>
</template>
