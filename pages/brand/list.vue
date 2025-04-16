<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-white">
      <div class="flex justify-end">
        <UButton
            type="submit"
            color="primary"
            label="Add brand"
            @click="handleCreate"
        />
        <ItemsModal v-model="isOpenModal" :title="`${!BRAND.id ? 'Add' : 'Edit'} brand`">
          <BrandForm />
        </ItemsModal>
      </div>
      isLoading: {{isLoading}}
      <ItemsLoading :is-loading="isLoading">
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
      </ItemsLoading>
    </UCard>
    <ItemsModal v-model="isOpenDeleteModal" title="Delete brand?">
      <div class="flex justify-end gap-4">
        <UButton
            color="primary"
            label="Yes"
            @click="handleConfirmDelete"
        />
        <UButton
            color="orange"
            label="No"
            @click="isOpenDeleteModal = false"
        />
      </div>
    </ItemsModal>
  </div>
</template>
<script setup lang="ts">

import { useBrands } from "~/module/brands";
import BrandForm from "~/components/brands/BrandForm.vue";
import type {TBrand} from "~/types/brands";
import {convertToThaiDateTime} from "~/utils/convertToThaiDateTime";
import {useMainState} from "~/module";
import {useBrand} from "~/module/brands/brand";

const { isOpenModal } = useMainState()
const { fetchBrand, deleteBrand, resetBrand, BRAND } = useBrand()
const { fetchBrands, resetBrands, BRANDS, isLoading, pagination } = useBrands()
const isOpenDeleteModal = ref(false)

const options = computed(() => ({
  data: BRANDS.value,
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
  fetchBrands()
})

const handleCreate = () => {
  resetBrand()
  isOpenModal.value = true
}

const editBrand = async (id: string) => {
  if (!id) return
  await fetchBrand(id)
  isOpenModal.value = true
}

const handleDelete = (id: string) => {
  if (!id) return
  BRAND.value.id = id
  isOpenDeleteModal.value = true
}

const handleConfirmDelete = () => {
  deleteBrand(BRAND.value.id)
  isOpenDeleteModal.value = false
  pagination.value.page = 1
  fetchBrands()
}

onMounted(() => {
  resetBrands()
  fetchBrands()
})
</script>