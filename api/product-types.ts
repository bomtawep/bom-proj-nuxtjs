import type {TResponse} from "~/types/response";
import type {TProductType} from "~/types/product-type";
import {useAxios} from "~/api/index";
import type {TPagination} from "~/types";

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

    const getProductTypes = async (pagination?: TPagination): Promise<TResponse> => {
        const res = await axios.request({
            url: `/product-types?page=${pagination?.page}&pageSize=${pagination?.total}&limit=${pagination?.limit}`,
        });
        return res.data;
    }

    return {
        postProductTypes,
        getProductTypes,
    }
}