<template>
  <template v-if="path !== '/users/signin'">
    <NuxtLayout>
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </template>
  <template v-else>
    <Signin>
      <NuxtPage />
      <UNotifications />
    </Signin>
  </template>
</template>
<script setup lang="ts">

  import Signin from "~/layouts/signin.vue";

  const title = ref('bom')

  const route = useRoute()
  const path = computed(() => route.path || '/')
  useHead({
    title: 'bom App',
    meta: [
      { name: 'description', content: 'bom site.' }
    ],
    bodyAttrs: {
      class: 'test'
    },
    script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
  })
  useSeoMeta({
    title: title,
    ogTitle: 'bom website',
    description: 'bom',
    ogDescription: 'bom',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
  })
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>