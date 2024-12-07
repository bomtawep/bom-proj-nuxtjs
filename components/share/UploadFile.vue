<template>
  <div class="space-y-2">
    <div class="flex flex-col">
      <div class="flex justify-center">
        <div v-if="modalValue.file.size > 0">
          <img
              :src="modalValue.fileUrl"
              :alt="modalValue.fileName"
              class="rounded-full w-48 h-48 mb-2"
          >
        </div>
        <div v-else>
          <slot />
        </div>
      </div>
      <p class="font-semibold text-center">
        {{ title }}
      </p>
    </div>
    <input
      ref="imageRef"
      type="file"
      accept="image/*"
      @change="handleChangeImage()"
      class="hidden"
    />
    <div class="grid lg:grid-cols-4 md:grid-cols-4 gap-2">
      <UInput
        v-model="modalValue.fileName"
        class="w-full md:col-span-3 lg:col-span-3 xl:col-span-3"
        disabled
      />
      <UButton
        v-if="imageRef"
        class="w-full justify-center"
        icon="i-heroicons-camera-20-solid"
        @click="handleClick"
      >
        Choose
      </UButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import type { TFile } from "~/types";

  defineProps({
    title: {
      type: String,
      default: 'Upload Image'
    },
    modalValue: {
      type: Object as PropType<TFile>,
      default: {
        id: '',
        file: new File([], ''),
        fileName: '',
        fileSize: 0,
        fileType: '',
        fileUrl: ''
      },
    }
  })

  const imageRef = ref<HTMLInputElement | null>(null)
  const emit = defineEmits(['change'])

  const handleClick = () => {
    imageRef.value?.click()
  }

  const handleChangeImage = () => {

    const file = imageRef.value?.files?.[0]

    if (!file) return
    const fileData = {
      id: '',
      file: file,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: URL.createObjectURL(file)
    }
    emit('change', fileData)
  }
</script>