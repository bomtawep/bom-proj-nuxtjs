<template>
  <div class="flex flex-col col-span-2 justify-items-center">
    <h1 class="col-span-1">Welcome to the homepage</h1>

    <img :src="path" alt="Logo" />
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
    <UButton @click="signOutUser()">Sign out</UButton>
  </div>
</template>

<script setup lang="ts">
  import useUsersApi from "~/api/users";

  const { signOut } = useAuth()
  const { getSession, getImages } = useUsersApi()

  async function signOutUser() {
    await signOut({
      callbackUrl: '/users/signin',
      redirect: true
    })
  }

  const path = ref('')

  const images = async () => {
    const session = await getSession()
    const image = await getImages(session.data.imageId)
    path.value = `http://localhost:3000/${image.data.path}`
  }

  onMounted(() => {
    images()
  })
</script>
<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>