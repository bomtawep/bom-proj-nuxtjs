import { object, string, number } from "yup";
import type { TFile } from "~/types"
import {useProductsApi} from "~/api/products";
import {useImagesApi} from "~/api/images";

interface IProduct {
    productImage: TFile
    product: TProduct
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
    product: {
        productTypeId: '',
        brandId: '',
        name: '',
        price: 0,
        cost: 0,
        stock: 0,
        description: '',
        status: 'INACTIVE',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        discount: 0,
        discountType: '',
        discountValue: 0,
        discountStart: new Date(),
        discountEnd: new Date(),
    }
})

const state = ref<IProduct>({ ...initialProduct() })

export const useProducts = () => {

    const toast = useToast()
    const { postProduct } = useProductsApi()
    const { uploadImage } = useImagesApi()

    const schema = object({
        brandId: string().required(),
        productTypeId: string().required(),
        name: string().required(),
        price: number().moreThan(0, 'Please enter price.'),
        cost: number().moreThan(0, 'Please enter price.'),
        stock: number().min(1).integer('Please enter a valid number.').required(),
        // description: string().required(),
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

    const onSubmit = async () => {
        if (!state.value.productImage.file.name) return toast.add({ title: 'Please upload an image.', color: 'orange' })
        const { data } = await uploadImage(state.value.productImage.file)
        if (!data) return toast.add({ title: 'Failed to upload image.', color: 'red' })
        const product = await postProduct({
            ...state.value.product,
            imageId: data.id
        })

        if (!product) return toast.add({ title: 'Failed to create product.', color: 'red' })
        navigateTo('/products/product')
    }

    return {
        schema,
        state,
        resetProducts,
        onSubmit,
    }
}