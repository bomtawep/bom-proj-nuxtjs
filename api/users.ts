import type {TResponse} from "@/types/response";
import type {TUser} from "~/types/users/users";
import type {_AsyncData} from "#app/composables/asyncData";
import {FetchError} from "ofetch";

const config = useRuntimeConfig();
const host = config.public.apiBase;

export default function useUsersApi() {
    // Get users with useAsyncData
    const getUsers = async (): Promise<TResponse> => {
        const res = await fetch(`${host}/users`,{
            // headers: { "Content-Type": "application/json" },
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
    const uploadImage = async (image: File): Promise<TResponse> => {
        const formData = new FormData();
        formData.append('fileUpload', image);
        formData.append('uploadType', 'user');
        const res = await fetch(`${host}/files`,{
            method: "POST",
            body: formData
        });
        return await res.json();
    }
    return {
        getUsers,
        postUser,
        deleteUserById,
        uploadImage,
    };
}