<template>
  <UTable
      :loading="options.loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="options.columns"
      :rows="options.data"
  />
  <UPagination
      :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
      :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
      :model-value="options.data.length"
      :total="100"
      :per-page="10"
      show-first
      show-last
  />
</template>
<script setup lang="ts">

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
    loading: boolean,
  }

  defineProps({
    options: {
      type: Object as PropType<DataItem<any>>,
      default: () => []
    },
  })
</script>