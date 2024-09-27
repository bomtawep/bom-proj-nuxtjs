import axios from 'axios'
import { useConfig } from "~/api/config";

export const useAxios = () => {

    const { host } = useConfig();
    const cookie = useCookie('bom_access_token');

    const instance = axios.create({
        baseURL: host,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookie.value || ''}`,
        }
    })

    return {
        axios: instance,
    }
}