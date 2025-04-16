<template>
  <UForm
      :schema="schema"
      :state="state.product"
      class="m-2"
      @submit="onSubmit"
  >
    <div class="space-y-2">
      <UFormGroup
          label="Category"
          name="productTypeId"
          required
      >
        <USelect
            v-model="state.product.productTypeId"
            :options="productTypesOptions"
            required
        />
      </UFormGroup>
      <UFormGroup
          label="Brand"
          name="brandId"
          required
      >
        <USelect
            v-model="state.product.brandId"
            :options="brandOptions"
            required
        />
      </UFormGroup>
      <UFormGroup
          label="Name"
          name="name"
          required
      >
        <UInput v-model="state.product.name"/>
      </UFormGroup>
      <UFormGroup
          label="Price"
          name="price"
          required
      >
        <UInput v-model="state.product.price"/>
      </UFormGroup>
      <UFormGroup
          label="Cost"
          name="cost"
          required
      >
        <UInput v-model="state.product.cost"/>
      </UFormGroup>
      <UFormGroup
          label="Stock"
          name="stock"
          required
      >
        <UInput v-model="state.product.stock"/>
      </UFormGroup>
      <UFormGroup
          label="Description"
          name="description"
          required
      >
        <UTextarea v-model="state.product.description"/>
      </UFormGroup>
      <UFormGroup
          label="Weight"
          name="weight"
      >
        <UInput v-model="state.product.weight"/>
      </UFormGroup>
      <UFormGroup
          label="Length"
          name="length"
      >
        <UInput v-model="state.product.length"/>
      </UFormGroup>
      <UFormGroup
          label="Width"
          name="width"
      >
        <UInput v-model="state.product.width"/>
      </UFormGroup>
      <UFormGroup
          label="Height"
          name="height"
      >
        <UInput v-model="state.product.height"/>
      </UFormGroup>
      <UFormGroup
          label="Discount"
          name="discount"
      >
        <UInput v-model="state.product.discount"/>
      </UFormGroup>
      <UFormGroup
          label="Discount Type"
          name="discountType"
      >
        <UInput v-model="state.product.discountType"/>
      </UFormGroup>
      <UFormGroup
          label="Discount value"
          name="discountValue"
      >
        <UInput v-model="state.product.discountValue"/>
      </UFormGroup>
      <UFormGroup
          label="Discount start"
          name="discountStart"
      >
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(state.product.discountStart, 'd MMM, yyy') }}
          </UButton>
          <template #panel="{ close }">
            <ItemsDatePicker
                v-model="state.product.discountStart"
                is-required
                @close="close"
            />
          </template>
        </UPopover>
      </UFormGroup>
      <UFormGroup
          label="Discount end"
          name="discountEnd"
      >
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid">
            {{ format(state.product.discountEnd, 'd MMM, yyy') }}
          </UButton>
          <template #panel="{ close }">
            <ItemsDatePicker
                v-model="state.product.discountEnd"
                is-required
                @close="close"
            />
          </template>
        </UPopover>
      </UFormGroup>
      <div class="flex justify-end w-full">
        <UButton
            type="submit"
            color="primary"
            label="Add product"
        />
      </div>
    </div>
  </UForm>
</template>
<script setup lang="ts">
  import {useProductTypes} from "../../module/product-types";
  import {useBrands} from "../../module/brands";
  import {format} from "date-fns";
  import {useProduct} from "~/module/product";

  const { schema, state, onSubmit } = useProduct()
  const { fetchProductTypes, state: productTypeState } = useProductTypes()
  const { fetchBrands, state: brandState } = useBrands()

  const productTypesOptions = productTypeState.value.productTypes.map((productType) => ({
    label: productType.name,
    value: productType.id,
  }))

  const brandOptions = brandState.value.brands.map((brand) => ({
    label: brand.name,
    value: brand.id,
  }))

  onMounted(() => {
    fetchBrands()
    fetchProductTypes()
  })
</script>