<template>
  <UForm
      :state="query"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Brand name"
          name="q"
          required
      >
        <UInput v-model="query.q"/>
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
import type {IQuery} from "~/types";

defineProps<{
  title: string
  query: IQuery
}>()
</script>