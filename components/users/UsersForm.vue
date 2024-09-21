<template>
  <UForm
    :schema="schema"
    :state="account"
    @submit="onSubmit"
    :validate="customValidate"
  >
    <div class="space-y-2">
      <UFormGroup
        :label="`${!isEmail || actionType === ActionType.SIGNIN ? 'Username' : 'Username or email'}`"
        name="username"
        required
      >
        <UInput
          v-model="account.username"
          :loading="loading"
          placeholder="Enter your username"
        />
      </UFormGroup>
      <UFormGroup
          v-if="!isEmail && actionType !== ActionType.SIGNIN"
          label="Email"
          name="email"
          required
      >
        <UInput
            v-model="account.email"
            :loading="loading"
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
            v-model="account.password"
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
  import type { FormSubmitEvent } from '#ui/types'
  import { useUserSteps } from "~/module/users/steps";
  import { ActionType } from "~/const";
  import { StatusCode } from "~/const/statusCode";
  import { type Schema, useSignin } from "~/module/users/signin";

  const props = defineProps({
    actionType: {
      type: String,
      default: ActionType.SIGNIN
    }
  })

  const { state, verify } = useRegister()
  const { nextStep } = useUserSteps()
  const { schema, customValidate } = useSignin()
  const toast = useToast()
  const account = computed(() => state.value.account)
  const loading = computed(() => state.value.loading)
  const isEmail = computed(() => state.value.isEmail)
  const { signIn } = useAuth()
  const router = useRouter()
  const passwordVisible = ref(false)

  async function signInWithCredentials() {
    const credentials = {
      username: account.value.username,
      password: account.value.password,
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

  const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value
  }

  async function onSubmit (event: FormSubmitEvent<Schema>) {
    if (props.actionType !== ActionType.SIGNIN) {
      const response = await verify()
      if (response.statusCode !== StatusCode.CREATED)
        return toast.add({title: response.message, color:"orange"})
      nextStep()
    } else {
      const response = await signInWithCredentials()
      if (response) return toast.add({title: response.message, color:"orange"})
    }
  }

</script>