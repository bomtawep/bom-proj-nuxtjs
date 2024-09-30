<template>
  <div class="space-y-2">
    <div class="text-center mx-auto">
      <ULink
        :href="state.fileUrl"
        class="text-primary-500"
      >
        <template v-if="state.fileUrl">
          <img
              :src="state.fileUrl"
              :alt="state.fileName"
              class="rounded-full w-48 h-48 mb-2"
          >
        </template>
        <template v-else>
          <slot />
        </template>
      </ULink>
      <p class="font-semibold">
        {{ title }}
      </p>
    </div>
    <UInput
        type="file"
        ref="imageRef"
        accept="image/*"
        input-class="hidden"
        @change="handleChangeImage"
    />
    <div class="grid lg:grid-cols-4 md:grid-cols-4 gap-2">
      <UInput
        v-model="state.fileName"
        class="w-full md:col-span-3 lg:col-span-3 xl:col-span-3"
        disabled
      />
      <UButton
        v-if="imageRef"
        class="w-full justify-center"
        icon="i-heroicons-camera-20-solid"
        @click="imageRef.value.click()"
      >
        Choose
      </UButton>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import type {TImage} from "~/types";

  const props = defineProps({

    title: {
      type: String,
      default: 'Upload Image'
    },
    defaultImage: {
      type: String,
      default: '/src/assets/img/level-up.svg'
    }
  })

  const imageRef = ref<HTMLInputElement | null>(null);
  const emit = defineEmits(['change'])
  const state = ref<TImage>({
    id: '',
    file: new File([], ''),
    fileName: '',
    fileSize: 0,
    fileType: '',
    fileUrl: ''
  })

  const handleChangeImage = (event: FileList) => {

    const file = event[0]

    if (!file) return
    state.value = {
      id: '',
      file: file,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: URL.createObjectURL(file)
    }
    emit('change', state.value)
  }
</script>