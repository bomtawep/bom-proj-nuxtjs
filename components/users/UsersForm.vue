<template>
  <UForm
    :schema="schema"
    :state="state.account"
    @submit="onSubmit"
    :validate="customValidate"
  >
    <div class="space-y-2">
      <UFormGroup
        :label="`${!state.isEmail || actionType === ActionType.SIGNIN ? 'Username' : 'Username or email'}`"
        name="username"
        required
      >
        <UInput
          v-model="state.account.username"
          :loading="state.loading"
          placeholder="Enter your username"
        />
      </UFormGroup>
      <UFormGroup
          v-if="!state.isEmail && actionType !== ActionType.SIGNIN"
          label="Email"
          name="email"
          required
          :error="getError('email')"
      >
        <UInput
            v-model="state.account.email"
            :loading="state.loading"
            placeholder="Enter your email"
        />
      </UFormGroup>
      <UFormGroup
        label="Password"
        name="password"
        required
      >
        <div class="relative">
          <UInput
            :type="passwordVisible ? 'text' : 'password'"
            v-model="state.account.password"
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
</template>
<script setup lang="ts">
  import { useRegister } from "~/module/users";
  import type { FormError, FormSubmitEvent } from '#ui/types'
  import { useUserSteps } from "~/module/users/steps";
  import { ActionType } from "~/const";
  import { StatusCode } from "~/const/statusCode";
  import { type Schema, useSignin } from "~/module/users/signin";

  const props = defineProps({
    actionType: {
      type: String,
      default: ActionType.SIGNUP
    }
  })

  const { state, verify } = useRegister()
  const { nextStep } = useUserSteps()
  const { schema, customValidate } = useSignin()
  const toast = useToast()
  const { signIn } = useAuth()
  const router = useRouter()
  const passwordVisible = ref(false)

  async function signInWithCredentials() {
    const credentials = {
      username: state.value.account.username,
      password: state.value.account.password,
    }
    try {
      return await signIn(credentials, {
        callbackUrl: '/',
        redirect: true
      })
    } catch (error) {
      throw error
    }
  }

  const handleRegister = () => {
    if (props.actionType === ActionType.SIGNIN) {
      router.push('/users/signup')
    }
  }

  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
  }

  function getError(field: string) {
    const error = customValidate(state.value.account).find((e: FormError) => e.path === field)
    return error ? error.message : ''
  }

  async function onSubmit (_: FormSubmitEvent<Schema>) {
    if (props.actionType !== ActionType.SIGNIN) {
      const response = await verify()
      if (response?.statusCode !== StatusCode.CREATED)
        return toast.add({title: response?.message, color:"orange"})
      nextStep()
    } else {
      try {
        await signInWithCredentials()
      } catch (error) {
        toast.add({title: 'Login failed', color: 'red'})
      }
    }
  }

</script>