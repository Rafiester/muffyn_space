<script setup lang="ts">
// Nuxt 3 entry configuration
useHead({
  title: 'Alex Rivera | Creative Technologist & Interface Designer',
  meta: [
    {
      name: 'description',
      content: 'Link-in-bio profile showcasing interactive design work, newsletter, tutorials, open-source repositories, and Figma resources.'
    }
  ],
  htmlAttrs: {
    lang: 'en',
    class: 'h-full antialiased'
  },
  bodyAttrs: {
    class: 'min-h-full flex flex-col'
  }
});
</script>

<template>
  <NuxtPage />
</template>
