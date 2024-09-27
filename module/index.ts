interface IMain {
    isOpenModal: boolean
}

const initialMain = (): IMain => ({
    isOpenModal: false,
})

const state = ref<IMain>({ ...initialMain() })

export const useMain = () => {
    return {
        state,
    }
}