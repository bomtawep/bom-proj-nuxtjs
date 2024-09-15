<template>
  <img :width="width" :height="height" :class="styles" :src="`~/assets/img/${name}`" :alt="alt" />
</template>
<script setup lang="ts">

  const props = defineProps({
    width: {
      type: Number,
      default: 32
    },
    height: {
      type: Number,
      default: 32
    },
    alt: {
      type: String,
      default: 'bom'
    },
    title: {
      type: String,
      default: 'bom'
    },
    styles: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'bom'
    }
  })
</script>