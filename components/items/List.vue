<template>
  <UTable
      :loading="options.loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="options.columns"
      :rows="dataWithIndex"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </UTable>
  <div class="flex justify-end">
    <UPagination
        :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'primary' }"
        :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
        v-model="page"
        :total="options.pagination?.total ?? 0"
        :per-page="options.pagination?.limit ?? 10"
        show-first
        show-last
    />
  </div>
</template>
<script setup lang="ts">
  import type {TPagination} from "~/types";

  interface IColumn {
    label: string
    key: string
    sortable?: boolean
    align?: 'left' | 'center' | 'right'
    width?: string
    fixed?: 'left' | 'right'
  }
  interface DataItem<T> {
    columns: IColumn[],
    data: T[],
    pagination?: TPagination,
    loading: boolean,
  }

  const props = defineProps<{
    options: DataItem<any>
    modelValue: number
  }>()

  const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void
  }>()

  const page = computed({
    get: () => props.modelValue,
    set: (value) => {
      console.log("PAGE", value)
      emit('update:modelValue', value)
    },
  })

  const dataWithIndex = computed(() => {
    if (!(props.options.data.length > 0)) return []
    return props.options.data.map((item, index) => {
      return {
        ...item,
        index: index + 1
      }
    })
  })
</script>