<template>
  <div class="flex flex-col h-screen">
    <AppHeader />
    <div class="flex-1">
      <slot />
      <div v-if="$route.params.id">
        <NuxtLink :to="prev"><--</NuxtLink> |
        <NuxtLink :to="next">--></NuxtLink>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id || 1))
const prev = computed(() => '/' + (id.value - 1))
const next = computed(() => '/' + (id.value + 1))
</script>