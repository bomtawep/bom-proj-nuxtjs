<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <div class="flex justify-end w-full">
      <UButton @click="handleCreate">Create product</UButton>
    </div>
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      {{ "Product: " + JSON.stringify(productState.productList, null, 4) }}
      <div class="grid md:grid-cols-2 gap-4">
        <ItemsList :data="productState.productList" :loading="productState.loading"/>
      </div>
    </UCard>
  </div>
  <ItemsModal :openModal="state.isOpenModal" title="Add product type">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="grid md:grid-cols-2 gap-4">
          <ProductsProductForm class="col-span-1"/>
          <ShareUploadFile class="col-span-1" title="Upload product" @change="handleChange" :modal-value="productState.product.productImage">
            <img src="~/assets/img/product-delivery-ecommerce-svgrepo-com.svg" alt="product" class="w-56">
          </ShareUploadFile>
        </div>
      </UCard>
    </UCard>
  </ItemsModal>
</template>
<script setup lang="ts">
import {useMain} from "~/module";
import type {TFile} from "~/types";
import {useProduct} from "~/module/product";

const { state } = useMain()
const { state: productState, fetchProduct, resetState } = useProduct()

const handleChange = (image: TFile) => {
  productState.value.product.productImage = image
}

definePageMeta({
  viewTransition: false,
  pageTransition: {
    name: 'fade',
    mode: 'out-in'
  }
})

const handleCreate = () => {
  state.value.isOpenModal = true
}

onMounted(() => {
  resetState()
  fetchProduct()
})
</script>