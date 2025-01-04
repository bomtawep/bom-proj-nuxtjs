import { useAxios } from "~/api/index";
import type { TResponse } from "~/types/response";
import type {TBrand, TBrandCreate} from "../types/brands";

export const useBrandApi = () => {

    const {axios} = useAxios();

    const getBrands = async (): Promise<TResponse> => {
        const res = await axios.request({
            url: "/brand"
        });
        return res.data
    }
    const createBrand = async (brand: TBrandCreate): Promise<TResponse> => {
        const res = await axios.request({
            url: "/brand",
            method: "POST",
            data: brand
        });
        return res.data
    }

    const getBrand = async (id: string): Promise<TResponse> => {
        const res = await axios.request({
            url: `/brand/${id}`
        });
        return res.data
    }

    const updateBrand = async (brand: TBrandCreate): Promise<TResponse> => {
        const res = await axios.request({
            url: `/brand/${brand.id}`,
            method: "PUT",
            data: brand
        });
        return res.data
    }

    return {
        getBrands,
        getBrand,
        createBrand,
        updateBrand,
    }
}