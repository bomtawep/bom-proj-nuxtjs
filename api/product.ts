import { useAxios } from "~/api/index";
import type { TResponse } from "~/types/response";
import type {TBrand} from "../types/brands";
import type {TProduct} from "~/types/product";

export const useProductApi = () => {

    const {axios} = useAxios();

    const getProduct = async (): Promise<TResponse> => {

        const res = await axios.request({
            url: "/products"
        });
        return res.data
    }

    const postProduct = async (user: TProduct): Promise<TResponse> => {
        const res = await axios.request({
            url: "/products",
            method: "POST",
            data: user
        });
        return res.data
    }

    return {
        getProduct,
        postProduct,
    }
}