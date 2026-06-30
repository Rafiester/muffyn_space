import { defineComponent, ref, mergeProps, computed, unref, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { u as useRouter } from './server.mjs';
import { createClient } from '@supabase/supabase-js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const getEnvVar = (name) => {
  return process.env[`VITE_${name}`] || process.env[`NEXT_PUBLIC_${name}`] || "";
};
const supabaseUrl = getEnvVar("SUPABASE_URL");
const supabaseAnonKey = getEnvVar("SUPABASE_ANON_KEY");
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<header${ssrRenderAttrs(mergeProps({ className: "border-b border-white/[0.04] bg-[#1a1a24]/80 backdrop-blur-xl sticky top-0 z-40" }, _attrs))}><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex items-center gap-2.5"><div className="leading-none"><h1 className="text-sm font-semibold text-white/85 tracking-tight">Muffytreen CMS</h1></div></div></div><div className="flex items-center gap-2"></div></div></header>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/DashboardHeader.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const DashboardHeader = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]);
const canvasWidth = 240;
const canvasHeight = 240;
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AvatarUploader",
  __ssrInlineRender: true,
  props: {
    file: {}
  },
  emits: ["crop", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const previewCanvas = ref(null);
    const imageElement = ref(null);
    const imageUrl = ref("");
    ref("");
    const rendering = ref(false);
    const zoom = ref(1);
    const offsetX = ref(0);
    const offsetY = ref(0);
    watch([zoom, offsetX, offsetY], () => {
      drawPreview();
    });
    const loadImage = () => {
      const reader = new FileReader();
      reader.onload = (event) => {
        var _a;
        imageUrl.value = (_a = event.target) == null ? void 0 : _a.result;
        const img = new Image();
        img.src = imageUrl.value;
        img.onload = () => {
          imageElement.value = img;
          setTimeout(drawPreview, 50);
        };
      };
      reader.readAsDataURL(props.file);
    };
    const drawPreview = () => {
      const canvas = previewCanvas.value;
      const img = imageElement.value;
      if (!canvas || !img) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const sourceMinSize = Math.min(img.width, img.height);
      const cropSize = sourceMinSize / zoom.value;
      const maxOffsetX = (img.width - cropSize) / 2;
      const maxOffsetY = (img.height - cropSize) / 2;
      const centerX = (img.width - cropSize) / 2;
      const centerY = (img.height - cropSize) / 2;
      const actualOffsetX = centerX + offsetX.value / 100 * maxOffsetX;
      const actualOffsetY = centerY + offsetY.value / 100 * maxOffsetY;
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
      ctx.strokeStyle = "#af413c";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2 - 4, 0, Math.PI * 2);
      ctx.stroke();
    };
    loadImage();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4" }, _attrs))} data-v-dac0ccee><div class="bg-[#151419] border border-white/[0.08] rounded-3xl w-full max-w-md p-5 shadow-2xl flex flex-col text-white max-h-[80dvh] overflow-y-auto" data-v-dac0ccee><div class="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06]" data-v-dac0ccee><h3 class="text-sm font-bold uppercase tracking-wider text-white/80" data-v-dac0ccee>Crop &amp; Resize Avatar</h3><button class="text-white/40 hover:text-white p-1 hover:bg-white/[0.04] rounded-full transition-all duration-200" aria-label="Close cropper" data-v-dac0ccee><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5" data-v-dac0ccee><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" data-v-dac0ccee></path></svg></button></div><div class="flex flex-col items-center" data-v-dac0ccee><div class="border border-white/[0.06] p-1 rounded-3xl bg-black/40 mb-4 relative flex items-center justify-center" data-v-dac0ccee><canvas${ssrRenderAttr("width", canvasWidth)}${ssrRenderAttr("height", canvasHeight)} class="rounded-2xl max-w-full" data-v-dac0ccee></canvas></div><div class="w-full space-y-3 px-2 mb-4 text-xs text-white/50" data-v-dac0ccee><div class="space-y-1" data-v-dac0ccee><div class="flex justify-between font-bold uppercase tracking-wider" data-v-dac0ccee><span data-v-dac0ccee>Zoom</span><span class="text-[#af413c]" data-v-dac0ccee>${ssrInterpolate(zoom.value.toFixed(1))}x</span></div><input type="range"${ssrRenderAttr("value", zoom.value)} min="1.0" max="3.0" step="0.1" class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" data-v-dac0ccee></div><div class="space-y-1" data-v-dac0ccee><div class="flex justify-between font-bold uppercase tracking-wider" data-v-dac0ccee><span data-v-dac0ccee>Horizontal Shift</span></div><input type="range"${ssrRenderAttr("value", offsetX.value)} min="-100" max="100" step="1" class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" data-v-dac0ccee></div><div class="space-y-1" data-v-dac0ccee><div class="flex justify-between font-bold uppercase tracking-wider" data-v-dac0ccee><span data-v-dac0ccee>Vertical Shift</span></div><input type="range"${ssrRenderAttr("value", offsetY.value)} min="-100" max="100" step="1" class="w-full accent-[#af413c] cursor-pointer h-1 bg-white/[0.06] rounded appearance-none" data-v-dac0ccee></div></div><div class="flex gap-3 w-full border-t border-white/[0.06] pt-4" data-v-dac0ccee><button class="flex-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all py-2.5" data-v-dac0ccee> Cancel </button><button${ssrIncludeBooleanAttr(rendering.value) ? " disabled" : ""} class="flex-1 bg-[#af413c] hover:bg-[#c94b45] text-white rounded-xl text-xs font-bold transition-all py-2.5 active:scale-95 disabled:opacity-50" data-v-dac0ccee> Save Crop (1024x1024) </button></div></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/AvatarUploader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const AvatarUploader = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-dac0ccee"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProfileEditor",
  __ssrInlineRender: true,
  props: {
    profile: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const selectedFile = ref(null);
    const showCropper = ref(false);
    const handleCropSuccess = (base64) => {
      emit("change", "avatar", base64);
      showCropper.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm" }, _attrs))}><h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6"> Profile Details </h2><div class="space-y-5"><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2">Avatar Profile Image</label><div class="flex items-center gap-4"><div class="w-20 h-20 rounded-full overflow-hidden bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">`);
      if (__props.profile.avatar) {
        _push(`<img${ssrRenderAttr("src", __props.profile.avatar)} alt="Avatar Preview" class="w-full h-full object-cover">`);
      } else {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white/20"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path></svg>`);
      }
      _push(`</div><div class="flex-1 space-y-2"><div class="flex items-center gap-2"><label class="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0 h-10"><span>Upload Profile Avatar</span><input type="file" accept="image/*" class="hidden"></label>`);
      if (__props.profile.avatar) {
        _push(`<button type="button" class="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 rounded-xl text-xs font-bold transition-all h-10"> Remove Image </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="text-[10px] text-white/20 block"> Max size: 1MB. PNG/JPG formats supported. Crop size: 1024x1024. </span></div></div></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-name">Display Name</label><input id="display-name" type="text"${ssrRenderAttr("value", __props.profile.name)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="Alex Rivera"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-title">Professional Title</label><input id="display-title" type="text"${ssrRenderAttr("value", __props.profile.title)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="Product Designer &amp; Engineer"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="display-bio">Short Bio</label><textarea id="display-bio" rows="3" class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none" placeholder="Brief description about yourself...">${ssrInterpolate(__props.profile.bio)}</textarea></div></div>`);
      if (showCropper.value) {
        _push(ssrRenderComponent(AvatarUploader, {
          file: selectedFile.value,
          onCrop: handleCropSuccess,
          onClose: ($event) => showCropper.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ProfileEditor.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SocialsEditor",
  __ssrInlineRender: true,
  props: {
    socials: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm mt-6" }, _attrs))}><h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6"> Social Accounts </h2><div class="space-y-4"><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-github">GitHub URL</label><input id="social-github" type="text"${ssrRenderAttr("value", __props.socials.github)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="https://github.com/username"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-twitter">Twitter URL</label><input id="social-twitter" type="text"${ssrRenderAttr("value", __props.socials.twitter)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="https://twitter.com/username"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-linkedin">LinkedIn URL</label><input id="social-linkedin" type="text"${ssrRenderAttr("value", __props.socials.linkedin)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="https://linkedin.com/in/username"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="social-email">Email Address</label><input id="social-email" type="email"${ssrRenderAttr("value", __props.socials.email)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="hello@example.com"></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/SocialsEditor.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "LinkEditorItem",
  __ssrInlineRender: true,
  props: {
    link: {},
    idx: {},
    isDragActive: { type: Boolean }
  },
  emits: ["linkChange", "deleteLink"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isCustomIcon = computed(() => {
      const icon = props.link.icon;
      return icon.startsWith("data:image/") || icon.startsWith("http");
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "p-4 border rounded-xl transition-all space-y-4 relative",
          __props.isDragActive ? "bg-white/[0.03] border-[#af413c]/30 cursor-grab active:cursor-grabbing hover:border-[#af413c]/50" : "bg-white/[0.01] border-white/[0.03] hover:border-white/[0.06]"
        ]
      }, _attrs))}><div class="flex items-center justify-between pb-3 border-b border-white/[0.04] gap-4"><div class="flex items-center gap-2 flex-1">`);
      if (__props.isDragActive) {
        _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-[#e8736e]"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-[10px] font-bold text-white/20">#${ssrInterpolate(__props.idx + 1)}</span><input type="text"${ssrRenderAttr("value", __props.link.title)} className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-[#af413c]/50 text-sm font-bold !text-white outline-none pb-0.5 flex-1 w-full" placeholder="Link Title"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></div><div class="flex items-center gap-1.5"><button class="${ssrRenderClass([
        "px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border transition-all flex items-center gap-1",
        ((_a = __props.link.is_active) != null ? _a : true) ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-white/[0.04] border-white/[0.06] text-white/30"
      ])}"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}>`);
      if ((_b = __props.link.is_active) != null ? _b : true) {
        _push(`<!--[--><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>Published</span><!--]-->`);
      } else {
        _push(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-2.5 h-2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg><span>Unpublished</span><!--]-->`);
      }
      _push(`</button><button class="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20 text-rose-400 transition-all flex items-center gap-1" title="Delete Link"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-2.5 h-2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12"></path></svg><span>Delete</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Description</label><input type="text"${ssrRenderAttr("value", __props.link.description)} class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="Subtitle text"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></div><div><label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Destination URL</label><input type="text"${ssrRenderAttr("value", __props.link.url)} class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="https://..."${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></div><div><label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Link Icon</label><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0">`);
      if (unref(isCustomIcon)) {
        _push(`<img${ssrRenderAttr("src", __props.link.icon)} alt="" class="w-6 h-6 object-contain rounded">`);
      } else {
        _push(`<div class="text-white/40">`);
        if (__props.link.icon === "youtube") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-rose-500"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837z"></path><polygon points="9.545 8.568 15.818 12 9.545 15.432" fill="white"></polygon></svg>`);
        } else if (__props.link.icon === "github") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path></svg>`);
        } else if (__props.link.icon === "figma") {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-orange-500"><path d="M12 2h3.5a3.5 3.5 0 0 1 0 7H12zm-3.5 7A3.5 3.5 0 1 1 5 5.5 3.5 3.5 0 0 1 8.5 2H12v7zm0 0a3.5 3.5 0 1 1-3.5 3.5V9zm7 3.5a3.5 3.5 0 1 1-3.5 3.5V12.5zM8.5 15H12v3.5A3.5 3.5 0 1 1 8.5 15z"></path></svg>`);
        } else {
          _push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`);
        }
        _push(`</div>`);
      }
      _push(`</div><label class="${ssrRenderClass(["flex-1 px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/10 text-white/80 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 h-10", __props.isDragActive ? "opacity-50 pointer-events-none" : ""])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path></svg><span>Upload Custom Icon</span><input type="file" accept="image/*" class="hidden"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></label></div><span class="text-[10px] text-white/20 mt-1.5 block"> Max size: 100KB. Recommended dimensions: 64x64 pixels (PNG/JPG/SVG). </span></div><div class="grid grid-cols-3 gap-2"><div class="col-span-2"><label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1">Accent HEX Color</label><input type="text"${ssrRenderAttr("value", __props.link.accentColor || "")} class="w-full px-3 py-2 bg-white/[0.02] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="#6366f1"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></div><div><label class="block text-xs font-bold uppercase tracking-wide text-white/20 mb-1 text-center">Featured</label><div class="flex justify-center pt-2"><input type="checkbox"${ssrIncludeBooleanAttr(__props.link.featured) ? " checked" : ""} class="w-4 h-4 rounded bg-white/[0.02] border-white/[0.06] accent-[#af413c] cursor-pointer"${ssrIncludeBooleanAttr(__props.isDragActive) ? " disabled" : ""}></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/LinkEditorItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "LinksManager",
  __ssrInlineRender: true,
  props: {
    links: {},
    saving: { type: Boolean }
  },
  emits: ["addLink", "linkChange", "deleteLink", "reorderAll", "saveAll"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const draggedIdx = ref(null);
    const dragOverIdx = ref(null);
    const isDragActive = ref(false);
    const hasReordered = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-[#1e1d23]/80 border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm" }, _attrs))}><div class="flex items-center justify-between mb-6"><h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 flex items-center gap-2"> Manage Links (${ssrInterpolate(__props.links.length)}) </h2><div class="flex items-center gap-2 shrink-0"><button class="${ssrRenderClass([
        "px-3 py-1.5 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
        isDragActive.value ? "bg-[#af413c] border-[#af413c] text-white shadow-md shadow-[#af413c]/15" : "bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 hover:border-[#af413c]/30"
      ])}" title="Enable card drag and drop reordering"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"></path></svg><span>${ssrInterpolate(isDragActive.value ? "Reordering" : "Reorder")}</span></button>`);
      if (hasReordered.value && isDragActive.value) {
        _push(`<button${ssrIncludeBooleanAttr(__props.saving) ? " disabled" : ""} class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white border border-emerald-500/20 text-xs font-bold rounded-xl transition-all flex items-center gap-1 shadow-md shadow-emerald-600/10">${ssrInterpolate(__props.saving ? "Saving..." : "Save Order")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="px-3 py-1.5 bg-[#af413c]/10 hover:bg-[#af413c]/20 text-[#e8736e] border border-[#af413c]/20 hover:border-[#af413c]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg><span>Add Link</span></button></div></div>`);
      if (__props.links.length === 0) {
        _push(`<div class="text-center py-12 border border-dashed border-white/[0.04] rounded-xl text-white/20 text-xs"> No links created yet. Click &quot;Add Link&quot; to get started! </div>`);
      } else {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(__props.links, (link, idx) => {
          _push(`<div${ssrRenderAttr("draggable", isDragActive.value)} class="${ssrRenderClass([
            "transition-all duration-200",
            draggedIdx.value === idx ? "opacity-30 scale-[0.98]" : "opacity-100",
            dragOverIdx.value === idx ? "border-t-2 border-[#af413c]/60 pt-4" : ""
          ])}">`);
          _push(ssrRenderComponent(_sfc_main$5, {
            link,
            idx,
            "is-drag-active": isDragActive.value,
            onLinkChange: (index, key, val) => emit("linkChange", index, key, val),
            onDeleteLink: (index) => emit("deleteLink", index)
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/LinksManager.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SettingsEditor",
  __ssrInlineRender: true,
  props: {
    settings: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/[0.02] border border-white/[0.04] p-6 rounded-2xl backdrop-blur-sm" }, _attrs))}><h2 class="text-xs font-bold uppercase tracking-[0.12em] !text-white/30 mb-6"> Experience Settings &amp; SEO </h2><div class="space-y-5"><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="experience-theme">Active Experience Theme</label><select id="experience-theme"${ssrRenderAttr("value", __props.settings.active_theme)} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all"><option value="clean-light" class="bg-slate-900 text-white">Clean Light (Default)</option><option value="pitch-dark" class="bg-slate-900 text-white">Pitch Dark</option><option value="retro" class="bg-slate-900 text-white">90s Retro</option><option value="fluent" class="bg-slate-900 text-white">Fluent Design (Glassmorphism)</option><option value="solarized" class="bg-slate-900 text-white">Solarized Dark</option><option value="electric" class="bg-slate-900 text-white">Electric Border</option></select></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="meta-title">SEO Meta Title</label><input id="meta-title" type="text"${ssrRenderAttr("value", __props.settings.meta_title || "")} class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all" placeholder="Alex Rivera | Portfolio"></div><div><label class="block text-xs font-bold uppercase tracking-wider text-white/25 mb-2" for="meta-description">SEO Meta Description</label><textarea id="meta-description" rows="4" class="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] focus:border-[#af413c]/50 rounded-xl outline-none text-white/80 text-sm transition-all resize-none" placeholder="Alex Rivera&#39;s links, portfolio, and newsletters...">${ssrInterpolate(__props.settings.meta_description || "")}</textarea></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/SettingsEditor.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    activeTab: {}
  },
  emits: ["tabSelect", "logout"],
  setup(__props, { emit: __emit }) {
    const dropdownOpen = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 h-full w-[260px] z-50 bg-[#1e1d23] border-r border-white/[0.04] flex flex-col justify-between" }, _attrs))}><div class="flex flex-col"><div class="flex items-center justify-between px-5 pt-5 pb-2"><div class="flex items-center gap-3"><div class="w-8 h-8 bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] text-white rounded-lg flex items-center justify-center shadow-lg shadow-[#af413c]/20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><rect x="3" y="3" width="7" height="7" rx="1.5"></rect><rect x="14" y="3" width="7" height="7" rx="1.5"></rect><rect x="3" y="14" width="7" height="7" rx="1.5"></rect><rect x="14" y="14" width="7" height="7" rx="1.5"></rect></svg></div><div class="leading-none"><div class="text-[14px] font-bold text-white/90 tracking-wide">Muffytreen</div><div class="text-[11px] text-white/30 font-medium tracking-wider uppercase mt-0.5">CMS Panel</div></div></div></div><div class="mx-5 my-3 h-px bg-white/[0.04]"></div><nav class="px-3 space-y-0.5"><div class="px-2 pb-2"><span class="text-[11px] font-bold text-white/20 uppercase tracking-[0.15em]">Navigation</span></div><button class="${ssrRenderClass([
        "group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative",
        __props.activeTab === "dashboard" ? "bg-[#af413c]/12 text-[#e8736e]" : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
      ])}"><div class="${ssrRenderClass(["absolute left-0 w-[3px] rounded-r-full transition-all duration-200", __props.activeTab === "dashboard" ? "h-4 bg-[#af413c]" : "h-0 bg-transparent"])}"></div><span class="${ssrRenderClass(["transition-colors", __props.activeTab === "dashboard" ? "text-[#e8736e]" : "text-white/30 group-hover:text-white/50"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path></svg></span><span>Dashboard</span></button><button class="${ssrRenderClass([
        "group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative",
        __props.activeTab === "about" ? "bg-[#af413c]/12 text-[#e8736e]" : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
      ])}"><div class="${ssrRenderClass(["absolute left-0 w-[3px] rounded-r-full transition-all duration-200", __props.activeTab === "about" ? "h-4 bg-[#af413c]" : "h-0 bg-transparent"])}"></div><span class="${ssrRenderClass(["transition-colors", __props.activeTab === "about" ? "text-[#e8736e]" : "text-white/30 group-hover:text-white/50"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path></svg></span><span>About me</span></button><button class="${ssrRenderClass([
        "group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative",
        __props.activeTab === "home" ? "bg-[#af413c]/12 text-[#e8736e]" : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
      ])}"><div class="${ssrRenderClass(["absolute left-0 w-[3px] rounded-r-full transition-all duration-200", __props.activeTab === "home" ? "h-4 bg-[#af413c]" : "h-0 bg-transparent"])}"></div><span class="${ssrRenderClass(["transition-colors", __props.activeTab === "home" ? "text-[#e8736e]" : "text-white/30 group-hover:text-white/50"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg></span><span>Items</span></button><div class="pt-3 pb-2 px-2"><span class="text-[11px] font-bold text-white/20 uppercase tracking-[0.15em]">System</span></div><button class="${ssrRenderClass([
        "group w-full flex items-center gap-3 px-3 py-[9px] rounded-lg text-left text-[14px] font-medium transition-all duration-150 relative",
        __props.activeTab === "settings" ? "bg-[#af413c]/12 text-[#e8736e]" : "text-white/45 hover:text-white/75 hover:bg-white/[0.04]"
      ])}"><div class="${ssrRenderClass(["absolute left-0 w-[3px] rounded-r-full transition-all duration-200", __props.activeTab === "settings" ? "h-4 bg-[#af413c]" : "h-0 bg-transparent"])}"></div><span class="${ssrRenderClass(["transition-colors", __props.activeTab === "settings" ? "text-[#e8736e]" : "text-white/30 group-hover:text-white/50"])}"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-[18px] h-[18px]"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.645-.869L9.594 3.94ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></span><span>Settings</span></button></nav></div><div class="relative m-3">`);
      if (dropdownOpen.value) {
        _push(`<div class="absolute bottom-[calc(100%+6px)] left-0 w-full bg-[#1a1a24] border border-white/[0.06] rounded-xl p-1.5 shadow-xl animate-fadeIn z-50"><button class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-white/50 hover:text-rose-400 hover:bg-rose-500/10 transition-all text-left"><span>Sign Out</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12"></path></svg></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="w-full p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] flex items-center justify-between text-left transition-all"><div class="flex items-center gap-2.5"><div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c94a44] to-[#8b2e2a] flex items-center justify-center font-bold text-white text-xs select-none shadow-md shadow-[#af413c]/15"> A </div><div><div class="text-xs font-semibold text-white/80 leading-tight">Administrator</div><div class="text-[11px] text-white/25 font-medium">Super User</div></div></div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="${ssrRenderClass(["w-4 h-4 text-white/20 transition-transform duration-200", dropdownOpen.value ? "rotate-180" : ""])}"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path></svg></button></div></aside>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteModal",
  __ssrInlineRender: true,
  props: {
    isOpen: { type: Boolean },
    itemName: {}
  },
  emits: ["close", "confirm"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.isOpen) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-50 flex items-center justify-center p-4" }, _attrs))}><div class="fixed inset-0 bg-[#090a0f]/80 backdrop-blur-sm transition-opacity duration-300"></div><div class="bg-[#1e1d23] border border-white/[0.04] rounded-2xl w-full max-w-sm p-6 shadow-2xl relative z-10 animate-fadeIn text-center"><div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.34 9m-4.72 0-.34-9m9.96-3.243a3.003 3.003 0 0 0-3-2.731H12h-1.682a3.003 3.003 0 0 0-3 2.731M19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H8.25A2.25 2.25 0 0 1 6 18.75V14m12-6.875h-12"></path></svg></div><h3 class="text-base font-bold text-white mb-2">Delete &quot;${ssrInterpolate(__props.itemName || "this item")}&quot;?</h3><p class="text-xs text-white/40 mb-6 px-2 leading-relaxed"> This item will be permanently removed from your experience portfolio. This action cannot be undone. </p><div class="flex items-center justify-center gap-3"><button class="px-4 py-2 bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all min-w-[80px]"> Cancel </button><button class="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-rose-600/20 transition-all min-w-[80px]"> Delete </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/DeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const mounted = ref(false);
    const loading = ref(true);
    const saving = ref(false);
    const toast = ref(null);
    const activeTab = ref("dashboard");
    const profile = ref({
      name: "",
      title: "",
      bio: "",
      avatar: "",
      active_theme: "clean-light",
      meta_title: "",
      meta_description: "",
      socials: { github: "", twitter: "", linkedin: "", email: "" }
    });
    const links = ref([]);
    const profileId = ref(null);
    const deleteTargetIndex = ref(null);
    const showToast = (message, type) => {
      toast.value = { message, type };
      setTimeout(() => {
        toast.value = null;
      }, 3e3);
    };
    const handleProfileChange = (key, value) => {
      profile.value = {
        ...profile.value,
        [key]: value
      };
    };
    const handleSettingsChange = (key, value) => {
      profile.value = {
        ...profile.value,
        [key]: value
      };
    };
    const handleSocialChange = (key, value) => {
      profile.value = {
        ...profile.value,
        socials: {
          ...profile.value.socials,
          [key]: value
        }
      };
    };
    const handleLinkChange = (index, key, value) => {
      const updated = [...links.value];
      updated[index] = {
        ...updated[index],
        [key]: value
      };
      links.value = updated;
    };
    const addLink = () => {
      const newLink = {
        id: `new-${Date.now()}`,
        title: "New Link Title",
        description: "",
        url: "https://",
        icon: "globe",
        featured: false,
        is_active: true
      };
      links.value = [...links.value, newLink];
    };
    const triggerDeleteConfirm = (index) => {
      deleteTargetIndex.value = index;
    };
    const executeDeleteLink = () => {
      if (deleteTargetIndex.value !== null) {
        links.value = links.value.filter((_, i) => i !== deleteTargetIndex.value);
        deleteTargetIndex.value = null;
      }
    };
    const saveAllChanges = async () => {
      saving.value = true;
      if (!hasSupabaseConfig || !supabase) {
        console.log("Supabase credentials not configured. Saving to localStorage.");
        localStorage.setItem("cms-profile", JSON.stringify(profile.value));
        localStorage.setItem("cms-links", JSON.stringify(links.value));
        showToast("Offline Changes Saved Successfully!", "success");
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
        const { error: profileUpdateErr } = await supabase.from("profiles").update({
          display_name: profile.value.name,
          title: profile.value.title,
          bio: profile.value.bio,
          avatar_url: profile.value.avatar,
          active_theme: profile.value.active_theme,
          socials: updatedSocials
        }).eq("id", profileId.value);
        if (profileUpdateErr) throw profileUpdateErr;
        const { data: dbLinks, error: fetchErr } = await supabase.from("links").select("id").eq("profile_id", profileId.value);
        if (fetchErr) throw fetchErr;
        const dbLinkIds = (dbLinks == null ? void 0 : dbLinks.map((l) => l.id)) || [];
        const currentLinkIds = links.value.map((l) => l.id).filter((id) => !id.startsWith("new-"));
        const idsToDelete = dbLinkIds.filter((id) => !currentLinkIds.includes(id));
        if (idsToDelete.length > 0) {
          const { error: deleteErr } = await supabase.from("links").delete().in("id", idsToDelete);
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
            accent_color: link.accentColor || null,
            is_active: link.is_active !== false,
            sort_order: i
          };
          if (link.id.startsWith("new-")) {
            const { error: insertErr } = await supabase.from("links").insert(payload);
            if (insertErr) throw insertErr;
          } else {
            const { error: updateErr } = await supabase.from("links").update(payload).eq("id", link.id);
            if (updateErr) throw updateErr;
          }
        }
        showToast("All CMS Changes Published Successfully!", "success");
        const { data: refreshedLinks, error: refreshErr } = await supabase.from("links").select("*").eq("profile_id", profileId.value).order("sort_order", { ascending: true });
        if (!refreshErr && refreshedLinks) {
          links.value = refreshedLinks.map((link) => ({
            id: link.id,
            title: link.title || "",
            description: link.description || "",
            url: link.url || "",
            icon: link.icon_name || "globe",
            featured: link.featured || false,
            accentColor: link.accent_color || void 0,
            is_active: link.is_active !== false
          }));
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        showToast(`Failed to publish changes: ${errMsg}`, "error");
      } finally {
        saving.value = false;
      }
    };
    const handleLogout = () => {
      localStorage.removeItem("admin-session");
      router.push("/th3w3b4dm1n/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if (!mounted.value || loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#1e1d23] flex flex-col items-center justify-center gap-4" }, _attrs))}><div class="w-10 h-10 border-4 border-[#af413c] border-t-transparent rounded-full animate-spin"></div><p class="text-xs font-bold uppercase tracking-widest text-white/30 animate-pulse">Loading CMS Panel...</p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#1e1d23] text-slate-100 flex font-sans" }, _attrs))}>`);
        if (toast.value) {
          _push(`<div class="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce"><div class="${ssrRenderClass(["px-5 py-3 rounded-xl border text-xs font-bold shadow-2xl flex items-center gap-2", toast.value.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-rose-500/10 border-rose-500/20 text-rose-400"])}"><span>${ssrInterpolate(toast.value.message)}</span></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$1, {
          isOpen: deleteTargetIndex.value !== null,
          itemName: deleteTargetIndex.value !== null ? ((_a = links.value[deleteTargetIndex.value]) == null ? void 0 : _a.title) || "this link" : "",
          onClose: ($event) => deleteTargetIndex.value = null,
          onConfirm: executeDeleteLink
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$2, {
          activeTab: activeTab.value,
          onTabSelect: (tab) => activeTab.value = tab,
          onLogout: handleLogout
        }, null, _parent));
        _push(`<div class="flex-1 flex flex-col min-h-screen pl-[260px]">`);
        _push(ssrRenderComponent(DashboardHeader, null, null, _parent));
        _push(`<main class="max-w-full w-full mx-auto px-6 py-10 flex-1 flex flex-col justify-start"><div class="mb-2"><div><h2 class="text-2xl font-black !text-white tracking-tight">`);
        if (activeTab.value === "dashboard") {
          _push(`<span>Dashboard</span>`);
        } else if (activeTab.value === "about") {
          _push(`<span>About me</span>`);
        } else if (activeTab.value === "home") {
          _push(`<span>Items</span>`);
        } else if (activeTab.value === "settings") {
          _push(`<span>Settings</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</h2><p class="text-sm !text-slate-400 mt-1">`);
        if (activeTab.value === "dashboard") {
          _push(`<span>Welcome to the administration panel.</span>`);
        } else if (activeTab.value === "about") {
          _push(`<span>Configure your About me content.</span>`);
        } else if (activeTab.value === "home") {
          _push(`<span>Configure your Items content.</span>`);
        } else if (activeTab.value === "settings") {
          _push(`<span>Configure your Settings content.</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></div><div class="border-b border-slate-900/60 my-3"></div></div>`);
        if (activeTab.value === "dashboard") {
          _push(`<div class="flex-1 flex items-center justify-center py-20"><p class="text-xs text-slate-500 text-center max-w-sm leading-relaxed"> Dashboard main view is currently empty. Navigate to other sections in the sidebar to configure content. </p></div>`);
        } else if (activeTab.value === "about") {
          _push(`<div class="space-y-6 animate-fadeIn">`);
          _push(ssrRenderComponent(_sfc_main$7, {
            profile: profile.value,
            onChange: handleProfileChange
          }, null, _parent));
          _push(ssrRenderComponent(_sfc_main$6, {
            socials: profile.value.socials,
            onChange: handleSocialChange
          }, null, _parent));
          _push(`</div>`);
        } else if (activeTab.value === "home") {
          _push(`<div class="animate-fadeIn">`);
          _push(ssrRenderComponent(_sfc_main$4, {
            links: links.value,
            saving: saving.value,
            onAddLink: addLink,
            onLinkChange: handleLinkChange,
            onDeleteLink: triggerDeleteConfirm,
            onReorderAll: (reordered) => links.value = reordered,
            onSaveAll: saveAllChanges
          }, null, _parent));
          _push(`</div>`);
        } else if (activeTab.value === "settings") {
          _push(`<div class="animate-fadeIn">`);
          _push(ssrRenderComponent(_sfc_main$3, {
            settings: {
              active_theme: profile.value.active_theme,
              meta_title: profile.value.meta_title,
              meta_description: profile.value.meta_description
            },
            onChange: handleSettingsChange
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (activeTab.value !== "dashboard") {
          _push(`<div class="mt-4 pt-4 border-t border-white/[0.04] flex justify-end pr-6"><button${ssrIncludeBooleanAttr(saving.value) ? " disabled" : ""} class="px-6 py-2.5 bg-[#af413c] hover:bg-[#c94a44] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#af413c]/10 min-w-[140px]">${ssrInterpolate(saving.value ? "Saving Changes..." : "Save Changes")}</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</main></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/th3w3b4dm1n/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C7_lRhvi.mjs.map
