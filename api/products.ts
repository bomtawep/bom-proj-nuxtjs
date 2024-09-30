import { useAxios } from "~/api/index";
import type { TResponse } from "~/types/response";
import type { TBrand } from "~/types/brand";
import type { TImage } from "~/types";

export const useProductsApi = () => {

    const {axios} = useAxios();

    const getProducts = async (): Promise<TResponse> => {

        const res = await axios.request({
            url: "/products"
        });
        return res.data
    }
    const postProduct = async (user: TBrand): Promise<TResponse> => {
        const res = await axios.request({
            url: "/products",
            method: "POST",
            data: user
        });
        return res.data
    }

    return {
        getProducts,
        postProduct,
    }
}