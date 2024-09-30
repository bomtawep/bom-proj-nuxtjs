import type { TResponse } from "~/types/response";
import type { TEmail, TPersonalInfo, TUser, TUsername } from "~/types/users/users";
import { useAxios } from "~/api/index";
import type { TImage } from "~/types";

export default function useUsersApi() {
    const { axios } = useAxios();
    const getUsers = async (): Promise<TResponse> => {

        const res = await axios.request({
            url: "/users"
        });
        return res.data
    }
    const postUser = async (user: TUser | TPersonalInfo): Promise<TResponse> => {
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

    const verifyUsernameEmail = async (email: TEmail | TUsername): Promise<TResponse> => {
        const res = await axios.request({
            url: "users/verify",
            method: "POST",
            data: email
        });
        return res.data
    }

    const getSession = async (): Promise<TResponse> => {
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