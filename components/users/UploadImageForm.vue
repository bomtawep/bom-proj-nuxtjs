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
            <img
                :src="profileImage?.FileUrl"
                :alt="profileImage?.FileName"
                class="rounded-full w-48 h-48 mb-2"
                draggable="true"
            >
          </ULink>
          <p class="font-semibold">
            {{ personalInfo.Firstname }} {{ personalInfo.Lastname }}
          </p>
        </div>
        <UInput
            type="file"
            size="md"
            icon="i-heroicons-folder"
            accept="image/*"
            :model-value="profileImage.FileUrl"
            @change="handleChangeImage"
        />
        <action />
      </div>
    </UForm>
  </UCard>
</template>
<script setup lang="ts">
import Action from "~/components/users/Action.vue";
import {useRegister} from "~/module/users";

const { state, nextStep, image } = useRegister()
const personalInfo = computed(() => state.value.personalInfo)
const profileImage = computed(() => state.value.profileImage)

const handleChangeImage = (event: FileList) => {
  const file = event[0]
  if (!file) return

  state.value.profileImage.File = file
  state.value.profileImage.FileName = file.name
  state.value.profileImage.FileSize = file.size
  state.value.profileImage.FileType = file.type
  state.value.profileImage.FileUrl = URL.createObjectURL(file)

  console.log(state.value.profileImage, 'state.value.profileImage')
  console.log(file, 'file')

}

async function onSubmit () {
  nextStep()
  console.log(state.value.profileImage, 'state.value.profileImage')
}
</script>