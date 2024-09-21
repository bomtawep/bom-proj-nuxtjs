<template>
  <div class="container mx-auto max-w-[1000px] p-4 space-y-4">
    <UCard class="rounded-xl bg-gray-400 shadow-2xl">
      <UCard class="rounded-xl bg-white">
        <div class="grid md:grid-cols-2 gap-4">
          <ProductsProductForm class="col-span-1"/>
          <ShareUploadImageForm class="col-span-1" title="Upload product" @change="handleChange">
            <img src="~/assets/img/product-delivery-ecommerce-svgrepo-com.svg" alt="product" class="w-56">
          </ShareUploadImageForm>
        </div>
      </UCard>
    </UCard>
  </div>
</template>
<script setup lang="ts">

  import { useProducts } from "~/module/products/products"
  import type { TImage } from "~/types";

  const { resetProducts } = useProducts()

  const handleChange = (image: TImage) => {
    console.log("image", image)
  }

  onMounted(() => {
    resetProducts()
  })
</script>