<template>
  <UForm
    :schema="schema"
    :state="personalInfo"
    class="m-2"
    @submit="onSubmit"
    :validate="customValidate"
  >
    <div class="space-y-2">
      <UFormGroup
        label="Firstname"
        name="firstname"
        required
      >
        <UInput v-model="personalInfo.firstname"/>
      </UFormGroup>
      <UFormGroup
        label="Lastname"
        name="lastname"
        required
      >
        <UInput
          v-model="personalInfo.lastname"
        />
      </UFormGroup>
      <UFormGroup
          label="Nickname"
          name="nickname"
      >
        <UInput
            v-model="personalInfo.nickname"
        />
      </UFormGroup>
      <UFormGroup
        name="gender"
      >
        <span class="font-medium text-sm text-gray-700 dark:text-gray-200">
          {{ "Gender Male" }}
          <UToggle
            size="md"
            v-model="gender"
            :ui="{
              active: 'bg-primary-500 dark:bg-primary-500',
              inactive: 'bg-primary-500 dark:bg-primary-500',
            }"
          />
          {{ "Female" }}
        </span>
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
        name="phoneNumber"
        :error="getError('phoneNumber')"
      >
        <vue-tel-input
          v-model="personalInfo.phoneNumber"
          mode="international"
        />
      </UFormGroup>
      <UsersAction />
    </div>
  </UForm>
</template>
<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import { GenderType} from "~/const/users";
import { format } from 'date-fns'
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import { useUserSteps } from "~/module/users/steps";
import { useRegister } from "~/module/users";
import { usePersonal } from "~/module/users/personal";

const schema = object({
  firstname: string().required('Required'),
  lastname: string().required('Required'),
  phoneNumber: string().optional(),
})
const { state } = useRegister()
const { nextStep } = useUserSteps()
const { customValidate } = usePersonal()

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

function getError(field: string) {
  const error = customValidate(personalInfo.value).find(e => e.field === field)
  return error ? error.message : ''
}

async function onSubmit () {
  nextStep()
}
</script>