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
          name="email"
        >
          <UInput v-model="account.Email"/>
        </UFormGroup>
        <UFormGroup
          label="Password"
          name="password"
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

const { state, nextStep } = useRegister()
const account = computed(() => state.value.account)

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
  nextStep()
}

</script>