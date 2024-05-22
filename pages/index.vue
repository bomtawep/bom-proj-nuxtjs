<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
// import('~/assets/css/main.css')
</script>
<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>