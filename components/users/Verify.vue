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
              :href="profileImage.fileUrl"
              class="text-primary-500"
          >
            <img
                :src="profileImage?.fileUrl"
                :alt="profileImage?.fileName"
                class="rounded-full w-48 h-48 mb-2"
                draggable="true"
            >
          </ULink>
        </div>
        <h1>Your account</h1>
        <div class="flex gap-5">
          <h1>Username</h1>
          <p>{{ account.email }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Password</h1>
          <p>{{ account.password }}</p>
        </div>
        <h1>Your personal info</h1>
        <div class="flex gap-5">
          <h1>Firstname</h1>
          <p>{{ personalInfo.firstname }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Lastname</h1>
          <p>{{ personalInfo.lastname }}</p>
        </div>
        <div class="flex gap-5">
          <h1>Gender</h1>
          <p>{{ personalInfo.gender }}</p>
        </div>
        <UsersAction />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
  import { useRegister } from "~/module/users";
  import useUsersApi from "~/api/users";
  import { StatusType } from "~/const/users";

  const { state, resetUser } = useRegister()
  const { postUser, uploadImage } = useUsersApi()
  const router = useRouter();
  const toast = useToast()
  const personalInfo = computed(() => state.value.personalInfo)
  const profileImage = computed(() => state.value.profileImage)
  const account = computed(() => state.value.account)

  async function onSubmit () {
    const { id, ...acc } = account.value
    const payload = {
      ...acc,
      ...personalInfo.value,
      status: StatusType.ACTIVE,
    }

    const response = await postUser(payload)
    console.log('response', response)
    if (!response.id) return toast.add({ title: response.message, color: 'red'})
    await navigateTo('/users/signin')
    // const responseImage = await uploadImage(state.value.profileImage.file, response.id)
    // if (responseImage.status !== 201) return toast.add({ title: response.message, color: 'red'})
    // await navigateTo('/users/signin')
    resetUser()
  }
</script>