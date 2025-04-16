export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getSession } = useAuth()
    const session = await getSession()

    if (!session && to.path !== '/users/signin' && to.path !== '/users/signup') {
        return navigateTo('/users/signin')
    }
})