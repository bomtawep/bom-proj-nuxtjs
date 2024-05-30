<template>
  <UCard>
    <UForm
      :schema="schema"
      :state="account"
      class="m-2"
      @submit="onSubmit"
    >
      <div class="space-y-2">
        <UFormGroup
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
          <UInput
            v-model="account.Password"
            type="password"
          />
        </UFormGroup>
        <action />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import {useRegister} from "~/module/users";
import type {FormSubmitEvent} from '#ui/types'
import Action from "~/components/users/Action.vue";
import { status } from "~/const/status"

const { state, nextStep, verifyEmail } = useRegister()
const toast = useToast()

const account = computed(() => state.value.account)
const loading = computed(() => state.value.loading)
const schema = object({
  Email: string().email('Invalid email').required('Required'),
  Password: string()
      .min(8, 'Must be at least 8 characters')
      .required('Required')
      .matches(/[A-Z]/, 'At least one uppercase letter')
      .matches(/[a-z]/, 'At least one lowercase letter')
      .matches(/[0-9]/, 'At least one number')
      .matches(/[^A-Za-z0-9]/, 'At least one special character')
})

type Schema = InferType<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const response = await verifyEmail()
  if (!response?.status) return
  if (!(response?.status !== status.ERROR_NOT_FOUND)) return toast.add({title: response.data.message, color:"orange"})
  nextStep()
}

</script>