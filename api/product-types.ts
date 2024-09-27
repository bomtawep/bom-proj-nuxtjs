import {useConfig} from "~/api/config";
import type {TUser} from "~/types/users/users";
import type {TResponse} from "~/types/response";
import type {TProductType} from "~/types/product-type";
import {useAxios} from "~/api/index";

export const useProductTypesApi = () => {

    const { axios } = useAxios();

    const postProductTypes = async (productType: TProductType): Promise<TResponse> => {
        const res = await axios.request({
            url: "/product-types",
            method: "POST",
            data: productType,
        });
        return res.data;
    }

    const getProductTypes = async (): Promise<TResponse> => {
        const res = await axios.request({
            url: "/product-types",
        });
        return res.data;
    }

    return {
        postProductTypes,
        getProductTypes,
    }
}