import type {TResponse} from "~/types/response";
import type {TProductType} from "../types/product-types";
import {useAxios} from "~/api/index";
import type {TPagination} from "~/types";
import type {TBrandCreate} from "~/types/brands";

export const useProductTypesApi = () => {

    const { axios } = useAxios();

    const getProductTypes = async (pagination: TPagination): Promise<TResponse> => {
        const res = await axios.request({
            url: `/product-type?page=${pagination?.page}&limit=${pagination?.limit}`
        });
        return res.data
    }
    const createProductType = async (brand: TBrandCreate): Promise<TResponse> => {
        const res = await axios.request({
            url: "/product-type",
            method: "POST",
            data: brand
        });
        return res.data
    }

    const getProductType = async (id: string): Promise<TResponse> => {
        const res = await axios.request({
            url: `/product-type/${id}`
        });
        return res.data
    }

    const updateProductType = async (brand: TBrandCreate): Promise<TResponse> => {
        const res = await axios.request({
            url: `/product-type/${brand.id}`,
            method: "PUT",
            data: brand
        });
        return res.data
    }

    const deleteProductTypeWithId = async (id: string): Promise<TResponse> => {
        const res = await axios.request({
            url: `/product-type/${id}`,
            method: "DELETE"
        });
        return res.data
    }

    return {
        getProductTypes,
        getProductType,
        createProductType,
        updateProductType,
        deleteProductTypeWithId,
    }
}