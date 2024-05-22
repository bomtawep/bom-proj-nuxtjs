<template>
  <div class="container md:px-25 lg:px-32 xl:px-64 mx-auto">
    <div class="m-10 space-y-2">
      <UProgress
          :value="currentStep"
          :max="steps"
      />
      <h1>Register</h1>
      <UsersForm
          v-if="currentStep === 0"
      />
      <PersonalForm
          v-if="currentStep === 1"
      />
      <UploadImageForm
          v-if="currentStep === 2"
      />
      <Verify
          v-if="currentStep === 3"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import {useRegister} from "~/module/users";
  import PersonalForm from "~/components/users/PersonalForm.vue";
  import UploadImageForm from "~/components/users/UploadImageForm.vue";
  import Verify from "~/components/users/Verify.vue";

  const { currentStep, steps } = useRegister()
</script>