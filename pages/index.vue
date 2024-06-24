<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
    <UButton @click="signOutUser()">Sign out</UButton>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAuth()

async function signOutUser() {
  await signOut({
    callbackUrl: '/users/signin',
    redirect: true
  })
}
</script>
<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>