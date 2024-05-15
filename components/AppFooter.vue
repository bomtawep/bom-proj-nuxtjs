<template>
  <footer
      class="fixed-bottom"
  >
    <p>&copy; bom</p>
  </footer>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps()
</script>
<style scoped>
footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}
</style>