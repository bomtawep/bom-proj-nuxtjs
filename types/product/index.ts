export type TProduct = {
    brandId: string;
    productTypeId: string;
    name: string;
    price: number;
    cost: number;
    stock: number;
    description: string;
    status: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    discount: number;
    discountType: string;
    discountValue: number;
    discountStart: Date;
    discountEnd: Date;

    imageId: string;
}