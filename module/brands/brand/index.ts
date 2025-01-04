import type {TBrand} from "~/types/brands";

export const useBrand = () => {
    const { BRAND } = useBrand()

    const initialBrand = (): TBrand => ({
        id: '',
        name: '',
        created_at: '',
    })

    const resetBrand = () => {
        Object.assign(BRAND, initialBrand())
    }

    return {
        BRANDSTATE: BRAND,
        resetBrand,
    }
}