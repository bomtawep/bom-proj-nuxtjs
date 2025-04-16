<template>
  <div class="flex justify-center items-center h-screen">
    <div class="flex flex-col items-center">
      <template v-if="isLoading">
        <div class="flex items-center gap-4">
          Loading
          <div class="spin"/>
        </div>
      </template>
      <template v-else>
        <slot/>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    isLoading: boolean
  }>()
</script>

<style scoped>
.spin {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3498db;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  animation: spin 1s linear infinite;
}
</style>