<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="flex justify-end">
          <UButton
              type="submit"
              color="primary"
              label="Add product type"
              @click="isOpenModal = true"
          />
            <ItemsModal v-model="isOpenModal" title="Add product type">
              <ProductTypeForm />
            </ItemsModal>
        </div>
        <div class="grid gap-4">
          <ItemsList :options="options" v-model="pagination.page">
            <template #created_at-data="{ row }: { row: TBrand }">
              {{ row.created_at ? convertToThaiDateTime(row.created_at) : '' }}
            </template>
            <template #updated_at-data="{ row }: { row: TBrand }">
              {{ row.updated_at ? convertToThaiDateTime(row.updated_at) : '' }}
            </template>
            <template #actions-data="{ row }: { row: TBrand }">
              <div class="flex gap-2">
                <UButton
                    icon="i-heroicons-pencil-square"
                    size="sm"
                    color="primary"
                    variant="solid"
                    label="Button"
                    @click="editBrand(row.id)"
                >
                  Edit
                </UButton>
                <UButton
                    icon="i-heroicons-trash"
                    size="sm"
                    color="orange"
                    variant="solid"
                    label="Button"
                    @click="handleDelete(row.id)"
                >
                  Delete
                </UButton>
              </div>
            </template>
          </ItemsList>
        </div>
      </UCard>
    </UCard>
  </div>
</template>
<script setup lang="ts">
import {useProductTypes} from "~/module/product-types";
import {useMainState} from "~/module";
import type {TBrand} from "~/types/brands";
import {convertToThaiDateTime} from "~/utils/convertToThaiDateTime";

const { isOpenModal } = useMainState()
const { fetchProductTypes, PRODUCT_TYPES, isLoading, pagination, resetProductTypes } = useProductTypes()

const options = computed(() => ({
  data: PRODUCT_TYPES.value,
  loading: isLoading.value,
  pagination: pagination.value,
  columns: [
    {
      label: 'No',
      key: 'index'
    },
    {
      label: 'Brand name',
      key: 'name'
    },
    {
      label: 'Created at',
      key: 'created_at'
    },
    {
      label: 'Updated at',
      key: 'updated_at'
    },

    {
      label: 'Actions',
      key: 'actions'
    }
  ],
}))

watch(() => pagination.value.page, () => {
  fetchProductTypes()
})

const handleCreate = () => {
  resetProductTypes()
  isOpenModal.value = true
}

const editBrand = async (id: string) => {
  if (!id) return
  // await fetchProductTypes(id)
  isOpenModal.value = true
}

const handleDelete = async (id: string) => {
  if (!id) return
  // await deleteProductTypes(id)
}

onMounted(() => {
  resetProductTypes()
  fetchProductTypes()
})
</script>