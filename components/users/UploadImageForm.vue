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
            :href="profileImage.FileUrl"
            class="text-primary-500"
          >
            <template v-if="profileImage.FileUrl">
              <img
                  :src="profileImage?.FileUrl"
                  :alt="profileImage?.FileName"
                  class="rounded-full w-48 h-48 mb-2"
              >
            </template>
            <template v-else>
              <ItemsProfile class="rounded-full w-48 h-48" />
            </template>
          </ULink>
          <p class="font-semibold">
            {{ personalInfo.Firstname }} {{ personalInfo.Lastname }}
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
            v-model="profileImage.FileName"
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

const { state, nextStep } = useRegister()
const personalInfo = computed(() => state.value.personalInfo)
const profileImage = computed(() => state.value.profileImage)
const toast = useToast()
const profileImageRef = ref<any>(null)

const handleChangeImage = (event: FileList) => {
  const file = event[0]
  if (!file) return

  state.value.profileImage.File = file
  state.value.profileImage.FileName = file.name
  state.value.profileImage.FileSize = file.size
  state.value.profileImage.FileType = file.type
  state.value.profileImage.FileUrl = URL.createObjectURL(file)
}

async function onSubmit () {
  if (!state.value.profileImage.FileName) return toast.add({ title: 'Please select a image profile', color: 'orange' })
  nextStep()
}
</script>