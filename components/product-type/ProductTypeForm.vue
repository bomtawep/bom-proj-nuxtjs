<template>
  <UForm
      :schema="schema"
      :state="productTypeState.productsType"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Product type name"
          name="name"
          required
      >
        <UInput v-model="productTypeState.productsType.name"/>
      </UFormGroup>
      <UButton
          type="submit"
          color="primary"
          label="Add product type"
      />
    </div>
  </UForm>
</template>
<script setup lang="ts">

import { useProductTypes } from "../../module/product-types";

const { schema, state: productTypeState, onSubmit } = useProductTypes()
</script>