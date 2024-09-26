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

import { useProductType } from "~/module/product-type";
import {useMain} from "~/module";

const { state } = useMain()
const { schema, state: productTypeState, onSubmit } = useProductType()
</script>