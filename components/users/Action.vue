<template>
  <div :class="`flex justify-center space-x-5 ${isHidden ? 'hidden' : ''}`">
    <UButton
      v-if="actionType === ActionType.SIGNUP"
      type="button"
      class="bg-amber-500 hover:bg-amber-600"
      @click="handleBack"
    >
      Back
    </UButton>
    <UButton
      type="submit"
      class="bg-sky-500 hover:bg-sky-600"
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
  import { ActionType } from "~/const";
  import { useUserSteps } from "~/module/users/steps";

  const props = defineProps({
    actionType: {
      type: String,
      default: ActionType.SIGNUP
    },
    isHidden: {
      type: Boolean,
      default: false
    }
  })
  const { currentStep } = useUserSteps()
  const router = useRouter()

  const handleBack = () => {
    currentStep.value !== 0 ? currentStep.value-- : router.push('/users/signin')
  }
</script>