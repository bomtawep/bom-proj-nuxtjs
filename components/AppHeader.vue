<!--Create AppHeader.vue component-->
<template>
  <header class="sticky top-0">
    <div class="flex justify-between items-center">
      <h1>{{ title.TITLE }}</h1>
      <Navigation />
      <ItemsTheme/>
    </div>
  </header>
</template>

<script setup lang="ts">
import { title } from "~/const";
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