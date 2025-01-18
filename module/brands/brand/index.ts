import type {TBrand, TBrandCreate} from "~/types/brands";
import {useBrandApi} from "~/api/brand";
import {useMainState} from "~/module";
import {object, string} from "yup";
import {useBrands} from "~/module/brands";

interface IBrand {
    brand: TBrand
    loading: boolean
}

const initialIBrand = (): IBrand => ({
    brand: {
        id: '',
        name: '',
        created_at: '',
    },
    loading: false
})

const state = ref<IBrand>(initialIBrand())

export const useBrand = () => {

    const { isOpenModal } = useMainState()
    const { getBrand, createBrand, updateBrand, deleteBrandWithId } = useBrandApi()
    const { fetchBrands } = useBrands()

    const schema = object({
        name: string().required(),
    })

    const fetchBrand = async (id: string) => {
        state.value.loading = true
        try {
            const { data } = await getBrand(id)
            state.value.brand = data
        } catch (error) {
            console.log(error)
        } finally {
            state.value.loading = false
        }
    }

    const deleteBrand = async (id: string) => {
        await deleteBrandWithId(id)
        await fetchBrands()
    }

    const onSubmit = async () => {
        const payload: TBrandCreate = state.value.brand
        state.value.loading = true
        try {
            if (!state.value.brand.id) {
                await createBrand(payload)
            } else {
                await updateBrand(payload)
            }
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            state.value.loading = false
        }
        isOpenModal.value = false
        await fetchBrands()
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
        BRAND: toRef(state.value, 'brand'),
    }
}