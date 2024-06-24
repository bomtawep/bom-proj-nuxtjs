<script setup lang="ts">
const Username = ref('')
const Password = ref('')
const { signIn } = useAuth()
async function signInWithCredentials() {
  const credentials = {
    Username: Username.value,
    Password: Password.value
  }
  try {
    await signIn(credentials, {
      callbackUrl: '/',
      redirect: true
    })
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>

  <div>
    <UsersForm />
    <UButton @click="signInWithCredentials()">Login</UButton>
  </div>
</template>