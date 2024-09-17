<template>
  <div v-if="[pageName.SIGNIN, pageName.SIGNUP].includes(routeName)">
    <Signin>
      <NuxtPage />
      <UNotifications />
    </Signin>
  </div>
  <div v-else>
    <NuxtLayout>
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  import Signin from "~/layouts/signin.vue";
  import { pageName, title } from "~/const";

  const route = useRoute()
  const routeName = computed(() => route.name || '/')
  useHead({
    title: title.TITLE,
    meta: [
      { name: 'description', content: 'bom site.' }
    ],
    bodyAttrs: {
      class: 'test'
    },
    script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
  })
  useSeoMeta({
    title: title.TITLE,
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