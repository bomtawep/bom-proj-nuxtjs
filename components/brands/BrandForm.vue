<template>
  <UForm
      :schema="schema"
      :state="brandState.brand"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Brand name"
          name="name"
          required
      >
        <UInput v-model="brandState.brand.name"/>
      </UFormGroup>
      <UButton
          type="submit"
          color="primary"
          label="Add brand"
      />
    </div>
  </UForm>
</template>
<script setup lang="ts">

import {useMain} from "~/module";
import {useBrand} from "~/module/brand";

const { state } = useMain()
const { schema, state: brandState, onSubmit, resetBrand } = useBrand()

onMounted(() => {
  resetBrand()
})
</script>