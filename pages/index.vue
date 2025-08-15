<template>
  <div class="flex justify-center w-full">
    <div class="flex md:flex-col justify-center w-full h-full">
      <h1>Welcome</h1>
      <AppAlert>
        <UButton @click="signOutUser()">Sign out</UButton>
      </AppAlert>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useUsersApi from "~/api/users";
  import { useImagesApi } from "~/api/images";
  import {useProfile} from "~/module/users/profile";

  const { signOut } = useAuth()
  const { getImages } = useImagesApi()
  const { getSession } = useUsersApi()
  const { setProfileImage, setFullName } = useProfile()

  async function signOutUser() {
    await signOut({
      callbackUrl: '/users/signin',
      redirect: true
    })
  }

  const getProfile = async () => {
    const session = await getSession()
    const image = await getImages(session.data.imageId)
    setProfileImage(image.data.path)
    setFullName(`${session.data.firstname} ${session.data.lastname}`)
  }

  onMounted(() => {
    getProfile()
  })
</script>
<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>