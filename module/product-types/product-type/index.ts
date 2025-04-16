import type {TBrand, TBrandCreate} from "~/types/brands";
import {useBrandApi} from "~/api/brand";
import {useMainState} from "~/module";
import {object, string} from "yup";
import {useBrands} from "~/module/brands";
import {useProductTypesApi} from "~/api/product-types";
import {useProductTypes} from ".";

interface IBrand {
    product_type: TBrand
    isLoading: boolean
}

const initialIBrand = (): IBrand => ({
    product_type: {
        id: '',
        name: '',
    },
    isLoading: false
})

const state = ref<IBrand>(initialIBrand())

export const useProductType = () => {

    const { isOpenModal } = useMainState()
    const { getProductType, createProductType, updateProductType, deleteProductTypeWithId } = useProductTypesApi()
    const { fetchProductTypes } = useProductTypes()

    const schema = object({
        name: string().required(),
    })

    const fetchBrand = async (id: string) => {
        state.value.isLoading = true
        try {
            const { data } = await getProductType(id)
            state.value.product_type = data
        } catch (error) {
            console.log(error)
        } finally {
            state.value.isLoading = false
        }
    }

    const deleteBrand = async (id: string) => {
        await deleteProductTypeWithId(id)
        await fetchProductTypes()
    }

    const onSubmit = async () => {
        const payload: TBrandCreate = state.value.product_type
        state.value.isLoading = true
        try {
            if (!state.value.product_type.id) {
                await createProductType(payload)
            } else {
                await updateProductType(payload)
            }
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            state.value.isLoading = false
        }
        isOpenModal.value = false
        await fetchProductTypes()
    }

    const resetBrand = () => {
        Object.assign(state.value, initialIBrand())
    }

    return {
        fetchBrand,
        resetBrand,
        onSubmit,
        deleteBrand,
        schema,
        BRAND: toRef(state.value, 'product_type'),
    }
}