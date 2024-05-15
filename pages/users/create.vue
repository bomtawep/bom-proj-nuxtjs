<template>
  <div class="sm:flex justify-center">
    <div class="m-10 xl:w-1/3 md:w-1/2 justify-center space-y-2">
      <UProgress
          :value="currentStep"
          :max="steps"
      />
      <h1>Register</h1>
      <users-form
          v-if="currentStep === 0"
      />
      <personal-form
          v-if="currentStep === 1"
      />
      <upload-image-form
          v-if="currentStep === 2"
      />
      <verify
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