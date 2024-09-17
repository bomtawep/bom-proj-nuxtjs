<template>
  <UCard>
    <UForm
      :schema="schema"
      :state="personalInfo"
      class="m-2"
      @submit="onSubmit"
    >
      <div class="space-y-2">
        <UFormGroup
          label="Firstname"
          name="firstname"
        >
          <UInput v-model="personalInfo.firstname"/>
        </UFormGroup>
        <UFormGroup
          label="Lastname"
          name="lastname"
        >
          <UInput
            v-model="personalInfo.lastname"
          />
        </UFormGroup>
        <UFormGroup
          label="Gender"
          name="gender"
        >
          <UToggle
            size="md"
            v-model="gender"
            :ui="{
              active: 'bg-primary-500 dark:bg-primary-500',
              inactive: 'bg-primary-500 dark:bg-primary-500',
            }"
          />
          <span class="ml-2">{{gender ? 'Female': 'Male'}}</span>
        </UFormGroup>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(personalInfo.birthdate, 'd MMM, yyy') }}
          </UButton>
          <template #panel="{ close }">
            <ItemsDatePicker
              v-model="personalInfo.birthdate"
              is-required
              @close="close"
            />
          </template>
        </UPopover>
        <UFormGroup
          label="Phone"
          name="phone"
        >
          <vue-tel-input
            v-model="personalInfo.phone"
            mode="international"
          />
        </UFormGroup>
        <UsersAction />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { GenderType} from "~/const/users";
import { format } from 'date-fns'
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { useUserSteps } from "~/module/users/steps";
import { useRegister } from "~/module/users";

// Validate phone number with + and prefix and number only
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/
const schema = object({
  firstname: string().required('Required'),
  lastname: string().required('Required'),

  phone: string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
})
type Schema = InferType<typeof schema>
const { state } = useRegister()
const { nextStep } = useUserSteps()

const personalInfo = computed(() => state.value.personalInfo)
const gender = computed({
  get: () =>
    !(state.value.personalInfo.gender !== GenderType.FEMALE),
  set: (value: boolean) => {
    if (!value) {
      state.value.personalInfo.gender = GenderType.MALE
    } else {
      state.value.personalInfo.gender = GenderType.FEMALE
    }
  }
})
async function onSubmit (event: FormSubmitEvent<Schema>) {
  nextStep()
}
</script>