import { object, string } from "yup";
import type {TBrand, TBrandCreate} from "~/types/brands"
import { useBrandApi } from "~/api/brand";
import { useMain } from "~/module";

interface IBrand {
    brand: TBrand
    brands: TBrand[]
    loading: boolean
}

const initialBrand = (): TBrand => ({
    id: '',
    name: '',
    created_at: '',
})

const initialBrands = (): IBrand => ({
    brand: initialBrand(),
    brands: [],
    loading: false
})

const state = ref<IBrand>({ ...initialBrands() })

export const useBrands = () => {

    const { getBrands, createBrand, getBrand, updateBrand } = useBrandApi()
    const { state: mainState } = useMain()

    const schema = object({
        name: string().required(),
    })

    const fetchBrands = async () => {
        state.value.loading = true
        try {
            const resp = await getBrands()
            state.value.brands = resp.data
        } catch (error) {
            console.log(error)
        } finally {
            state.value.loading = false
        }
    }

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
        await deleteBrand(id)
        await fetchBrands()
    }

    const onSubmit = async () => {
        const payload: TBrandCreate = state.value.brand
        if (state.value.brand.id) {
            await createBrand(payload)
        } else {
            await updateBrand(payload)
        }
        await fetchBrands()
        mainState.value.isOpenModal = false
    }

    const resetBrand = () => {
        Object.assign(state.value, initialBrands())
    }

    return {
        schema,
        onSubmit,
        fetchBrands,
        resetBrand,
        fetchBrand,
        BRAND: toRef(state.value, 'brand'),
        BRANDS: toRef(state.value, 'brands'),
        LOADING: toRef(state.value, 'loading'),
    }
}