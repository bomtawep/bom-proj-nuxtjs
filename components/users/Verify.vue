<template>
  <UForm
    :state="state"
    class="m-2"
    @submit="onSubmit"
  >
    <div class="flex flex-col justify-around">
      <div class="text-center mx-auto">
        <img
          v-if="profileImage.file.size > 0"
          :src="profileImage?.fileUrl"
          :alt="profileImage?.fileName"
          class="rounded-full w-48 h-48 mb-2"
          draggable="true"
        >
      </div>
      <div class="flex justify-center gap-2 mb-2">
        <svg
            viewBox="0 0 1024 1024"
            :fill="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'"
            class="icon w-10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M110.4 923.2c-56.8 0-102.4-48-102.4-106.4V285.6c0-58.4 45.6-106.4 102.4-106.4h800.8c56.8 0 102.4 48 102.4 106.4V816c0 58.4-45.6 106.4-102.4 106.4H110.4z m0-701.6c-34.4 0-61.6 28.8-61.6 64V816c0 35.2 28 64 61.6 64h800.8c34.4 0 61.6-28.8 61.6-64V285.6c0-35.2-28-64-61.6-64H110.4z"
              :fill="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'"
          />
          <path
              d="M541.6 392c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 511.2c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h328c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24h-328zM541.6 638.4c-12.8 0-23.2-10.4-23.2-24s10.4-24 23.2-24h276.8c12.8 0 23.2 10.4 23.2 24s-10.4 24-23.2 24H541.6zM58.4 886.4c-2.4 0-4.8 0-7.2-0.8-12.8-4-20-18.4-16-32 23.2-78.4 77.6-142.4 148-176l16-8-13.6-12c-40-34.4-63.2-85.6-63.2-139.2 0-100 78.4-180.8 173.6-180.8 96 0 173.6 80.8 173.6 180.8 0 53.6-23.2 104.8-63.2 139.2l-13.6 12 16 8c68 32 132.8 112 157.6 194.4 16 52.8-16.8 36-1.6 16-3.2 4.8-16.8-5.6-32-5.6-12.8 0-19.2 24.8-19.2 22.4-31.2-104-120.8-203.2-217.6-203.2-99.2 0-186.4 67.2-216 166.4-1.6 11.2-11.2 18.4-21.6 18.4z m239.2-498.4c-69.6 0-126.4 58.4-126.4 130.4s56.8 130.4 126.4 130.4c69.6 0 126.4-58.4 126.4-130.4-0.8-72-56.8-130.4-126.4-130.4z"
              :fill="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'"
          />
        </svg>
        <div class="flex justify-center mt-2 text-xl">Your Account</div>
      </div>
      <div class="flex-row">
        <div class="flex-col columns-2">
          Username
          <div class="text-gray-500">{{ account.username }}</div>
        </div>
        <div v-if="account.email" class="flex-col columns-2">
          Email
          <div class="text-gray-500">{{ account.email }}</div>
        </div>
        <div class="flex-col columns-2">
          Password
          <div class="text-gray-500">{{ account.password }}</div>
        </div>
      </div>

      <div class="flex justify-center gap-2 mb-2 mt-4">
        <svg class="w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17V11" :stroke="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" :fill="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'"/>
          <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" :stroke="$colorMode.preference !== 'dark' ? 'deepskyblue' : 'white'" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <div class="flex justify-center mt-2 text-xl">Your personal info</div>
      </div>
      <div class="flex-row mb-4">
        <div class="flex-col columns-2">
          Firstname
          <div class="text-gray-500">{{ personalInfo.firstname }}</div>
        </div>
        <div class="flex-col columns-2">
          Lastname
          <div class="text-gray-500">{{ personalInfo.lastname }}</div>
        </div>
        <div v-if="personalInfo.nickname" class="flex-col columns-2">
          Nickname
          <div class="text-gray-500">{{ personalInfo.nickname }}</div>
        </div>
        <div class="flex-col columns-2">
          Gender
          <div class="text-gray-500">{{ personalInfo.gender }}</div>
        </div>
        <div class="flex-col columns-2">
          Birthdate
          <div class="text-gray-500">{{ convertToThaiDateTime(personalInfo.birthdate) }}</div>
        </div>
        <div v-if="personalInfo.phoneNumber" class="flex-col columns-2">
          Phone
          <div class="text-gray-500">{{ personalInfo.phoneNumber }}</div>
        </div>
      </div>
      <UsersAction />
    </div>
  </UForm>
</template>
<script setup lang="ts">
  import { useRegister } from "~/module/users";
  import useUsersApi from "~/api/users";
  import { StatusType } from "~/const/users";
  import { StatusCode } from "~/const/statusCode";
  import { convertToThaiDateTime } from "~/utils/convertToThaiDateTime";
  import {useImagesApi} from "~/api/images";

  const { state, resetUser } = useRegister()
  const { postUser } = useUsersApi()
  const { uploadImage } = useImagesApi()
  const toast = useToast()
  const personalInfo = computed(() => state.value.personalInfo)
  const profileImage = computed(() => state.value.profileImage)
  const account = computed(() => state.value.account)

  async function onSubmit () {
    const { id, ...acc } = account.value
    const responseImage = await uploadImage(state.value.profileImage.file)
    console.log("responseImage.statusCode", responseImage.statusCode)
    if (responseImage.statusCode !== StatusCode.CREATED) return toast.add({ title: responseImage.message, color: 'red'})


    const payload = {
      ...acc,
      ...personalInfo.value,
      status: StatusType.ACTIVE,
      imageId: responseImage.data.id
    }

    const response = await postUser(payload)
    if (response.statusCode !== StatusCode.CREATED) return toast.add({ title: response.message, color: 'red'})
    await navigateTo('/users/signin')
    resetUser()
  }
</script>

<style scoped>
  svg {
    color: deepskyblue; /* Or any color of your choice. */
  }
</style>