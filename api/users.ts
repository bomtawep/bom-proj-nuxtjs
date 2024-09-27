import type {TResponse} from "~/types/response";
import type {TUser} from "~/types/users/users";
import { useAxios } from "~/api/index";

export default function useUsersApi() {
    const { axios } = useAxios();
    const getUsers = async (): Promise<TResponse> => {

        const res = await axios.request({
            url: "/users"
        });
        return res.data
    }
    const postUser = async (user: TUser): Promise<TResponse> => {
        const res = await axios.request({
            url: "/users",
            method: "POST",
            data: user
        });
        return res.data
    }
    const deleteUserById = async (id: number): Promise<TResponse> => {
        const res = await axios.request({
            url: `/users/${id}`,
            method: "DELETE",
        });
        return res.data
    }

    const verifyUsernameEmail = async (email: { Email: string }): Promise<TResponse> => {
        const res = await axios.request({
            url: "users/verify",
            method: "POST",
            data: email
        });
        return res.data
    }

    const getSession = async (): Promise<any> => {
        const res = await axios.request({
            url: "/auth/session"
        });
        return res.data
    }
    return {
        getUsers,
        postUser,
        deleteUserById,
        verifyUsernameEmail,
        getSession,
    };
}