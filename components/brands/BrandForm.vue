<template>
  <UForm
      :schema="schema"
      :state="BRAND"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Brand name"
          name="name"
          required
      >
        <UInput v-model="BRAND.name"/>
      </UFormGroup>
      <UButton
          type="submit"
          color="primary"
          :label="`${!BRAND.id ? 'Add brand' : 'Edit brand'}`"
      />
    </div>
  </UForm>
</template>
<script setup lang="ts">

import {useBrand} from "~/module/brands/brand";

const { schema, onSubmit, BRAND } = useBrand()
</script>