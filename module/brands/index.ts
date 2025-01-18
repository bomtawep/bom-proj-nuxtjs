import type {TBrand} from "~/types/brands"
import { useBrandApi } from "~/api/brand";
import type {IQuery} from "~/types";

interface IPagination {
    page: number
    total: number
    limit: number
}

interface IBrand {
    brands: TBrand[]
    isLoading: boolean
    pagination: IPagination
    query: IQuery
}

const initialBrands = (): IBrand => ({
    brands: [],
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

const state = ref<IBrand>(initialBrands())

export const useBrands = () => {

    const { getBrands } = useBrandApi()

    const fetchBrands = async () => {
        state.value.isLoading = true
        try {
            const resp = await getBrands(state.value.pagination)
            state.value.brands = resp.data.brand
            console.log(resp.data)
            state.value.pagination.total = resp.data.total
        } catch (error) {
            console.log(error)
        } finally {
            state.value.isLoading = false
        }
    }

    const resetBrands = () => {
        Object.assign(state.value, initialBrands())
    }

    return {
        fetchBrands,
        resetBrands,
        BRANDS: toRef(state.value, 'brands'),
        isLoading: toRef(state.value, 'isLoading'),
        pagination: toRef(state.value, 'pagination'),
        query: toRef(state.value, 'query'),
    }
}