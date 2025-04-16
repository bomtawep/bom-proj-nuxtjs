import { object, string } from "yup";
import type { TProductType } from "../../types/product-types";
import { useProductTypesApi } from "~/api/product-types";
import {useMainState} from "~/module";
import type {IQuery, TPagination} from "~/types";

interface IProductType {
    productTypes: TProductType[]
    isLoading: boolean
    pagination: TPagination
    query: IQuery
}

const initialProductTypes = (): IProductType => ({
    productTypes: [],
    isLoading: false,
    pagination: {
        page: 1,
        total: 0,
        limit: 10
    },
    query: {
        q: ''
    },
})

const state = ref<IProductType>(initialProductTypes())

export const useProductTypes = () => {

    const { getProductTypes } = useProductTypesApi()

    const fetchProductTypes = async () => {
        state.value.isLoading = true
        const { data } = await getProductTypes({ page: 1, total: 10, limit: 5 })
        state.value.productTypes = data
        state.value.isLoading = false
    }

    const resetProductTypes = () => {
        Object.assign(state.value, initialProductTypes())
    }

    return {
        fetchProductTypes,
        resetProductTypes,
        PRODUCT_TYPES: toRef(state.value, 'productTypes'),
        isLoading: toRef(state.value, 'isLoading'),
        pagination: toRef(state.value, 'pagination'),
        query: toRef(state.value, 'query'),
    }
}