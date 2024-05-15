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
            name="firstName"
        >
          <UInput v-model="personalInfo.Firstname"/>
        </UFormGroup>
        <UFormGroup
            label="Lastname"
            name="lastName"
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
        <action />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import {object, string, type InferType, date} from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import Action from "~/components/users/Action.vue";
import {useRegister} from "~/module/users";
import { usersConst } from "~/const/usersConst";

const { state, nextStep } = useRegister()
const { genderConst } = usersConst

const personalInfo = computed(() => state.value.personalInfo)
// use toRefs
// const {
//   gender: genderState,
// } = toRefs(state.value.personalInfo)


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
// Get set gender

const schema = object({
  Firstname: string().required('Required'),
  Lastname: string().required('Required'),
})

type Schema = InferType<typeof schema>

async function onSubmit (event: FormSubmitEvent<Schema>) {
  nextStep()
}
</script>