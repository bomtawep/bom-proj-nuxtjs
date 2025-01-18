interface IState {
    isOpenModal: boolean
}

const initialMainState = (): IState => ({
    isOpenModal: false,
})

const state = ref<IState>(initialMainState())

export const useMainState = () => {

    const resetMainState = () => {
        Object.assign(state.value, initialMainState())
    }
    return {
        isOpenModal: toRef(state.value, 'isOpenModal'),
        resetMainState,
    }
}