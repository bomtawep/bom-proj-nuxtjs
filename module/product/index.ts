import type {TProduct} from "~/types/product";
import type {TFile} from "~/types";
import {useProductApi} from "~/api/product";
import {number, object, string} from "yup";
import {useImagesApi} from "~/api/images";

interface IProduct {
    productImage: TFile
    product: TProduct
}

interface IState {
    product: IProduct
    productList: IProduct[]
    loading: boolean
}

const initialState = (): IState => ({
    product: {
        productImage: {
            id: '',
            fileName: '',
            fileType: '',
            fileSize: 0,
            fileUrl: '',
            file: new File([], '')
        },
        product: {
            brandId: '',
            productTypeId: '',
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
            imageId: ''
        }
    },
    productList: [],
    loading: false
})

const state = ref<IState>({ ...initialState() })

export const useProduct = () => {
    const { getProduct, postProduct } = useProductApi()
    const { uploadImage } = useImagesApi()

    const toast = useToast()

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

    const onSubmit = async () => {
        if (!state.value.product.productImage.file.name) return toast.add({ title: 'Please upload an image.', color: 'orange' })
        const { data } = await uploadImage(state.value.product.productImage.file)
        if (!data) return toast.add({ title: 'Failed to upload image.', color: 'red' })

        const  { productImage, ...p } = state.value.product
        const payload = {
            p,
            imageId: data.id,
        }

        console.log("payload", payload)
        const product = await postProduct(payload)

        if (!product) return toast.add({ title: 'Failed to create product.', color: 'red' })
        navigateTo('/products/product')
    }

    const fetchProduct = async () => {
        state.value.loading = true
        try {
            const { data } = await getProduct()
            state.value.productList = data
        } catch (error) {
            toast.add({ title: 'Failed to fetch products.', color: 'red' })
        } finally {
            state.value.loading = false
        }
    }

    const resetState = () => {
        state.value = { ...initialState() }
    }

    return {
        state,
        resetState,
        fetchProduct,
        schema,
        onSubmit,
    }
}