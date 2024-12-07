<template>
  <div v-if="props.isOpen">
    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5" />
    </svg>
  </div>
  <div v-else class="text-3xl font-bold">
    x
  </div>
</template>
<script setup lang="ts">
  import { defineComponent } from 'vue';

  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false,
    },
  })

  defineComponent({
    name: 'CharmMenuHamburger',
  });
</script>