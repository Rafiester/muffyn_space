import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useRouter } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const username = ref("");
    const password = ref("");
    const error = ref(null);
    const loading = ref(false);
    const mounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (mounted.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#1e1d23] text-slate-100 flex items-center justify-center relative overflow-hidden font-sans" }, _attrs))}><div class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#af413c]/10 blur-[100px] pointer-events-none"></div><div class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#af413c]/5 blur-[100px] pointer-events-none"></div><div class="w-full max-w-md px-6 py-10 bg-[#1a1a24]/90 border border-white/[0.04] rounded-2xl shadow-2xl backdrop-blur-xl relative z-10 mx-4"><div class="text-center mb-8"><div class="inline-flex items-center justify-center p-3 rounded-2xl bg-[#af413c]/10 border border-[#af413c]/20 text-[#e8736e] mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"></path></svg></div><h1 class="text-2xl font-bold tracking-tight text-white mb-2">Web Admin Portal</h1><p class="text-sm text-white/40">Sign in to manage profile &amp; links</p></div><form class="space-y-6"><div><label class="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2" for="username"> Username </label><input id="username" type="text" required${ssrRenderAttr("value", username.value)} class="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white text-sm transition-all placeholder-white/20" placeholder="e.g. admin"></div><div><label class="block text-[10px] font-bold uppercase tracking-wider text-white/30 mb-2" for="password"> Password </label><input id="password" type="password" required${ssrRenderAttr("value", password.value)} class="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white text-sm transition-all placeholder-white/20" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"></div>`);
        if (error.value) {
          _push(`<div class="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 shrink-0"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"></path></svg><span>${ssrInterpolate(error.value)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="w-full py-3 px-4 bg-gradient-to-r from-[#c94a44] to-[#af413c] hover:from-[#d4534d] hover:to-[#b84842] disabled:opacity-50 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-[#af413c]/15 transition-all outline-none flex items-center justify-center gap-2">`);
        if (loading.value) {
          _push(`<!--[--><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Authenticating...</span><!--]-->`);
        } else {
          _push(`<span>Sign In</span>`);
        }
        _push(`</button></form><div class="mt-8 pt-6 border-t border-white/[0.04] text-center flex flex-col items-center gap-2"><button type="button" class="px-2.5 py-1 bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 rounded-md text-[10px] font-bold transition-all"> Autofill Credentials </button><span class="text-[9px] text-white/20"> Username: admin / Password: admin </span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/th3w3b4dm1n/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Bvd8dG4h.mjs.map
