<template>
  <div class="container mx-auto my-auto md:px-25 lg:px-32 xl:px-64">
    <div class="max-w-md mx-auto overflow-hidden md:max-w-2xl dark:bg-gray-700 bg-gray-400 rounded-xl shadow-2xl">
      <div class="md:flex">
        <div class="md:shrink-0">
            <img src="~/assets/img/store.png" alt="Store" class="h-64 w-full object-cover md:h-full md:w-64" />
        </div>
        <UCard class="flex flex-col-reverse justify-center rounded-lg w-full">
          <div class="flex justify-end w-full">
            <ItemsTheme />
          </div>
          <UsersForm :action-type="ActionType.SIGNIN" />
        </UCard>
      </div>
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