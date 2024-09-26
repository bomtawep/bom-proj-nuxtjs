export const useConfig = () => {

    // const { $axios } = useContext();
    const config = useRuntimeConfig();
    const host = config.public.apiBase;
    const cookie = useCookie('bom_access_token');

    return {
        host,
        cookie,
    }
}