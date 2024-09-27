<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="flex justify-end">
          <UButton
              type="submit"
              color="primary"
              label="Add product type"
              @click="state.isOpenModal = true"
          />
            <ItemsModal :openModal="state.isOpenModal" title="Add product type">
              <ProductTypeForm />
            </ItemsModal>
        </div>
        <div class="grid gap-4">
          <ItemsList :data="productTypeState.productTypes" :loading="productTypeState.loading"/>
        </div>
      </UCard>
    </UCard>
  </div>
</template>
<script setup lang="ts">

import { useProducts } from "~/module/products/products"
import type { TImage } from "~/types";
import {useProductType} from "~/module/product-type";
import Modal from "~/components/items/Modal.vue";
import {useMain} from "~/module";

const { resetProductType } = useProductType()
const { state } = useMain()
const { fetchProductTypes, state: productTypeState } = useProductType()

onMounted(() => {
  resetProductType()
  fetchProductTypes()
})
</script>