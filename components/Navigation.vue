<template>
  <ItemsHamburger @click="handleClick" class="sm:hidden" :is-open="!isShow" />
  <UHorizontalNavigation class="max-sm:hidden md:block" :links="links" />
  <UVerticalNavigation :class="`${!isShow ? 'hidden' : ''} sm:hidden`" :links="links" />
</template>
<script setup lang="ts">
  const links = [
    { label: 'Home', icon: 'i-heroicons-home', to: '/' },
    { label: 'Product', to: '/products/products' },
    { label: 'Your product', to: '/products/product' },
    { label: 'Product type', to: '/product-type/list' },
    { label: 'Brand', to: '/brand/list' },
  ]

  const isShow = ref(false)

  const handleClick = () => {
    isShow.value = !isShow.value
  }
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