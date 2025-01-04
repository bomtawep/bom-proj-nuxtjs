<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="flex justify-end">
          <UButton
              type="submit"
              color="primary"
              label="Add brand"
              @click="handleCreate"
          />
          <ItemsModal :openModal="state.isOpenModal" title="Add brand">
            <BrandForm />
          </ItemsModal>
        </div>
        <div v-if="bradState.brands" class="grid gap-4">
          <ItemsList :options="options">
            <template #created_at-data="{ row }: { row: TBrand }">
              {{ row.created_at ? convertToThaiDate(row.created_at) : '' }}
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
                  @click="deleteBrand(row.id)"
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

import { useMain } from "~/module";
import { useBrands } from "~/module/brands";
import BrandForm from "~/components/brands/BrandForm.vue";
import type {TBrand} from "~/types/brands";
import {convertToThaiDate} from "~/utils/convertToThaiDate";
import {useBrand} from "~/module/brands/brand";

const { state } = useMain()
const { fetchBrands, fetchBrand, state: bradState, resetBrand } = useBrands()
const { BRAND } = useBrand()

const options = computed(() => ({
  data: bradState.value.brands,
  loading: bradState.value.loading,
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
      label: 'Actions',
      key: 'actions'
    }
  ],
}))

const handleCreate = () => {
  resetBrand()
  state.value.isOpenModal = true
}

const editBrand = async (id: string) => {
  if (!id) return
  await fetchBrand(id)
  state.value.isOpenModal = true
}

const deleteBrand = (id: string) => {
  if (!id) return
  deleteBrand(id)
}

onMounted(() => {
  resetBrand()
  fetchBrands()
})
</script>