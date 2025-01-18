<template>
  <UModal v-model="modalState">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }" class="2">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="modalState = false" />
        </div>
      </template>
    </UCard>
    <div class="p-4">
      <slot />
    </div>
  </UModal>
</template>
<script setup lang="ts">

  const props = defineProps<{
    title: string,
    modelValue: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void
  }>()

  const modalState = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })

</script>