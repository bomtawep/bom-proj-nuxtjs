<template>
  <UCard>
    <UForm
        :state="profileImage"
        class="m-2"
        @submit="onSubmit"
    >
      <div class="space-y-2">
        <div class="text-center mx-auto">
          <ULink
            :href="profileImage.fileUrl"
            class="text-primary-500"
          >
            <template v-if="profileImage.fileUrl">
              <img
                  :src="profileImage?.fileUrl"
                  :alt="profileImage?.fileName"
                  class="rounded-full w-48 h-48 mb-2"
              >
            </template>
            <template v-else>
              <ItemsProfile class="rounded-full w-48 h-48" />
            </template>
          </ULink>
          <p class="font-semibold">
            {{ personalInfo.firstname }} {{ personalInfo.lastname }}
          </p>
        </div>
        <UInput
            type="file"
            ref="profileImageRef"
            accept="image/*"
            input-class="hidden"
            @change="handleChangeImage"
        />
        <div class="grid lg:grid-cols-4 md:grid-cols-4 gap-2">
          <UInput
            v-model="profileImage.fileName"
            class="w-full md:col-span-3 lg:col-span-3 xl:col-span-3"
            disabled
          />
          <UButton
            class="w-full justify-center"
            icon="i-heroicons-camera-20-solid"
            @click="profileImageRef.$refs.input.click()"
          >
            Choose image
          </UButton>
        </div>
        <UsersAction />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import { useRegister } from "~/module/users";
import {useUserSteps} from "~/module/users/steps";

const { state } = useRegister()
const { nextStep } = useUserSteps()
const personalInfo = computed(() => state.value.personalInfo)
const profileImage = computed(() => state.value.profileImage)
const toast = useToast()
const profileImageRef = ref<any>(null)

const handleChangeImage = (event: FileList) => {
  const file = event[0]
  if (!file) return

  state.value.profileImage.file = file
  state.value.profileImage.fileName = file.name
  state.value.profileImage.fileSize = file.size
  state.value.profileImage.fileType = file.type
  state.value.profileImage.fileUrl = URL.createObjectURL(file)
}

async function onSubmit () {
  if (!state.value.profileImage.fileName) return toast.add({ title: 'Please select a image profile', color: 'orange' })
  nextStep()
}
</script>