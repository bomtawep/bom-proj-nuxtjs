import { object, string } from "yup";
import type { TBrand } from "~/types/brand";
import { useBrandApi } from "~/api/brand";
import { useMain } from "~/module";

interface IBrand {
    brand: TBrand
    brands: TBrand[]
    loading: boolean
}

const initialBrand = (): IBrand => ({
    brand: {
        id: '',
        name: ''
    },
    brands: [],
    loading: false
})

const state = ref<IBrand>({ ...initialBrand() })

export const useBrand = () => {

    const { getBrand, postBrand } = useBrandApi()
    const { state: mainState } = useMain()

    const schema = object({
        name: string().required(),
    })

    const resetBrand = () => {
        state.value.brand = { ...initialBrand().brand }
    }

    const fetchBrands = async () => {
        state.value.loading = true
        const { data } = await getBrand()
        state.value.brands = data
        state.value.loading = false
    }

    const onSubmit = async () => {
        const payload = {
            name: state.value.brand.name
        }
        await postBrand(payload)
        await fetchBrands()
        mainState.value.isOpenModal = false
    }

    return {
        schema,
        state,
        onSubmit,
        fetchBrands,
        resetBrand,
    }
}