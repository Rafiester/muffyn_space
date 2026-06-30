import { defineComponent, ref, useSSRContext, useTemplateRef, watch, computed, mergeProps, createVNode, resolveDynamicComponent, withCtx, openBlock, createBlock, createCommentVNode, Fragment, toDisplayString, renderList, unref } from "vue";
import { ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderTeleport, ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot, ssrRenderVNode, ssrRenderComponent } from "vue/server-renderer";
import "./supabase-BdpgkN5e.js";
import { d as useHead } from "../server.mjs";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@supabase/supabase-js";
import "/Users/flo/muffytreen/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/flo/muffytreen/node_modules/hookable/dist/index.mjs";
import "/Users/flo/muffytreen/node_modules/unctx/dist/index.mjs";
import "/Users/flo/muffytreen/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/flo/muffytreen/node_modules/defu/dist/defu.mjs";
import "/Users/flo/muffytreen/node_modules/ufo/dist/index.mjs";
import "/Users/flo/muffytreen/node_modules/@unhead/vue/dist/index.mjs";
const __default__ = {
  inheritAttrs: false
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  props: {
    currentTheme: {}
  },
  emits: ["themeChange"],
  setup(__props, { emit: __emit }) {
    const isOpen = ref(false);
    const themeOptions = [
      {
        value: "clean-light",
        label: "Clean Light",
        iconPath: "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0 M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M6.34 17.66l-1.41 1.41 M19.07 4.93l-1.41 1.41"
      },
      {
        value: "pitch-dark",
        label: "Pitch Dark",
        iconPath: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      },
      {
        value: "retro",
        label: "90s Retro",
        iconPath: "M2 6h20v12H2z M6 12h.01 M10 12h.01 M14 12h4"
      },
      {
        value: "fluent",
        label: "Fluent Glass",
        iconPath: "M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9zm0-16a7 7 0 1 1-7 7 7 7 0 0 1 7-7z M12 9v6 M9 12h6"
      },
      {
        value: "solarized",
        label: "Solarized Dark",
        iconPath: "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5"
      },
      {
        value: "electric",
        label: "Electric Border",
        iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">`);
      if (isOpen.value) {
        _push(`<div class="${ssrRenderClass([
          "flex flex-col gap-1 p-2 min-w-[170px] transition-all duration-300",
          __props.currentTheme === "retro" ? "bg-[#c0c0c0] border-[3px] border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]" : __props.currentTheme === "fluent" ? "bg-white/10 border border-white/12 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] rounded-2xl backdrop-blur-xl" : __props.currentTheme === "pitch-dark" ? "bg-[#0a0a0a] border border-[#222222] shadow-[0_4px_20px_rgba(255,255,255,0.05)] rounded-2xl" : __props.currentTheme === "solarized" ? "bg-[#073642] border border-[#586e75] shadow-lg rounded-lg" : __props.currentTheme === "electric" ? "bg-zinc-950 border border-emerald-500 shadow-[0_0_15px_rgba(40,255,133,0.15)] rounded-2xl" : "bg-white/95 border border-slate-200 shadow-2xl rounded-2xl backdrop-blur-xl"
        ])}"><span class="${ssrRenderClass([
          "text-[9px] font-bold uppercase tracking-widest px-2.5 pt-1.5 pb-1 select-none",
          __props.currentTheme === "retro" ? "font-mono text-black" : "text-slate-400 opacity-80"
        ])}"> Select Palette </span><!--[-->`);
        ssrRenderList(themeOptions, (opt) => {
          _push(`<button class="${ssrRenderClass([
            "flex items-center gap-2.5 px-3 py-2 text-xs font-semibold select-none transition-all duration-150 w-full text-left",
            __props.currentTheme === opt.value ? __props.currentTheme === "retro" ? "bg-blue-800 text-white font-bold border-t border-l border-blue-900 shadow-inner" : __props.currentTheme === "fluent" ? "bg-white/20 text-white rounded-xl" : __props.currentTheme === "solarized" ? "bg-[#2aa198]/20 text-[#2aa198] rounded-md" : __props.currentTheme === "electric" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl" : "bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl" : __props.currentTheme === "retro" ? "hover:bg-white/10 text-black font-medium" : __props.currentTheme === "fluent" ? "hover:bg-white/10 text-white/70 hover:text-white rounded-xl" : __props.currentTheme === "solarized" ? "hover:bg-white/5 text-[#839496] hover:text-[#93a1a1] rounded-md" : __props.currentTheme === "electric" ? "hover:bg-emerald-500/10 text-emerald-400 rounded-xl" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white rounded-xl"
          ])}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 flex-shrink-0"><path${ssrRenderAttr("d", opt.iconPath)}></path></svg><span class="${ssrRenderClass(__props.currentTheme === "retro" ? "font-bold font-mono" : "font-sans")}">${ssrInterpolate(opt.label)}</span></button>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button aria-label="Toggle theme selector panel" class="${ssrRenderClass([
        "w-12 h-12 flex items-center justify-center transition-all duration-300 group",
        __props.currentTheme === "retro" ? "bg-[#c0c0c0] border-[3px] border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : __props.currentTheme === "fluent" ? "bg-white/10 border border-white/12 text-white backdrop-blur-md rounded-full shadow-lg hover:scale-105" : __props.currentTheme === "solarized" ? "bg-[#073642] border border-[#586e75] text-[#2aa198] rounded-md hover:bg-[#0b4554]" : __props.currentTheme === "electric" ? "bg-zinc-950 border border-emerald-500 text-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-110 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]" : "bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-full shadow-lg hover:scale-110"
      ])}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${ssrRenderClass([
        "transition-transform duration-300",
        __props.currentTheme === "retro" ? "text-black" : "",
        isOpen.value ? "rotate-[-30deg]" : "rotate-0"
      ])}"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"></path><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"></path><path d="M14.5 17.5 4.5 15"></path></svg></button></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-[9998]"></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ThemeToggle.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ElectricBorder",
  __ssrInlineRender: true,
  props: {
    color: { default: "#28FF85" },
    speed: { default: 1 },
    chaos: { default: 0.12 },
    borderRadius: { default: 24 },
    className: {},
    style: {}
  },
  setup(__props) {
    const props = __props;
    function hexToRgba(hex, alpha = 1) {
      if (!hex) return `rgba(0,0,0,${alpha})`;
      let h = hex.replace("#", "");
      if (h.length === 3) {
        h = h.split("").map((c) => c + c).join("");
      }
      const int = parseInt(h, 16);
      const r = int >> 16 & 255;
      const g = int >> 8 & 255;
      const b = int & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    const canvasRef = useTemplateRef("canvasRef");
    const containerRef = useTemplateRef("containerRef");
    const animationRef = ref(null);
    const timeRef = ref(0);
    const lastFrameTimeRef = ref(0);
    function random(x) {
      return Math.sin(x * 12.9898) * 43758.5453 % 1;
    }
    function noise2D(x, y) {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3 - 2 * fx);
      const uy = fy * fy * (3 - 2 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    }
    function octavedNoise(x, octaves, lacunarity, gain, baseAmplitude, baseFrequency, time, seed, baseFlatness) {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;
      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }
      return y;
    }
    function getCornerPoint(centerX, centerY, radius, startAngle, arcLength, progress) {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    }
    function getRoundedRectPoint(t, left, top, width, height, radius) {
      const straightWidth = width - 2 * radius;
      const straightHeight = height - 2 * radius;
      const cornerArc = Math.PI * radius / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;
      let accumulated = 0;
      if (distance <= accumulated + straightWidth) {
        const progress2 = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress2 * straightWidth, y: top };
      }
      accumulated += straightWidth;
      if (distance <= accumulated + cornerArc) {
        const progress2 = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress2);
      }
      accumulated += cornerArc;
      if (distance <= accumulated + straightHeight) {
        const progress2 = (distance - accumulated) / straightHeight;
        return { x: left + width, y: top + radius + progress2 * straightHeight };
      }
      accumulated += straightHeight;
      if (distance <= accumulated + cornerArc) {
        const progress2 = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, progress2);
      }
      accumulated += cornerArc;
      if (distance <= accumulated + straightWidth) {
        const progress2 = (distance - accumulated) / straightWidth;
        return { x: left + width - radius - progress2 * straightWidth, y: top + height };
      }
      accumulated += straightWidth;
      if (distance <= accumulated + cornerArc) {
        const progress2 = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, progress2);
      }
      accumulated += cornerArc;
      if (distance <= accumulated + straightHeight) {
        const progress2 = (distance - accumulated) / straightHeight;
        return { x: left, y: top + height - radius - progress2 * straightHeight };
      }
      accumulated += straightHeight;
      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    }
    function resolveBorderRadius(borderRadius, maxRadius, width, height) {
      if (typeof borderRadius === "number") {
        return Math.min(borderRadius, maxRadius);
      }
      if (typeof borderRadius === "string") {
        const parsed = Number.parseFloat(borderRadius);
        if (Number.isFinite(parsed)) {
          if (borderRadius.includes("%")) {
            return Math.min(maxRadius, parsed / 100 * Math.min(width, height));
          }
          return Math.min(parsed, maxRadius);
        }
      }
      return Math.min(props.borderRadius, maxRadius);
    }
    let cleanup = null;
    function setupCanvas() {
      const canvas = canvasRef.value;
      const container = containerRef.value;
      if (!canvas || !container) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const octaves = 10;
      const lacunarity = 1.6;
      const gain = 0.7;
      const amplitude = props.chaos;
      const frequency = 10;
      const baseFlatness = 0;
      const displacement = 60;
      const borderOffset = 60;
      const updateSize = () => {
        const rect = container.getBoundingClientRect();
        const width2 = rect.width + borderOffset * 2;
        const height2 = rect.height + borderOffset * 2;
        const dpr = Math.min((void 0).devicePixelRatio || 1, 2);
        canvas.width = width2 * dpr;
        canvas.height = height2 * dpr;
        canvas.style.width = `${width2}px`;
        canvas.style.height = `${height2}px`;
        ctx.scale(dpr, dpr);
        return { width: width2, height: height2 };
      };
      let { width, height } = updateSize();
      let lastDpr = Math.min((void 0).devicePixelRatio || 1, 2);
      const drawElectricBorder = (currentTime) => {
        if (!canvas || !ctx) return;
        const dpr = Math.min((void 0).devicePixelRatio || 1, 2);
        if (dpr !== lastDpr) {
          lastDpr = dpr;
          const newSize = updateSize();
          width = newSize.width;
          height = newSize.height;
        }
        const deltaTime = (currentTime - lastFrameTimeRef.value) / 1e3;
        timeRef.value += deltaTime * props.speed;
        lastFrameTimeRef.value = currentTime;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = props.color;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        const scale = displacement;
        const left = borderOffset;
        const top = borderOffset;
        const borderWidth = width - 2 * borderOffset;
        const borderHeight = height - 2 * borderOffset;
        const maxRadius = Math.min(borderWidth, borderHeight) / 2;
        const radius = resolveBorderRadius(
          props.style?.borderRadius ?? props.borderRadius,
          maxRadius,
          borderWidth,
          borderHeight
        );
        const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
        const sampleCount = Math.floor(approximatePerimeter / 2);
        ctx.beginPath();
        for (let i = 0; i <= sampleCount; i++) {
          const progress = i / sampleCount;
          const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);
          const xNoise = octavedNoise(
            progress * 8,
            octaves,
            lacunarity,
            gain,
            amplitude,
            frequency,
            timeRef.value,
            0,
            baseFlatness
          );
          const yNoise = octavedNoise(
            progress * 8,
            octaves,
            lacunarity,
            gain,
            amplitude,
            frequency,
            timeRef.value,
            1,
            baseFlatness
          );
          const displacedX = point.x + xNoise * scale;
          const displacedY = point.y + yNoise * scale;
          if (i === 0) {
            ctx.moveTo(displacedX, displacedY);
          } else {
            ctx.lineTo(displacedX, displacedY);
          }
        }
        ctx.closePath();
        ctx.stroke();
        animationRef.value = requestAnimationFrame(drawElectricBorder);
      };
      const resizeObserver = new ResizeObserver(() => {
        const newSize = updateSize();
        width = newSize.width;
        height = newSize.height;
      });
      resizeObserver.observe(container);
      animationRef.value = requestAnimationFrame(drawElectricBorder);
      cleanup = () => {
        if (animationRef.value) {
          cancelAnimationFrame(animationRef.value);
        }
        resizeObserver.disconnect();
      };
    }
    watch(
      () => [
        props.color,
        props.speed,
        props.chaos,
        props.borderRadius,
        props.style?.borderRadius,
        octavedNoise,
        getRoundedRectPoint
      ],
      () => {
        cleanup?.();
        requestAnimationFrame(() => {
          setupCanvas();
        });
      }
    );
    const wrapperStyle = computed(() => ({
      "--electric-border-color": props.color,
      borderRadius: `${props.borderRadius}px`,
      ...props.style
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: ["relative overflow-visible isolate", __props.className],
        style: wrapperStyle.value
      }, _attrs))}><div class="top-1/2 left-1/2 z-10 absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"><canvas class="block"></canvas></div><div class="z-[5] absolute inset-0 rounded-[inherit] pointer-events-none"><div class="absolute inset-0 rounded-[inherit] pointer-events-none" style="${ssrRenderStyle({
        border: `2px solid ${hexToRgba(__props.color, 0.6)}`,
        filter: "blur(1px)"
      })}"></div><div class="absolute inset-0 rounded-[inherit] pointer-events-none" style="${ssrRenderStyle({
        border: `2px solid ${__props.color}`,
        filter: "blur(4px)"
      })}"></div><div class="-z-[1] absolute inset-0 opacity-30 rounded-[inherit] scale-110 pointer-events-none" style="${ssrRenderStyle({
        filter: "blur(32px)",
        background: `linear-gradient(-30deg, ${__props.color}, transparent, ${__props.color})`
      })}"></div></div><div class="z-[1] relative rounded-[inherit]">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ElectricBorder.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "LinkCard",
  __ssrInlineRender: true,
  props: {
    link: {},
    theme: {}
  },
  setup(__props) {
    const props = __props;
    const isRetro = computed(() => props.theme === "retro");
    const isDark = computed(() => ["pitch-dark", "solarized", "fluent", "electric"].includes(props.theme));
    const customGlowStyle = computed(() => {
      if (!isRetro.value && props.link.accentColor) {
        return {
          "--hover-glow": `${props.link.accentColor}1c`,
          // hex + 11% opacity
          "--hover-border": props.link.accentColor
        };
      }
      return {};
    });
    const isCustomIcon = computed(() => {
      const icon = props.link.icon;
      return icon.startsWith("data:image/") || icon.startsWith("http://") || icon.startsWith("https://");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: __props.theme === "electric" ? "w-full py-[60px]" : "w-full"
      }, _attrs))}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.theme === "electric" ? _sfc_main$4 : "div"), mergeProps(__props.theme === "electric" ? { color: __props.link.accentColor || "#10b981", borderRadius: 16, chaos: 0.12, style: { borderRadius: "16px" } } : {}, { class: "w-full" }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<a${ssrRenderAttr("href", __props.link.url)} target="_blank" rel="noopener noreferrer" style="${ssrRenderStyle(customGlowStyle.value)}" class="${ssrRenderClass([
              "group relative block w-full p-4 md:p-5 overflow-hidden transition-all duration-300",
              __props.theme === "electric" ? "bg-zinc-900/90 text-white rounded-2xl border-0" : "theme-card",
              isRetro.value ? "bg-white text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-yellow-50" : "hover:scale-[1.01]",
              __props.link.featured && isRetro.value ? "bg-cyan-200 border-[3.5px]" : "",
              __props.link.featured && !isRetro.value && __props.theme !== "electric" ? "ring-2 ring-indigo-500/20" : "",
              __props.link.featured && __props.theme === "electric" ? "ring-2 ring-emerald-500/20" : ""
            ])}"${_scopeId}>`);
            if (__props.link.featured) {
              _push2(`<div class="${ssrRenderClass([
                "absolute top-0 left-0 w-2 h-full",
                isRetro.value ? "bg-black" : __props.theme === "electric" ? "bg-emerald-400" : "bg-indigo-600"
              ])}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center gap-4 relative z-10"${_scopeId}><div class="${ssrRenderClass([
              "flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shrink-0",
              isRetro.value ? "bg-black text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : isDark.value ? "bg-slate-950 text-slate-100 rounded-xl" : "bg-slate-100 text-slate-800 rounded-xl"
            ])}" style="${ssrRenderStyle(!isRetro.value && __props.link.accentColor ? { color: __props.link.accentColor, backgroundColor: `${__props.link.accentColor}12` } : {})}"${_scopeId}>`);
            if (isCustomIcon.value) {
              _push2(`<img${ssrRenderAttr("src", __props.link.icon)} alt="" class="w-5 h-5 object-contain rounded"${_scopeId}>`);
            } else {
              _push2(`<!--[-->`);
              if (__props.link.icon.toLowerCase() === "globe") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><circle cx="12" cy="12" r="10"${_scopeId}></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"${_scopeId}></path><path d="M2 12h20"${_scopeId}></path></svg>`);
              } else if (__props.link.icon.toLowerCase() === "youtube") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"${_scopeId}></path><polygon points="10 15 15 12 10 9" fill="currentColor"${_scopeId}></polygon></svg>`);
              } else if (__props.link.icon.toLowerCase() === "figma") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"${_scopeId}></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"${_scopeId}></path><path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z"${_scopeId}></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z"${_scopeId}></path><path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22h-.03a3.47 3.47 0 0 1-3.47-3.5z"${_scopeId}></path></svg>`);
              } else if (__props.link.icon.toLowerCase() === "github") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"${_scopeId}></path><path d="M9 18c-4.51 2-5-2-7-2"${_scopeId}></path></svg>`);
              } else if (__props.link.icon.toLowerCase() === "newsletter" || __props.link.icon.toLowerCase() === "email") {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><rect width="20" height="16" x="2" y="4" rx="2"${_scopeId}></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><circle cx="12" cy="12" r="10"${_scopeId}></circle><path d="m10 15 5-3-5-3"${_scopeId}></path></svg>`);
              }
              _push2(`<!--]-->`);
            }
            _push2(`</div><div class="flex-1 text-left min-w-0"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><h3 class="${ssrRenderClass([
              "text-base font-bold truncate leading-tight",
              isRetro.value ? "font-mono uppercase font-black tracking-tight text-black" : __props.theme === "electric" ? "font-sans text-zinc-100" : "font-sans text-[var(--text-title)]"
            ])}"${_scopeId}>${ssrInterpolate(__props.link.title)}</h3>`);
            if (__props.link.featured) {
              _push2(`<span class="${ssrRenderClass([
                "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none",
                isRetro.value ? "bg-black text-white rounded-none border border-black font-black" : __props.theme === "electric" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
              ])}"${_scopeId}> Featured </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><p class="${ssrRenderClass([
              "text-xs mt-1 truncate",
              isRetro.value ? "font-mono text-black font-medium" : __props.theme === "electric" ? "font-sans text-zinc-400" : "font-sans text-[var(--text-body)]"
            ])}"${_scopeId}>${ssrInterpolate(__props.link.description)}</p></div><div class="${ssrRenderClass([
              "transition-all duration-300 shrink-0",
              isRetro.value ? "text-black group-hover:translate-x-1.5" : __props.theme === "electric" ? "text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1" : "text-[var(--text-body)] group-hover:text-[var(--text-title)] group-hover:translate-x-1"
            ])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"${_scopeId}><path d="M5 12h14"${_scopeId}></path><path d="m12 5 7 7-7 7"${_scopeId}></path></svg></div></div>`);
            if (!isRetro.value && __props.link.accentColor) {
              _push2(`<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style="${ssrRenderStyle({
                background: `radial-gradient(circle at 10% 20%, ${__props.link.accentColor}0a 0%, transparent 50%)`
              })}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</a>`);
          } else {
            return [
              createVNode("a", {
                href: __props.link.url,
                target: "_blank",
                rel: "noopener noreferrer",
                style: customGlowStyle.value,
                class: [
                  "group relative block w-full p-4 md:p-5 overflow-hidden transition-all duration-300",
                  __props.theme === "electric" ? "bg-zinc-900/90 text-white rounded-2xl border-0" : "theme-card",
                  isRetro.value ? "bg-white text-black border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none hover:bg-yellow-50" : "hover:scale-[1.01]",
                  __props.link.featured && isRetro.value ? "bg-cyan-200 border-[3.5px]" : "",
                  __props.link.featured && !isRetro.value && __props.theme !== "electric" ? "ring-2 ring-indigo-500/20" : "",
                  __props.link.featured && __props.theme === "electric" ? "ring-2 ring-emerald-500/20" : ""
                ]
              }, [
                __props.link.featured ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: [
                    "absolute top-0 left-0 w-2 h-full",
                    isRetro.value ? "bg-black" : __props.theme === "electric" ? "bg-emerald-400" : "bg-indigo-600"
                  ]
                }, null, 2)) : createCommentVNode("", true),
                createVNode("div", { class: "flex items-center gap-4 relative z-10" }, [
                  createVNode("div", {
                    class: [
                      "flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shrink-0",
                      isRetro.value ? "bg-black text-white border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" : isDark.value ? "bg-slate-950 text-slate-100 rounded-xl" : "bg-slate-100 text-slate-800 rounded-xl"
                    ],
                    style: !isRetro.value && __props.link.accentColor ? { color: __props.link.accentColor, backgroundColor: `${__props.link.accentColor}12` } : {}
                  }, [
                    isCustomIcon.value ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.link.icon,
                      alt: "",
                      class: "w-5 h-5 object-contain rounded"
                    }, null, 8, ["src"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                      __props.link.icon.toLowerCase() === "globe" ? (openBlock(), createBlock("svg", {
                        key: 0,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("circle", {
                          cx: "12",
                          cy: "12",
                          r: "10"
                        }),
                        createVNode("path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" }),
                        createVNode("path", { d: "M2 12h20" })
                      ])) : __props.link.icon.toLowerCase() === "youtube" ? (openBlock(), createBlock("svg", {
                        key: 1,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" }),
                        createVNode("polygon", {
                          points: "10 15 15 12 10 9",
                          fill: "currentColor"
                        })
                      ])) : __props.link.icon.toLowerCase() === "figma" ? (openBlock(), createBlock("svg", {
                        key: 2,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" }),
                        createVNode("path", { d: "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" }),
                        createVNode("path", { d: "M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" }),
                        createVNode("path", { d: "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v3.5a3.5 3.5 0 1 1-7 0z" }),
                        createVNode("path", { d: "M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5A3.5 3.5 0 0 1 8.5 22h-.03a3.47 3.47 0 0 1-3.47-3.5z" })
                      ])) : __props.link.icon.toLowerCase() === "github" ? (openBlock(), createBlock("svg", {
                        key: 3,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }),
                        createVNode("path", { d: "M9 18c-4.51 2-5-2-7-2" })
                      ])) : __props.link.icon.toLowerCase() === "newsletter" || __props.link.icon.toLowerCase() === "email" ? (openBlock(), createBlock("svg", {
                        key: 4,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("rect", {
                          width: "20",
                          height: "16",
                          x: "2",
                          y: "4",
                          rx: "2"
                        }),
                        createVNode("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
                      ])) : (openBlock(), createBlock("svg", {
                        key: 5,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("circle", {
                          cx: "12",
                          cy: "12",
                          r: "10"
                        }),
                        createVNode("path", { d: "m10 15 5-3-5-3" })
                      ]))
                    ], 64))
                  ], 6),
                  createVNode("div", { class: "flex-1 text-left min-w-0" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("h3", {
                        class: [
                          "text-base font-bold truncate leading-tight",
                          isRetro.value ? "font-mono uppercase font-black tracking-tight text-black" : __props.theme === "electric" ? "font-sans text-zinc-100" : "font-sans text-[var(--text-title)]"
                        ]
                      }, toDisplayString(__props.link.title), 3),
                      __props.link.featured ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: [
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none",
                          isRetro.value ? "bg-black text-white rounded-none border border-black font-black" : __props.theme === "electric" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                        ]
                      }, " Featured ", 2)) : createCommentVNode("", true)
                    ]),
                    createVNode("p", {
                      class: [
                        "text-xs mt-1 truncate",
                        isRetro.value ? "font-mono text-black font-medium" : __props.theme === "electric" ? "font-sans text-zinc-400" : "font-sans text-[var(--text-body)]"
                      ]
                    }, toDisplayString(__props.link.description), 3)
                  ]),
                  createVNode("div", {
                    class: [
                      "transition-all duration-300 shrink-0",
                      isRetro.value ? "text-black group-hover:translate-x-1.5" : __props.theme === "electric" ? "text-emerald-400 group-hover:text-emerald-300 group-hover:translate-x-1" : "text-[var(--text-body)] group-hover:text-[var(--text-title)] group-hover:translate-x-1"
                    ]
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      class: "w-5 h-5"
                    }, [
                      createVNode("path", { d: "M5 12h14" }),
                      createVNode("path", { d: "m12 5 7 7-7 7" })
                    ]))
                  ], 2)
                ]),
                !isRetro.value && __props.link.accentColor ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                  style: {
                    background: `radial-gradient(circle at 10% 20%, ${__props.link.accentColor}0a 0%, transparent 50%)`
                  }
                }, null, 4)) : createCommentVNode("", true)
              ], 14, ["href"])
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/LinkCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProfileHeader",
  __ssrInlineRender: true,
  props: {
    profile: {},
    theme: {}
  },
  setup(__props) {
    const props = __props;
    const isRetro = computed(() => props.theme === "retro");
    computed(() => ["pitch-dark", "solarized", "fluent", "electric"].includes(props.theme));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: __props.theme === "electric" ? "w-full pb-[60px]" : "w-full"
      }, _attrs))}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.theme === "electric" ? _sfc_main$4 : "div"), mergeProps(__props.theme === "electric" ? { color: "#10b981", borderRadius: 24, chaos: 0.12, style: { borderRadius: "24px" } } : {}, { class: "w-full" }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="${ssrRenderClass([
              "w-full flex flex-col items-center text-center p-6 md:p-8 theme-card",
              __props.theme === "electric" ? "bg-zinc-900/90 text-white rounded-3xl border-0" : "",
              isRetro.value ? "bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none" : ""
            ])}"${_scopeId}><div class="relative group mb-5"${_scopeId}>`);
            if (!isRetro.value) {
              _push2(`<div class="absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300" style="${ssrRenderStyle({ "background-image": "var(--accent-gradient)" })}"${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img${ssrRenderAttr("src", __props.profile.avatar)}${ssrRenderAttr("alt", `${__props.profile.name}'s Avatar`)} class="${ssrRenderClass([
              "w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105",
              isRetro.value ? "border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200" : "border-2 border-white dark:border-slate-800 rounded-full shadow-inner"
            ])}"${_scopeId}></div><h1 class="${ssrRenderClass([
              "text-2xl md:text-3xl leading-tight mb-2",
              isRetro.value ? "font-mono font-black uppercase text-black" : "font-sans text-[var(--text-title)] tracking-tight"
            ])}"${_scopeId}>${ssrInterpolate(__props.profile.name)}</h1><p class="${ssrRenderClass([
              "text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block",
              isRetro.value ? "bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black" : "rounded-full font-sans"
            ])}" style="${ssrRenderStyle(!isRetro.value ? { backgroundColor: "var(--accent-bg)", color: "var(--accent-text)" } : {})}"${_scopeId}>${ssrInterpolate(__props.profile.title)}</p><p class="${ssrRenderClass([
              "text-sm leading-relaxed max-w-sm mb-6",
              isRetro.value ? "font-mono text-black font-semibold" : "font-sans text-[var(--text-body)]"
            ])}"${_scopeId}>${ssrInterpolate(__props.profile.bio)}</p><div class="flex gap-4 items-center justify-center"${_scopeId}>`);
            if (__props.profile.socials) {
              _push2(`<!--[-->`);
              ssrRenderList(Object.entries(__props.profile.socials), ([platform, url]) => {
                _push2(`<a${ssrRenderAttr("href", url)} target="_blank" rel="noopener noreferrer"${ssrRenderAttr("aria-label", `${__props.profile.name}'s ${platform}`)} class="${ssrRenderClass([
                  "p-2.5 transition-all duration-300",
                  isRetro.value ? "bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110"
                ])}"${_scopeId}>`);
                if (platform === "github") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"${_scopeId}></path></svg>`);
                } else if (platform === "twitter") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"${_scopeId}></path></svg>`);
                } else if (platform === "linkedin") {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"${_scopeId}></path><rect width="4" height="12" x="2" y="9"${_scopeId}></rect><circle cx="4" cy="4" r="2"${_scopeId}></circle></svg>`);
                } else {
                  _push2(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5" stroke-width="2" fill="none" stroke="currentColor"${_scopeId}><rect width="20" height="16" x="2" y="4" rx="2"${_scopeId}></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"${_scopeId}></path></svg>`);
                }
                _push2(`</a>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", {
                class: [
                  "w-full flex flex-col items-center text-center p-6 md:p-8 theme-card",
                  __props.theme === "electric" ? "bg-zinc-900/90 text-white rounded-3xl border-0" : "",
                  isRetro.value ? "bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-none" : ""
                ]
              }, [
                createVNode("div", { class: "relative group mb-5" }, [
                  !isRetro.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute inset-0 rounded-full blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-300",
                    style: { "background-image": "var(--accent-gradient)" }
                  })) : createCommentVNode("", true),
                  createVNode("img", {
                    src: __props.profile.avatar,
                    alt: `${__props.profile.name}'s Avatar`,
                    class: [
                      "w-28 h-28 object-cover relative z-10 transition-transform duration-300 group-hover:scale-105",
                      isRetro.value ? "border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-none bg-cyan-200" : "border-2 border-white dark:border-slate-800 rounded-full shadow-inner"
                    ]
                  }, null, 10, ["src", "alt"])
                ]),
                createVNode("h1", {
                  class: [
                    "text-2xl md:text-3xl leading-tight mb-2",
                    isRetro.value ? "font-mono font-black uppercase text-black" : "font-sans text-[var(--text-title)] tracking-tight"
                  ]
                }, toDisplayString(__props.profile.name), 3),
                createVNode("p", {
                  class: [
                    "text-xs font-bold uppercase tracking-wider mb-4 px-3 py-1 inline-block",
                    isRetro.value ? "bg-black text-yellow-300 border-2 border-black rounded-none font-mono font-black" : "rounded-full font-sans"
                  ],
                  style: !isRetro.value ? { backgroundColor: "var(--accent-bg)", color: "var(--accent-text)" } : {}
                }, toDisplayString(__props.profile.title), 7),
                createVNode("p", {
                  class: [
                    "text-sm leading-relaxed max-w-sm mb-6",
                    isRetro.value ? "font-mono text-black font-semibold" : "font-sans text-[var(--text-body)]"
                  ]
                }, toDisplayString(__props.profile.bio), 3),
                createVNode("div", { class: "flex gap-4 items-center justify-center" }, [
                  __props.profile.socials ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(Object.entries(__props.profile.socials), ([platform, url]) => {
                    return openBlock(), createBlock("a", {
                      key: platform,
                      href: url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "aria-label": `${__props.profile.name}'s ${platform}`,
                      class: [
                        "p-2.5 transition-all duration-300",
                        isRetro.value ? "bg-yellow-300 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ec4899] hover:text-white hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 dark:hover:text-white rounded-full hover:scale-110"
                      ]
                    }, [
                      platform === "github" ? (openBlock(), createBlock("svg", {
                        key: 0,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" })
                      ])) : platform === "twitter" ? (openBlock(), createBlock("svg", {
                        key: 1,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" })
                      ])) : platform === "linkedin" ? (openBlock(), createBlock("svg", {
                        key: 2,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }),
                        createVNode("rect", {
                          width: "4",
                          height: "12",
                          x: "2",
                          y: "9"
                        }),
                        createVNode("circle", {
                          cx: "4",
                          cy: "4",
                          r: "2"
                        })
                      ])) : (openBlock(), createBlock("svg", {
                        key: 3,
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        class: "w-5 h-5",
                        "stroke-width": "2",
                        fill: "none",
                        stroke: "currentColor"
                      }, [
                        createVNode("rect", {
                          width: "20",
                          height: "16",
                          x: "2",
                          y: "4",
                          rx: "2"
                        }),
                        createVNode("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
                      ]))
                    ], 10, ["href", "aria-label"]);
                  }), 128)) : createCommentVNode("", true)
                ])
              ], 2)
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
      ])}"> © ${ssrInterpolate(unref(currentYear))} RAFIESTER • PERSONAL SPACE </p></footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const theme = ref("clean-light");
    const mounted = ref(false);
    const profile = ref(null);
    const links = ref([]);
    const loading = ref(true);
    ref(null);
    const isRetro = computed(() => theme.value === "retro");
    const themeColors = {
      "clean-light": "#ffffff",
      "pitch-dark": "#000000",
      "retro": "#fde047",
      "fluent": "#0f172a",
      "solarized": "#002b36",
      "electric": "#090d16"
    };
    useHead({
      meta: [
        {
          name: "theme-color",
          content: computed(() => themeColors[theme.value] || "#ffffff")
        }
      ]
    });
    const handleThemeChange = (newTheme) => {
      theme.value = newTheme;
      localStorage.setItem("user-theme", newTheme);
      (void 0).documentElement.setAttribute("data-theme", newTheme);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (!mounted.value || loading.value) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4" }, _attrs))} data-v-5d9a03c0><div class="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" data-v-5d9a03c0></div><p class="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse" data-v-5d9a03c0>Loading Experience...</p></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: ["min-h-screen w-full relative flex flex-col items-center justify-between pb-12 pt-6 transition-all duration-300", unref(isRetro) ? "retro-grid" : ""]
        }, _attrs))} data-v-5d9a03c0>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          currentTheme: theme.value,
          onThemeChange: handleThemeChange
        }, null, _parent));
        _push(`<main class="w-full max-w-xl px-4 flex-1 flex flex-col items-center" data-v-5d9a03c0>`);
        if (profile.value) {
          _push(ssrRenderComponent(_sfc_main$2, {
            profile: profile.value,
            theme: theme.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<section class="${ssrRenderClass(["w-full flex flex-col mb-12 mt-4", theme.value === "electric" ? "gap-0 electric-list" : "gap-4"])}" data-v-5d9a03c0><!--[-->`);
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
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d9a03c0"]]);
export {
  index as default
};
//# sourceMappingURL=index-DrqgHNnM.js.map
