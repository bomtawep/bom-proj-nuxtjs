import { useAxios } from "~/api/index";
import type { TResponse } from "~/types/response";
import type { TBrand } from "~/types/brand";

export const useBrandApi = () => {

    const {axios} = useAxios();

    const getBrand = async (): Promise<TResponse> => {

        const res = await axios.request({
            url: "/brand"
        });
        return res.data
    }
    const postBrand = async (user: TBrand): Promise<TResponse> => {
        const res = await axios.request({
            url: "/brand",
            method: "POST",
            data: user
        });
        return res.data
    }

    return {
        getBrand,
        postBrand,
    }
}