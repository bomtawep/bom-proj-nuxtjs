<script setup>
const Username = ref('')
const Password = ref('')
const { signIn } = useAuth()
async function signInWithCredentials() {
  // Probably you'll do some validation here before submitting to the backend
  // ...
  // This is the object that our backend expects for the `signIn` endpoint
  const credentials = {
    Username: Username.value,
    Password: Password.value
  }
  try {
    // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
    await signIn(credentials, { redirect: false })
    alert('Successfully logged in!')
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div>
    <h1>Enter your credentials to continue</h1>
    <UInput v-model="Username" type="email" />
    <UInput v-model="Password" type="password" />
    <UButton @click="signInWithCredentials()">Login</UButton>
  </div>
</template>