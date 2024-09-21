import { object, string, number } from "yup";
import type { TImage } from "~/types"
import type { TProduct } from "~/types/products";

interface IProduct {
    productImage: TImage
    products: TProduct
}

const initialProduct = (): IProduct => ({
    productImage: {
        id: '',
        fileName: '',
        fileType: '',
        fileSize: 0,
        fileUrl: '',
        file: new File([], '')
    },
    products: {
        name: '',
        price: 0,
        stock: 0,
        description: '',
        category: '',
        brand: '',
        status: '',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        discount: 0,
        discountType: '',
        discountValue: 0,
        discountStart: '',
        discountEnd: '',
    }
})

const state = ref<IProduct>({ ...initialProduct() })

export const useProducts = () => {

    const schema = object({
        name: string().required(),
        price: number().required(),
        stock: number().min(1).integer('Please enter a valid number').required(),
        description: string().required(),
        category: string().required(),
        brand: string().required(),
        // status: string().required(),
        // weight: number().required(),
        // length: number().required(),
        // width: number().required(),
        // height: number().required(),
        // discount: number().required(),
        // discountType: string().required(),
        // discountValue: number().required(),
        // discountStart: string().required(),
        // discountEnd: string().required(),
    })

    const resetProducts = () => {
        state.value = { ...initialProduct() }
    }

    return {
        schema,
        state,
        resetProducts,
    }
}