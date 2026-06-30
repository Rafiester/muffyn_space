import { defineComponent, computed, mergeProps, useSSRContext, unref, ref } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from "vue/server-renderer";
import { h as hasSupabaseConfig } from "./supabase-BdpgkN5e.js";
import "@supabase/supabase-js";
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  props: {
    currentTheme: {}
  },
  emits: ["themeChange"],
  setup(__props, { emit: __emit }) {
    computed(() => props.currentTheme === "retro");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "relative flex items-center p-1.5 gap-1.5 z-50 transition-all duration-300",
          __props.currentTheme === "retro" ? "bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none" : "bg-[var(--bg-card)] border border-[var(--border-card)] shadow-sm rounded-full backdrop-blur-md"
        ]
      }, _attrs))}><button aria-label="Switch to Minimal Light" class="${ssrRenderClass([
        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200",
        __props.currentTheme === "minimalist" ? __props.currentTheme === "retro" ? "bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm" : __props.currentTheme === "retro" ? "hover:bg-slate-100 text-black border-2 border-transparent font-medium" : "hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg><span class="${ssrRenderClass(__props.currentTheme === "retro" ? "font-bold font-mono" : "font-sans")}">Light</span></button><button aria-label="Switch to Minimal Dark" class="${ssrRenderClass([
        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200",
        __props.currentTheme === "minimalist-dark" ? __props.currentTheme === "retro" ? "bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm" : __props.currentTheme === "retro" ? "hover:bg-slate-100 text-black border-2 border-transparent font-medium" : "hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg><span class="${ssrRenderClass(__props.currentTheme === "retro" ? "font-bold font-mono" : "font-sans")}">Dark</span></button><button aria-label="Switch to 90s Retro" class="${ssrRenderClass([
        "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider select-none transition-all duration-200",
        __props.currentTheme === "retro" ? __props.currentTheme === "retro" ? "bg-[#ec4899] text-white border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]" : "bg-[var(--text-title)] text-[var(--bg-card)] rounded-full scale-105 shadow-sm" : __props.currentTheme === "retro" ? "hover:bg-slate-100 text-black border-2 border-transparent font-medium" : "hover:text-[var(--text-title)] text-[var(--text-body)] rounded-full"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="20" height="12" x="2" y="6" rx="2"></rect><path d="M6 12h.01M10 12h.01M14 12h4"></path></svg><span class="${ssrRenderClass(__props.currentTheme === "retro" ? "font-bold font-mono" : "font-sans")}">Retro</span></button></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ThemeToggle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props2, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LinkCard",
  __ssrInlineRender: true,
  props: {
    link: {},
    theme: {}
  },
  setup(__props) {
    const props2 = __props;
    const isRetro = computed(() => props2.theme === "retro");
    const isDark = computed(() => props2.theme === "minimalist-dark");
    const customGlowStyle = computed(() => {
      if (!isRetro.value && props2.link.accentColor) {
        return {
          "--hover-glow": `${props2.link.accentColor}1c`,
          // hex + 11% opacity
          "--hover-border": props2.link.accentColor
        };
      }
      return {};
    });
    const isCustomIcon = computed(() => {
      const icon = props2.link.icon;
      return icon.startsWith("data:image/") || icon.startsWith("http://") || icon.startsWith("https://");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: __props.link.url,
        target: "_blank",
        rel: "noopener noreferrer",
        style: unref(customGlowStyle),
        class: [
          "group relative block w-full p-4 md:p-5 theme-card overflow-hidden",
          unref(isRetro) ? "bg-white text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-yellow-50" : "hover:scale-[1.01]",
          __props.link.featured && unref(isRetro) ? "bg-cyan-200 border-[3.5px]" : "",
          __props.link.featured && !unref(isRetro) ? "ring-2 ring-indigo-500/20" : ""
        ]
      }, _attrs))}>`);
      if (__props.link.featured) {
        _push(`<div class="${ssrRenderClass([
          "absolute top-0 left-0 w-2 h-full",
          unref(isRetro) ? "bg-black" : "bg-indigo-600"
        ])}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4 relative z-10"><div class="${ssrRenderClass([
        "flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shrink-0",
        unref(isRetro) ? "bg-black text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : unref(isDark) ? "bg-slate-900 text-slate-100 rounded-xl" : "bg-slate-100 text-slate-800 rounded-xl"
      ])}" style="${ssrRenderStyle(!unref(isRetro) && __props.link.accentColor ? { color: __props.link.accentColor, backgroundColor: `${__props.link.accentColor}12` } : {})}">`);
      if (unref(isCustomIcon)) {
        _push(`<img${ssrRenderAttr("src", __props.link.icon)} alt="" class="w-5 h-5 object-contain rounded">`);
      } else {
        _push(`<!--[-->`);
        if (__props.link.icon.toLowerCase() === "globe") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`);
        } else if (__props.link.icon.toLowerCase() === "youtube") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><polygon points="10 15 15 12 10 9" fill="currentColor"></polygon></svg>`);
        } else if (__props.link.icon.toLowerCase() === "figma") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22h-.03a3.47 3.47 0 0 1-3.47-3.5z"></path></svg>`);
        } else if (__props.link.icon.toLowerCase() === "github") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`);
        } else if (__props.link.icon.toLowerCase() === "newsletter" || __props.link.icon.toLowerCase() === "email") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="m10 15 5-3-5-3"></path></svg>`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div><div class="flex-1 text-left min-w-0"><div class="flex items-center gap-2"><h3 class="${ssrRenderClass([
        "text-base font-bold truncate leading-tight",
        unref(isRetro) ? "font-mono uppercase font-black tracking-tight text-black" : "font-sans text-[var(--text-title)]"
      ])}">${ssrInterpolate(__props.link.title)}</h3>`);
      if (__props.link.featured) {
        _push(`<span class="${ssrRenderClass([
          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none",
          unref(isRetro) ? "bg-black text-white rounded-none border border-black font-black" : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
        ])}"> Featured </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="${ssrRenderClass([
        "text-xs mt-1 truncate",
        unref(isRetro) ? "font-mono text-black font-medium" : "font-sans text-[var(--text-body)]"
      ])}">${ssrInterpolate(__props.link.description)}</p></div><div class="${ssrRenderClass([
        "transition-all duration-300 shrink-0",
        unref(isRetro) ? "text-black group-hover:translate-x-1.5" : "text-[var(--text-body)] group-hover:text-[var(--text-title)] group-hover:translate-x-1"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></div></div>`);
      if (!unref(isRetro) && __props.link.accentColor) {
        _push(`<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style="${ssrRenderStyle({
          background: `radial-gradient(circle at 10% 20%, ${__props.link.accentColor}0a 0%, transparent 50%)`
        })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</a>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/LinkCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props2, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProfileHeader",
  __ssrInlineRender: true,
  props: {
    profile: {},
    isRetro: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: [
          "w-full flex flex-col items-center text-center p-6 md:p-8 mb-8 theme-card",
          __props.isRetro ? "bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none" : ""
        ]
      }, _attrs))}><div class="relative group mb-5">`);
      if (!__props.isRetro) {
        _push(`<div class="absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" style="${ssrRenderStyle({ "background-image": "var(--accent-gradient)" })}"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img${ssrRenderAttr("src", __props.profile.avatar)}${ssrRenderAttr("alt", `${__props.profile.name}'s Avatar`)} class="${ssrRenderClass([
        "w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105",
        __props.isRetro ? "border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200" : "border-2 border-white dark:border-slate-800 rounded-full shadow-inner"
      ])}"></div><h1 class="${ssrRenderClass([
        "text-2xl md:text-3xl leading-tight mb-2",
        __props.isRetro ? "font-mono font-black uppercase text-black" : "font-sans text-[var(--text-title)] tracking-tight"
      ])}">${ssrInterpolate(__props.profile.name)}</h1><p class="${ssrRenderClass([
        "text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block",
        __props.isRetro ? "bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black" : "rounded-full font-sans"
      ])}" style="${ssrRenderStyle(!__props.isRetro ? { backgroundColor: "var(--accent-bg)", color: "var(--accent-text)" } : {})}">${ssrInterpolate(__props.profile.title)}</p><p class="${ssrRenderClass([
        "text-sm leading-relaxed max-w-sm mb-6",
        __props.isRetro ? "font-mono text-black font-semibold" : "font-sans text-[var(--text-body)]"
      ])}">${ssrInterpolate(__props.profile.bio)}</p><div class="flex gap-4 items-center justify-center">`);
      if (__props.profile.socials) {
        _push(`<!--[-->`);
        ssrRenderList(Object.entries(__props.profile.socials), ([platform, url]) => {
          _push(`<a${ssrRenderAttr("href", url)} target="_blank" rel="noopener noreferrer"${ssrRenderAttr("aria-label", `${__props.profile.name}'s ${platform}`)} class="${ssrRenderClass([
            "p-2.5 transition-all duration-300",
            __props.isRetro ? "bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110"
          ])}">`);
          if (platform === "github") {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path></svg>`);
          } else if (platform === "twitter") {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>`);
          } else if (platform === "linkedin") {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>`);
          } else {
            _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`);
          }
          _push(`</a>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProfileFooter",
  __ssrInlineRender: true,
  props: {
    name: {},
    isRetro: { type: Boolean }
  },
  setup(__props) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "text-center mt-auto px-4 z-10 relative" }, _attrs))}><p class="${ssrRenderClass([
        "text-[11px] uppercase tracking-widest opacity-60",
        __props.isRetro ? "font-mono text-black font-bold" : "font-sans text-[var(--text-body)]"
      ])}"> © ${ssrInterpolate(unref(currentYear))} ${ssrInterpolate(__props.name)} • Supabase CMS Integration </p></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("minimalist");
    const mounted = ref(false);
    const profile = ref(null);
    const links = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const isRetro = computed(() => theme.value === "retro");
    const handleThemeChange = (newTheme) => {
      theme.value = newTheme;
      localStorage.setItem("user-theme", newTheme);
      (void 0).documentElement.setAttribute("data-theme", newTheme);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!mounted.value || loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4" }, _attrs))}><div class="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div><p class="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">Loading Experience...</p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300", unref(isRetro) ? "retro-grid" : ""]
        }, _attrs))}><header class="w-full max-w-xl px-4 flex justify-between items-center mb-8 relative z-50"><div class="flex items-center gap-1.5"><span class="${ssrRenderClass(["w-2 h-2 rounded-full", unref(hasSupabaseConfig) && !error.value ? "bg-emerald-500 animate-pulse" : "bg-amber-500"])}"></span><span class="${ssrRenderClass(["text-[9px] uppercase font-bold tracking-wider select-none", unref(isRetro) ? "font-mono text-black font-black bg-white px-2 py-0.5 border-[2px] border-black" : "text-[var(--text-body)] opacity-70"])}">${ssrInterpolate(unref(hasSupabaseConfig) && !error.value ? "Supabase Live" : "Mock CMS Mode")}</span></div>`);
        _push(ssrRenderComponent(_sfc_main$4, {
          currentTheme: theme.value,
          onThemeChange: handleThemeChange
        }, null, _parent));
        _push(`</header><main class="w-full max-w-xl px-4 flex-1 flex flex-col items-center">`);
        if (profile.value) {
          _push(ssrRenderComponent(_sfc_main$2, {
            profile: profile.value,
            isRetro: unref(isRetro)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="w-full flex flex-col gap-4 mb-12"><!--[-->`);
        ssrRenderList(links.value, (link) => {
          _push(ssrRenderComponent(_sfc_main$3, {
            key: link.id,
            link,
            theme: theme.value
          }, null, _parent));
        });
        _push(`<!--]--></section></main>`);
        if (profile.value) {
          _push(ssrRenderComponent(_sfc_main$1, {
            name: profile.value.name,
            isRetro: unref(isRetro)
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BVA0z88U.js.map
