<template>
  <UCard class="color-bg-primary justify-items-center justify-content-center">
    <UCarousel
        v-slot="{ item }"
        :items="items"
        :ui="{ item: 'basis-full' }"
        arrows
        class="rounded-lg overflow-hidden w-96 h-96"
    >
      <img
          class="w-full h-full object-cover"
          :src="item"
          draggable="false"
          alt="test"
      >
    </UCarousel>
  </UCard>
</template>
<script setup lang="ts">
const items = [
  'https://picsum.photos/600/800?random=1',
  'https://picsum.photos/600/800?random=2',
  'https://picsum.photos/600/800?random=3',
  'https://picsum.photos/600/800?random=4',
  'https://picsum.photos/600/800?random=5',
  'https://picsum.photos/600/800?random=6'
]
definePageMeta({
  viewTransition: false,
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  }
})
</script>