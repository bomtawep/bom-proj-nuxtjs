<script lang="ts" setup> const { signOut, token} = useAuth()
const toast = useToast()
async function _signOut() {
  try {
    await signOut({
      callbackUrl: '/account/signin/',
      redirect: true
    })
    // Add after logout logic here, could be removing the session data from localstorage or whatever
  } catch (error: any) {
    toast.add({ title: error?.data?.message || error?.message, color: 'red'});
  }
}
</script>
<template>
  <button @click="_signOut()">
    Sign Out
  </button>

</template>