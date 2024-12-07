<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="grid md:grid-cols-2 gap-4">
          <ProductsProductForm class="col-span-1"/>
          <ShareUploadFile class="col-span-1" title="Upload product" @change="handleChange" :modal-value="state.productImage">
            <img src="~/assets/img/product-delivery-ecommerce-svgrepo-com.svg" alt="product" class="w-56">
          </ShareUploadFile>
        </div>
      </UCard>
    </UCard>
  </div>
</template>
<script setup lang="ts">

  import { useProducts } from "~/module/products/products"
  import type { TFile } from "~/types";

  const { resetProducts, state} = useProducts()

  const handleChange = (image: TFile) => {
    state.value.productImage = image
  }

  onMounted(() => {
    resetProducts()
  })
</script>