<template>
  <UHorizontalNavigation :links="links" class="dark:border-gray-800" />
</template>
<script setup lang="ts">
  const links = [
    { label: 'Home', icon: 'i-heroicons-home', to: '/' },
    { label: 'Product', to: '/products/products' },
    { label: 'Your product', to: '/products/product' },
  ]
</script>
<style scoped>
nav {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
}

ul {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

a {
  color: white;
  text-decoration: none;
}

.active {
  font-weight: bold;
}
</style>