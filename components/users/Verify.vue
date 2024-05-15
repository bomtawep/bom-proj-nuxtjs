<template>
  <UCard>
    <UForm
      :state="state"
      class="m-2"
      @submit="onSubmit"
    >
      <div class="flex flex-col justify-around">
        <div class="text-center mx-auto">
          <ULink
              :href="profileImage.FileUrl"
              class="text-primary-500"
          >
            <img
                :src="profileImage?.FileUrl"
                :alt="profileImage?.FileName"
                class="rounded-full w-48 h-48 mb-2"
                draggable="true"
            >
          </ULink>
        </div>
        <h1>Your account</h1>
        <div class="flex gap-5">
          <h1>Username</h1>
          <p>{{ account.Email }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Password</h1>
          <p>{{ account.Password }}</p>
        </div>
        <h1>Your personal info</h1>
        <div class="flex gap-5">
          <h1>Firstname</h1>
          <p>{{ personalInfo.Firstname }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Lastname</h1>
          <p>{{ personalInfo.Lastname }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Gender</h1>
          <p>{{ personalInfo.Gender }}</p>
        </div>
        <action />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
  import {useRegister} from "~/module/users";
  import Action from "~/components/users/Action.vue";
  import useUsersApi from "~/api/users";

  const { state, resetUser } = useRegister()
  const { postUser, uploadImage } = useUsersApi()
  const router = useRouter();

  const account = computed(
    () => state.value.account
  )
  const personalInfo = computed(
    () => state.value.personalInfo
  )

  const profileImage = computed(
    () => state.value.profileImage
  )

  async function onSubmit () {
    console.log(state.value.profileImage)
    const payload = {
      ...state.value.account,
      ...state.value.personalInfo,
    }
    console.log(payload, 'payload')
    const response = await postUser(payload)
    if (response.status !== 201) return
    const responseImage = await uploadImage(state.value.profileImage.File)
    if (responseImage.status !== 201) return
    await router.push('/users/users')
    resetUser()
  }
</script>