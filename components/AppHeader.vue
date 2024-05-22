<!--Create AppHeader.vue component-->
<template>
  <header class="sticky">
    <div class="flex justify-between items-center">
      <h1>{{ title }}</h1>
      <Navigation />
      <ClientOnly>
        <UButton
            :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
            color="gray"
            variant="ghost"
            aria-label="Theme"
            @click="isDark = !isDark"
        />
      </ClientOnly>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

a {
  color: white;
  text-decoration: none;
}
</style>