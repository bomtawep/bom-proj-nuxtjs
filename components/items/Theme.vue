<template>
  <ClientOnly>
    <UButton
        :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        class="absolute top-8 right-8 rounded-lg"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
    />
  </ClientOnly>
</template>
<script setup lang="ts">
  import {computed} from "vue";

  const colorMode = useColorMode()
  const isDark = computed({
    get () {
      return colorMode.value === 'dark'
    },
    set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
</script>