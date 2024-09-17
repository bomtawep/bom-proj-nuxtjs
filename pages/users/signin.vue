<template>
  <div class="container mx-auto my-auto md:px-25 lg:px-32 xl:px-64">
    <div class="flex justify-center bg-gray-400 rounded-lg relative shadow-2xl">
      <img src="~/assets/img/store.png" alt="Store" class="w-96 h-96" />
      <UsersForm :action-type="ActionType.SIGNIN" class="flex flex-col justify-center w-full h-auto" />
      <ItemsTheme/>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ActionType } from "~/const";
  import { useRegister } from "~/module/users";

  definePageMeta({
    auth: false,
    layout: 'signin',
    name: ActionType.SIGNIN
  })

  const { resetUser } = useRegister()

  onMounted(() => {
    resetUser()
  })
</script>