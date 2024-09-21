<template>
  <UForm
      :schema="schema"
      :state="products"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Category"
          name="category"
          required
      >
        <USelect
            v-model="products.category"
            :options="categoriesOptions"
            required
        />
      </UFormGroup>
      <UFormGroup
          label="Brand"
          name="brand"
          required
      >
        <USelect
            v-model="products.brand"
            :options="brandOptions"
            required
        />
      </UFormGroup>
      <UFormGroup
          label="Name"
          name="name"
          required
      >
        <UInput v-model="products.name"/>
      </UFormGroup>
      <UFormGroup
          label="Price"
          name="price"
          required
      >
        <UInput v-model="products.price"/>
      </UFormGroup>
      <UFormGroup
          label="Stock"
          name="stock"
          required
      >
        <UInput v-model="products.stock"/>
      </UFormGroup>
      <UFormGroup
          label="Description"
          name="description"
          required
      >
        <UTextarea v-model="products.description"/>
      </UFormGroup>
      <UButton
          type="submit"
          color="primary"
      >
        Add product
      </UButton>
    </div>
  </UForm>
</template>
<script setup lang="ts">

  import { useProducts } from "~/module/products/products";

  const { schema, state } = useProducts()
  const products = computed(() => state.value.products)

  const categoriesOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothes', value: 'clothes' },
    { label: 'Books', value: 'books' },
    { label: 'Furniture', value: 'furniture' },
  ]

  const brandOptions = [
    { label: 'Apple', value: 'apple' },
    { label: 'Samsung', value: 'samsung' },
    { label: 'Xiaomi', value: 'xiaomi' },
    { label: 'Huawei', value: 'huawei' },
  ]

  const onSubmit = () => {
    console.log('productState', products.value)
  }
</script>