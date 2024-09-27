import { object, string } from "yup";
import type { TProductType } from "~/types/product-type";
import { useProductTypesApi } from "~/api/product-types";
import {useMain} from "~/module";
import {loading} from "@nuxt/ui-templates";

interface IProductType {
    productsType: TProductType
    productTypes: TProductType[]
    loading: boolean
}

const initialProductType = (): IProductType => ({
    productsType: {
        id: '',
        name: ''
    },
    productTypes: [],
    loading: false
})

const state = ref<IProductType>({ ...initialProductType() })

export const useProductType = () => {

    const { postProductTypes, getProductTypes } = useProductTypesApi()
    const { state: mainState } = useMain()

    const schema = object({
        name: string().required(),
    })

    const resetProductType = () => {
        state.value = { ...initialProductType() }
    }

    const fetchProductTypes = async () => {
        state.value.loading = true
        const { data } = await getProductTypes()
        state.value.productTypes = data
        state.value.loading = false
    }

    const onSubmit = async () => {
        const payload = {
            name: state.value.productsType.name
        }
        await postProductTypes(payload)
        await fetchProductTypes()
        mainState.value.isOpenModal = false
    }

    return {
        schema,
        state,
        resetProductType,
        onSubmit,
        fetchProductTypes,
    }
}