// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/globals.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  compatibilityDate: '2024-04-03',
  ssr: false // Single Page Application mode for local Supabase/localStorage workflows
})
