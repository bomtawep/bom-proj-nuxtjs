<template>
  <div class="container mx-auto max-w-[1000px] p-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <div class="grid md:grid-cols-2 gap-4">
        <UCard v-for="i in items">
          <img :src="i" :alt="i" class="w-44" />
        </UCard>
      </div>
    </UCard>
  </div>
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