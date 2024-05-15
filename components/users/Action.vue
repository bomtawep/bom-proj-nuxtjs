<template>
  <div class="flex justify-center space-x-5">
    <UButton
      v-if="currentStep !== 0"
      type="button"
      @click="decreaseStep()"
    >
      Back
    </UButton>
    <UButton
      type="submit"
    >
      {{currentStep !== steps.length - 1 ? 'Next' : 'Create User'}}
    </UButton>
  </div>
</template>
<script setup lang="ts">
  import { useRegister } from "~/module/users";
  const { currentStep, decreaseStep, steps } = useRegister()
</script>