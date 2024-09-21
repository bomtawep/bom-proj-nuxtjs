<template>
  <div class="container mx-auto my-auto md:px-25 lg:px-32 xl:px-64">
    <div class="m-10 space-y-2">
      <UProgress
        :value="currentStep"
        :max="steps"
      />
      <div class="text-xl">Register</div>
      <UCard class="rounded-lg shadow-2xl">
        <div class="flex justify-end w-full">
          <ItemsTheme />
        </div>
        <UsersForm
          v-if="currentStep === 0"
          :action-type="ActionType.SIGNUP"
        />
        <PersonalForm
          v-if="currentStep === 1"
        />
        <UsersUserImageForm v-if="currentStep === 2" />
        <Verify
          v-if="currentStep === 3"
        />
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
  import PersonalForm from "~/components/users/PersonalForm.vue";
  import Verify from "~/components/users/Verify.vue";
  import { useUserSteps } from "~/module/users/steps";
  import { ActionType } from "~/const";
  import { useRegister } from "~/module/users";

  definePageMeta({
    auth: false,
    layout: 'signin',
    name: ActionType.SIGNUP
  })

  const { steps, currentStep } = useUserSteps()
  const { resetUser } = useRegister()

  onMounted(() => {
    resetUser()
  })
</script>