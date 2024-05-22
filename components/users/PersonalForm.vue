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
          name="Firstname"
        >
          <UInput v-model="personalInfo.Firstname"/>
        </UFormGroup>
        <UFormGroup
          label="Lastname"
          name="Lastname"
        >
          <UInput
            v-model="personalInfo.Lastname"
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
            {{ format(personalInfo.Birthdate, 'd MMM, yyy') }}
          </UButton>
          <template #panel="{ close }">
            <ItemsDatePicker
              v-model="personalInfo.Birthdate"
              is-required
              @close="close"
            />
          </template>
        </UPopover>
        <UFormGroup
          label="Phone"
          name="Phone"
        >
          <vue-tel-input
            v-model="personalInfo.Phone"
            mode="international"
          />
        </UFormGroup>
        <action />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import {object, string, type InferType} from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import Action from "~/components/users/Action.vue";
import {useRegister} from "~/module/users";
import { usersConst } from "~/const/usersConst";
import { format } from 'date-fns'
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

// Validate phone number with + and prefix and number only
const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/
const schema = object({
  Firstname: string().required('Required'),
  Lastname: string().required('Required'),

  Phone: string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
})
type Schema = InferType<typeof schema>
const { state, nextStep } = useRegister()
const { genderConst } = usersConst

const personalInfo = computed(() => state.value.personalInfo)
const gender = computed({
  get: () =>
    !(state.value.personalInfo.Gender !== genderConst.FEMALE),
  set: (value: boolean) => {
    if (!value) {
      state.value.personalInfo.Gender = genderConst.MALE
    } else {
      state.value.personalInfo.Gender = genderConst.FEMALE
    }
  }
})
async function onSubmit (event: FormSubmitEvent<Schema>) {
  nextStep()
}
</script>