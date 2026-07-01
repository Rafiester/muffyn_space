<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from '#app';
import { supabase, hasSupabaseConfig } from '../../../lib/supabase';

const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref<string | null>(null);
const loading = ref(false);
const mounted = ref(false);

useHead({
  htmlAttrs: {
    style: 'background-color: #1e1d23 !important;'
  },
  bodyAttrs: {
    style: 'background-color: #1e1d23 !important;'
  },
  meta: [
    { name: 'theme-color', content: '#1e1d23' }
  ]
});

const setCookie = (name: string, value: string, maxAgeSeconds: number) => {
  const cookie = useCookie(name, { maxAge: maxAgeSeconds, path: '/', sameSite: 'lax', secure: true });
  cookie.value = value;
};

const getCookie = (name: string): string | null => {
  const cookie = useCookie(name);
  return cookie.value || null;
};

onMounted(() => {
  mounted.value = true;
});

function generateRealJWT(payloadData: object, secret: string = 'antigravity-secret'): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const base64UrlEncode = (obj: object) => {
    const str = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(str);
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };
  const headerPart = base64UrlEncode(header);
  const payloadPart = base64UrlEncode(payloadData);
  const signaturePart = btoa(headerPart + '.' + payloadPart + '.' + secret)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `${headerPart}.${payloadPart}.${signaturePart}`;
}

const handleLogin = async (e: Event) => {
  e.preventDefault();
  error.value = null;
  loading.value = true;

  // 1. Instantly bypass Supabase Auth if credentials match local admin/admin fallback
  if (username.value === 'admin' && password.value === 'admin') {
    setTimeout(() => {
      const now = Math.floor(Date.now() / 1000);
      const accessPayload = {
        sub: 'local-admin-uid-12345',
        role: 'admin',
        iss: 'muffytreen-app',
        iat: now,
        exp: now + 3600
      };
      const refreshPayload = {
        sub: 'local-admin-uid-12345',
        type: 'refresh',
        iss: 'muffytreen-app',
        iat: now,
        exp: now + 604800
      };

      const realAccessToken = generateRealJWT(accessPayload);
      const realRefreshToken = generateRealJWT(refreshPayload);

      setCookie('admin-access-token', realAccessToken, 3600);
      setCookie('admin-refresh-token', realRefreshToken, 604800);
      localStorage.setItem('admin-session', 'true');
      router.push('/th3w3b4dm1n');
    }, 600);
    return;
  }

  // 2. Try real Supabase Auth for any other credentials
  if (hasSupabaseConfig && supabase) {
    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: username.value,
        password: password.value,
      });

      if (authErr) {
        throw authErr;
      }

      if (data?.session) {
        setCookie('admin-access-token', data.session.access_token, data.session.expires_in || 3600);
        if (data.session.refresh_token) {
          setCookie('admin-refresh-token', data.session.refresh_token, 604800);
        }
        localStorage.setItem('admin-session', 'true');
        router.push('/th3w3b4dm1n');
        return;
      }
    } catch (err: any) {
      console.warn("Supabase auth error:", err.message);
      error.value = err.message || 'Invalid credentials. Please try again.';
      loading.value = false;
      return;
    }
  } else {
    // If Supabase not configured and not admin/admin
    error.value = 'Invalid username or password. Please try again.';
    loading.value = false;
  }
};

const handleAutofill = () => {
  username.value = 'admin';
  password.value = 'admin';
};
</script>

<template>
  <div v-if="mounted" class="min-h-screen bg-[#1e1d23] text-slate-100 flex items-center justify-center relative overflow-hidden font-sans">
    <!-- Fluent Background Orbs / Glows -->
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#af413c]/10 blur-[150px] pointer-events-none" />
    <div class="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#af413c]/10 blur-[150px] pointer-events-none" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#12131a]/50 blur-[200px] pointer-events-none" />

    <!-- Fluent Darkmatte Login Card -->
    <div class="w-full max-w-[440px] px-8 py-10 bg-[#0f111a]/85 border border-white/[0.08] rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl relative z-10 mx-4 transition-all duration-300 hover:border-white/[0.12]">
      <!-- Header -->
      <div class="text-center mb-9">
        <div class="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-br from-[#af413c]/10 to-[#af413c]/5 border border-white/[0.06] text-[#e8736e] mb-5 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-7 h-7 text-[#e8736e]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h1 class="text-2xl font-extrabold tracking-tight text-white mb-2 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
          Admin Portal
        </h1>
        <p class="text-xs text-slate-400/80 font-medium">Manage your personal portfolio & links experience</p>
      </div>

      <!-- Login Form -->
      <form @submit="handleLogin" class="space-y-5">
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#e8736e]/80 mb-2" for="username">
            Username
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </span>
            <input
              id="username"
              type="text"
              required
              v-model="username"
              class="w-full pl-10 pr-4 py-3 bg-[#0a0b10] border border-white/[0.06] focus:border-[#af413c]/80 focus:ring-1 focus:ring-[#af413c]/25 rounded-2xl outline-none text-white text-sm transition-all placeholder-white/10 shadow-inner"
              placeholder="Enter username"
            />
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#e8736e]/80 mb-2" for="password">
            Password
          </label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-500 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <input
              id="password"
              type="password"
              required
              v-model="password"
              class="w-full pl-10 pr-4 py-3 bg-[#0a0b10] border border-white/[0.06] focus:border-[#af413c]/80 focus:ring-1 focus:ring-[#af413c]/25 rounded-2xl outline-none text-white text-sm transition-all placeholder-white/10 shadow-inner"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Error box -->
        <div v-if="error" class="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-2xl flex items-start gap-2.5 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0 mt-0.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span class="leading-relaxed">{{ error }}</span>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3.5 px-4 bg-[#af413c] hover:bg-[#c94a44] disabled:opacity-50 text-white font-bold text-sm tracking-wide rounded-2xl shadow-lg shadow-[#af413c]/15 transition-all outline-none flex items-center justify-center gap-2 transform active:scale-[0.98]"
        >
          <template v-if="loading">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Authenticating...</span>
          </template>
          <template v-else>
            <span>Sign In</span>
          </template>
        </button>
      </form>

      <!-- Autofill Panel -->
      <div class="mt-8 pt-6 border-t border-white/[0.04] text-center flex flex-col items-center gap-2">
        <button
          type="button"
          @click="handleAutofill"
          class="px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] text-slate-300 rounded-xl text-[10px] font-bold transition-all flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 text-[#e8736e]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span>Autofill Demo Admin</span>
        </button>
        <span class="text-[9px] text-slate-500 font-medium">
          Fallback credentials: username <b>admin</b> / password <b>admin</b>
        </span>
      </div>
    </div>
  </div>
</template>
