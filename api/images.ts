import { useAxios } from "~/api/index";
import type { TResponse } from "~/types/response";

export const useImagesApi = () => {

    const {axios} = useAxios();

    const uploadImage = async (image: File): Promise<TResponse> => {
        const formData = new FormData();
        formData.append('file', image);
        const res = await axios.request({
            url: '/images',
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data
    }

    const getImages = async (imageId: string): Promise<TResponse> => {
        const res = await axios.request({
            url: `/images/${imageId}`
        });
        return res.data
    }

    return {
        uploadImage,
        getImages,
    }
}