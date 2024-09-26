<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="flex justify-end">
          <UButton
              type="submit"
              color="primary"
              label="Add brand"
              @click="state.isOpenModal = true"
          />
          <ItemsModal :openModal="state.isOpenModal" title="Add brand">
            <BrandForm />
          </ItemsModal>
        </div>
        <div class="grid gap-4">
          <ItemsList :data="bradState.brands" :loading="bradState.loading"/>
        </div>
      </UCard>
    </UCard>
  </div>
</template>
<script setup lang="ts">

import { useMain } from "~/module";
import { useBrand } from "~/module/brand";
import BrandForm from "~/components/brands/BrandForm.vue";

const { state } = useMain()
const { fetchBrands, state: bradState, resetBrand } = useBrand()

onMounted(() => {
  resetBrand()
  fetchBrands()
})
</script>