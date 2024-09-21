<template>
    <div class="flex flex-col justify-center w-full h-full">
      <div class="flex justify-center">
        <h1>Welcome</h1>

        <img class="w-64" :src="path" alt="Profile image" />
        <AppAlert>
          {{ name }}
          <UButton @click="signOutUser()">Sign out</UButton>
        </AppAlert>
      </div>
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
  const name = ref('')

  const images = async () => {
    const session = await getSession()
    const image = await getImages(session.data.imageId)
    path.value = `http://localhost:3000/${image.data.path}`
    name.value = `${session.data.firstname} ${session.data.lastname}`
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