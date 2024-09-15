<template>
  <div class="flex justify-center space-x-5">
    <UButton
      v-if="actionType === ActionType.SIGNUP"
      type="button"
      @click="handleBack"
    >
      Back
    </UButton>
    <UButton
      type="submit"
    >
      {{
        actionType === ActionType.SIGNUP
            ? currentStep !== 3 ? 'Next' : 'Sign Up'
            : 'Sign In'
      }}
    </UButton>
  </div>
</template>
<script setup lang="ts">
  import {ActionType} from "~/const/users";
  import { useUserSteps } from "~/module/users/steps";

  const props = defineProps({
    actionType: {
      type: String,
      default: ActionType.SIGNUP
    },
  })
  const { currentStep } = useUserSteps()
  const router = useRouter()

  const handleBack = () => {
    currentStep.value !== 0 ? currentStep.value-- : router.push('/users/signin')
  }
</script>