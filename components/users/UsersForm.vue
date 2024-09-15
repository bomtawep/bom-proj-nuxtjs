<template>
  <UCard>
    <UForm
      :schema="schema"
      :state="account"
      class="m-2"
      @submit="onSubmit"
      :validate="customValidate"
    >
      <div class="space-y-2">
        {{!isEmail}}
        {{account.Email}}
        <UFormGroup
          label="Username"
          name="Username"
        >
          <UInput
            v-model="account.Username"
            :loading="loading"
          />
        </UFormGroup>
        <UFormGroup
            v-if="isEmail && actionType !== ActionType.SIGNIN"
            label="Email"
            name="Email"
        >
          <UInput
              v-model="account.Email"
              :loading="loading"
          />
        </UFormGroup>
        <UFormGroup
          label="Password"
          name="Password"
        >
          <div class="relative">
            <UInput
              :type="passwordVisible ? 'text' : 'password'"
              v-model="account.Password"
              placeholder="Enter your password"
            />
            <i
              :class="`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ${passwordVisible ? 'i-heroicons-eye-20-solid' : 'i-heroicons-eye-slash-20-solid'}`"
              @click="togglePasswordVisibility"
            />
          </div>
        </UFormGroup>
        <ULink v-if="actionType === ActionType.SIGNIN" class="text-blue-700" @click="handleRegister">Sign up</ULink>
        <UsersAction :action-type="actionType" />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
  import { useRegister } from "~/module/users";
  import type { FormSubmitEvent } from '#ui/types'
  import { status } from "~/const/status"
  import { useUserSteps } from "~/module/users/steps";
  import { ActionType } from "~/const/users";
  import { type Schema, useSignin } from "~/module/users/signin";

  const props = defineProps({
    actionType: {
      type: String,
      default: ActionType.SIGNIN
    }
  })

  const { state, verifyEmail } = useRegister()
  const { nextStep } = useUserSteps()
  const { schema, customValidate } = useSignin()
  const toast = useToast()
  const account = computed(() => state.value.account)
  const loading = computed(() => state.value.loading)
  const { signIn } = useAuth()
  const router = useRouter()
  const passwordVisible = ref(false)

  async function signInWithCredentials() {
    const credentials = {
      username: account.value.Username,
      password: account.value.Password,
    }
    try {
      return await signIn(credentials, {
        callbackUrl: '/',
        redirect: true
      })
    } catch (error) {
      return error
    }
  }

  const handleRegister = () => {
    if (props.actionType === ActionType.SIGNIN) {
      router.push('/users/signup')
    }
  }

  const isEmail = computed(() => !!account.value.Email)

  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
  }

  async function onSubmit (event: FormSubmitEvent<Schema>) {
    if (props.actionType === ActionType.SIGNUP) {
      const response = await verifyEmail()
      if ((response?.statusCode !== status.ERROR_NOT_FOUND)) return toast.add({title: "User already exist", color:"red"})
      nextStep()
    } else {
      const response = await signInWithCredentials()

      if (!response) return
      toast.add({title: response.data.message, color:"orange"})
    }
  }

</script>