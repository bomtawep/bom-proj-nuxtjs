<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>
<script setup lang="ts">
  const links = [
    { label: 'Home', icon: 'i-heroicons-home', to: '/' },
    { label: 'Logo', to: '/logo' },
    { label: 'About', to: '/about' },
    { label: 'Post 1', to: '/posts/1' },
    { label: 'Post 2', to: '/posts/2' },
    { label: 'Users', to: '/users/users' },
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