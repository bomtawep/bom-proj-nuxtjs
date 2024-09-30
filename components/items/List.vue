<template>
  <UTable
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      class="w-full"
      :columns="columns"
      :rows="data"
  />
  <UPagination
      :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
      :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
      :model-value="12"
      :total="100"
      show-first
      show-last
  />
</template>
<script setup lang="ts">
  interface DataItem {
    [key: string]: any;
  }
  const props = defineProps({
    data: {
      type: Array as () => DataItem[],
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
  const columns = [
    {
      label: 'ID',
      key: 'id',

    },
    {
      key: 'name',
      label: 'Product type name',
      sortable: true,
    },
    {
      key: 'created_at',
      label: 'Created at',
      sortable: true,
    },
    {
      key: 'updated_at',
      label: 'Updated at',
      sortable: true,
    }
  ]

</script>