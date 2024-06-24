import type {TResponse} from "~/types/response";
import type {TUser} from "~/types/users/users";
// import { useContext } from '@nuxtjs/composition-api'

export default function useUsersApi() {
    // const { $axios } = useContext();
    const config = useRuntimeConfig();
    const host = config.public.apiBase;
    // Get users with useAsyncData
    const getUsers = async (): Promise<TResponse> => {
        const res = await fetch(`${host}/users`,{
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }
    const postUser = async (user: TUser): Promise<TResponse> => {
        const res = await fetch(`${host}/users`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        return await res.json();
    }
    const deleteUserById = async (id: number): Promise<TResponse> => {
        const res = await fetch(`${host}/users/${id}`,{
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return await res.json();
    }
    const uploadImage = async (image: File, userId: string): Promise<TResponse> => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        formData.append('uploadType', 'user');
        console.log('userId', userId)
        formData.append('userId', userId);
        const res = await fetch(`${host}/users/image`,{
            method: "POST",
            body: formData
        });
        return await res.json();
    }
    const getUserByEmail = async (email: { Email: string }): Promise<TResponse> => {
        const res = await fetch(`${host}/users/email`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email)
        });
        return await res.json();
    }

    const getSession = async (): Promise<any> => {
        const res = await fetch(`${host}/auth/session`,{
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    }
    return {
        getUsers,
        postUser,
        deleteUserById,
        uploadImage,
        getUserByEmail,
        getSession,
    };
}